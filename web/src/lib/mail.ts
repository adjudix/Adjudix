// Form submissions are sent through Brevo's transactional email API. Case
// filings (a new or pending case) go to the Secretariat; every other form —
// the contact form, applications, registrations — goes to the Query mailbox
// (client brief, Oct 2026). One key serves every deployment (adjudixadr.in
// and adjudixadr.com alike).
// Configure on the host (and in .env.local for local testing):
//   BREVO_API_KEY                      required (Brevo > SMTP & API > API keys)
//   MAIL_FROM                          default secretariat@adjudixADR.com —
//                                      must be a verified sender in Brevo
//   MAIL_TO                            default secretariat@adjudixADR.com
//   QUERY_MAIL_TO                      default query@adjudixADR.com
export const SECRETARIAT_EMAIL = "secretariat@adjudixADR.com";
export const QUERY_EMAIL = "query@adjudixADR.com";

export type Inbox = "secretariat" | "query";

function inboxAddress(inbox: Inbox) {
  return inbox === "secretariat"
    ? process.env.MAIL_TO?.trim() || SECRETARIAT_EMAIL
    : process.env.QUERY_MAIL_TO?.trim() || QUERY_EMAIL;
}

export interface OutgoingMail {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
}

export function mailConfigured() {
  return Boolean(process.env.BREVO_API_KEY);
}

interface Delivery extends OutgoingMail {
  to: string;
  senderName: string;
}

async function send(mail: Delivery) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: mail.senderName, email: process.env.MAIL_FROM?.trim() || SECRETARIAT_EMAIL },
      to: [{ email: mail.to }],
      ...(mail.replyTo ? { replyTo: { email: mail.replyTo } } : {}),
      subject: mail.subject,
      htmlContent: mail.html,
      textContent: mail.text,
      ...(mail.attachments?.length
        ? {
            attachment: mail.attachments.map((file) => ({
              name: file.filename,
              content: file.content.toString("base64"),
            })),
          }
        : {}),
    }),
  });
  if (!response.ok) {
    throw new Error(`Brevo responded ${response.status}: ${await response.text()}`);
  }
}

/** A submission, delivered to the mailbox that handles it. */
export function sendToInbox(inbox: Inbox, mail: OutgoingMail) {
  return send({ ...mail, to: inboxAddress(inbox), senderName: "Adjudix Website" });
}

/** The acknowledgement a visitor receives; replies reach the same mailbox. */
export function sendToVisitor(inbox: Inbox, to: string, mail: Omit<OutgoingMail, "replyTo" | "attachments">) {
  return send({
    ...mail,
    to,
    senderName: "Adjudix Secretariat",
    replyTo: inboxAddress(inbox),
  });
}
