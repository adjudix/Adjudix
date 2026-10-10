import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

const ARTICLES = [
  {
    title: "I. Impartiality",
    body: "Every arbitrator, conciliator, and mediator empanelled by Adjudix must disclose any conflict of interest before accepting an appointment, and must withdraw the moment one arises during a case.",
  },
  {
    title: "II. Competence",
    body: "Panel appointments are made only from members who hold the relevant certification or demonstrated professional standing for the dispute type at hand — never by convenience or availability alone.",
  },
  {
    title: "III. Confidentiality",
    body: "Proceedings, submissions, and outcomes are confidential to the parties unless the parties themselves agree otherwise, or disclosure is required by law.",
  },
  {
    title: "IV. Procedural fairness",
    body: "Every case is administered under the same Adjudix Code of ADR Procedure, 2026, regardless of the size of the claim or the identity of the parties.",
  },
  {
    title: "V. Accountability",
    body: "Adjudix maintains a grievance redressal mechanism for any party, panelist, or member who believes this Code has been breached, detailed on our Terms & Conditions page.",
  },
];

export default function MoralCodePage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="About Adjudix"
        title="Moral Code of Principles & Doctrines"
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Moral Code" }]}
        intro="The founding ethical charter governing every case, panelist, and member of the Adjudix Dispute Resolution Institute — the constitution behind the Adjudix Code of ADR Procedure."
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-body text-text-muted">
          <strong className="text-text">Preamble.</strong> Adjudix Dispute Resolution Institute
          is founded on the conviction that a dispute resolution process is only as trustworthy
          as the principles behind it. The following articles bind every arbitrator,
          conciliator, mediator, and staff member acting on the institute&apos;s behalf, and
          apply regardless of the value or nature of the dispute.
        </p>

        <div className="mt-10 divide-y divide-border border-t border-b border-border">
          {ARTICLES.map((article) => (
            <div key={article.title} className="py-6">
              <h2 className="font-heading text-lg font-semibold text-text">{article.title}</h2>
              <p className="mt-2 font-body text-sm text-text-muted">{article.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 font-body text-sm text-text-muted">
          <strong className="text-text">Version 1.0</strong> — effective from the institute&apos;s
          founding. Future revisions will be dated and archived here, in the same manner as the
          Adjudix Code of ADR Procedure.
        </p>
      </section>

      <CtaBand
        title="See how this code applies in practice"
        description="Read the Adjudix Code of ADR Procedure that governs how every case is actually administered."
        primary={{ label: "Adjudix Code of ADR Procedure", href: "/dispute-resolution/rules/code-of-procedure" }}
        secondary={{ label: "About Adjudix", href: "/about" }}
      />
    </main>
  );
}
