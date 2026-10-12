// Every form on the site is delivered to the Secretariat mailbox (client
// brief, Oct 2026), sent through Brevo's transactional email API. One key
// serves every deployment (adjudixadr.in and adjudixadr.com alike).
// Configure on the host (and in .env.local for local testing):
//   BREVO_API_KEY                      required (Brevo > SMTP & API > API keys)
//   MAIL_FROM                          default secretariat@adjudixadr.com —
//                                      must be a verified sender in Brevo
//   MAIL_TO                            default secretariat@adjudixadr.com
export const SECRETARIAT_EMAIL = "secretariat@adjudixadr.com";

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

export async function sendToSecretariat(mail: OutgoingMail) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Adjudix Website", email: process.env.MAIL_FROM ?? SECRETARIAT_EMAIL },
      to: [{ email: process.env.MAIL_TO ?? SECRETARIAT_EMAIL }],
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
