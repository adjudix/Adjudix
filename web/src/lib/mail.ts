import nodemailer from "nodemailer";

// Every form on the site is delivered to the Secretariat mailbox (client
// brief, Oct 2026). Sending goes through SMTP — by default the principal
// Gmail account with an app password. Configure in .env.local:
//   SMTP_USER, SMTP_PASS               required
//   SMTP_HOST, SMTP_PORT               default smtp.gmail.com:465
//   MAIL_TO                            default secretariat@adjudixadr.com
//   MAIL_FROM                          default SMTP_USER
export const SECRETARIAT_EMAIL = "secretariat@adjudixadr.com";

export interface OutgoingMail {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
}

export function mailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendToSecretariat(mail: OutgoingMail) {
  const port = Number(process.env.SMTP_PORT ?? 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transport.sendMail({
    from: `"Adjudix Website" <${process.env.MAIL_FROM ?? process.env.SMTP_USER}>`,
    to: process.env.MAIL_TO ?? SECRETARIAT_EMAIL,
    ...mail,
  });
}
