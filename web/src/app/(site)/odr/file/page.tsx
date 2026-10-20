import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PageHeader } from "@/components/layout/page-header";
import { ApplyFormBody } from "@/components/patterns/apply-form";
import { FORM_DEFAULTS, getForm } from "@/lib/forms";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "File a Dispute",
  description:
    "Tell us about your dispute. We'll confirm your dispute-type panel and an indicative fee before anything is finalized.",
  path: "/odr/file",
});

async function FileDisputePage() {
  const form = (await getForm("odr-file")) ?? FORM_DEFAULTS["odr-file"];
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="ODR Platform"
        title="File a Dispute"
        breadcrumbs={[{ label: "ODR Platform", href: "/odr" }, { label: "File a Dispute" }]}
        intro={form.intro}
      />

      <section className="mx-auto max-w-2xl px-6 py-16">
        <ApplyFormBody form={form} />
      </section>
    </main>
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/odr/file", metadata);
export default editablePage("/odr/file", FileDisputePage, metadata);
