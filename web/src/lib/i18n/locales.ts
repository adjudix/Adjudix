// The languages the site is translated into (client, Oct 2026). English is
// the source; every other language is a dictionary in public/i18n, applied
// in the browser by components/i18n/translator.tsx.

export const LOCALE_COOKIE = "adx-lang";

export interface Locale {
  code: string;
  // In its own script, as shown in the language menu.
  label: string;
  english: string;
  dir: "ltr" | "rtl";
}

export const SOURCE_LOCALE: Locale = { code: "en", label: "English", english: "English", dir: "ltr" };

// Order matters: the first four sit on the top bar, the rest under "More".
export const LOCALES: Locale[] = [
  { code: "fr", label: "Français", english: "French", dir: "ltr" },
  { code: "de", label: "Deutsch", english: "German", dir: "ltr" },
  { code: "es", label: "Español", english: "Spanish", dir: "ltr" },
  // Kept left-to-right so the layout stays as designed (client, Oct 2026).
  { code: "ar", label: "العربية", english: "Arabic", dir: "ltr" },
  { code: "hi", label: "हिन्दी", english: "Hindi", dir: "ltr" },
  { code: "zh", label: "中文", english: "Chinese", dir: "ltr" },
  { code: "ja", label: "日本語", english: "Japanese", dir: "ltr" },
  { code: "ru", label: "Русский", english: "Russian", dir: "ltr" },
  { code: "pt", label: "Português", english: "Portuguese", dir: "ltr" },
];

export const TOP_BAR_COUNT = 4;

const BY_CODE = new Map([SOURCE_LOCALE, ...LOCALES].map((locale) => [locale.code, locale]));

/** The supported locale for a code ("zh-CN" → zh), or undefined. */
export function findLocale(code: string | undefined | null) {
  if (!code) return undefined;
  const lower = code.trim().toLowerCase();
  return BY_CODE.get(lower) ?? BY_CODE.get(lower.split("-")[0]);
}

// Visitors are shown the language of the country they browse from (Vercel's
// x-vercel-ip-country). India, and anywhere not listed, stays in English;
// Hindi is never chosen automatically, only from the menu.
const COUNTRY_LOCALE: Record<string, string> = {
  // French
  FR: "fr", BE: "fr", LU: "fr", MC: "fr", SN: "fr", CI: "fr", CM: "fr", ML: "fr", BF: "fr", NE: "fr",
  TG: "fr", BJ: "fr", GA: "fr", CG: "fr", CD: "fr", MG: "fr", HT: "fr", GN: "fr", TD: "fr", CF: "fr",
  // German
  DE: "de", AT: "de", CH: "de", LI: "de",
  // Spanish
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es", EC: "es", GT: "es", CU: "es",
  BO: "es", DO: "es", HN: "es", PY: "es", SV: "es", NI: "es", CR: "es", PA: "es", UY: "es", PR: "es",
  // Arabic
  AE: "ar", SA: "ar", QA: "ar", KW: "ar", BH: "ar", OM: "ar", EG: "ar", JO: "ar", LB: "ar", IQ: "ar",
  SY: "ar", YE: "ar", LY: "ar", TN: "ar", DZ: "ar", MA: "ar", SD: "ar", PS: "ar", MR: "ar",
  // Chinese, Japanese, Russian, Portuguese
  CN: "zh", TW: "zh", HK: "zh", MO: "zh", SG: "zh",
  JP: "ja",
  RU: "ru", BY: "ru", KZ: "ru", KG: "ru",
  BR: "pt", PT: "pt", AO: "pt", MZ: "pt", CV: "pt", GW: "pt", ST: "pt", TL: "pt",
};

export function localeForCountry(country: string | null | undefined) {
  return (country && COUNTRY_LOCALE[country.toUpperCase()]) || SOURCE_LOCALE.code;
}

// Extra web fonts for scripts the brand fonts don't cover. The brand font
// stays first in each stack, so Latin text (names, emails) keeps its look and
// only the other script falls through to Noto.
export const LOCALE_FONTS: Record<string, { heading: string; body: string; families: string[] }> = {
  ar: { heading: "Noto Naskh Arabic", body: "Noto Sans Arabic", families: ["Noto+Naskh+Arabic:wght@400;500;600;700", "Noto+Sans+Arabic:wght@400;500;600;700"] },
  hi: { heading: "Noto Serif Devanagari", body: "Noto Sans Devanagari", families: ["Noto+Serif+Devanagari:wght@400;500;600;700", "Noto+Sans+Devanagari:wght@400;500;600;700"] },
  zh: { heading: "Noto Serif SC", body: "Noto Sans SC", families: ["Noto+Serif+SC:wght@400;500;600;700", "Noto+Sans+SC:wght@400;500;600;700"] },
  ja: { heading: "Noto Serif JP", body: "Noto Sans JP", families: ["Noto+Serif+JP:wght@400;500;600;700", "Noto+Sans+JP:wght@400;500;600;700"] },
  // Newsreader has no Cyrillic; IBM Plex Sans does.
  ru: { heading: "Noto Serif", body: "IBM Plex Sans", families: ["Noto+Serif:wght@400;500;600;700"] },
};
