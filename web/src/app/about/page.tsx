import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { ComparisonTable } from "@/components/ui/comparison-table";
import Link from "next/link";

const ROWS = [
  {
    criterion: "Choosing the decision-maker",
    adjudix:
      "Parties nominate from a specialized panel matched to the dispute type; the institute appoints if they can't agree",
    other: "No structured process, appointment can stall indefinitely",
  },
  {
    criterion: "Procedure",
    adjudix: "A single published Code of Procedure governs every case, known in advance",
    other: "Procedure is negotiated case-by-case, or set by court rules never designed for the dispute",
  },
  {
    criterion: "Timeline",
    adjudix: "Bound by the Code of Procedure, with an Emergency Arbitrator route for urgent relief",
    other: "No fixed procedural timeline",
  },
  {
    criterion: "Confidentiality",
    adjudix: "Proceedings and outcomes are confidential by default",
    other: "Court proceedings are a matter of public record",
  },
  {
    criterion: "Enforceability",
    adjudix: "Awards enforceable under the Arbitration and Conciliation Act, 1996",
    other: "Depends entirely on how the matter was resolved",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="About Adjudix"
        title="Why ADR-i"
        intro="Adjudix exists because the choice of forum shouldn't be an afterthought. Institutional alternative dispute resolution replaces an uncertain, case-by-case negotiation over process with one published, predictable Code of Procedure — known to both sides before a dispute ever arises."
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-heading text-2xl font-semibold text-text">Our founding rationale</h2>
        <p className="mt-4 font-body text-text-muted">
          Most disputes in India are resolved one of two ways: through the courts, on a timeline
          and under rules designed for every kind of case rather than any one kind, or through
          ad hoc arbitration or mediation, where the parties negotiate procedure from a blank
          page every time a disagreement arises. Adjudix was founded to offer a third option: a
          standing institution with a published Code of Procedure, a panel of vetted specialists
          organized by dispute type, and a Training Institute that gives the next generation of
          arbitrators, conciliators, and mediators a defined path into the profession.
        </p>
        <p className="mt-4 font-body text-text-muted">
          That combination — resolution, training, and membership, under one roof — is
          deliberate. An institution that only convenes panels has no pipeline of new
          practitioners; one that only trains has nowhere for graduates to practice. Adjudix
          treats dispute resolution, education, and professional standing as one continuous
          system rather than three separate businesses.
        </p>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-heading text-2xl font-semibold text-text">
            Institutional ADR vs. ad hoc or litigation
          </h2>
          <p className="mt-3 max-w-2xl font-body text-text-muted">
            The difference isn&apos;t philosophical — it shows up in exactly how a dispute gets
            decided.
          </p>
          <div className="mt-8">
            <ComparisonTable rows={ROWS} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-heading text-2xl font-semibold text-text">Governance</h2>
        <p className="mt-4 font-body text-text-muted">
          Adjudix is governed by a Secretariat and Advisory Council responsible for maintaining
          the Code of Procedure, empanelling and reviewing arbitrators, conciliators, and
          mediators, and overseeing the Training Institute&apos;s curriculum. Full governance
          structure and named leadership are published on the{" "}
          <Link href="/about/leadership" className="text-primary hover:underline">
            Leadership &amp; Governance
          </Link>{" "}
          page. Adjudix&apos;s founding ethical commitments are set out in full in the{" "}
          <Link href="/about/moral-code" className="text-primary hover:underline">
            Moral Code of Principles &amp; Doctrines
          </Link>
          .
        </p>
      </section>

      <CtaBand
        title="See who sits on our panel"
        description="Every arbitrator, conciliator, and mediator is vetted before appointment."
        primary={{ label: "View Our Panel", href: "/panel" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </main>
  );
}
