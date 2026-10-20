import { notFound } from "next/navigation";
import { FormModal } from "@/components/patterns/form-modal";
import { ApplyFormBody } from "@/components/patterns/apply-form";
import { getForm, PAGE_FORMS } from "@/lib/forms";

// Clicking an Apply / Enrol / Request button opens its form here, over the
// current page. A direct visit or refresh renders app/(site)/apply/[form] instead.
export default async function ApplyModal({ params, searchParams }: PageProps<"/apply/[form]">) {
  const { form: slug } = await params;
  const form = PAGE_FORMS.has(slug) ? undefined : await getForm(slug);
  if (!form) notFound();
  return (
    <FormModal title={form.title} intro={form.intro}>
      <ApplyFormBody form={form} params={await searchParams} />
    </FormModal>
  );
}
