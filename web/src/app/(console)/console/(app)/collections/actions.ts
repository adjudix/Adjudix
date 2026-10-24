"use server";

import { authorize, Forbidden } from "@/lib/console/auth";
import { can } from "@/lib/console/permissions";
import { getCollectionDef, type CollectionDef } from "@/lib/content/collections";
import { COLLECTION_TYPE, HIDDEN } from "@/lib/content/data";
import { discardDraft, loadDoc, publishDoc, restoreVersion, saveDraft } from "@/lib/content/drafts";
import { cleanRecord, missingRequired } from "@/lib/content/schema";
import { duplicateCodes, type Member } from "@/lib/members";

export type Result = { ok: true } | { ok: false; error: string };

async function guard(run: () => Promise<Result>): Promise<Result> {
  try {
    return await run();
  } catch (cause) {
    if (cause instanceof Forbidden) return { ok: false, error: cause.message };
    console.error("[collections]", cause);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

function definition(key: string): CollectionDef {
  const def = getCollectionDef(key);
  if (!def) throw new Forbidden("No such collection.");
  return def;
}

/** Shapes the editor's value to the collection's fields, keeping each item's hidden flag. */
function clean(def: CollectionDef, input: unknown) {
  if (def.kind === "record") return cleanRecord(def.fields, input);
  if (!Array.isArray(input)) return [];
  return input.slice(0, 5_000).map((item) => {
    const record = cleanRecord(def.fields, item);
    return (item as Record<string, unknown>)?.[HIDDEN] === true ? { ...record, [HIDDEN]: true } : record;
  });
}

function problems(def: CollectionDef, value: unknown) {
  const items = def.kind === "list" ? (value as Record<string, unknown>[]) : [value as Record<string, unknown>];
  return items.flatMap((item, index) =>
    missingRequired(def.fields, item).map((path) => (def.kind === "list" ? `${def.singular ?? "Item"} ${index + 1} › ${path}` : path)),
  );
}

/** Rules beyond the fields' own: each collection's checks across items. */
function conflicts(key: string, value: unknown): string | null {
  if (key === "members") {
    // Hidden members keep their numbers, so they count too.
    const clash = duplicateCodes(value as Member[])[0];
    if (clash) return `Membership number already taken: ${clash.code} is used by ${clash.names.join(" and ")}. Give each member a different number.`;
  }
  return null;
}

export async function saveCollectionDraft(key: string, input: unknown) {
  return guard(async () => {
    const user = await authorize("collections", "edit");
    const def = definition(key);
    const value = clean(def, input);
    const conflict = conflicts(key, value);
    if (conflict) return { ok: false, error: conflict };
    if (def.kind === "list" && !can(user, "collections", "structure")) {
      const before = (await loadDoc<unknown[]>(COLLECTION_TYPE, key, def.defaults() as unknown[])).value;
      if (before.length !== (value as unknown[]).length) {
        return { ok: false, error: "Your role can edit items, but not add or remove them." };
      }
    }
    await saveDraft(user, COLLECTION_TYPE, key, value, def.label);
    return { ok: true };
  });
}

export async function publishCollection(key: string, input?: unknown) {
  return guard(async () => {
    const user = await authorize("collections", "publish");
    const def = definition(key);
    if (input !== undefined) {
      const saved = await saveCollectionDraft(key, input);
      if (!saved.ok) return saved;
    }
    const current = (await loadDoc(COLLECTION_TYPE, key, def.defaults())).value;
    const conflict = conflicts(key, current);
    if (conflict) return { ok: false, error: conflict };
    const missing = problems(def, current);
    if (missing.length) {
      return { ok: false, error: `Fill these in before publishing: ${missing.slice(0, 4).join("; ")}${missing.length > 4 ? ` and ${missing.length - 4} more` : ""}.` };
    }
    await publishDoc(user, COLLECTION_TYPE, key, def.label, current);
    return { ok: true };
  });
}

export async function discardCollectionDraft(key: string) {
  return guard(async () => {
    const user = await authorize("collections", "edit");
    await discardDraft(user, COLLECTION_TYPE, key, definition(key).label);
    return { ok: true };
  });
}

export async function restoreCollectionVersion(key: string, versionId: number) {
  return guard(async () => {
    const user = await authorize("collections", "edit");
    await restoreVersion(user, COLLECTION_TYPE, key, versionId, definition(key).label);
    return { ok: true };
  });
}
