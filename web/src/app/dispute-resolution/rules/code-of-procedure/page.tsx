import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

const SECTIONS = [
  { title: "1. Commencement", body: "How a case begins: notice, fees, and initial appointment of a panelist." },
  { title: "2. Appointment of Neutrals", body: "How arbitrators, conciliators, and mediators are nominated and appointed from the specialized panel." },
  { title: "3. Conduct of Proceedings", body: "Pleadings, evidence, hearings, and timelines that apply to every case regardless of value." },
  { title: "4. Emergency Relief", body: "The procedure for Emergency Arbitration applications, including appointment timelines." },
  { title: "5. Awards & Settlements", body: "Form, delivery, and correction of awards and settlement agreements." },
  { title: "6. Fees", body: "How the administrative fee is calculated and when it is payable — see the Fees Calculator for an estimate." },
];

export default function CodeOfProcedurePage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Rules & Governance"
        title="The Adjudix Code of ADR Procedure, 2026"
        breadcrumbs={[
          { label: "Dispute Resolution", href: "/dispute-resolution" },
          { label: "Rules & Governance", href: "/dispute-resolution/rules" },
          { label: "Adjudix Code of ADR Procedure" },
        ]}
        intro="The single procedure that governs every case Adjudix administers, regardless of mechanism or value — published in advance so no party is ever negotiating process after a dispute has already begun."
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="divide-y divide-border border-t border-b border-border">
          {SECTIONS.map((section) => (
            <div key={section.title} className="py-6">
              <h2 className="font-heading text-lg font-semibold text-text">{section.title}</h2>
              <p className="mt-2 font-body text-sm text-text-muted">{section.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 font-body text-sm text-text-muted">
          <strong className="text-text">Current version: 2026.1.</strong> Prior versions remain
          accessible on request for cases filed under an earlier edition, in keeping with
          standard institutional arbitration practice.
        </p>
      </section>

      <CtaBand
        title="See the procedure in the platform"
        description="The ODR Platform applies this Code automatically at every step of your case."
        primary={{ label: "ODR Platform", href: "/odr" }}
        secondary={{ label: "Model Clauses", href: "/dispute-resolution/model-clauses" }}
      />
    </main>
  );
}
