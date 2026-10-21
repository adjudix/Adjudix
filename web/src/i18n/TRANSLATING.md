# Translating the site

The English site is the source. `npm run i18n:extract` (after `npm run build`) collects every string into `src/i18n/source/part-NN.json` as `{ "English key": "page it first appears on" }`. Translations go in `src/i18n/translations/<lang>/part-NN.json` as `{ "English key": "translation" }`, with the same keys. `npm run i18n:compile` checks them and writes `public/i18n/<lang>.json`, which the browser loads.

Languages: fr, de, es, ar, hi, zh (Simplified), ja, ru, pt.

## Rules for every translation

1. **Keep the markers exactly.**
   - `<1>…</1>`, `<2>…</2>` mark bold text or a link inside the sentence. Keep every tag, with the same number, wrapped around the words that correspond to it. Keep the tags in the same order as the English whenever the language allows it.
   - `{0}`, `{1}` stand for numbers such as years, amounts or counts. Keep each one exactly once. Don't write the number yourself.
   - A translation whose markers don't match the key is dropped, and the page shows English in that spot.
2. **Don't translate:**
   - Adjudix and the institute's name in the logo
   - people's names, which stay in Latin script
   - email addresses, URLs and phone numbers
   - membership codes (H-001/26) and post-nominals (HADR-i, FADR-i, AADR-i, AfADR-i, SADR-i)
   - "ADR-i"
   - ₹ amounts, "/-" and "Ctrl K"
3. **Indian statutes keep their official English titles,** e.g. "Arbitration and Conciliation Act, 1996", "Mediation Act, 2023", "Commercial Courts Act, 2015". In Arabic, Hindi, Chinese, Japanese and Russian, give the title in English and, the first time it appears in a string, follow it with a short translation in parentheses. Section numbers stay as they are.
4. **Terms of art:**
   - Translate "Lok Adalat" by meaning only where needed, and keep "Lok Adalat" itself.
   - Med-Arb, Arb-Med and ODR stay as they are.
   - "Adjudix Code of ADR Procedure" is a title: translate it consistently, e.g. FR "Code de procédure ADR d'Adjudix".
   - Arbitrator, mediator, conciliator, neutral and award must be the standard legal terms of the language, used the same way everywhere. Keep a glossary in `_glossary.md` in your language folder, and stick to it.
5. **Register:** formal and professional, as a legal institution writes.
   - French: vous. German: Sie. Spanish: usted. Portuguese: Brazilian-neutral, formal.
   - Arabic: Modern Standard Arabic.
   - Chinese: Simplified.
   - Hindi: clear, modern standard Hindi as used by Indian courts and law firms. Use the established legal terms (माध्यस्थम्/मध्यस्थ for arbitration/arbitrator, मध्यस्थता for mediation, सुलह for conciliation, पंचाट for award). An English term in parentheses is fine once, where it helps readers.
6. **UI strings stay short.** A string of a few words is usually a button, menu item, tab or label. Keep it about as short as the English.
7. **Code text (Articles, Rules, Chapters):** translate faithfully and completely, not as a summary. Keep "Article 12", "Rule 3" and chapter numerals in the language's usual form, with their numbers.
8. Keep punctuation natural for the language: « » and the space before ; : ! ? in French, „ " in German, Chinese full-width punctuation.
9. The value must be a single JSON string. Escape `"` as `\"`. No line breaks inside a value.
