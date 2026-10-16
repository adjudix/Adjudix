import type { FormKind } from "@/components/patterns/query-form";
import { APPLY_FORMS, ENQUIRY_FORM } from "@/lib/apply-forms";
import { ODR_FILING, ODR_RESPONSE } from "@/lib/odr-forms";

// What the emails need to know about a submitted form. Looked up on the
// server by the form's name, so the confirmation a visitor receives always
// carries our own wording, never text sent with the submission.
export interface FormMeta {
  kind: FormKind;
  urgent: boolean;
  successTitle: string;
  successBody: string;
}

const KNOWN = new Map<string, FormMeta>([
  ...[ENQUIRY_FORM, ...Object.values(APPLY_FORMS)].map(
    (form) =>
      [
        form.title,
        { kind: form.kind, urgent: form.tone === "urgent", successTitle: form.successTitle, successBody: form.successBody },
      ] as const,
  ),
  ...[ODR_FILING, ODR_RESPONSE].map(
    (form) => [form.formName, { kind: "filing" as const, urgent: false, successTitle: form.successTitle, successBody: form.successBody }] as const,
  ),
]);

export function formMeta(formName: string): FormMeta {
  return (
    KNOWN.get(formName) ?? {
      kind: "enquiry",
      urgent: false,
      successTitle: "Submission received",
      successBody: "Thank you — the Secretariat has received your submission and will be in touch shortly.",
    }
  );
}
