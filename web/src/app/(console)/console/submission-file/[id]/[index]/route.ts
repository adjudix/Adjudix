import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { currentSession } from "@/lib/console/auth";
import { can } from "@/lib/console/permissions";
import { readPrivate } from "@/lib/console/storage";

// A submission's document, streamed to a signed-in console user. The files
// themselves are private; this is the only way to open them.
export async function GET(_: Request, { params }: { params: Promise<{ id: string; index: string }> }) {
  const session = await currentSession();
  if (!session || session.stage !== "active" || !can(session.user, "submissions")) {
    return new Response("Not found", { status: 404 });
  }
  const { id, index } = await params;
  const row = await db().query.submissions.findFirst({ where: eq(schema.submissions.id, Number(id)) });
  const file = row?.files[Number(index)];
  if (!file?.url) return new Response("Not found", { status: 404 });
  const stored = await readPrivate(file.url);
  if (!stored) return new Response("Not found", { status: 404 });
  const type = stored.contentType !== "application/octet-stream" ? stored.contentType : guessType(file.name);
  return new Response(stored.body as BodyInit, {
    headers: {
      "Content-Type": type,
      "Content-Disposition": `${type === "application/pdf" || type.startsWith("image/") ? "inline" : "attachment"}; filename*=UTF-8''${encodeURIComponent(file.name)}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function guessType(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  return (
    { pdf: "application/pdf", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", doc: "application/msword", docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }[ext ?? ""] ??
    "application/octet-stream"
  );
}
