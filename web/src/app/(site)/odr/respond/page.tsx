import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PageHeader } from "@/components/layout/page-header";
import { ApplyFormBody } from "@/components/patterns/apply-form";
import { FORM_DEFAULTS, getForm } from "@/lib/forms";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Respond to a Dispute",
  description:
    "Been named as a respondent in a case? Enter your reference number below to confirm your participation and view the claim against you.",
  path: "/odr/respond",
});

async function RespondPage() {
  const form = (await getForm("odr-respond")) ?? FORM_DEFAULTS["odr-respond"];
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="ODR Platform"
        title="Respond to a Dispute"
        breadcrumbs={[{ label: "ODR Platform", href: "/odr" }, { label: "Respond" }]}
        intro={form.intro}
      />

      <section className="mx-auto max-w-2xl px-6 py-16">
        <ApplyFormBody form={form} />
      </section>
    </main>
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/odr/respond", metadata);
export default editablePage("/odr/respond", RespondPage, metadata);
