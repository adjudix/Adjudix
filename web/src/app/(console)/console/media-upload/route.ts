import { randomUUID } from "node:crypto";
import { db, schema } from "@/db";
import { currentSession } from "@/lib/console/auth";
import { audit } from "@/lib/console/audit";
import { can } from "@/lib/console/permissions";
import { mediaStorageAvailable, storePublic } from "@/lib/console/storage";

// Uploads to the Media library: images and PDFs for the public site.
// (A route rather than a server action, which caps request bodies at 1 MB.)

const MAX_BYTES = 15 * 1024 * 1024;
const ALLOWED = /^(image\/(png|jpe?g|webp|gif|avif|svg\+xml)|application\/pdf|video\/mp4)$/;

export async function POST(request: Request) {
  const session = await currentSession();
  if (!session || session.stage !== "active" || !can(session.user, "media", "edit")) {
    return Response.json({ error: "Not allowed." }, { status: 403 });
  }
  if (!mediaStorageAvailable()) {
    return Response.json({ error: "Media storage isn't set up on this deployment (MEDIA_READ_WRITE_TOKEN)." }, { status: 503 });
  }
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return Response.json({ error: "Upload failed." }, { status: 400 });
  }
  const files = data.getAll("file").filter((entry): entry is File => entry instanceof File && entry.size > 0);
  if (!files.length) return Response.json({ error: "Choose a file to upload." }, { status: 400 });

  const uploaded = [];
  for (const file of files.slice(0, 20)) {
    if (!ALLOWED.test(file.type)) return Response.json({ error: `${file.name}: only images, PDFs and MP4 videos can be uploaded.` }, { status: 400 });
    if (file.size > MAX_BYTES) return Response.json({ error: `${file.name} is over 15 MB.` }, { status: 400 });
    // SVGs can carry scripts; they are only accepted from super admins.
    if (file.type === "image/svg+xml" && !session.user.isSuper) {
      return Response.json({ error: "Only super admins can upload SVG files." }, { status: 400 });
    }
    const stored = await storePublic(file);
    const row = {
      id: randomUUID(),
      url: stored.url,
      pathname: stored.pathname,
      filename: file.name.slice(0, 200),
      contentType: file.type,
      size: file.size,
      alt: "",
      uploadedBy: session.user.email,
    };
    await db().insert(schema.media).values(row);
    uploaded.push(row);
  }
  await audit(session.user, { action: "upload", entity: "media", summary: `uploaded ${uploaded.map((f) => f.filename).join(", ")}` });
  return Response.json({ files: uploaded });
}
