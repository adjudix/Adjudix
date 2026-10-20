import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { NumberedList } from "@/components/ui/numbered-list";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Offline Procedure Handbook",
  description:
    "Not every party wants to file online. This handbook covers the same Adjudix Code of ADR Procedure, applied to paper-based filings and in-person hearings.",
  path: "/dispute-resolution/rules/offline-handbook",
});

const STEPS = [
  { title: "Written notice", description: "File a paper notice of arbitration or request for mediation with the Secretariat." },
  { title: "In-person hearings", description: "Hearings are scheduled at a mutually convenient venue, under the same Adjudix Code of ADR Procedure timelines." },
  { title: "Physical award delivery", description: "Signed awards and settlement agreements are delivered to each party in physical form." },
];

function OfflineHandbookPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Rules & Governance"
        title="Offline Procedure Handbook"
        breadcrumbs={[
          { label: "Dispute Resolution", href: "/dispute-resolution" },
          { label: "Rules & Governance", href: "/dispute-resolution/rules" },
          { label: "Offline Handbook" },
        ]}
        intro="Not every party wants to file online. This handbook covers the same Adjudix Code of ADR Procedure, applied to paper-based filings and in-person hearings."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <NumberedList items={STEPS} />
      </section>

      <CtaBand
        title="Prefer to file in person?"
        description="Contact the Secretariat directly to begin an offline filing."
        primary={{ label: "Contact Us", href: applyHref("enquiry") }}
        secondary={{ label: "Adjudix Code of ADR Procedure", href: "/dispute-resolution/rules/code-of-procedure" }}
      />
    </main>
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/dispute-resolution/rules/offline-handbook", metadata);
export default editablePage("/dispute-resolution/rules/offline-handbook", OfflineHandbookPage, metadata);
