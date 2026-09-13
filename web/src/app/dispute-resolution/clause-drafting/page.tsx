import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { NumberedList } from "@/components/ui/numbered-list";

const STEPS = [
  { title: "Share your contract", description: "Send us the commercial contract or template you want to protect." },
  { title: "Clause drafted", description: "Our team drafts arbitration, mediation, or emergency-relief clause language suited to the deal." },
  { title: "Review & insert", description: "You review the language with your own counsel, then insert it directly into the agreement." },
];

export default function ClauseDraftingPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Dispute Resolution"
        title="Contract & Arbitration Clause Drafting"
        breadcrumbs={[{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: "Clause Drafting" }]}
        intro="A dispute resolution clause written after a disagreement starts is a negotiation. Written before, it's a formality. We draft clauses that hold up when they're actually needed."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <NumberedList items={STEPS} />
      </section>

      <CtaBand
        title="Get your contract reviewed"
        description="Start with our free model clauses, or request tailored language for a specific agreement."
        primary={{ label: "Talk to Us", href: "/contact" }}
        secondary={{ label: "See Model Clauses", href: "/dispute-resolution/model-clauses" }}
      />
    </main>
  );
}
