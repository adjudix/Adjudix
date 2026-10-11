import { PageHeader } from "@/components/layout/page-header";
import Link from "next/link";
import { CtaBand } from "@/components/layout/cta-band";

// Edition history per the client's blueprint: 2018 first edition, 2021 added
// Online Dispute Resolution, 2026 covers every mechanism. The PDFs are built
// by web/scripts/adjudix-code/build.py.
const VERSIONS = [
  { year: "2026", note: "Current edition. Covers every mechanism — adds Emergency Arbitration, the Hybrid Med-Arb Protocol, Adjudix Lok Adalat, and global implementation of awards and settlements." },
  { year: "2021", note: "Introduced Online Dispute Resolution: the Adjudix E-Portal, electronic filing and service, and virtual hearings." },
  { year: "2018", note: "First edition of the Adjudix Code of ADR Procedure." },
];

const pdfHref = (year: string) => `/code/adjudix-code-of-adr-procedure-${year}.pdf`;

const PARTS = [
  { title: "Part I · Preliminary & General Provisions", body: "Scope, definitions, party autonomy, and the Online Dispute Resolution platform — e-filing, digital service, and electronic signatures." },
  { title: "Part II · Common Procedural Rules", body: "Commencement and pleadings, case management, virtual, physical, and hybrid hearings, interim measures, and evidence." },
  { title: "Part III · Arbitration Procedure", body: "The arbitral tribunal, emergency arbitration, fast-track procedure, and the making, form, and correction of awards." },
  { title: "Part IV · Mediation & Conciliation Procedures", body: "Mediation, conciliation, and the Adjudix Lok Adalat — a one-day sitting for confidential settlement proposals." },
  { title: "Part V · Hybrid Processes (Med-Arb)", body: "The Med-Arb Protocol: transition from mediation to arbitration, consent requirements, and protection of mediation disclosures." },
  { title: "Part VI · Corporate & Commercial ADR", body: "Shareholder and board disputes, cross-border commercial ADR, financial and M&A disputes, and IP and technology disputes." },
  { title: "Part VII · Enforcement, Costs, & Miscellaneous", body: "Implementation and enforcement of awards in India and abroad, fees and costs, confidentiality, ethics, and grievance redressal." },
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
          {PARTS.map((section) => (
            <div key={section.title} className="py-6">
              <h2 className="font-heading text-lg font-semibold text-text">{section.title}</h2>
              <p className="mt-2 font-body text-sm text-text-muted">{section.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 font-body text-sm text-text-muted">
          Every edition opens with a Preamble of{" "}
          <Link href="/about/moral-code" className="font-medium text-primary hover:underline">
            Moral Principles
          </Link>{" "}
          that bind the Institute and every neutral acting under the Code.
        </p>
        <a
          href={pdfHref("2026")}
          download
          className="mt-6 inline-flex items-center rounded-md bg-primary px-5 py-2.5 font-body text-sm font-medium text-primary-foreground hover:bg-primary-hover"
        >
          Download the 2026 Code (PDF)
        </a>
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
                <div>
                  <p className="font-body text-sm text-text-muted">{version.note}</p>
                  <a
                    href={pdfHref(version.year)}
                    download
                    className="mt-2 inline-block font-body text-sm font-medium text-primary hover:underline"
                  >
                    Download PDF
                  </a>
                </div>
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
