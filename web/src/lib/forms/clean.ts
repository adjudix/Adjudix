import type { FormKind, FormSection, QueryField } from "@/components/patterns/query-form";
import { CLOSED_DEFAULTS, type FormConfig } from "@/lib/forms/config";

// Turns whatever the form builder sends into a valid FormConfig, or says
// why it can't. Field names become the keys of every submission, so they
// must be simple, unique, and never one of the names the form builds in.

export const BUILT_IN_FIELDS = ["name", "organization", "email", "phone", "message", "attachments"] as const;
const RESERVED = new Set<string>([...BUILT_IN_FIELDS, "website", "_form", "_formKey", "_labels", "captcha", "captchaToken"]);
const FIELD_TYPES = new Set(["text", "email", "tel", "textarea", "select", "file", "date", "month", "url"]);
const DISPLAYS = new Set(["pills", "cards", "cards-large", "select", "tiles"]);
const KINDS = new Set<FormKind>(["filing", "application", "registration", "enquiry", "subscribe"]);
export const NAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9_-]{0,47}$/;

const text = (value: unknown, max = 500) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const optional = (value: unknown, max = 500) => text(value, max) || undefined;
const strings = (value: unknown, max = 200) =>
  Array.isArray(value) ? [...new Set(value.map((item) => text(item, max)).filter(Boolean))].slice(0, 200) : [];

function cleanField(input: unknown, names: Set<string>, nested = false): QueryField {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const name = text(raw.name, 48);
  if (!NAME_PATTERN.test(name)) throw new Error(`“${name || "(blank)"}” can't be a field key. Use letters, numbers, - or _, starting with a letter.`);
  if (RESERVED.has(name)) throw new Error(`“${name}” is reserved for a built-in field. Choose another key.`);
  if (names.has(name)) throw new Error(`Two fields share the key “${name}”. Each key must be unique.`);
  names.add(name);

  const label = text(raw.label, 200);
  if (!label) throw new Error(`The field “${name}” needs a label.`);
  const field: QueryField = { name, label };
  const type = text(raw.type, 20);
  if (type && type !== "text") {
    if (!FIELD_TYPES.has(type)) throw new Error(`“${label}” has an unknown type.`);
    field.type = type as QueryField["type"];
  }
  if (raw.required === true) field.required = true;
  if (raw.half === true) field.half = true;
  const placeholder = optional(raw.placeholder, 200);
  if (placeholder) field.placeholder = placeholder;
  if (raw.inputMode === "numeric") field.inputMode = "numeric";

  if (field.type === "select") {
    const options = strings(raw.options);
    if (options.length) field.options = options;
    if (Array.isArray(raw.optionGroups)) {
      const groups = raw.optionGroups
        .map((group) => ({ label: text((group as { label?: unknown })?.label, 100), options: strings((group as { options?: unknown })?.options) }))
        .filter((group) => group.label && group.options.length);
      if (groups.length) field.optionGroups = groups;
    }
    const from = raw.optionsFrom as { field?: unknown; map?: unknown } | undefined;
    if (from && typeof from === "object" && text(from.field, 48)) {
      const map = Object.fromEntries(
        Object.entries((from.map ?? {}) as Record<string, unknown>)
          .slice(0, 100)
          .map(([key, values]) => [text(key, 200), strings(values)]),
      );
      field.optionsFrom = { field: text(from.field, 48), map };
    }
    if (!field.options && !field.optionGroups && !field.optionsFrom) throw new Error(`“${label}” needs at least one choice.`);
    const display = text(raw.display, 20);
    if (display && DISPLAYS.has(display)) field.display = display as QueryField["display"];
    if (field.display === "tiles" && !field.optionGroups) delete field.display;
  }

  const defaultValue = optional(raw.defaultValue, 200);
  if (defaultValue) field.defaultValue = defaultValue;

  const showWhen = raw.showWhen as { field?: unknown; values?: unknown } | undefined;
  if (showWhen && typeof showWhen === "object" && text(showWhen.field, 48)) {
    const values = strings(showWhen.values);
    if (values.length) field.showWhen = { field: text(showWhen.field, 48), values };
  }

  if (!nested && Array.isArray(raw.group)) {
    const group = raw.group.slice(0, 6).map((sub) => cleanField(sub, names, true));
    if (group.length) {
      field.group = group;
      delete field.type;
    }
  }
  return field;
}

export function cleanFormConfig(slug: string, input: unknown): FormConfig {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const title = text(raw.title, 160);
  if (!title) throw new Error("Give the form a title.");

  const names = new Set<string>();
  const fields = (Array.isArray(raw.fields) ? raw.fields : []).slice(0, 80).map((field) => cleanField(field, names));
  const all = new Set<string>([...names, ...BUILT_IN_FIELDS]);
  const groupNames = new Set(fields.filter((f) => f.group).map((f) => f.name));

  // Conditions and dependent choices may only point at choice fields of this form.
  const choiceNames = new Set(fields.flatMap((f) => (f.group ?? [f])).filter((f) => f.type === "select").map((f) => f.name));
  for (const field of fields.flatMap((f) => [f, ...(f.group ?? [])])) {
    if (field.showWhen && !choiceNames.has(field.showWhen.field)) delete field.showWhen;
    if (field.optionsFrom && !choiceNames.has(field.optionsFrom.field)) {
      throw new Error(`“${field.label}” takes its choices from a field that isn't a choice on this form.`);
    }
  }

  const sections: FormSection[] = (Array.isArray(raw.sections) ? raw.sections : [])
    .slice(0, 20)
    .map((section) => {
      const s = (section ?? {}) as Record<string, unknown>;
      return {
        title: text(s.title, 160),
        description: optional(s.description, 400),
        fields: strings(s.fields, 48).filter((name) => all.has(name) || groupNames.has(name)),
      };
    })
    .filter((section) => section.fields.length);

  const kind = text(raw.kind, 20) as FormKind;
  const section = (raw.section ?? {}) as Record<string, unknown>;
  const href = text(section.href, 300);
  const organization = ["optional", "required", "hidden"].includes(String(raw.organization)) ? (raw.organization as FormConfig["organization"]) : "optional";

  const config: FormConfig = {
    slug,
    title,
    intro: text(raw.intro, 600),
    section: { label: text(section.label, 80) || "Adjudix", href: href.startsWith("/") ? href : "/" },
    fields,
    kind: KINDS.has(kind) ? kind : "application",
    sections: sections.length ? sections : undefined,
    tone: raw.tone === "urgent" ? "urgent" : undefined,
    submitLabel: text(raw.submitLabel, 60) || "Submit",
    successTitle: text(raw.successTitle, 120) || "Received",
    successBody: text(raw.successBody, 600) || "Thank you — a member of our team will be in touch shortly.",
    organization,
    organizationLabel: optional(raw.organizationLabel, 80),
    contact: raw.contact === "email" ? "email" : "either",
    messageLabel: optional(raw.messageLabel, 120),
    messageRequired: raw.messageRequired === true || undefined,
    noMessage: raw.noMessage === true || undefined,
    attachmentsLabel: optional(raw.attachmentsLabel, 120),
    enabled: raw.enabled !== false,
    closedTitle: text(raw.closedTitle, 160) || CLOSED_DEFAULTS.closedTitle,
    closedBody: text(raw.closedBody, 600) || CLOSED_DEFAULTS.closedBody,
    inbox: raw.inbox === "secretariat" ? "secretariat" : "query",
  };
  // Leave out empty optional settings, so stored forms stay readable.
  for (const key of Object.keys(config) as (keyof FormConfig)[]) if (config[key] === undefined) delete config[key];
  return config;
}

/** The field layout, ignoring wording: what "Change structure" covers. */
export function structureOf(form: Pick<FormConfig, "fields" | "sections" | "noMessage" | "attachmentsLabel" | "organization" | "contact">) {
  return JSON.stringify({
    fields: form.fields.map((f) => [f.name, f.type ?? "text", f.group?.map((g) => [g.name, g.type ?? "text"]) ?? null]),
    sections: (form.sections ?? []).map((s) => s.fields),
    noMessage: Boolean(form.noMessage),
    attachments: Boolean(form.attachmentsLabel),
    organization: form.organization ?? "optional",
    contact: form.contact ?? "either",
  });
}
