import { createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto";

// A self-contained image captcha for the portal forms (client markup, Oct
// 2026: "add random captcha"). The server draws a random code as a distorted
// SVG and hands back a signed token instead of remembering the answer, so it
// works across serverless instances with no storage. It deters casual bots;
// for determined ones, put Cloudflare Turnstile or similar in front instead.
//
// Signing key: CAPTCHA_SECRET (set it on the host). Falls back to the Brevo
// key, which is already configured wherever forms work, and in local
// development to a per-process key.

const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no 0/O, 1/I/L
const LENGTH = 5;
const TTL_MS = 10 * 60 * 1000;

const devKey = randomBytes(32).toString("hex");
function key() {
  return process.env.CAPTCHA_SECRET || process.env.BREVO_API_KEY || devKey;
}

function sign(payload: string) {
  return createHmac("sha256", key()).update(payload).digest("base64url");
}

const pick = <T,>(items: readonly T[]) => items[randomInt(items.length)];
const between = (min: number, max: number) => min + Math.random() * (max - min);

function drawSvg(code: string) {
  const width = 170;
  const height = 56;
  const ink = ["#14213d", "#3d2c1e", "#5b1a1a", "#1f3b2c"];
  const lines = Array.from({ length: 6 }, () => {
    const y1 = between(5, height - 5);
    const y2 = between(5, height - 5);
    return `<path d="M0 ${y1.toFixed(1)} Q${between(40, 130).toFixed(1)} ${between(0, height).toFixed(1)} ${width} ${y2.toFixed(1)}" stroke="${pick(ink)}" stroke-opacity="0.45" stroke-width="${between(1, 2).toFixed(1)}" fill="none"/>`;
  });
  const dots = Array.from(
    { length: 40 },
    () =>
      `<circle cx="${between(0, width).toFixed(1)}" cy="${between(0, height).toFixed(1)}" r="${between(0.6, 1.6).toFixed(1)}" fill="${pick(ink)}" fill-opacity="0.5"/>`,
  );
  const glyphs = [...code].map((char, i) => {
    const x = 18 + i * 29 + between(-4, 4);
    const y = 38 + between(-6, 6);
    return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" transform="rotate(${between(-28, 28).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}) skewX(${between(-12, 12).toFixed(1)})" font-family="Georgia, serif" font-size="${between(26, 34).toFixed(0)}" font-weight="700" fill="${pick(ink)}">${char}</text>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#f4efe4"/>${lines.slice(0, 3).join("")}${glyphs.join("")}${lines.slice(3).join("")}${dots.join("")}</svg>`;
}

/** A fresh captcha: the image to show and the token to send back with the answer. */
export function createCaptcha() {
  const code = Array.from({ length: LENGTH }, () => pick([...ALPHABET])).join("");
  const expires = Date.now() + TTL_MS;
  const nonce = randomBytes(8).toString("base64url");
  const token = `${expires}.${nonce}.${sign(`${expires}.${nonce}.${code}`)}`;
  return { svg: drawSvg(code), token };
}

/** Whether `answer` matches the captcha `token` was issued for, before it expired. */
export function verifyCaptcha(token: string, answer: string) {
  const [expires, nonce, signature] = token.split(".");
  if (!expires || !nonce || !signature || Number(expires) < Date.now()) return false;
  const expected = Buffer.from(sign(`${expires}.${nonce}.${answer.trim().toUpperCase()}`));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
