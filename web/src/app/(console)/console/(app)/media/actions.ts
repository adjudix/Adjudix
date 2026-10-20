"use server";

import { desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { authorize, Forbidden } from "@/lib/console/auth";
import { audit } from "@/lib/console/audit";
import { deletePublic } from "@/lib/console/storage";

export interface MediaRow {
  id: string;
  url: string;
  filename: string;
  contentType: string;
  size: number;
  alt: string;
  uploadedBy: string | null;
  createdAt: string;
}

export async function listMedia(): Promise<MediaRow[]> {
  await authorize("media", "view");
  const rows = await db().query.media.findMany({ orderBy: desc(schema.media.createdAt), limit: 500 });
  return rows.map((row) => ({ ...row, createdAt: row.createdAt.toISOString() }));
}

export async function updateAlt(id: string, alt: string) {
  try {
    const user = await authorize("media", "edit");
    await db().update(schema.media).set({ alt: alt.trim().slice(0, 300) }).where(eq(schema.media.id, id));
    await audit(user, { action: "update", entity: "media", entityKey: id, summary: "updated an image description" });
    return { ok: true as const };
  } catch (cause) {
    return { ok: false as const, error: cause instanceof Forbidden ? cause.message : "Couldn't save the description." };
  }
}

export async function deleteMedia(id: string) {
  try {
    const user = await authorize("media", "delete");
    const row = await db().query.media.findFirst({ where: eq(schema.media.id, id) });
    if (!row) return { ok: true as const };
    await deletePublic(row.url).catch(() => undefined);
    await db().delete(schema.media).where(eq(schema.media.id, id));
    await audit(user, { action: "delete", entity: "media", entityKey: id, summary: `deleted ${row.filename} from Media` });
    return { ok: true as const };
  } catch (cause) {
    return { ok: false as const, error: cause instanceof Forbidden ? cause.message : "Couldn't delete the file." };
  }
}
