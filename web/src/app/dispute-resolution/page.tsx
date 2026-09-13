import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

const SPECTRUM = [
  {
    title: "Negotiation",
    description: "The parties resolve the matter directly, with no third party involved.",
  },
  {
    title: "Conciliation",
    description: "A neutral conciliator actively proposes terms of settlement to both sides.",
  },
  {
    title: "Mediation",
    description: "A neutral mediator facilitates dialogue; the parties themselves reach the outcome.",
  },
  {
    title: "Lok Adalat",
    description: "A statutory forum for compromise settlement, with the force of a civil court decree.",
  },
  {
    title: "Arbitration",
    description: "A neutral arbitrator hears the case and issues a binding, enforceable award.",
  },
];

const MECHANISMS = [
  {
    title: "Arbitration",
    description: "Domestic and international, decided by a neutral arbitrator under the Code of Procedure.",
    href: "/dispute-resolution/arbitration",
  },
  {
    title: "Mediation",
    description: "A facilitated dialogue toward a settlement both sides actually agree to.",
    href: "/dispute-resolution/mediation",
  },
  {
    title: "Conciliation",
    description: "A more active neutral proposes settlement terms for the parties to accept or refine.",
    href: "/dispute-resolution/conciliation",
  },
  {
    title: "Lok Adalat",
    description: "A statutory compromise forum for eligible matters, with decree-equivalent force.",
    href: "/dispute-resolution/lok-adalat",
  },
  {
    title: "Hybrid / Arb-Med",
    description: "Mediation first, with an automatic fallback to binding arbitration if it doesn't settle.",
    href: "/dispute-resolution/hybrid",
  },
  {
    title: "Emergency Arbitration",
    description: "Urgent interim relief before a full tribunal is even constituted.",
    href: "/dispute-resolution/emergency",
  },
];

export default function DisputeResolutionPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Dispute Resolution"
        title="One institute, the full ADR spectrum"
        intro="From a facilitated conversation to a binding arbitral award, Adjudix administers every point on the alternative dispute resolution spectrum under a single published Code of Procedure."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-heading text-2xl font-semibold text-text">
          The spectrum, plainly explained
        </h2>
        <p className="mt-3 max-w-2xl font-body text-text-muted">
          Each mechanism trades off control and formality differently. Moving left to right, the
          parties give up more control over the outcome in exchange for a more decisive result.
        </p>
        <div className="mt-8 grid gap-3 divide-y divide-border border-t border-b border-border sm:grid-cols-5 sm:divide-x sm:divide-y-0">
          {SPECTRUM.map((step) => (
            <div key={step.title} className="px-1 py-6 sm:px-4">
              <h3 className="font-heading text-base font-semibold text-text">{step.title}</h3>
              <p className="mt-2 font-body text-sm text-text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-2xl font-semibold text-text">Choose a mechanism</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MECHANISMS.map((m) => (
              <Link
                key={m.title}
                href={m.href}
                className="group rounded-lg border border-border bg-canvas p-6 transition-colors hover:border-primary"
              >
                <h3 className="font-heading text-lg font-semibold text-text group-hover:text-primary">
                  {m.title}
                </h3>
                <p className="mt-2 font-body text-sm text-text-muted">{m.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-lg border border-border p-8">
            <span className="font-mono text-xs tracking-widest uppercase text-primary">
              By dispute type
            </span>
            <h2 className="mt-3 font-heading text-xl font-semibold text-text">
              Specialized Panels
            </h2>
            <p className="mt-3 font-body text-sm text-text-muted">
              Nine categories, from debt recovery to intellectual property, each with panelists
              vetted specifically for that dispute type.
            </p>
            <Link
              href="/dispute-resolution/panels"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Browse Specialized Panels &rarr;
            </Link>
          </div>
          <div className="rounded-lg border border-border p-8">
            <span className="font-mono text-xs tracking-widest uppercase text-primary">
              For businesses
            </span>
            <h2 className="mt-3 font-heading text-xl font-semibold text-text">
              Corporate Dispute Resolution
            </h2>
            <p className="mt-3 font-body text-sm text-text-muted">
              Bespoke panel access and ready-to-insert arbitration clauses for commercial
              contracts.
            </p>
            <Link
              href="/dispute-resolution/corporate"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Corporate Dispute Resolution Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to start?"
        description="File a dispute online, or speak with our team about which mechanism fits your case."
        primary={{ label: "File a Dispute", href: "/odr/file" }}
        secondary={{ label: "Talk to Us", href: "/contact" }}
      />
    </main>
  );
}
