import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { NumberedList } from "@/components/ui/numbered-list";

const STEPS = [
  { title: "Written notice", description: "File a paper notice of arbitration or request for mediation with the Secretariat." },
  { title: "In-person hearings", description: "Hearings are scheduled at a mutually convenient venue, under the same Adjudix Code of ADR Procedure timelines." },
  { title: "Physical award delivery", description: "Signed awards and settlement agreements are delivered to each party in physical form." },
];

export default function OfflineHandbookPage() {
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
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Adjudix Code of ADR Procedure", href: "/dispute-resolution/rules/code-of-procedure" }}
      />
    </main>
  );
}
