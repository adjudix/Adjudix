import type { FormSection, QueryField } from "@/components/patterns/query-form";
import type { FormConfig } from "@/lib/forms/config";

// The form builder's view of a form: every field it asks for, built-in or
// not, placed in exactly one section — the same placement QueryForm uses.

export const BUILT_IN_LABELS: Record<string, string> = {
  name: "Full name",
  organization: "Organisation",
  email: "Email",
  phone: "Phone",
  message: "Message",
  attachments: "Documents",
};

/** Every field the form asks for, in QueryForm's default order. */
export function presentNames(form: FormConfig) {
  return [
    "name",
    ...(form.organization === "hidden" ? [] : ["organization"]),
    "email",
    ...(form.contact === "email" ? [] : ["phone"]),
    ...form.fields.map((field) => field.name),
    ...(form.noMessage ? [] : ["message"]),
    ...(form.attachmentsLabel ? ["attachments"] : []),
  ];
}

/** Sections with every present field placed once; unplaced fields join the last. */
export function layoutOf(form: FormConfig): FormSection[] {
  const present = presentNames(form);
  const available = new Set(present);
  const seen = new Set<string>();
  const base = (form.sections?.length ? form.sections : [{ title: "", fields: [] as string[] }]).map((section) => ({
    ...section,
    fields: section.fields.filter((name) => available.has(name) && !seen.has(name) && seen.add(name)),
  }));
  const rest = present.filter((name) => !seen.has(name));
  base[base.length - 1] = { ...base[base.length - 1], fields: [...base[base.length - 1].fields, ...rest] };
  return base;
}

export function withLayout(form: FormConfig, sections: FormSection[]): FormConfig {
  return { ...form, sections };
}

export function uniqueName(form: FormConfig, label: string) {
  const words = label
    .replace(/[^a-zA-Z0-9 ]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 4);
  const stem = words.length
    ? words.map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase())).join("")
    : "field";
  const base = /^[a-zA-Z]/.test(stem) ? stem : `field${stem}`;
  const taken = new Set([...form.fields.flatMap((f) => [f.name, ...(f.group ?? []).map((g) => g.name)]), ...Object.keys(BUILT_IN_LABELS)]);
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}${n}`)) n++;
  return `${base}${n}`;
}

/** Renames a field everywhere it is referred to. */
export function renameField(form: FormConfig, from: string, to: string): FormConfig {
  const fix = (field: QueryField): QueryField => ({
    ...field,
    ...(field.name === from ? { name: to } : {}),
    ...(field.showWhen?.field === from ? { showWhen: { ...field.showWhen, field: to } } : {}),
    ...(field.optionsFrom?.field === from ? { optionsFrom: { ...field.optionsFrom, field: to } } : {}),
    ...(field.group ? { group: field.group.map(fix) } : {}),
  });
  return {
    ...form,
    fields: form.fields.map(fix),
    sections: form.sections?.map((section) => ({ ...section, fields: section.fields.map((name) => (name === from ? to : name)) })),
  };
}

export interface FieldKind {
  id: string;
  label: string;
  hint: string;
  make: (name: string) => QueryField;
}

export const FIELD_KINDS: FieldKind[] = [
  { id: "text", label: "Short text", hint: "Names, cities", make: (name) => ({ name, label: "New question" }) },
  { id: "textarea", label: "Paragraph", hint: "Longer answers", make: (name) => ({ name, label: "New question", type: "textarea" }) },
  { id: "number", label: "Number", hint: "Amounts, years", make: (name) => ({ name, label: "New question", inputMode: "numeric", half: true }) },
  { id: "email", label: "Email", hint: "Checked", make: (name) => ({ name, label: "Email address", type: "email", half: true }) },
  { id: "tel", label: "Phone", hint: "+91 …", make: (name) => ({ name, label: "Phone number", type: "tel", half: true }) },
  { id: "url", label: "Web address", hint: "https://…", make: (name) => ({ name, label: "Website", type: "url" }) },
  { id: "date", label: "Date", hint: "Day picker", make: (name) => ({ name, label: "Date", type: "date", half: true }) },
  { id: "month", label: "Month", hint: "Month picker", make: (name) => ({ name, label: "Month", type: "month", half: true }) },
  { id: "pills", label: "Choice buttons", hint: "Short options", make: (name) => ({ name, label: "Choose one", type: "select", options: ["Option 1", "Option 2"], display: "pills" }) },
  { id: "cards", label: "Choice cards", hint: "Bigger options", make: (name) => ({ name, label: "Choose one", type: "select", options: ["Option 1", "Option 2"], display: "cards" }) },
  { id: "select", label: "Dropdown", hint: "Long lists", make: (name) => ({ name, label: "Choose one", type: "select", options: ["Option 1", "Option 2", "Option 3"], display: "select" }) },
  { id: "file", label: "File upload", hint: "PDF, Word, images", make: (name) => ({ name, label: "Upload documents", type: "file" }) },
  {
    id: "group",
    label: "Side by side",
    hint: "One label, parts",
    make: (name) => ({ name, label: "New group", group: [{ name: `${name}A`, label: "Part 1" }, { name: `${name}B`, label: "Part 2" }] }),
  },
];

/** How a choice field is drawn when no display is set — QueryForm's rule. */
export function autoDisplay(field: QueryField): "pills" | "cards" | "select" {
  const options = field.options ?? [];
  if (field.optionsFrom || field.optionGroups) return "select";
  if (options.length <= 5 && Math.max(0, ...options.map((o) => o.length)) <= 22) return "pills";
  return options.length <= 6 ? "cards" : "select";
}

export function kindOf(field: QueryField): string {
  if (field.group) return "group";
  if (field.type === "select") {
    if (field.optionGroups) return "tiles";
    const display = field.display ?? autoDisplay(field);
    if (field.optionsFrom || display === "select") return "select";
    return display === "cards" || display === "cards-large" ? "cards" : "pills";
  }
  if (!field.type || field.type === "text") return field.inputMode === "numeric" ? "number" : "text";
  return field.type;
}

export const KIND_LABEL: Record<string, string> = {
  ...Object.fromEntries(FIELD_KINDS.map((kind) => [kind.id, kind.label])),
  tiles: "Topic tiles",
};

/** Changes a field's kind, keeping its label, key, choices and conditions. */
export function changeKind(field: QueryField, kind: string): QueryField {
  const template = FIELD_KINDS.find((k) => k.id === kind)?.make(field.name);
  if (!template) return field;
  const keep = { name: field.name, label: field.label, required: field.required, showWhen: field.showWhen, placeholder: field.placeholder };
  const options = field.options ?? field.optionGroups?.flatMap((g) => g.options) ?? template.options;
  const next: QueryField = { ...template, ...keep, half: template.half ?? field.half };
  if (next.type === "select") next.options = options;
  for (const key of Object.keys(next) as (keyof QueryField)[]) if (next[key] === undefined) delete next[key];
  return next;
}
