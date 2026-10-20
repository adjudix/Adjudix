"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { checkTotp, currentSession, endAllSessions, newTotpSecret } from "@/lib/console/auth";
import { audit } from "@/lib/console/audit";
import { consoleHref } from "@/lib/console/paths";
import { hashPassword, passwordProblem, verifyPassword } from "@/lib/console/passwords";

export interface AccountState {
  error?: string;
  done?: boolean;
}

async function signedIn() {
  const session = await currentSession();
  if (!session || session.stage !== "active") redirect(consoleHref("/login"));
  return session;
}

export async function changePassword(_: AccountState, form: FormData): Promise<AccountState> {
  const { record: user } = await signedIn();
  const current = String(form.get("current") ?? "");
  const next = String(form.get("next") ?? "");
  const confirm = String(form.get("confirm") ?? "");
  if (!(await verifyPassword(user.passwordHash, current))) return { error: "Your current password isn't right." };
  const problem = passwordProblem(next, user.email);
  if (problem) return { error: problem };
  if (next !== confirm) return { error: "The two new passwords don't match." };
  if (next === current) return { error: "Choose a password you haven't used here." };

  await db()
    .update(schema.users)
    .set({ passwordHash: await hashPassword(next), mustChangePassword: false })
    .where(eq(schema.users.id, user.id));
  await endAllSessions(user.id, true);
  await audit(user, { action: "password", entity: "user", entityKey: user.id, summary: "changed their password" });
  redirect(consoleHref("/"));
}

/** Starts (or restarts) two-step set-up with a fresh, unconfirmed secret. */
export async function beginTwoStep() {
  const { record: user } = await signedIn();
  if (user.totpEnabled) return null;
  const secret = newTotpSecret();
  await db().update(schema.users).set({ totpSecret: secret }).where(eq(schema.users.id, user.id));
  return secret;
}

export async function confirmTwoStep(_: AccountState, form: FormData): Promise<AccountState> {
  const { record: user } = await signedIn();
  if (!user.totpSecret) return { error: "Set-up expired. Reload the page to get a new code." };
  if (!checkTotp(user.email, user.totpSecret, String(form.get("code") ?? ""))) {
    return { error: "That code didn't match. Check the time on your phone is set automatically, then try the newest code." };
  }
  await db().update(schema.users).set({ totpEnabled: true }).where(eq(schema.users.id, user.id));
  await audit(user, { action: "two-step", entity: "user", entityKey: user.id, summary: "turned on two-step verification" });
  redirect(consoleHref("/"));
}

export async function disableTwoStep(_: AccountState, form: FormData): Promise<AccountState> {
  const { record: user } = await signedIn();
  if (user.isSuper) return { error: "Super admins must keep two-step verification on." };
  if (!(await verifyPassword(user.passwordHash, String(form.get("password") ?? "")))) {
    return { error: "Your password isn't right." };
  }
  await db().update(schema.users).set({ totpEnabled: false, totpSecret: null }).where(eq(schema.users.id, user.id));
  await audit(user, { action: "two-step", entity: "user", entityKey: user.id, summary: "turned off two-step verification" });
  return { done: true };
}
