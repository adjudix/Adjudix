import type { QueryField } from "@/components/patterns/query-form";

// Which fields a form asks for, in order: the built-in contact fields, the
// form's own, then the message box and documents. Shared by QueryForm (what
// it draws) and the submission endpoint (what it accepts), so the two can't
// disagree about what a form contains.

export interface FieldOptions {
  organization?: "optional" | "required" | "hidden";
  organizationLabel?: string;
  contact?: "either" | "email";
  messageLabel?: string;
  messageRequired?: boolean;
  noMessage?: boolean;
  attachmentsLabel?: string;
}

// Email and phone are each optional, but at least one is required
// (client brief: "Either email or phone").
export function baseFields(
  organization: FieldOptions["organization"] = "optional",
  organizationLabel?: string,
  contact: FieldOptions["contact"] = "either",
): QueryField[] {
  const fields: QueryField[] = [{ name: "name", label: "Full name", required: true, half: organization !== "hidden" }];
  if (organization !== "hidden") {
    fields.push({
      name: "organization",
      label: organizationLabel ?? (organization === "required" ? "Organization" : "Organization (optional)"),
      required: organization === "required",
      half: true,
    });
  }
  if (contact === "email") {
    fields.push({ name: "email", label: "Email", type: "email", required: true });
  } else {
    fields.push({ name: "email", label: "Email", type: "email", half: true }, { name: "phone", label: "Phone", type: "tel", half: true });
  }
  return fields;
}

export function declaredFields(fields: QueryField[], options: FieldOptions): QueryField[] {
  return [
    ...baseFields(options.organization, options.organizationLabel, options.contact),
    ...fields,
    ...(options.noMessage
      ? []
      : [{ name: "message", label: options.messageLabel ?? "Message", type: "textarea" as const, required: options.messageRequired }]),
    ...(options.attachmentsLabel ? [{ name: "attachments", label: options.attachmentsLabel, type: "file" as const }] : []),
  ];
}

/** Sub-fields of a group take the group's place, inheriting its "required". */
export const flatten = (fields: QueryField[]) =>
  fields.flatMap((field) => (field.group ? field.group.map((sub) => ({ ...sub, required: sub.required ?? field.required })) : [field]));

/** Every option a choice field offers, given the answers chosen so far. */
export function offeredOptions(field: QueryField, chosen: Record<string, string>): string[] {
  if (field.optionsFrom) return field.optionsFrom.map[chosen[field.optionsFrom.field] ?? ""] ?? [];
  return field.options ?? field.optionGroups?.flatMap((group) => group.options) ?? [];
}

export const isShown = (field: QueryField, chosen: Record<string, string>) =>
  !field.showWhen || field.showWhen.values.includes(chosen[field.showWhen.field] ?? "");
