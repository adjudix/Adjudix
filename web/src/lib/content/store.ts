import "server-only";
import { unstable_cache } from "next/cache";
import { and, eq } from "drizzle-orm";
import { databaseConfigured, db, schema } from "@/db";

// The public site's read side of the content store. Every editable thing —
// a form, a page, a collection, the site settings — is a document
// (type + key) whose published JSON replaces the default written in code.
// Until something is published, or if the database can't be reached, the
// code default is served, so the site never goes blank.

export const docTag = (type: string, key: string) => `doc:${type}:${key}`;
export const typeTag = (type: string) => `doc:${type}`;

async function readPublished(type: string, key: string): Promise<{ found: boolean; data: unknown }> {
  const row = await db().query.documents.findFirst({
    columns: { published: true },
    where: and(eq(schema.documents.type, type), eq(schema.documents.key, key)),
  });
  return row?.published != null ? { found: true, data: row.published } : { found: false, data: null };
}

/** The published copy of a document, or `fallback` if there isn't one. */
export async function getContent<T>(type: string, key: string, fallback: T): Promise<T> {
  if (!databaseConfigured()) return fallback;
  try {
    // Publishing expires these tags (lib/content/drafts); the hourly
    // revalidate is only a safety net.
    const cached = unstable_cache(readPublished, ["content", type, key], {
      tags: [docTag(type, key), typeTag(type)],
      revalidate: 3600,
    });
    const result = await cached(type, key);
    return result.found ? (result.data as T) : fallback;
  } catch (cause) {
    console.warn(`[content] serving the code default for ${type}/${key}:`, cause instanceof Error ? cause.message : cause);
    return fallback;
  }
}

/** Every published key of a type (e.g. the pages created in the console). */
export async function listPublishedKeys(type: string): Promise<string[]> {
  if (!databaseConfigured()) return [];
  try {
    const cached = unstable_cache(
      async (t: string) => {
        const rows = await db().query.documents.findMany({
          columns: { key: true, published: true },
          where: eq(schema.documents.type, t),
        });
        return rows.filter((row) => row.published != null).map((row) => row.key);
      },
      ["content-keys", type],
      { tags: [typeTag(type)], revalidate: 3600 },
    );
    return await cached(type);
  } catch (cause) {
    console.warn(`[content] could not list ${type}:`, cause instanceof Error ? cause.message : cause);
    return [];
  }
}
