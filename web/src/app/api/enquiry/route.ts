import { eq } from "drizzle-orm";
import { databaseConfigured, db, schema } from "@/db";
import { acknowledgementEmail, newReference, secretariatEmail, type Submission } from "@/lib/email-templates";
import { getForm, getFormByTitle } from "@/lib/forms";
import { checkSubmission } from "@/lib/forms/validate";
import { mailConfigured, QUERY_EMAIL, SECRETARIAT_EMAIL, sendToInbox, sendToVisitor, type Inbox } from "@/lib/mail";
import { storageAvailable, storePrivate } from "@/lib/console/storage";

// Receives every QueryForm submission. The form is looked up as published
// in the console and the submission checked against it; then it is saved to
// the console's Submissions inbox (with its documents), emailed with the
// documents to the mailbox that handles it, and acknowledged to the visitor
// under the same reference. It succeeds if either the inbox or the email
// has it.

const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = /\.(pdf|docx?|jpe?g|png)$/i;
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

  const slug = String(data.get("_formKey") ?? "").slice(0, 80);
  const title = String(data.get("_form") ?? "").slice(0, 120);
  const form = (slug && (await getForm(slug))) || (title ? await getFormByTitle(title) : undefined);
  if (!form) return error("This form is no longer available. Please reload the page.", 404);
  if (!form.enabled) return error(`${form.closedTitle} ${form.closedBody}`, 403);

  const checked = checkSubmission(form, data);
  if (!checked.ok) return error(checked.error, 400);
  const { name, email, phone, organization, answers, files } = checked.value;

  if (files.length > MAX_FILES) return error(`Please attach at most ${MAX_FILES} documents.`, 400);
  if (files.some((file) => !ALLOWED_EXTENSIONS.test(file.name))) {
    return error("Documents must be PDF, Word, JPG, or PNG files.", 400);
  }
  if (files.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_BYTES) {
    return error("Attachments must total 10 MB or less.", 400);
  }

  const inbox: Inbox = form.inbox;
  const inboxEmail = inbox === "secretariat" ? SECRETARIAT_EMAIL : QUERY_EMAIL;
  const canStore = databaseConfigured();
  if (!canStore && !mailConfigured()) {
    console.error("[enquiry] Neither the database nor email is configured.");
    return error(`Online submissions are temporarily unavailable. Please email ${inboxEmail}.`, 503);
  }

  const submission: Submission = {
    reference: newReference(),
    formName: form.title,
    kind: form.kind,
    urgent: form.tone === "urgent",
    receivedAt: new Date(),
    // The same forms run on adjudixadr.in and adjudixadr.com; say which one.
    site: request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? undefined,
    name,
    email,
    phone,
    organization,
    organizationLabel: form.organizationLabel ?? "Organisation",
    answers,
    files: files.map((file) => ({ name: file.name, size: file.size })),
  };

  // 1. The console's inbox, with the documents kept privately.
  let stored = false;
  if (canStore) {
    try {
      const kept = storageAvailable()
        ? await Promise.all(
            files.map(async (file) => ({ name: file.name, size: file.size, url: (await storePrivate(`submissions/${submission.reference}`, file)).url })),
          )
        : submission.files;
      await db().insert(schema.submissions).values({
        reference: submission.reference,
        formKey: form.slug,
        formName: form.title,
        urgent: submission.urgent,
        name,
        email: email || null,
        phone: phone || null,
        organization: organization || null,
        answers,
        files: kept,
        site: submission.site ?? null,
      });
      stored = true;
    } catch (cause) {
      console.error("[enquiry] saving to the inbox failed", cause);
    }
  }

  // 2. The mailbox, with the documents attached.
  let emailed = false;
  if (mailConfigured()) {
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
      emailed = true;
    } catch (cause) {
      console.error("[enquiry] sending failed", cause);
    }
  }
  if (stored && emailed) {
    await db()
      .update(schema.submissions)
      .set({ emailed: true })
      .where(eq(schema.submissions.reference, submission.reference))
      .catch(() => undefined);
  }
  if (!stored && !emailed) {
    return error(`We couldn't send your submission. Please try again or email ${inboxEmail}.`, 502);
  }

  // The Institute has it, so a failed acknowledgement only loses the receipt.
  let acknowledged = false;
  if (mailConfigured() && EMAIL_PATTERN.test(email)) {
    try {
      await sendToVisitor(inbox, email, acknowledgementEmail(submission, form));
      acknowledged = true;
    } catch (cause) {
      console.error("[enquiry] acknowledgement failed", cause);
    }
  }

  return Response.json({ reference: submission.reference, acknowledged });
}
