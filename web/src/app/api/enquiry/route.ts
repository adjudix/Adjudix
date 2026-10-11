import { mailConfigured, sendToSecretariat, SECRETARIAT_EMAIL } from "@/lib/mail";

// Receives every QueryForm submission (contact, file a dispute, respond to a
// dispute) and emails it, with any attached documents, to the Secretariat.

const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = /\.(pdf|docx?|jpe?g|png)$/i;
// Fields the form sends for routing, not for the Secretariat to read.
const META_FIELDS = new Set(["_form", "_labels", "website"]);

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function error(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return error("Invalid submission.", 400);
  }

  // Honeypot: real visitors never see or fill this field.
  if (String(data.get("website") ?? "")) return new Response(null, { status: 204 });

  const formName = String(data.get("_form") ?? "Website enquiry").slice(0, 80);
  let labels: Record<string, string> = {};
  try {
    labels = JSON.parse(String(data.get("_labels") ?? "{}"));
  } catch {
    // Fall back to field names.
  }

  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  if (!name) return error("Please enter your name.", 400);
  if (!email && !phone) return error("Please enter either an email address or a phone number.", 400);

  const rows: [string, string][] = [];
  const files: File[] = [];
  for (const [key, value] of data.entries()) {
    if (META_FIELDS.has(key)) continue;
    if (typeof value === "string") {
      if (value.trim()) rows.push([labels[key] ?? key, value.trim()]);
    } else if (value.size > 0) {
      files.push(value);
    }
  }

  if (files.length > MAX_FILES) return error(`Please attach at most ${MAX_FILES} documents.`, 400);
  if (files.some((file) => !ALLOWED_EXTENSIONS.test(file.name))) {
    return error("Documents must be PDF, Word, JPG, or PNG files.", 400);
  }
  if (files.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_BYTES) {
    return error("Attachments must total 10 MB or less.", 400);
  }

  if (!mailConfigured()) {
    console.error("[enquiry] SMTP is not configured — set SMTP_USER and SMTP_PASS.");
    return error(`Online submissions are temporarily unavailable. Please email ${SECRETARIAT_EMAIL}.`, 503);
  }

  const subject = `${formName}: ${name}`;
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<h2 style="font-family:sans-serif">${escapeHtml(formName)}</h2>
<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
${rows
  .map(
    ([label, value]) =>
      `<tr><th align="left" valign="top" style="border-bottom:1px solid #ddd">${escapeHtml(label)}</th><td style="border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
  )
  .join("\n")}
</table>
${files.length ? `<p style="font-family:sans-serif">${files.length} document(s) attached.</p>` : ""}`;

  try {
    await sendToSecretariat({
      subject,
      text,
      html,
      replyTo: email || undefined,
      attachments: await Promise.all(
        files.map(async (file) => ({
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
          contentType: file.type || undefined,
        })),
      ),
    });
  } catch (cause) {
    console.error("[enquiry] sending failed", cause);
    return error(`We couldn't send your submission. Please try again or email ${SECRETARIAT_EMAIL}.`, 502);
  }

  return new Response(null, { status: 204 });
}
