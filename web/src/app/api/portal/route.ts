import { verifyCaptcha } from "@/lib/captcha";
import { mailConfigured, SECRETARIAT_EMAIL, sendToInbox } from "@/lib/mail";

// The portal's two forms. Sign-up is an account request: the Secretariat
// verifies it and activates the account, so no password is collected or
// emailed. Sign-in checks the captcha, but there is no accounts store behind
// the portal yet, so it cannot sign anyone in — it says so plainly instead of
// pretending the credentials were wrong.

const ROLES = new Set(["Party to a case", "Arbitrator / Neutral", "Case Manager / Secretariat"]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function error(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return error("Invalid request.", 400);
  }
  const field = (name: string) => String(body[name] ?? "").trim().slice(0, 200);

  if (!verifyCaptcha(field("captchaToken"), field("captcha"))) {
    return error("The captcha didn't match. Please try the new one.", 400);
  }

  if (field("action") === "login") {
    if (!field("userId") || !field("password")) return error("Please enter your user ID and password.", 400);
    return error(
      `We couldn't sign you in. Portal accounts are activated by the Secretariat once a sign-up is verified — if you have signed up, please wait for your activation email or write to ${SECRETARIAT_EMAIL}.`,
      401,
    );
  }

  if (field("action") !== "signup") return error("Invalid request.", 400);
  const signup = {
    role: field("role"),
    name: field("name"),
    email: field("email"),
    phone: field("phone"),
    userId: field("userId"),
    caseNumber: field("caseNumber"),
  };
  if (!ROLES.has(signup.role)) return error("Please choose who you are signing up as.", 400);
  if (!signup.name) return error("Please enter your full name.", 400);
  if (!EMAIL_PATTERN.test(signup.email)) return error("Please enter a valid email address.", 400);
  if (!/^[A-Za-z0-9._-]{4,32}$/.test(signup.userId)) {
    return error("Choose a user ID of 4–32 letters, numbers, dots, dashes, or underscores.", 400);
  }
  if (!mailConfigured()) {
    return error(`Sign-up is temporarily unavailable. Please email ${SECRETARIAT_EMAIL}.`, 503);
  }

  const rows: [string, string][] = [
    ["Signing up as", signup.role],
    ["Full name", signup.name],
    ["Email", signup.email],
    ["Phone", signup.phone],
    ["Requested user ID", signup.userId],
    ["Case number", signup.caseNumber],
  ].filter((row): row is [string, string] => Boolean(row[1]));
  try {
    await sendToInbox("secretariat", {
      subject: `Portal sign-up request: ${signup.name} (${signup.role})`,
      text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html: `<h2 style="font-family:sans-serif">Portal sign-up request</h2><table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows
        .map(([label, value]) => `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`)
        .join("")}</table>`,
      replyTo: signup.email,
    });
  } catch (cause) {
    console.error("[portal] sign-up mail failed", cause);
    return error(`We couldn't send your sign-up. Please try again or email ${SECRETARIAT_EMAIL}.`, 502);
  }
  return Response.json({ ok: true });
}
