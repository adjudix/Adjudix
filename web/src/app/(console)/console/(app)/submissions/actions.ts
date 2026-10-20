"use server";

import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { authorize, Forbidden } from "@/lib/console/auth";
import { audit } from "@/lib/console/audit";

export type Result = { ok: true } | { ok: false; error: string };

async function guard(run: () => Promise<Result>): Promise<Result> {
  try {
    return await run();
  } catch (cause) {
    if (cause instanceof Forbidden) return { ok: false, error: cause.message };
    console.error("[submissions]", cause);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

async function find(id: number) {
  const row = await db().query.submissions.findFirst({ where: eq(schema.submissions.id, id) });
  if (!row) throw new Error("No such submission.");
  return row;
}

const STATUS_LABEL = { new: "new", in_progress: "in progress", closed: "closed" } as const;

export async function setStatus(id: number, status: keyof typeof STATUS_LABEL) {
  return guard(async () => {
    const user = await authorize("submissions", "edit");
    if (!(status in STATUS_LABEL)) return { ok: false, error: "Unknown status." };
    const row = await find(id);
    await db().update(schema.submissions).set({ status, updatedAt: new Date() }).where(eq(schema.submissions.id, id));
    await audit(user, { action: "update", entity: "submission", entityKey: row.reference, summary: `marked ${row.reference} as ${STATUS_LABEL[status]}` });
    return { ok: true };
  });
}

export async function assign(id: number, userId: string | null) {
  return guard(async () => {
    const user = await authorize("submissions", "edit");
    const row = await find(id);
    const assignee = userId ? await db().query.users.findFirst({ where: eq(schema.users.id, userId) }) : null;
    if (userId && !assignee) return { ok: false, error: "No such user." };
    await db().update(schema.submissions).set({ assignedTo: assignee?.id ?? null, updatedAt: new Date() }).where(eq(schema.submissions.id, id));
    await audit(user, {
      action: "update",
      entity: "submission",
      entityKey: row.reference,
      summary: assignee ? `assigned ${row.reference} to ${assignee.email}` : `unassigned ${row.reference}`,
    });
    return { ok: true };
  });
}

export async function addNote(id: number, body: string) {
  return guard(async () => {
    const user = await authorize("submissions", "edit");
    const text = body.trim().slice(0, 4000);
    if (!text) return { ok: false, error: "Write a note first." };
    const row = await find(id);
    await db().insert(schema.submissionNotes).values({ submissionId: id, userId: user.id, body: text });
    await db().update(schema.submissions).set({ updatedAt: new Date() }).where(eq(schema.submissions.id, id));
    await audit(user, { action: "note", entity: "submission", entityKey: row.reference, summary: `added a note to ${row.reference}` });
    return { ok: true };
  });
}

export async function deleteSubmission(id: number) {
  return guard(async () => {
    const user = await authorize("submissions", "delete");
    const row = await find(id);
    await db().delete(schema.submissions).where(eq(schema.submissions.id, id));
    await audit(user, { action: "delete", entity: "submission", entityKey: row.reference, summary: `deleted ${row.reference} (${row.formName})` });
    return { ok: true };
  });
}
