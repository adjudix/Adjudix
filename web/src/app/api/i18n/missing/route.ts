import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

// Development only: the Translator reports strings it has no translation for
// (menus, pop-ups, form messages that aren't in the pre-rendered HTML). They
// are kept in src/i18n/client-strings.json, which `npm run i18n:extract` adds
// to the strings to translate. In production this route doesn't exist.
const FILE = path.join(process.cwd(), "src/i18n/client-strings.json");

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") return new Response(null, { status: 404 });
  const reported = (await request.json().catch(() => [])) as unknown;
  if (!Array.isArray(reported)) return new Response(null, { status: 400 });
  const known = new Set<string>(existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf8")) : []);
  const before = known.size;
  for (const key of reported) if (typeof key === "string" && key.length < 5000) known.add(key);
  if (known.size !== before) writeFileSync(FILE, JSON.stringify([...known].sort(), null, 1) + "\n");
  return new Response(null, { status: 204 });
}
