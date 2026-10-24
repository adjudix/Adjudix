import type { FormKind } from "@/components/patterns/query-form";
import { QUERY_EMAIL, SECRETARIAT_EMAIL } from "@/lib/mail";
import { SITE_URL } from "@/lib/site-url";

// Branded emails for form submissions: an alert to the Secretariat and an
// acknowledgement to the visitor, sharing one reference number. Email
// clients ignore stylesheets, so everything is tables with inline styles,
// 600px wide, in fonts every client has. Colours follow styles/theme.css.

const C = {
  navy: "#0F1F3D",
  navyDeep: "#0A1526",
  ground: "#F4F7FB",
  gold: "#EEB32B",
  goldInk: "#8A6312",
  goldTint: "#FCEFD2",
  ember: "#C41230",
  emberTint: "#FBE7EA",
  ink: "#131722",
  muted: "#3A4152",
  soft: "#6B7280",
  border: "#DDE3EC",
  onNavy: "#B9C4D9",
};
const SERIF = "Georgia,'Times New Roman',serif";
const SANS = "'Segoe UI',Helvetica,Arial,sans-serif";

const ORG = "Adjudix Dispute Resolution Institute";
// The tagline under the logo (client, Oct 2026).
const MOTTO = "Dispute Resolved & Implemented under one Roof";

export interface Submission {
  reference: string;
  formName: string;
  kind: FormKind;
  urgent: boolean;
  receivedAt: Date;
  /** The host the form was sent from (adjudixadr.in or adjudixadr.com). */
  site?: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  organizationLabel: string;
  /** Every other answer, labelled, in the order the form asked. */
  answers: { key: string; label: string; value: string }[];
  files: { name: string; size: number }[];
}

export interface RenderedMail {
  subject: string;
  html: string;
  text: string;
}

/** ADX-251015-7K3Q: the date in India, then four characters of randomness. */
export function newReference(now = new Date()) {
  const ist = new Date(now.getTime() + 330 * 60_000).toISOString();
  const date = ist.slice(2, 10).replaceAll("-", "");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const random = Array.from(crypto.getRandomValues(new Uint8Array(4)), (byte) => alphabet[byte % alphabet.length]).join("");
  return `ADX-${date}-${random}`;
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

const h = escapeHtml;

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date) + " IST";
}

function formatSize(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function siteHost() {
  return SITE_URL.replace(/^https?:\/\//, "");
}

// ── Building blocks ─────────────────────────────────────────────────────

function layout({ preheader, accent, body, footnote }: { preheader: string; accent: string; body: string; footnote: string }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${h(ORG)}</title>
<style>
  @media (max-width:620px){
    .adx-card{width:100%!important}
    .adx-pad{padding-left:22px!important;padding-right:22px!important}
    .adx-stack{display:block!important;width:100%!important;box-sizing:border-box}
    .adx-label{padding-bottom:2px!important;padding-right:0!important}
    .adx-value{border-top:0!important;padding-top:0!important}
  }
  a{color:${C.goldInk}}
</style>
</head>
<body style="margin:0;padding:0;background:${C.ground};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.ground}">${h(preheader)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.ground}">
<tr><td align="center" style="padding:32px 12px">
  <table role="presentation" class="adx-card" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#FFFFFF;border:1px solid ${C.border};border-radius:10px;overflow:hidden">
    <tr><td style="height:5px;line-height:5px;font-size:0;background:${accent}">&nbsp;</td></tr>
    <tr><td align="center" class="adx-pad" style="padding:30px 40px 24px">
      <a href="${SITE_URL}" style="text-decoration:none"><img src="${SITE_URL}/images/email-logo.png" width="280" height="65" alt="${h(ORG)}" style="display:block;width:280px;max-width:100%;height:auto;border:0"></a>
    </td></tr>
    <tr><td class="adx-pad" style="padding:0 40px"><div style="height:1px;line-height:1px;font-size:0;background:${C.border}">&nbsp;</div></td></tr>
    ${body}
    <tr><td style="background:${C.navy};padding:28px 40px" class="adx-pad">
      <p style="margin:0;font-family:${SERIF};font-size:17px;line-height:1.3;color:#FFFFFF">${h(ORG)}</p>
      <p style="margin:6px 0 0;font-family:${SANS};font-size:10px;letter-spacing:1.6px;text-transform:uppercase;color:${C.gold}">${h(MOTTO)}</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px">
        ${[
          ["Queries", QUERY_EMAIL],
          ["Case matters", SECRETARIAT_EMAIL],
        ]
          .map(
            ([team, address]) =>
              `<tr><td style="padding:2px 14px 2px 0;font-family:${SANS};font-size:12px;color:${C.onNavy}">${team}</td><td style="padding:2px 0;font-family:${SANS};font-size:12px"><a href="mailto:${address}" style="color:#FFFFFF;text-decoration:none">${address}</a></td></tr>`,
          )
          .join("")}
        <tr><td style="padding:2px 14px 2px 0;font-family:${SANS};font-size:12px;color:${C.onNavy}">Website</td><td style="padding:2px 0;font-family:${SANS};font-size:12px"><a href="${SITE_URL}" style="color:#FFFFFF;text-decoration:none">${h(siteHost())}</a></td></tr>
      </table>
    </td></tr>
    <tr><td style="background:${C.navyDeep};padding:16px 40px" class="adx-pad">
      <p style="margin:0;font-family:${SANS};font-size:11px;line-height:1.6;color:${C.onNavy}">${footnote}</p>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

function row(content: string, padding = "28px 40px 0") {
  return `<tr><td class="adx-pad" style="padding:${padding}">${content}</td></tr>`;
}

function eyebrow(label: string, color: string, background: string) {
  return `<span style="display:inline-block;padding:5px 10px;border-radius:999px;background:${background};font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:${color}">${h(label)}</span>`;
}

function heading(text: string) {
  return `<h1 style="margin:14px 0 0;font-family:${SERIF};font-size:26px;line-height:1.25;font-weight:normal;color:${C.ink}">${h(text)}</h1>`;
}

function paragraph(html: string, extra = "") {
  return `<p style="margin:0 0 14px;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.muted};${extra}">${html}</p>`;
}

function sectionTitle(text: string) {
  return `<p style="margin:0 0 10px;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:${C.soft}">${h(text)}</p>`;
}

function button(href: string, label: string, primary = true) {
  const style = primary
    ? `background:${C.gold};color:#1A1508;border:1px solid ${C.gold}`
    : `background:#FFFFFF;color:${C.navy};border:1px solid ${C.border}`;
  return `<a href="${h(href)}" style="display:inline-block;padding:11px 20px;border-radius:6px;${style};font-family:${SANS};font-size:14px;font-weight:600;text-decoration:none">${h(label)}</a>`;
}

function detailsTable(rows: { label: string; value: string }[]) {
  if (!rows.length) return "";
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
${rows
  .map(
    ({ label, value }, index) =>
      `<tr>
  <td class="adx-stack adx-label" valign="top" width="38%" style="padding:11px 16px 11px 0;${index ? `border-top:1px solid ${C.border};` : ""}font-family:${SANS};font-size:13px;line-height:1.5;color:${C.soft}">${h(label)}</td>
  <td class="adx-stack adx-value" valign="top" style="padding:11px 0;${index ? `border-top:1px solid ${C.border};` : ""}font-family:${SANS};font-size:14px;line-height:1.55;color:${C.ink};white-space:pre-wrap;word-break:break-word">${h(value)}</td>
</tr>`,
  )
  .join("\n")}
</table>`;
}

function filesList(files: Submission["files"]) {
  return files
    .map(
      (file) =>
        `<tr><td style="padding:8px 12px;border:1px solid ${C.border};border-radius:6px;font-family:${SANS};font-size:13px;color:${C.ink}">&#128206;&nbsp; ${h(file.name)} <span style="color:${C.soft}">· ${formatSize(file.size)}</span></td></tr><tr><td style="height:6px;font-size:0;line-height:6px">&nbsp;</td></tr>`,
    )
    .join("");
}

const KIND_LABEL: Record<FormKind, string> = {
  filing: "New filing",
  application: "New application",
  registration: "New registration",
  enquiry: "New enquiry",
  subscribe: "New subscriber",
};

// ── The Secretariat's copy ──────────────────────────────────────────────

export function secretariatEmail(s: Submission): RenderedMail {
  const firstName = s.name.split(/\s+/)[0];
  const message = s.answers.find((answer) => answer.key === "message");
  const details = s.answers.filter((answer) => answer.key !== "message");
  const replySubject = `Re: ${s.formName} [${s.reference}]`;
  const accent = s.urgent ? C.ember : C.gold;

  const contactRows = [
    s.organization && `<p style="margin:2px 0 0;font-family:${SANS};font-size:14px;color:${C.muted}">${h(s.organization)}</p>`,
    s.email && `<p style="margin:10px 0 0;font-family:${SANS};font-size:14px"><a href="mailto:${h(s.email)}" style="color:${C.goldInk}">${h(s.email)}</a></p>`,
    s.phone && `<p style="margin:4px 0 0;font-family:${SANS};font-size:14px"><a href="tel:${h(s.phone.replace(/[^\d+]/g, ""))}" style="color:${C.goldInk}">${h(s.phone)}</a></p>`,
  ]
    .filter(Boolean)
    .join("");

  const actions = [
    s.email && button(`mailto:${s.email}?subject=${encodeURIComponent(replySubject)}`, `Reply to ${firstName}`),
    s.phone && button(`tel:${s.phone.replace(/[^\d+]/g, "")}`, "Call", !s.email),
  ]
    .filter(Boolean)
    .join("&nbsp;&nbsp;");

  const body = [
    s.urgent
      ? row(
          `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:12px 16px;background:${C.emberTint};border:1px solid #F3C4CC;border-radius:6px;font-family:${SANS};font-size:14px;line-height:1.5;color:${C.ember}"><strong>Urgent.</strong> The applicant was told the Secretariat will contact them today.</td></tr></table>`,
        )
      : "",
    row(
      `${s.urgent ? eyebrow("Emergency", C.ember, C.emberTint) : eyebrow(KIND_LABEL[s.kind], C.goldInk, C.goldTint)}
${heading(s.formName)}
<p style="margin:10px 0 0;font-family:${SANS};font-size:13px;line-height:1.6;color:${C.soft}">Ref <strong style="color:${C.ink};font-family:Consolas,Menlo,monospace">${h(s.reference)}</strong> &nbsp;·&nbsp; ${formatDate(s.receivedAt)}${s.site ? ` &nbsp;·&nbsp; ${h(s.site)}` : ""}</p>`,
    ),
    row(
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:20px 22px;background:${C.ground};border-radius:8px">
${sectionTitle("From")}
<p style="margin:0;font-family:${SERIF};font-size:20px;color:${C.ink}">${h(s.name)}</p>
${contactRows}
${actions ? `<div style="margin-top:18px">${actions}</div>` : ""}
</td></tr></table>`,
    ),
    details.length ? row(`${sectionTitle("Details")}${detailsTable(details)}`, "30px 40px 0") : "",
    message
      ? row(
          `${sectionTitle(message.label)}<div style="padding:16px 18px;border:1px solid ${C.border};border-radius:6px;background:#FAFBFD;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.ink};white-space:pre-wrap;word-break:break-word">${h(message.value)}</div>`,
          "28px 40px 0",
        )
      : "",
    s.files.length
      ? row(
          `${sectionTitle(`Attached · ${s.files.length} document${s.files.length === 1 ? "" : "s"}`)}<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${filesList(s.files)}</table>`,
          "28px 40px 0",
        )
      : "",
    row(
      paragraph(
        s.email
          ? `Replying to this email goes straight to ${h(firstName)}. They have been sent an acknowledgement quoting <strong>${h(s.reference)}</strong>.`
          : `No email address was given, so no acknowledgement was sent. Please call ${h(firstName)} on the number above.`,
        `font-size:13px;color:${C.soft};margin:0`,
      ),
      "26px 40px 34px",
    ),
  ].join("\n");

  const text = [
    s.urgent ? "URGENT — the applicant was told the Secretariat will contact them today.\n" : "",
    `${s.formName}`,
    `Ref ${s.reference} · ${formatDate(s.receivedAt)}${s.site ? ` · ${s.site}` : ""}`,
    "",
    "FROM",
    s.name,
    s.organization,
    s.email,
    s.phone,
    "",
    details.length ? "DETAILS" : "",
    ...details.map((answer) => `${answer.label}: ${answer.value}`),
    message ? `\n${message.label.toUpperCase()}\n${message.value}` : "",
    s.files.length ? `\nATTACHED\n${s.files.map((file) => `- ${file.name} (${formatSize(file.size)})`).join("\n")}` : "",
  ]
    .filter((line, index, all) => line !== "" || all[index - 1] !== "")
    .join("\n");

  return {
    subject: `${s.urgent ? "URGENT · " : ""}${s.formName} — ${s.name} [${s.reference}]`,
    html: layout({
      preheader: `${s.name}${s.organization ? `, ${s.organization}` : ""} · ${s.reference}`,
      accent,
      body,
      footnote: `Sent by the website form on ${h(s.site ?? siteHost())}. Contains personal data submitted by the sender: please handle it confidentially.`,
    }),
    text,
  };
}

// ── The visitor's acknowledgement ───────────────────────────────────────

// The acknowledgement goes to whatever address was typed into the form, so it
// repeats only short, structured answers: never the free-text message, and
// nothing long enough to carry someone else's sales pitch.
const ECHO_LIMIT = 140;

export function acknowledgementEmail(
  s: Submission,
  copy: { successTitle: string; successBody: string },
): RenderedMail {
  const name = s.name.slice(0, 60);
  const echoed = s.answers.filter((answer) => answer.key !== "message" && answer.value.length <= ECHO_LIMIT);
  const sentMessage = s.answers.some((answer) => answer.key === "message");
  const extras = [
    sentMessage ? "your message" : "",
    s.files.length ? `${s.files.length} document${s.files.length === 1 ? "" : "s"}` : "",
  ].filter(Boolean);
  const accent = s.urgent ? C.ember : C.gold;

  const body = [
    row(
      `${eyebrow("Acknowledgement", C.goldInk, C.goldTint)}
${heading(copy.successTitle)}`,
      "30px 40px 0",
    ),
    row(
      `${paragraph(`Dear ${h(name)},`)}
${paragraph(h(copy.successBody))}`,
      "20px 40px 0",
    ),
    row(
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="padding:22px 20px;background:${C.navy};border-radius:8px">
<p style="margin:0;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${C.gold}">Your reference</p>
<p style="margin:8px 0 0;font-family:Consolas,Menlo,monospace;font-size:24px;letter-spacing:2px;color:#FFFFFF">${h(s.reference)}</p>
<p style="margin:8px 0 0;font-family:${SANS};font-size:12px;color:${C.onNavy}">Please quote it whenever you write to us about this.</p>
</td></tr></table>`,
      "10px 40px 0",
    ),
    row(
      `${sectionTitle(`What you sent · ${s.formName}`)}
${detailsTable([
  ...echoed,
  ...(s.organization ? [{ label: s.organizationLabel, value: s.organization }] : []),
  ...(s.email ? [{ label: "Email", value: s.email }] : []),
  ...(s.phone ? [{ label: "Phone", value: s.phone }] : []),
  { label: "Received", value: formatDate(s.receivedAt) },
])}
${extras.length ? `<p style="margin:12px 0 0;font-family:${SANS};font-size:13px;color:${C.soft}">We also received ${extras.join(" and ")}.</p>` : ""}`,
      "30px 40px 0",
    ),
    row(
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:16px 18px;background:${C.ground};border-radius:6px">
<p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.6;color:${C.muted}"><strong style="color:${C.ink}">Something to add or correct?</strong> Just reply to this email. It reaches our team directly.${
        s.urgent
          ? ` If the matter becomes critical before we reach you, write to <a href="mailto:director@adjudixADR.com" style="color:${C.ember}">director@adjudixADR.com</a>.`
          : ""
      }</p>
</td></tr></table>`,
      "28px 40px 0",
    ),
    row(
      `${paragraph("Warm regards,", "margin:0")}
<p style="margin:4px 0 0;font-family:${SERIF};font-size:17px;color:${C.ink}">The Secretariat</p>
<p style="margin:2px 0 0;font-family:${SANS};font-size:13px;color:${C.soft}">${h(ORG)}</p>
<div style="margin-top:22px">${button(SITE_URL, `Visit ${siteHost()}`, false)}</div>`,
      "28px 40px 36px",
    ),
  ].join("\n");

  const text = [
    copy.successTitle,
    "",
    `Dear ${name},`,
    "",
    copy.successBody,
    "",
    `Your reference: ${s.reference}`,
    "Please quote it whenever you write to us about this.",
    "",
    `WHAT YOU SENT · ${s.formName}`,
    ...echoed.map((answer) => `${answer.label}: ${answer.value}`),
    `Received: ${formatDate(s.receivedAt)}`,
    extras.length ? `We also received ${extras.join(" and ")}.` : "",
    "",
    "Something to add or correct? Just reply to this email.",
    "",
    "Warm regards,",
    "The Secretariat",
    ORG,
    SITE_URL,
  ].join("\n");

  return {
    subject: `${copy.successTitle} · Ref ${s.reference}`,
    html: layout({
      preheader: `Your reference is ${s.reference}. ${copy.successBody.replace(/^Thank you — /, "")}`,
      accent,
      body,
      footnote: `You are receiving this because this address was entered on a form at ${h(s.site ?? siteHost())}. If that wasn't you, please ignore this email. Nothing further will be sent.`,
    }),
    text,
  };
}
