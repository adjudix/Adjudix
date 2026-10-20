import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Annual Reports",
  description:
    "Adjudix usually publishes an annual report covering caseload, panel growth, and Training Institute outcomes.",
  path: "/about/annual-reports",
});

function AnnualReportsPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="About Adjudix"
        title="Annual Reports"
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Annual Reports" }]}
        intro="Adjudix usually publishes an annual report covering caseload, panel growth, and Training Institute outcomes."
      />

      <CtaBand
        title="Request our annual report"
        description="Annual reports are shared on request through the Secretariat."
        primary={{ label: "Contact Us", href: applyHref("enquiry") }}
        secondary={{ label: "Knowledge Centre", href: "/knowledge" }}
      />
    </main>
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/about/annual-reports", metadata);
export default editablePage("/about/annual-reports", AnnualReportsPage, metadata);
