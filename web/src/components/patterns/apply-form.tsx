import { QueryForm } from "@/components/patterns/query-form";
import { withPrefill, type ApplyForm } from "@/lib/apply-forms";

/** The form for one action, with any fields the link pre-selected. */
export function ApplyFormBody({
  form,
  params,
}: {
  form: ApplyForm;
  params: Record<string, string | string[] | undefined>;
}) {
  return (
    <QueryForm
      formName={form.title}
      fields={withPrefill(form, params)}
      kind={form.kind}
      sections={form.sections}
      tone={form.tone}
      submitLabel={form.submitLabel}
      successTitle={form.successTitle}
      successBody={form.successBody}
      organization={form.organization}
      organizationLabel={form.organizationLabel}
      contact={form.contact}
      messageLabel={form.messageLabel}
      messageRequired={form.messageRequired}
      noMessage={form.noMessage}
      attachmentsLabel={form.attachmentsLabel}
    />
  );
}
