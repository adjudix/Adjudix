"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import {
  activatePendingSession,
  checkTotp,
  currentSession,
  endSession,
  ipThrottled,
  LOCK_MINUTES,
  MAX_FAILED_ATTEMPTS,
  startSession,
} from "@/lib/console/auth";
import { audit } from "@/lib/console/audit";
import { consoleHref } from "@/lib/console/paths";
import { verifyPassword } from "@/lib/console/passwords";

export interface FormState {
  error?: string;
}

// The same words for an unknown email and a wrong password, so the form
// can't be used to find out who has an account.
const WRONG = "That email and password don't match an account.";

async function recordFailure(user: typeof schema.users.$inferSelect) {
  const attempts = user.failedAttempts + 1;
  const lock = attempts >= MAX_FAILED_ATTEMPTS;
  await db()
    .update(schema.users)
    .set({ failedAttempts: lock ? 0 : attempts, lockedUntil: lock ? new Date(Date.now() + LOCK_MINUTES * 60_000) : user.lockedUntil })
    .where(eq(schema.users.id, user.id));
  if (lock) await audit(user, { action: "lock", entity: "user", entityKey: user.id, summary: `was locked out after ${MAX_FAILED_ATTEMPTS} failed sign-ins` });
  return lock;
}

export async function signIn(_: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase().slice(0, 200);
  const password = String(form.get("password") ?? "").slice(0, 200);
  if (!email || !password) return { error: "Enter your email and password." };
  if (await ipThrottled(false)) return { error: "Too many attempts from this network. Try again in 15 minutes." };

  const user = await db().query.users.findFirst({ where: eq(schema.users.email, email) });
  if (!user || user.disabled) {
    await ipThrottled(true);
    return { error: WRONG };
  }
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    const minutes = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60_000);
    return { error: `This account is locked after too many attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.` };
  }
  if (!(await verifyPassword(user.passwordHash, password))) {
    await ipThrottled(true);
    const locked = await recordFailure(user);
    return { error: locked ? `Too many attempts. This account is locked for ${LOCK_MINUTES} minutes.` : WRONG };
  }

  await db().update(schema.users).set({ failedAttempts: 0, lockedUntil: null }).where(eq(schema.users.id, user.id));
  if (user.totpEnabled) {
    await startSession(user.id, "pending");
    redirect(consoleHref("/login/verify"));
  }
  await startSession(user.id, "active");
  await audit(user, { action: "sign-in", entity: "user", entityKey: user.id, summary: "signed in" });
  redirect(consoleHref("/"));
}

export async function verifyCode(_: FormState, form: FormData): Promise<FormState> {
  const session = await currentSession();
  if (!session) redirect(consoleHref("/login"));
  const user = session.record;
  if (!user.totpSecret || !user.totpEnabled) redirect(consoleHref("/"));
  if (await ipThrottled(false)) return { error: "Too many attempts from this network. Try again in 15 minutes." };

  if (!checkTotp(user.email, user.totpSecret, String(form.get("code") ?? ""))) {
    await ipThrottled(true);
    const locked = await recordFailure(user);
    if (locked) {
      await endSession();
      redirect(consoleHref("/login?locked=1"));
    }
    return { error: "That code didn't match. Use the newest code in your authenticator app." };
  }
  await db().update(schema.users).set({ failedAttempts: 0 }).where(eq(schema.users.id, user.id));
  await activatePendingSession(user.id);
  await audit(user, { action: "sign-in", entity: "user", entityKey: user.id, summary: "signed in" });
  redirect(consoleHref("/"));
}

export async function signOut() {
  const session = await currentSession();
  if (session) await audit(session.user, { action: "sign-out", entity: "user", entityKey: session.user.id, summary: "signed out" });
  await endSession();
  redirect(consoleHref("/login"));
}
