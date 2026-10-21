// Collects every translatable string on the site into src/i18n/source/.
//
//   npm run build && I18N_SERVER=http://localhost:3000 npm run i18n:extract
//
// Reads the pre-rendered HTML in .next/server/app, splits it into units with
// the same code the browser translator uses (src/lib/i18n/segment.ts), adds
// strings only seen in the browser (src/i18n/client-strings.json, gathered in
// development, see components/i18n/translator.tsx), and writes the keys in
// parts of about PART_WORDS words for translating. Then `npm run i18n:status`
// lists what each language is still missing.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";
import { collectAttributes, collectUnits, plainKey } from "../../src/lib/i18n/segment";

const ROOT = path.join(process.cwd(), ".next/server/app");
const OUT = path.join(process.cwd(), "src/i18n/source");
const CLIENT = path.join(process.cwd(), "src/i18n/client-strings.json");
const PART_WORDS = 3500;

function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === "console" ? [] : htmlFiles(full);
    return entry.name.endsWith(".html") ? [full] : [];
  });
}

// key → the first page it appeared on (context for translators).
const keys = new Map<string, string>();
const add = (key: string, page: string) => {
  // Structured data (JSON-LD) can surface as text; it's for search engines, not readers.
  if (key.startsWith('{"@context"')) return;
  if (key && !keys.has(key)) keys.set(key, page);
};

function addPage(html: string, page: string) {
  const { document } = new JSDOM(html).window;
  if (document.title) add(plainKey(document.title).key, page);
  for (const unit of collectUnits(document.body)) add(unit.key, page);
  for (const { value } of collectAttributes(document.body)) add(plainKey(value).key, page);
}

const files = htmlFiles(ROOT).sort();
const seen = new Set<string>();
for (const file of files) {
  const page = "/" + path.relative(ROOT, file).replace(/\\/g, "/").replace(/(index)?\.html$/, "");
  if (page.startsWith("/_")) continue;
  seen.add(page.replace(/\/$/, "") || "/");
  addPage(readFileSync(file, "utf8"), page);
}

// Pages rendered on request (e.g. /contact) have no HTML in the build. With
// I18N_SERVER set to a running copy of the site (I18N_SERVER=http://localhost:3000),
// every page in its sitemap that the build didn't cover is fetched from it.
async function main() {
  const server = process.env.I18N_SERVER?.replace(/\/$/, "");
  let fetched = 0;
  if (server) {
    const sitemap = await (await fetch(`${server}/sitemap.xml`)).text();
    const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname.replace(/\/$/, "") || "/");
    for (const page of new Set(pages)) {
      if (seen.has(page)) continue;
      const response = await fetch(server + page, { headers: { cookie: "adx-lang=en" } });
      if (!response.ok) continue;
      addPage(await response.text(), page);
      fetched++;
    }
  }

  if (existsSync(CLIENT)) {
    for (const key of JSON.parse(readFileSync(CLIENT, "utf8")) as string[]) add(key, "(browser)");
  }

  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });
  let part: Record<string, string> = {};
  let words = 0;
  let count = 0;
  const flush = () => {
    if (!Object.keys(part).length) return;
    count++;
    writeFileSync(path.join(OUT, `part-${String(count).padStart(2, "0")}.json`), JSON.stringify(part, null, 1) + "\n");
    part = {};
    words = 0;
  };
  for (const [key, page] of keys) {
    part[key] = page;
    words += key.split(/\s+/).length;
    if (words >= PART_WORDS) flush();
  }
  flush();

  const total = [...keys.keys()].reduce((sum, key) => sum + key.split(/\s+/).length, 0);
  console.log(`${files.length} built + ${fetched} fetched pages → ${keys.size} strings, ${total} words, ${count} parts in src/i18n/source/`);
}

main();
