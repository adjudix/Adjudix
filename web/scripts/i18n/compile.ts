// Checks the translations and writes the dictionaries the browser loads.
//
//   npm run i18n:compile            write public/i18n/<lang>.json
//   npm run i18n:status             report only; exit 1 if anything is wrong
//
// Translations live in src/i18n/translations/<lang>/*.json as
// { "English key": "translation" }. A translation must keep the key's
// numbered tags (<1>…</1>) and number slots ({0}); one that doesn't is left
// out, so the page shows English there rather than broken markup.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { LOCALES } from "../../src/lib/i18n/locales";

const SOURCE = path.join(process.cwd(), "src/i18n/source");
const TRANSLATIONS = path.join(process.cwd(), "src/i18n/translations");
const PUBLIC = path.join(process.cwd(), "public/i18n");
const reportOnly = process.argv.includes("--status");

const readParts = (dir: string): Record<string, string> =>
  existsSync(dir)
    ? Object.assign({}, ...readdirSync(dir).filter((f) => f.endsWith(".json")).sort().map((f) => JSON.parse(readFileSync(path.join(dir, f), "utf8"))))
    : {};

const source = Object.keys(readParts(SOURCE));
const markers = (text: string) => [...text.matchAll(/<\/?\d+>|\{\d+\}/g)].map((m) => m[0]).sort().join(" ");

let problems = 0;
mkdirSync(PUBLIC, { recursive: true });
for (const locale of LOCALES) {
  const translations = readParts(path.join(TRANSLATIONS, locale.code));
  const dictionary: Record<string, string> = {};
  const broken: string[] = [];
  for (const [key, value] of Object.entries(translations)) {
    if (typeof value !== "string" || !value.trim()) continue;
    if (markers(key) !== markers(value)) {
      broken.push(key);
      continue;
    }
    dictionary[key] = value;
  }
  const missing = source.filter((key) => !(key in dictionary));
  const covered = source.length - missing.length;
  console.log(
    `${locale.code}: ${covered}/${source.length} strings` +
      (missing.length ? `, ${missing.length} missing` : "") +
      (broken.length ? `, ${broken.length} with broken tags` : ""),
  );
  for (const key of broken.slice(0, 5)) console.log(`   broken: ${key.slice(0, 90)}`);
  problems += broken.length;
  if (!reportOnly) writeFileSync(path.join(PUBLIC, `${locale.code}.json`), JSON.stringify(dictionary));
}
if (reportOnly && problems) process.exit(1);
