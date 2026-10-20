import type { QueryField } from "@/components/patterns/query-form";
import type { FormConfig } from "@/lib/forms/config";
import { declaredFields, flatten, isShown, offeredOptions } from "@/lib/forms/fields";

// Checks a submission against the form as published: required fields that
// are showing must be filled, choices must be ones the form offers, and
// anything the form doesn't ask for is dropped. The browser checks the same
// things first; this is what can't be bypassed.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_VALUE = 10_000;

export interface CheckedSubmission {
  name: string;
  email: string;
  phone: string;
  organization: string;
  answers: { key: string; label: string; value: string }[];
  files: File[];
}

export type CheckResult = { ok: true; value: CheckedSubmission } | { ok: false; error: string };

export function checkSubmission(form: FormConfig, data: FormData): CheckResult {
  const fields = declaredFields(form.fields, form);
  const text = (name: string) => {
    const value = data.get(name);
    return typeof value === "string" ? value.trim().slice(0, MAX_VALUE) : "";
  };

  // Choices made so far, so conditional fields and dependent options resolve.
  const chosen: Record<string, string> = {};
  for (const field of flatten(fields)) if (field.type === "select") chosen[field.name] = text(field.name);

  const answers: CheckedSubmission["answers"] = [];
  const files: File[] = [];
  const labelOf = (field: QueryField, parent?: QueryField) => (parent ? `${parent.label} — ${field.label}` : field.label);

  const visit = (field: QueryField, parent?: QueryField): string | undefined => {
    if (!isShown(field, chosen)) return undefined;
    if (field.group) {
      for (const sub of field.group) {
        const error = visit({ ...sub, required: sub.required ?? field.required }, field);
        if (error) return error;
      }
      return undefined;
    }
    if (field.type === "file") {
      for (const entry of data.getAll(field.name)) if (entry instanceof File && entry.size > 0) files.push(entry);
      return undefined;
    }
    const value = text(field.name);
    if (!value) return field.required ? `Please fill in “${labelOf(field, parent)}”.` : undefined;
    if (field.type === "select" && !offeredOptions(field, chosen).includes(value)) {
      return `Please choose one of the options for “${labelOf(field, parent)}”.`;
    }
    if (field.type === "email" && !EMAIL.test(value)) return "Please enter a valid email address.";
    if (["name", "email", "phone", "organization"].includes(field.name)) return undefined;
    answers.push({ key: field.name, label: labelOf(field, parent), value });
    return undefined;
  };

  for (const field of fields) {
    const error = visit(field);
    if (error) return { ok: false, error };
  }

  const name = text("name").slice(0, 200);
  const email = text("email").slice(0, 200);
  const phone = text("phone").slice(0, 60);
  if (!name) return { ok: false, error: "Please enter your name." };
  if (form.contact === "email" ? !email : !email && !phone) {
    return { ok: false, error: form.contact === "email" ? "Please enter your email address." : "Please enter either an email address or a phone number." };
  }
  return { ok: true, value: { name, email, phone, organization: text("organization").slice(0, 300), answers, files } };
}
