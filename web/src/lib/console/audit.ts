import "server-only";
import { db, schema } from "@/db";
import type { ConsoleUser } from "@/lib/console/auth";

// One line per change, for the audit log and the dashboard's activity feed.
// Never throws: a failed log entry must not undo the change it describes.
export async function audit(
  user: Pick<ConsoleUser, "id" | "email"> | null,
  entry: { action: string; entity: string; entityKey?: string; summary: string },
) {
  try {
    await db()
      .insert(schema.auditLog)
      .values({ userId: user?.id ?? null, userEmail: user?.email ?? null, ...entry });
  } catch (cause) {
    console.error("[audit] could not record", entry, cause);
  }
}
