// Splits a rendered page into translation units and writes translations back
// into it. Shared by the browser translator (components/i18n/translator.tsx)
// and the extractor (scripts/i18n/extract.ts, run over the built HTML with
// jsdom), so both see exactly the same keys. DOM APIs only, no React.
//
// A unit is a run of text that reads as one phrase: a paragraph, a heading, a
// button label, including inline markup inside it. Its key is the English
// text with whitespace collapsed, inline elements as numbered tags and
// numbers as {n}:
//   <p>Fees from <strong>₹4,999</strong> per case</p>
//   → "Fees from <1>₹{0}</1> per case"
// Only text nodes are ever changed, never moved or removed, so React keeps
// ownership of every node and its later updates still land.

const INLINE = new Set([
  "A", "ABBR", "B", "BDI", "BDO", "CITE", "DFN", "EM", "I", "KBD", "LABEL", "MARK",
  "Q", "S", "SAMP", "SMALL", "SPAN", "STRONG", "SUB", "SUP", "TIME", "U", "VAR",
]);
// Inside a run these contribute no text and don't break it up.
const VOID = new Set(["BR", "WBR", "IMG", "SVG", "svg", "PICTURE", "VIDEO", "INPUT", "SELECT"]);
const SKIP = new Set([
  "SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "TEXTAREA", "CODE", "PRE", "SVG", "svg", "MATH", "IFRAME", "CANVAS",
]);
export const ATTRIBUTES = ["placeholder", "title", "aria-label", "alt"] as const;

const LETTER = /\p{L}/u;
// Numbers become {n} slots; tags (<1>, </1>) are matched first and kept.
const NUMBER = /<\/?\d+>|\d+(?:[.,:/]\d+)*/g;

function slotNumbers(text: string) {
  const numbers: string[] = [];
  const key = text.replace(NUMBER, (match) => (match.startsWith("<") ? match : `{${numbers.push(match) - 1}}`));
  return { key, numbers };
}

export interface TextUnit {
  key: string;
  // The text nodes of the unit, each with the tag it sits in (0 = none).
  parts: { node: Text; tag: number }[];
  numbers: string[];
}

function skipped(el: Element) {
  return (
    SKIP.has(el.tagName) ||
    el.getAttribute("translate") === "no" ||
    el.hasAttribute("data-no-translate") ||
    el.classList.contains("notranslate")
  );
}

// Text, inline elements, and void elements only, all the way down.
function inlineOnly(el: Element): boolean {
  for (const child of Array.from(el.childNodes)) {
    if (child.nodeType === 3) continue;
    if (child.nodeType !== 1) continue;
    const element = child as Element;
    if (VOID.has(element.tagName) || skipped(element)) continue;
    if (!INLINE.has(element.tagName) || !inlineOnly(element)) return false;
  }
  return true;
}

function isRunNode(node: Node) {
  if (node.nodeType === 3) return true;
  if (node.nodeType !== 1) return false;
  const el = node as Element;
  if (VOID.has(el.tagName)) return true;
  if (skipped(el)) return false;
  return INLINE.has(el.tagName) && inlineOnly(el);
}

export const collapse = (text: string) => text.replace(/\s+/g, " ");

/** The source text a node held before we translated it (see Applied). */
export type SourceOf = (node: Text) => string;
const asIs: SourceOf = (node) => node.nodeValue ?? "";

// One unit from a run of sibling nodes.
function buildUnit(nodes: Node[], sourceOf: SourceOf): TextUnit | null {
  const parts: TextUnit["parts"] = [];
  const tags = new Map<Element, number>();
  const walk = (node: Node, tag: number) => {
    if (node.nodeType === 3) {
      parts.push({ node: node as Text, tag });
      return;
    }
    if (node.nodeType !== 1) return;
    const el = node as Element;
    if (VOID.has(el.tagName) || skipped(el)) return;
    let own = tags.get(el);
    if (own === undefined) {
      own = tags.size + 1;
      tags.set(el, own);
    }
    el.childNodes.forEach((child) => walk(child, own!));
  };
  nodes.forEach((node) => walk(node, 0));

  // Key: consecutive parts in the same tag merge into one span.
  let raw = "";
  let open = 0;
  for (const part of parts) {
    if (part.tag !== open) {
      if (open) raw += `</${open}>`;
      if (part.tag) raw += `<${part.tag}>`;
      open = part.tag;
    }
    raw += sourceOf(part.node);
  }
  if (open) raw += `</${open}>`;
  // Tags that ended up empty (whitespace only) don't need translating.
  raw = collapse(raw).replace(/<(\d+)>\s*<\/\1>/g, " ").trim();
  raw = collapse(raw);
  if (!LETTER.test(raw.replace(/<\/?\d+>/g, ""))) return null;
  const { key, numbers } = slotNumbers(raw);
  return { key, parts, numbers };
}

/** Every translation unit under `root`, in document order. */
export function collectUnits(root: Element, sourceOf: SourceOf = asIs): TextUnit[] {
  const units: TextUnit[] = [];
  // A run with no words of its own between its elements — a row of links, a
  // label in a span — is really separate phrases: each element on its own.
  const fromRun = (run: Node[]) => {
    const ownText = run.some((node) => node.nodeType === 3 && LETTER.test(node.nodeValue ?? ""));
    const elements = run.filter(
      (node): node is Element => node.nodeType === 1 && !VOID.has((node as Element).tagName) && LETTER.test(node.textContent ?? ""),
    );
    if (!ownText && elements.length > 0) {
      elements.forEach((el) => fromRun(Array.from(el.childNodes)));
      return;
    }
    const unit = buildUnit(run, sourceOf);
    if (unit) units.push(unit);
  };
  const visit = (el: Element) => {
    if (skipped(el)) return;
    if (inlineOnly(el)) {
      fromRun(Array.from(el.childNodes));
      return;
    }
    let run: Node[] = [];
    const flush = () => {
      if (run.length) fromRun(run);
      run = [];
    };
    for (const child of Array.from(el.childNodes)) {
      if (isRunNode(child)) {
        run.push(child);
      } else {
        flush();
        if (child.nodeType === 1) visit(child as Element);
      }
    }
    flush();
  };
  visit(root);
  return units;
}

/** Elements under `root` (itself included) with translatable attributes. */
export function collectAttributes(root: Element) {
  const found: { el: Element; name: string; value: string }[] = [];
  const check = (el: Element) => {
    if (el.closest("[data-no-translate],[translate=no],.notranslate")) return;
    for (const name of ATTRIBUTES) {
      const value = el.getAttribute(name);
      if (value && LETTER.test(value)) found.push({ el, name, value });
    }
  };
  check(root);
  root.querySelectorAll(ATTRIBUTES.map((name) => `[${name}]`).join(",")).forEach(check);
  return found;
}

/** The key for a plain string (attributes, the page title). */
export function plainKey(text: string) {
  return slotNumbers(collapse(text).trim());
}

export function fillNumbers(text: string, numbers: string[]) {
  return text.replace(/\{(\d+)\}/g, (match, i) => numbers[Number(i)] ?? match);
}

// "Bonjour <1>monde</1>, plus" → [[0,"Bonjour "],[1,"monde"],[0,", plus"]]
function parseRuns(text: string) {
  const runs: [number, string][] = [];
  const pattern = /<(\d+)>([\s\S]*?)<\/\1>/g;
  let last = 0;
  for (let match = pattern.exec(text); match; match = pattern.exec(text)) {
    if (match.index > last) runs.push([0, text.slice(last, match.index)]);
    runs.push([Number(match[1]), match[2]]);
    last = match.index + match[0].length;
  }
  if (last < text.length) runs.push([0, text.slice(last)]);
  return runs;
}

/**
 * Writes `translation` into the unit's text nodes through `write`. Each span
 * of the translation goes to the matching tag's first text node, in order;
 * if the structure doesn't line up, the whole text goes to the first node.
 */
export function applyUnit(unit: TextUnit, translation: string, write: (node: Text, value: string) => void) {
  const text = fillNumbers(translation, unit.numbers);
  // Slots: consecutive parts that share a tag.
  const slots: { tag: number; nodes: Text[] }[] = [];
  for (const part of unit.parts) {
    const slot = slots.at(-1);
    if (slot && slot.tag === part.tag) slot.nodes.push(part.node);
    else slots.push({ tag: part.tag, nodes: [part.node] });
  }
  const values = new Map<Text, string>(unit.parts.map((part) => [part.node, ""]));
  // Keep the outer spacing the page had, so words don't run into neighbours.
  const first = unit.parts[0].node;
  const last = unit.parts.at(-1)!.node;
  const lead = /^\s/.test(first.nodeValue ?? "") ? " " : "";
  const trail = /\s$/.test(last.nodeValue ?? "") ? " " : "";

  let pointer = 0;
  let previous: Text | null = null;
  let pending = "";
  let ok = true;
  for (const [tag, value] of parseRuns(text)) {
    let index = pointer;
    while (index < slots.length && slots[index].tag !== tag) index++;
    if (index === slots.length) {
      if (tag !== 0) {
        ok = false;
        break;
      }
      // Plain text with no plain slot here: attach it to a neighbour.
      if (previous) values.set(previous, values.get(previous) + value);
      else pending += value;
      continue;
    }
    const node = slots[index].nodes[0];
    values.set(node, pending + values.get(node) + value);
    pending = "";
    previous = node;
    pointer = index + 1;
  }
  if (!ok) {
    values.forEach((_, node) => values.set(node, ""));
    values.set(first, text.replace(/<\/?\d+>/g, ""));
  }
  values.set(first, lead + values.get(first)!.trimStart());
  values.set(last, values.get(last)!.trimEnd() + trail);
  values.forEach((value, node) => write(node, value));
}
