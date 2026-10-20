import "server-only";
import { revalidateTag } from "next/cache";
import { and, desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import type { ConsoleUser } from "@/lib/console/auth";
import { audit } from "@/lib/console/audit";
import { docTag, typeTag } from "@/lib/content/store";

// The console's write side of the content store: drafts, publishing,
// history. Only server actions that have already called authorize() use it.

export interface EditableDoc<T> {
  /** What the editor starts from: the draft, else the published copy, else the code default. */
  value: T;
  hasDraft: boolean;
  isPublished: boolean;
  draftUpdatedAt: Date | null;
  draftUpdatedBy: string | null;
  publishedAt: Date | null;
  publishedBy: string | null;
}

const where = (type: string, key: string) => and(eq(schema.documents.type, type), eq(schema.documents.key, key));

export async function loadDoc<T>(type: string, key: string, fallback: T): Promise<EditableDoc<T>> {
  const row = await db().query.documents.findFirst({ where: where(type, key) });
  return {
    value: (row?.draft ?? row?.published ?? fallback) as T,
    hasDraft: row?.draft != null,
    isPublished: row?.published != null,
    draftUpdatedAt: row?.draftUpdatedAt ?? null,
    draftUpdatedBy: row?.draftUpdatedBy ?? null,
    publishedAt: row?.publishedAt ?? null,
    publishedBy: row?.publishedBy ?? null,
  };
}

/** Every stored document of a type, for list screens. */
export async function listDocs(type: string) {
  return db().query.documents.findMany({ where: eq(schema.documents.type, type) });
}

/** `quiet` skips the audit entry, for the page editor's autosave. */
export async function saveDraft(user: ConsoleUser, type: string, key: string, data: unknown, label: string, options: { quiet?: boolean } = {}) {
  await db()
    .insert(schema.documents)
    .values({ type, key, draft: data, draftUpdatedAt: new Date(), draftUpdatedBy: user.email })
    .onConflictDoUpdate({
      target: [schema.documents.type, schema.documents.key],
      set: { draft: data, draftUpdatedAt: new Date(), draftUpdatedBy: user.email },
    });
  if (!options.quiet) await audit(user, { action: "draft", entity: type, entityKey: key, summary: `saved a draft of ${label}` });
}

function refresh(type: string, key: string) {
  // Visitors get the new copy on their next request, not a stale one.
  revalidateTag(docTag(type, key), { expire: 0 });
  revalidateTag(typeTag(type), { expire: 0 });
}

/** Publishes `data` (or the stored draft) and keeps a version of it. */
export async function publishDoc(user: ConsoleUser, type: string, key: string, label: string, data?: unknown) {
  const row = await db().query.documents.findFirst({ where: where(type, key) });
  const value = data ?? row?.draft ?? row?.published;
  if (value == null) throw new Error("There is nothing to publish yet.");
  const now = new Date();
  await db()
    .insert(schema.documents)
    .values({ type, key, published: value, draft: null, publishedAt: now, publishedBy: user.email })
    .onConflictDoUpdate({
      target: [schema.documents.type, schema.documents.key],
      set: { published: value, draft: null, draftUpdatedAt: null, draftUpdatedBy: null, publishedAt: now, publishedBy: user.email },
    });
  await db().insert(schema.versions).values({ type, key, data: value, publishedAt: now, publishedBy: user.email });
  refresh(type, key);
  await audit(user, { action: "publish", entity: type, entityKey: key, summary: `published ${label}` });
}

export async function discardDraft(user: ConsoleUser, type: string, key: string, label: string) {
  const row = await db().query.documents.findFirst({ where: where(type, key) });
  if (!row) return;
  if (row.published == null) await db().delete(schema.documents).where(where(type, key));
  else await db().update(schema.documents).set({ draft: null, draftUpdatedAt: null, draftUpdatedBy: null }).where(where(type, key));
  await audit(user, { action: "discard", entity: type, entityKey: key, summary: `discarded the draft of ${label}` });
}

/** Takes a document off the site; the code default (if any) shows again. */
export async function unpublishDoc(user: ConsoleUser, type: string, key: string, label: string) {
  await db().delete(schema.documents).where(where(type, key));
  refresh(type, key);
  await audit(user, { action: "delete", entity: type, entityKey: key, summary: `removed ${label}` });
}

export async function listVersions(type: string, key: string, limit = 30) {
  return db().query.versions.findMany({
    columns: { id: true, publishedAt: true, publishedBy: true },
    where: and(eq(schema.versions.type, type), eq(schema.versions.key, key)),
    orderBy: desc(schema.versions.id),
    limit,
  });
}

/** Copies an old version into the draft, to review and publish again. */
export async function restoreVersion(user: ConsoleUser, type: string, key: string, versionId: number, label: string) {
  const version = await db().query.versions.findFirst({
    where: and(eq(schema.versions.id, versionId), eq(schema.versions.type, type), eq(schema.versions.key, key)),
  });
  if (!version) throw new Error("That version no longer exists.");
  await saveDraft(user, type, key, version.data, label);
  await audit(user, { action: "restore", entity: type, entityKey: key, summary: `restored a version of ${label} from ${version.publishedAt.toLocaleString("en-IN")}` });
}
