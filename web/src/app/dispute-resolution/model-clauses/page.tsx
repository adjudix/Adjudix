import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { applyHref } from "@/lib/apply-forms";

const CLAUSES = [
  {
    title: "Standard arbitration clause",
    text: '"Any dispute arising out of or in connection with this contract, including any question regarding its existence, validity, or termination, shall be referred to and finally resolved by arbitration administered by the Adjudix Dispute Resolution Institute in accordance with the latest version of the Adjudix Code of ADR Procedure."',
  },
  {
    title: "Mediation-first (hybrid) clause",
    text: '"The parties shall first attempt to resolve any dispute through mediation administered by the Adjudix Dispute Resolution Institute. If the dispute is not settled within 30 days of the request for mediation, it shall be finally resolved by arbitration administered by the Institute in accordance with the latest version of the Adjudix Code of ADR Procedure."',
  },
  {
    title: "Emergency arbitration clause",
    text: '"Either party may apply for emergency interim relief in accordance with the latest version of the Adjudix Code of ADR Procedure at any time before the constitution of the arbitral tribunal."',
  },
];

export default function ModelClausesPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Rules & Governance"
        title="Model Clauses"
        breadcrumbs={[{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: "Model Clauses" }]}
        intro="Ready-to-insert clause language for your commercial contracts. Naming Adjudix as the administering institution in advance means there's no negotiation over forum once a dispute actually arises."
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex flex-col gap-8">
          {CLAUSES.map((clause) => (
            <div key={clause.title} className="rounded-lg border border-border bg-surface p-6">
              <h2 className="font-heading text-lg font-semibold text-text">{clause.title}</h2>
              <p className="mt-3 font-body text-sm italic text-text-muted">{clause.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 font-body text-sm text-text-muted">
          These clauses are starting points. For contracts with unusual value, jurisdiction, or
          confidentiality requirements, our <strong className="font-semibold text-text">Contract &amp; Clause Drafting service</strong> will tailor
          language to your specific agreement.
        </p>
      </section>

      <CtaBand
        title="Need clause language tailored to your contract?"
        primary={{ label: "Contract & Clause Drafting", href: "/dispute-resolution/clause-drafting" }}
        secondary={{ label: "Get a Clause Drafted", href: applyHref("drafting", { service: "An ADR clause only" }) }}
      />
    </main>
  );
}
