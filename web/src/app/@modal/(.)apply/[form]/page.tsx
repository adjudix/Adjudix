import { notFound } from "next/navigation";
import { FormModal } from "@/components/patterns/form-modal";
import { ApplyFormBody } from "@/components/patterns/apply-form";
import { getApplyForm } from "@/lib/apply-forms";

// Clicking an Apply / Enrol / Request button opens its form here, over the
// current page. A direct visit or refresh renders app/apply/[form] instead.
export default async function ApplyModal({ params, searchParams }: PageProps<"/apply/[form]">) {
  const form = getApplyForm((await params).form);
  if (!form) notFound();
  return (
    <FormModal title={form.title} intro={form.intro}>
      <ApplyFormBody form={form} params={await searchParams} />
    </FormModal>
  );
}
