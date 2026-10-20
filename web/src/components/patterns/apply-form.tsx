import { QueryForm } from "@/components/patterns/query-form";
import { withPrefill } from "@/lib/apply-forms";
import type { FormConfig } from "@/lib/forms/config";

/** The form for one action, with any fields the link pre-selected. */
export function ApplyFormBody({
  form,
  params = {},
}: {
  form: FormConfig;
  params?: Record<string, string | string[] | undefined>;
}) {
  if (!form.enabled) return <ClosedForm form={form} />;
  return (
    <QueryForm
      formName={form.title}
      formKey={form.slug}
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

/** What visitors see while the console has a form switched off. */
export function ClosedForm({ form }: { form: Pick<FormConfig, "closedTitle" | "closedBody"> }) {
  return (
    <div role="status" className="flex flex-col items-start gap-3 rounded-xl bg-surface px-6 py-8 ring-1 ring-border ring-inset">
      <span className="rounded-full bg-(--color-ink-100) px-2.5 py-0.5 font-body text-xs font-semibold text-(--color-ink-700)">Closed</span>
      <h2 className="font-heading text-xl font-semibold text-balance text-foreground">{form.closedTitle}</h2>
      <p className="text-left font-body text-sm leading-relaxed text-muted-foreground">{form.closedBody}</p>
    </div>
  );
}
