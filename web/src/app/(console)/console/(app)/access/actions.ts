"use server";

import { randomUUID } from "node:crypto";
import { and, eq, ne } from "drizzle-orm";
import { db, schema } from "@/db";
import { authorize, endAllSessions, Forbidden } from "@/lib/console/auth";
import { audit } from "@/lib/console/audit";
import { consoleHref } from "@/lib/console/paths";
import { generatePassword, hashPassword } from "@/lib/console/passwords";
import { cleanPermissions } from "@/lib/console/permissions";
import { mailConfigured, sendToVisitor } from "@/lib/mail";
import { SITE_URL } from "@/lib/site-url";

// Users & roles: super admins only (authorize("users")). Super admins
// themselves are never created, changed or removed here — only from the
// command line (scripts/console/super-admin.ts).

export type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function guard<T>(run: () => Promise<Result<T>>): Promise<Result<T>> {
  try {
    return await run();
  } catch (cause) {
    if (cause instanceof Forbidden) return { ok: false, error: cause.message };
    console.error("[access]", cause);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}


async function editableUser(id: string) {
  const user = await db().query.users.findFirst({ where: eq(schema.users.id, id) });
  if (!user) throw new Error("No such user.");
  if (user.isSuper) throw new Forbidden("Super admins can only be changed from the command line.");
  return user;
}

export async function createUser(input: { email: string; name: string; roleId: string }) {
  return guard<{ password: string; id: string }>(async () => {
    const admin = await authorize("users");
    const email = input.email.trim().toLowerCase().slice(0, 200);
    const name = input.name.trim().slice(0, 120);
    if (!EMAIL.test(email)) return { ok: false, error: "Enter a valid email address." };
    const role = await db().query.roles.findFirst({ where: eq(schema.roles.id, input.roleId) });
    if (!role) return { ok: false, error: "Choose a role." };
    if (await db().query.users.findFirst({ where: eq(schema.users.email, email) })) {
      return { ok: false, error: "There is already an account with that email." };
    }
    const password = generatePassword();
    const id = randomUUID();
    await db()
      .insert(schema.users)
      .values({ id, email, name, roleId: role.id, passwordHash: await hashPassword(password), mustChangePassword: true });
    await audit(admin, { action: "create", entity: "user", entityKey: id, summary: `created the admin user ${email} (${role.name})` });
    return { ok: true, password, id };
  });
}

export async function resetPassword(id: string) {
  return guard<{ password: string }>(async () => {
    const admin = await authorize("users");
    const user = await editableUser(id);
    const password = generatePassword();
    await db()
      .update(schema.users)
      .set({ passwordHash: await hashPassword(password), mustChangePassword: true, failedAttempts: 0, lockedUntil: null })
      .where(eq(schema.users.id, id));
    await endAllSessions(id);
    await audit(admin, { action: "password", entity: "user", entityKey: id, summary: `issued a new password to ${user.email}` });
    return { ok: true, password };
  });
}

/** Emails a new user their sign-in details (the password the super admin was just shown). */
export async function emailSignIn(id: string, password: string) {
  return guard(async () => {
    const admin = await authorize("users");
    const user = await editableUser(id);
    if (!mailConfigured()) return { ok: false, error: "Email isn't set up on this deployment (BREVO_API_KEY)." };
    const link = `${SITE_URL}${consoleHref("/login")}`;
    const text = [
      `You've been given access to the Adjudix Console${user.name ? `, ${user.name}` : ""}.`,
      "",
      `Sign in at: ${link}`,
      `Email: ${user.email}`,
      `Temporary password: ${password}`,
      "",
      "You'll be asked to choose your own password when you first sign in. Keep this address private.",
    ].join("\n");
    await sendToVisitor("query", user.email, {
      subject: "Your Adjudix Console account",
      text,
      html: `<div style="font-family:sans-serif;font-size:15px;line-height:1.6">${text
        .split("\n")
        .map((line) => (line ? `<p style="margin:0 0 4px">${line.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!)}</p>` : "<br>"))
        .join("")}</div>`,
    });
    await audit(admin, { action: "email", entity: "user", entityKey: id, summary: `emailed sign-in details to ${user.email}` });
    return { ok: true };
  });
}

export async function updateUser(id: string, input: { name?: string; roleId?: string; disabled?: boolean }) {
  return guard(async () => {
    const admin = await authorize("users");
    const user = await editableUser(id);
    const changes: Partial<typeof schema.users.$inferInsert> = {};
    if (input.name !== undefined) changes.name = input.name.trim().slice(0, 120);
    if (input.roleId !== undefined) {
      const role = await db().query.roles.findFirst({ where: eq(schema.roles.id, input.roleId) });
      if (!role) return { ok: false, error: "Choose a role." };
      changes.roleId = role.id;
    }
    if (input.disabled !== undefined) changes.disabled = input.disabled;
    await db().update(schema.users).set(changes).where(eq(schema.users.id, id));
    if (input.disabled) await endAllSessions(id);
    const what = input.disabled !== undefined ? (input.disabled ? "disabled" : "re-enabled") : "updated";
    await audit(admin, { action: "update", entity: "user", entityKey: id, summary: `${what} the admin user ${user.email}` });
    return { ok: true };
  });
}

export async function signOutEverywhere(id: string) {
  return guard(async () => {
    const admin = await authorize("users");
    const user = await editableUser(id);
    await endAllSessions(id);
    await audit(admin, { action: "sign-out", entity: "user", entityKey: id, summary: `signed ${user.email} out of every device` });
    return { ok: true };
  });
}

export async function deleteUser(id: string) {
  return guard(async () => {
    const admin = await authorize("users");
    const user = await editableUser(id);
    await db().delete(schema.users).where(eq(schema.users.id, id));
    await audit(admin, { action: "delete", entity: "user", entityKey: id, summary: `deleted the admin user ${user.email}` });
    return { ok: true };
  });
}

export async function saveRole(input: { id?: string; name: string; description: string; permissions: string[] }) {
  return guard<{ id: string }>(async () => {
    const admin = await authorize("users");
    const name = input.name.trim().slice(0, 60);
    if (!name) return { ok: false, error: "Give the role a name." };
    if (name.toLowerCase() === "super admin") return { ok: false, error: "That name is reserved." };
    const clash = await db().query.roles.findFirst({
      where: input.id ? and(eq(schema.roles.name, name), ne(schema.roles.id, input.id)) : eq(schema.roles.name, name),
    });
    if (clash) return { ok: false, error: "Another role already has that name." };
    const values = { name, description: input.description.trim().slice(0, 300), permissions: cleanPermissions(input.permissions) };
    const id = input.id ?? randomUUID();
    if (input.id) await db().update(schema.roles).set(values).where(eq(schema.roles.id, input.id));
    else await db().insert(schema.roles).values({ id, ...values });
    await audit(admin, {
      action: input.id ? "update" : "create",
      entity: "role",
      entityKey: id,
      summary: `${input.id ? "updated" : "created"} the role “${name}” with ${values.permissions.length} permissions`,
    });
    return { ok: true, id };
  });
}

export async function deleteRole(id: string) {
  return guard(async () => {
    const admin = await authorize("users");
    const role = await db().query.roles.findFirst({ where: eq(schema.roles.id, id) });
    if (!role) return { ok: false, error: "No such role." };
    const holders = await db().query.users.findMany({ columns: { id: true }, where: eq(schema.users.roleId, id) });
    if (holders.length) return { ok: false, error: `${holders.length} user${holders.length === 1 ? " has" : "s have"} this role. Give them another role first.` };
    await db().delete(schema.roles).where(eq(schema.roles.id, id));
    await audit(admin, { action: "delete", entity: "role", entityKey: id, summary: `deleted the role “${role.name}”` });
    return { ok: true };
  });
}
