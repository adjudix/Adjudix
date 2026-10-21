import { LOCALE_COOKIE, LOCALE_FONTS, LOCALES } from "@/lib/i18n/locales";

// Runs as the page starts to parse, before anything paints: reads the
// language cookie, sets <html lang dir>, loads the extra fonts that script
// needs, and hides the page until the Translator has swapped the words in
// (at most 3 s), so visitors never see the English flash first.
const config = {
  cookie: LOCALE_COOKIE,
  dir: Object.fromEntries(LOCALES.map((locale) => [locale.code, locale.dir])),
  fonts: Object.fromEntries(Object.entries(LOCALE_FONTS).map(([code, font]) => [code, font.families.join("&family=")])),
};

const source = `(function(c){try{
var m=document.cookie.match(new RegExp("(?:^|; )"+c.cookie+"=([^;]+)"));
var l=m&&decodeURIComponent(m[1]);
if(!l||!c.dir[l])return;
var h=document.documentElement;
h.lang=l;h.dir=c.dir[l];h.setAttribute("data-locale",l);h.setAttribute("data-i18n-pending","");
setTimeout(function(){h.removeAttribute("data-i18n-pending")},3000);
if(c.fonts[l]){var f=document.createElement("link");f.rel="stylesheet";f.href="https://fonts.googleapis.com/css2?family="+c.fonts[l]+"&display=swap";document.head.appendChild(f)}
}catch(e){}})(${JSON.stringify(config)})`;

export function LocaleScript() {
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}
