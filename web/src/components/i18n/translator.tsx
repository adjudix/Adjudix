"use client";

import { useEffect } from "react";
import { applyUnit, collectAttributes, collectUnits, fillNumbers, plainKey, type TextUnit } from "@/lib/i18n/segment";

// Shows the page in the visitor's language. The page is always rendered in
// English; this swaps the words in place from the dictionary in
// public/i18n/<lang>.json, so every font, colour and layout stays exactly
// as designed. It runs after React hydrates and keeps watching, so menus,
// pop-ups, forms and client-side navigation are translated as they appear.
// The language is chosen by the inline script in LocaleScript (cookie, set
// by the proxy from the visitor's country or by the language menu).

type Dictionary = Record<string, string>;

// What a text node or attribute held in English, and what we wrote into it.
// When React later writes new English text, the value no longer matches what
// we wrote, and the new text becomes the source.
const nodeSource = new WeakMap<Text, { source: string; written: string }>();
const attrSource = new WeakMap<Element, Map<string, { source: string; written: string }>>();
let titleSource: { source: string; written: string } | null = null;

function sourceOf(node: Text) {
  const entry = nodeSource.get(node);
  const value = node.nodeValue ?? "";
  return entry && entry.written === value ? entry.source : value;
}

function translateTree(root: Element, dictionary: Dictionary, missing: Set<string>) {
  const units: TextUnit[] = collectUnits(root, sourceOf);
  for (const unit of units) {
    // Remember every node's English before writing anything.
    const sources = unit.parts.map((part) => sourceOf(part.node));
    const translation = dictionary[unit.key];
    if (translation === undefined) {
      missing.add(unit.key);
      continue;
    }
    unit.parts.forEach((part, i) => nodeSource.set(part.node, { source: sources[i], written: sources[i] }));
    applyUnit(unit, translation, (node, value) => {
      const entry = nodeSource.get(node)!;
      entry.written = value;
      if (node.nodeValue !== value) node.nodeValue = value;
    });
  }
  for (const { el, name, value } of collectAttributes(root)) {
    let entries = attrSource.get(el);
    if (!entries) attrSource.set(el, (entries = new Map()));
    const entry = entries.get(name);
    const source = entry && entry.written === value ? entry.source : value;
    const { key, numbers } = plainKey(source);
    const translation = dictionary[key];
    if (translation === undefined) {
      missing.add(key);
      continue;
    }
    const written = fillNumbers(translation, numbers);
    entries.set(name, { source, written });
    if (value !== written) el.setAttribute(name, written);
  }
}

function translateTitle(dictionary: Dictionary, missing: Set<string>) {
  const current = document.title;
  const source = titleSource && titleSource.written === current ? titleSource.source : current;
  const { key, numbers } = plainKey(source);
  const translation = dictionary[key];
  if (translation === undefined) {
    if (key) missing.add(key);
    return;
  }
  const written = fillNumbers(translation, numbers);
  titleSource = { source, written };
  if (current !== written) document.title = written;
}

// In development, strings with no translation are reported to the dev
// server, which adds them to src/i18n/client-strings.json for the next
// `npm run i18n:extract`.
function reportMissing(missing: Set<string>) {
  if (process.env.NODE_ENV !== "development" || missing.size === 0) return;
  fetch("/api/i18n/missing", { method: "POST", body: JSON.stringify([...missing]) }).catch(() => {});
}

export function Translator() {
  useEffect(() => {
    const locale = document.documentElement.dataset.locale;
    if (!locale || locale === "en") return;
    let observer: MutationObserver | null = null;
    let cancelled = false;
    const reveal = () => document.documentElement.removeAttribute("data-i18n-pending");

    fetch(`/i18n/${locale}.json`)
      .then((response) => (response.ok ? (response.json() as Promise<Dictionary>) : {}))
      .then((dictionary) => {
        if (cancelled) return;
        const missing = new Set<string>();
        translateTree(document.body, dictionary, missing);
        translateTitle(dictionary, missing);
        reveal();
        reportMissing(missing);

        // Re-translate whatever React adds or changes, a frame later, in one batch.
        const dirty = new Set<Element>();
        let scheduled = false;
        const flush = () => {
          scheduled = false;
          observer?.disconnect();
          const batch = new Set<string>();
          for (const el of dirty) {
            if (!el.isConnected || el.closest("[data-no-translate],[translate=no],.notranslate")) continue;
            // Translate from the nearest block, so a changed word is read with its sentence.
            const block = el.closest("p,li,h1,h2,h3,h4,h5,h6,td,th,dt,dd,button,label,option,figcaption,blockquote,div,section,nav") ?? el;
            translateTree(block, dictionary, batch);
          }
          dirty.clear();
          translateTitle(dictionary, batch);
          reportMissing(batch);
          observe();
        };
        const observe = () =>
          observer?.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "title", "aria-label", "alt"] });
        observer = new MutationObserver((records) => {
          for (const record of records) {
            const target = record.target.nodeType === 3 ? record.target.parentElement : (record.target as Element);
            if (target) dirty.add(target);
          }
          if (!scheduled) {
            scheduled = true;
            requestAnimationFrame(flush);
          }
        });
        observe();
        // The title changes on client-side navigation without touching <body>.
        const head = document.querySelector("head > title");
        if (head) new MutationObserver(() => translateTitle(dictionary, new Set())).observe(head, { childList: true, characterData: true, subtree: true });
      })
      .catch(reveal);

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, []);
  return null;
}
