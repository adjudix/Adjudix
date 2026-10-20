// A small schema language for everything the console edits: collection
// items, page blocks, site settings. One description drives three things —
// the editor's controls, a blank value for a new item, and clean(), which
// the server runs on every save so stored JSON always has the shape the
// site's components expect, whatever the browser sends.

interface Base {
  key: string;
  label: string;
  help?: string;
  required?: boolean;
  /** Takes half the editor's width from small screens up. */
  half?: boolean;
}

export type FieldSpec = Base &
  (
    | { type: "text" | "url" | "image" | "date"; placeholder?: string; maxLength?: number }
    | { type: "textarea"; rows?: number; maxLength?: number }
    | { type: "number"; nullable?: boolean; nullLabel?: string; min?: number; step?: number }
    | { type: "boolean" }
    | { type: "select"; options: { value: string; label: string }[] }
    | { type: "strings"; multiline?: boolean; singular?: string }
    | { type: "numbers"; singular?: string }
    | { type: "list"; of: FieldSpec[]; singular?: string; titleKey?: string }
    | { type: "object"; fields: FieldSpec[] }
  );

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const MAX_TEXT = 20_000;

export function blankValue(spec: FieldSpec): Json {
  switch (spec.type) {
    case "number":
      return spec.nullable ? null : 0;
    case "boolean":
      return false;
    case "select":
      return spec.options[0]?.value ?? "";
    case "strings":
    case "numbers":
    case "list":
      return [];
    case "object":
      return blankRecord(spec.fields);
    default:
      return "";
  }
}

export function blankRecord(fields: FieldSpec[]): { [key: string]: Json } {
  return Object.fromEntries(fields.map((field) => [field.key, blankValue(field)]));
}

function cleanText(value: unknown, max = MAX_TEXT) {
  return typeof value === "string" ? value.slice(0, max) : typeof value === "number" ? String(value) : "";
}

function cleanNumber(value: unknown): number | null {
  const number = typeof value === "number" ? value : typeof value === "string" && value.trim() ? Number(value) : NaN;
  return Number.isFinite(number) ? number : null;
}

/** Coerces `value` to the spec's shape, dropping anything it doesn't describe. */
export function cleanValue(spec: FieldSpec, value: unknown): Json {
  switch (spec.type) {
    case "text":
    case "date":
      return cleanText(value, spec.maxLength ?? 2_000);
    case "textarea":
      return cleanText(value, spec.maxLength ?? MAX_TEXT);
    case "url":
    case "image": {
      const text = cleanText(value, 2_000).trim();
      // Site paths, the web, mail and phone links — never javascript: or data:.
      return /^(\/(?!\/)|https?:\/\/|mailto:|tel:|#)/i.test(text) || text === "" ? text : "";
    }
    case "number": {
      const number = cleanNumber(value);
      return number ?? (spec.nullable ? null : 0);
    }
    case "boolean":
      return value === true || value === "true";
    case "select": {
      const text = cleanText(value);
      return spec.options.some((option) => option.value === text) ? text : (spec.options[0]?.value ?? "");
    }
    case "strings":
      return Array.isArray(value) ? value.slice(0, 500).map((item) => cleanText(item, spec.multiline ? MAX_TEXT : 2_000)) : [];
    case "numbers":
      return Array.isArray(value) ? value.slice(0, 500).map((item) => cleanNumber(item) ?? 0) : [];
    case "list":
      return Array.isArray(value) ? value.slice(0, 2_000).map((item) => cleanRecord(spec.of, item)) : [];
    case "object":
      return cleanRecord(spec.fields, value);
  }
}

export function cleanRecord(fields: FieldSpec[], value: unknown): { [key: string]: Json } {
  const source = value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
  return Object.fromEntries(fields.map((field) => [field.key, cleanValue(field, source[field.key])]));
}

/** Required fields left empty, as "Label" or "List › 3 › Label" paths. */
export function missingRequired(fields: FieldSpec[], value: Record<string, unknown>, trail: string[] = []): string[] {
  const missing: string[] = [];
  for (const field of fields) {
    const current = value?.[field.key];
    if (field.required && (current === "" || current == null || (Array.isArray(current) && current.length === 0))) {
      missing.push([...trail, field.label].join(" › "));
    }
    if (field.type === "list" && Array.isArray(current)) {
      current.forEach((item, index) =>
        missing.push(...missingRequired(field.of, item as Record<string, unknown>, [...trail, field.label, String(index + 1)])),
      );
    }
    if (field.type === "object" && current && typeof current === "object") {
      missing.push(...missingRequired(field.fields, current as Record<string, unknown>, [...trail, field.label]));
    }
  }
  return missing;
}

export const option = (value: string, label = value) => ({ value, label });
