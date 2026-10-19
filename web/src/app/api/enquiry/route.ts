import { acknowledgementEmail, newReference, secretariatEmail, type Submission } from "@/lib/email-templates";
import { formMeta } from "@/lib/form-meta";
import { mailConfigured, QUERY_EMAIL, SECRETARIAT_EMAIL, sendToInbox, sendToVisitor, type Inbox } from "@/lib/mail";

// Receives every QueryForm submission and emails it, with any attached
// documents, to the mailbox that handles it — the Query mailbox, unless
// MAIL_TO routes case filings elsewhere — then sends the visitor a branded
// acknowledgement with the same reference.

const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = /\.(pdf|docx?|jpe?g|png)$/i;
// Fields the form sends for routing, not for the Secretariat to read.
const META_FIELDS = new Set(["_form", "_labels", "website"]);
// Shown together as the sender's contact card rather than as answers.
const CONTACT_FIELDS = new Set(["name", "email", "phone", "organization"]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const organization = String(data.get("organization") ?? "").trim();
  const answers: Submission["answers"] = [];
  const files: File[] = [];
  for (const [key, value] of data.entries()) {
    if (META_FIELDS.has(key) || CONTACT_FIELDS.has(key)) continue;
    if (typeof value === "string") {
      if (value.trim()) answers.push({ key, label: labels[key] ?? key, value: value.trim() });
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

  const meta = formMeta(formName);
  const inbox: Inbox = meta.kind === "filing" ? "secretariat" : "query";
  const inboxEmail = inbox === "secretariat" ? SECRETARIAT_EMAIL : QUERY_EMAIL;

  if (!mailConfigured()) {
    console.error("[enquiry] Email is not configured — set BREVO_API_KEY.");
    return error(`Online submissions are temporarily unavailable. Please email ${inboxEmail}.`, 503);
  }

  const submission: Submission = {
    reference: newReference(),
    formName,
    kind: meta.kind,
    urgent: meta.urgent,
    receivedAt: new Date(),
    // The same forms run on adjudixadr.in and adjudixadr.com; say which one.
    site: request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? undefined,
    name,
    email,
    phone,
    organization,
    organizationLabel: labels.organization ?? "Organisation",
    answers,
    files: files.map((file) => ({ name: file.name, size: file.size })),
  };

  try {
    await sendToInbox(inbox, {
      ...secretariatEmail(submission),
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
    return error(`We couldn't send your submission. Please try again or email ${inboxEmail}.`, 502);
  }

  // The Secretariat has it, so a failed acknowledgement only loses the receipt.
  let acknowledged = false;
  if (EMAIL_PATTERN.test(email)) {
    try {
      await sendToVisitor(inbox, email, acknowledgementEmail(submission, meta));
      acknowledged = true;
    } catch (cause) {
      console.error("[enquiry] acknowledgement failed", cause);
    }
  }

  return Response.json({ reference: submission.reference, acknowledged });
}
