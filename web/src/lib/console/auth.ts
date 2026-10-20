import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { and, eq, lt } from "drizzle-orm";
import * as OTPAuth from "otpauth";
import { db, schema } from "@/db";
import { can, type Action, type Module } from "@/lib/console/permissions";
import { consoleHref } from "@/lib/console/paths";

// Console sign-in: a random token in an httpOnly cookie, stored only as its
// SHA-256. A session starts "pending" when the second factor is still to be
// checked and becomes "active" once it is.

const COOKIE = "adx_console";
const ACTIVE_HOURS = 12;
const PENDING_MINUTES = 10;
export const MAX_FAILED_ATTEMPTS = 5;
export const LOCK_MINUTES = 15;
const IP_LIMIT = 20;
const IP_WINDOW_MINUTES = 15;

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

export interface ConsoleUser {
  id: string;
  email: string;
  name: string;
  isSuper: boolean;
  roleName: string;
  permissions: string[];
  mustChangePassword: boolean;
  totpEnabled: boolean;
}

export async function requestMeta() {
  const list = await headers();
  return {
    ip: list.get("x-forwarded-for")?.split(",")[0]?.trim() || list.get("x-real-ip") || "unknown",
    userAgent: list.get("user-agent")?.slice(0, 300) ?? "",
  };
}

export async function startSession(userId: string, stage: "pending" | "active") {
  const token = randomBytes(32).toString("base64url");
  const { ip, userAgent } = await requestMeta();
  const expiresAt = new Date(Date.now() + (stage === "active" ? ACTIVE_HOURS * 3_600_000 : PENDING_MINUTES * 60_000));
  await db().insert(schema.sessions).values({ id: sha256(token), userId, stage, expiresAt, ip, userAgent });
  // Old sessions are swept whenever a new one starts.
  await db().delete(schema.sessions).where(lt(schema.sessions.expiresAt, new Date()));
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });
}

async function sessionId() {
  const token = (await cookies()).get(COOKIE)?.value;
  return token ? sha256(token) : null;
}

export async function endSession() {
  const id = await sessionId();
  if (id) await db().delete(schema.sessions).where(eq(schema.sessions.id, id));
  (await cookies()).delete(COOKIE);
}

/** Signs the user out everywhere (after a password change, or when disabled). */
export async function endAllSessions(userId: string, exceptCurrent = false) {
  const current = exceptCurrent ? await sessionId() : null;
  const sessions = await db().query.sessions.findMany({ where: eq(schema.sessions.userId, userId) });
  for (const session of sessions) {
    if (session.id !== current) await db().delete(schema.sessions).where(eq(schema.sessions.id, session.id));
  }
}

/** The signed-in session and its user, once per request. */
export const currentSession = cache(async () => {
  const id = await sessionId();
  if (!id) return null;
  const session = await db().query.sessions.findFirst({ where: eq(schema.sessions.id, id) });
  if (!session || session.expiresAt < new Date()) return null;
  const user = await db().query.users.findFirst({ where: eq(schema.users.id, session.userId) });
  if (!user || user.disabled) return null;
  const role = user.roleId ? await db().query.roles.findFirst({ where: eq(schema.roles.id, user.roleId) }) : undefined;
  const consoleUser: ConsoleUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    isSuper: user.isSuper,
    roleName: user.isSuper ? "Super Admin" : (role?.name ?? "No role"),
    permissions: user.isSuper ? [] : (role?.permissions ?? []),
    mustChangePassword: user.mustChangePassword,
    totpEnabled: user.totpEnabled,
  };
  return { stage: session.stage, user: consoleUser, record: user };
});

/**
 * The signed-in user, or a redirect to sign-in. Until they have changed a
 * generated password (and, for super admins, set up two-step verification)
 * the rest of the console stays closed.
 */
export async function requireUser(options: { setup?: boolean } = {}) {
  const session = await currentSession();
  if (!session) redirect(consoleHref("/login"));
  if (session.stage === "pending") redirect(consoleHref("/login/verify"));
  if (!options.setup) {
    if (session.user.mustChangePassword) redirect(consoleHref("/account/password"));
    if (session.user.isSuper && !session.user.totpEnabled) redirect(consoleHref("/account/two-step"));
  }
  // Last-seen, at most once a minute.
  const last = session.record.lastSeenAt?.getTime() ?? 0;
  if (Date.now() - last > 60_000) {
    await db().update(schema.users).set({ lastSeenAt: new Date() }).where(eq(schema.users.id, session.user.id));
  }
  return session.user;
}

export class Forbidden extends Error {
  constructor(message = "You don't have permission to do that.") {
    super(message);
  }
}

/** For pages: sends anyone without the permission back to the dashboard. */
export async function requirePermission(module: Module, action: Action = "view") {
  const user = await requireUser();
  if (!can(user, module, action)) redirect(consoleHref("/?denied=1"));
  return user;
}

/** For server actions: throws instead of redirecting. */
export async function authorize(module: Module | "users", action: Action = "view") {
  const session = await currentSession();
  if (!session || session.stage !== "active" || session.user.mustChangePassword) throw new Forbidden("Please sign in again.");
  const user = session.user;
  if (module === "users" ? !user.isSuper : !can(user, module, action)) throw new Forbidden();
  return user;
}

// ── Throttling ──────────────────────────────────────────────────────────────

/** Counts a failed sign-in from this IP; true once the IP is over its limit. */
export async function ipThrottled(record: boolean) {
  const { ip } = await requestMeta();
  const key = `login:${ip}`;
  const row = await db().query.throttle.findFirst({ where: eq(schema.throttle.key, key) });
  const windowOpen = row && Date.now() - row.windowStart.getTime() < IP_WINDOW_MINUTES * 60_000;
  if (!record) return Boolean(windowOpen && row.count >= IP_LIMIT);
  if (windowOpen) {
    await db().update(schema.throttle).set({ count: row.count + 1 }).where(eq(schema.throttle.key, key));
    return row.count + 1 >= IP_LIMIT;
  }
  await db()
    .insert(schema.throttle)
    .values({ key, count: 1, windowStart: new Date() })
    .onConflictDoUpdate({ target: schema.throttle.key, set: { count: 1, windowStart: new Date() } });
  return false;
}

// ── Two-step verification (TOTP) ───────────────────────────────────────────

export function totpFor(email: string, secret: string) {
  return new OTPAuth.TOTP({
    issuer: "Adjudix Console",
    label: email,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secret),
  });
}

export function newTotpSecret() {
  return new OTPAuth.Secret({ size: 20 }).base32;
}

export function checkTotp(email: string, secret: string, code: string) {
  const clean = code.replace(/\s+/g, "");
  if (!/^\d{6}$/.test(clean)) return false;
  return totpFor(email, secret).validate({ token: clean, window: 1 }) !== null;
}

export async function activatePendingSession(userId: string) {
  const id = await sessionId();
  if (!id) return;
  await db()
    .update(schema.sessions)
    .set({ stage: "active", expiresAt: new Date(Date.now() + ACTIVE_HOURS * 3_600_000) })
    .where(and(eq(schema.sessions.id, id), eq(schema.sessions.userId, userId)));
  const token = (await cookies()).get(COOKIE)?.value;
  if (token) {
    (await cookies()).set(COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(Date.now() + ACTIVE_HOURS * 3_600_000),
    });
  }
}
