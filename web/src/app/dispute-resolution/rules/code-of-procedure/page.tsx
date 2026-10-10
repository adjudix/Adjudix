import { PageHeader } from "@/components/layout/page-header";
import Link from "next/link";
import { CtaBand } from "@/components/layout/cta-band";

// Edition history per the client's blueprint: 2018 first edition, 2021 added
// Online Dispute Resolution, 2026 covers every mechanism.
const VERSIONS = [
  { year: "2026", note: "Current edition. Covers every mechanism — arbitration, mediation, conciliation, Lok Adalat, online, offline, hybrid, emergency, and corporate ADR." },
  { year: "2021", note: "Introduced Online Dispute Resolution." },
  { year: "2018", note: "First edition of the Adjudix Code of ADR Procedure." },
];

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
        <p className="mt-4 font-body text-sm text-text-muted">
          The detailed Code is available as a PDF.{" "}
          <Link href="/contact" className="font-medium text-primary hover:underline">
            Request the full Code (PDF)
          </Link>
        </p>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-2xl font-semibold text-text">Editions</h2>
          <ul className="mt-6 divide-y divide-border border-t border-b border-border">
            {VERSIONS.map((version) => (
              <li key={version.year} className="flex gap-6 py-5">
                <span className="w-16 shrink-0 font-mono text-lg font-semibold text-text">
                  {version.year}
                </span>
                <p className="font-body text-sm text-text-muted">{version.note}</p>
              </li>
            ))}
          </ul>
        </div>
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
