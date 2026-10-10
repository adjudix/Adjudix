import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

export default function AnnualReportsPage() {
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
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Knowledge Centre", href: "/knowledge" }}
      />
    </main>
  );
}
