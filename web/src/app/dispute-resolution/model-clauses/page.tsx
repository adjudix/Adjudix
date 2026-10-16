import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { CopyButton } from "@/components/patterns/copy-button";
import { LinkButton } from "@/components/ui/link-button";
import { applyHref } from "@/lib/apply-forms";
import { clauseText, MODEL_CLAUSES } from "@/lib/model-clauses";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Model Clauses",
  description:
    "Model dispute resolution clauses for Hybrid Med-Arb, arbitration, mediation, conciliation, Adjudix Lok Adalat, and emergency arbitration — ready to insert in your contracts.",
  path: "/dispute-resolution/model-clauses",
});

export default function ModelClausesPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Rules & Governance"
        title="Model Dispute Resolution Clauses"
        breadcrumbs={[{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: "Model Clauses" }]}
        intro="Ready-to-insert clause language for your commercial contracts. Naming Adjudix as the administering institution in advance means there's no negotiation over forum once a dispute actually arises."
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        {/* Jump list: six clauses is a long page. */}
        <nav aria-label="Clauses on this page">
          <ol className="grid gap-2 sm:grid-cols-2">
            {MODEL_CLAUSES.map((clause) => (
              <li key={clause.slug}>
                <a
                  href={`#${clause.slug}`}
                  className="flex items-baseline gap-3 rounded-md border border-border px-4 py-3 font-body text-sm font-medium text-text hover:border-primary hover:text-primary-ink"
                >
                  <span className="font-mono text-xs text-primary-ink">{clause.number}</span>
                  {clause.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-14 flex flex-col gap-16">
          {MODEL_CLAUSES.map((clause) => (
            <section key={clause.slug} id={clause.slug} className="scroll-mt-24 md:scroll-mt-64">
              <span className="font-mono text-xs tracking-widest uppercase text-primary-ink">
                Clause {clause.number}
              </span>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-text">{clause.title}</h2>
              <p className="mt-2 font-body text-sm text-text-muted">{clause.useWhen}</p>

              <div className="mt-6 flex flex-col gap-6">
                {clause.variants.map((variant) => (
                  <article key={variant.number} className="rounded-lg border border-border bg-surface p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      {clause.variants.length > 1 ? (
                        <h3 className="font-heading text-lg font-semibold text-text">
                          <span className="mr-2 font-mono text-sm text-primary-ink">{variant.number}</span>
                          {variant.title}
                        </h3>
                      ) : (
                        <span />
                      )}
                      <CopyButton text={clauseText(variant)} />
                    </div>
                    <ol className="mt-4 flex flex-col gap-3">
                      {variant.paragraphs.map((paragraph) => (
                        <li key={paragraph.number} className="grid grid-cols-[3.25rem_1fr] gap-2 font-body text-sm text-text">
                          <span className="font-mono text-xs leading-6 text-text-muted">{paragraph.number}</span>
                          <p className="text-left leading-6">
                            {paragraph.lead && <strong className="font-semibold">{paragraph.lead} </strong>}
                            {paragraph.text}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </article>
                ))}
              </div>

              {clause.slug === "hybrid-med-arb" && (
                <p className="mt-4 rounded-md bg-primary/10 px-4 py-3 text-left font-body text-sm text-text">
                  <strong className="font-semibold">If the clause is silent</strong> on whether the
                  mediator may go on to arbitrate, the Adjudix Code deems Option A: the same neutral
                  continues as Arbitrator, already knowing the negotiations that took place in
                  mediation. See Chapter XI of the{" "}
                  <Link href="/dispute-resolution/rules/code-of-procedure" className="font-medium text-primary-ink hover:underline">
                    Adjudix Code of ADR Procedure
                  </Link>
                  .
                </p>
              )}
            </section>
          ))}
        </div>

        {/* Highlighted on the client's markup: the step from a model clause to
            the drafting service should be hard to miss. */}
        <aside className="mt-16 rounded-lg bg-hero p-8 text-text-on-hero shadow-xl md:p-10">
          <span className="font-mono text-xs tracking-widest uppercase text-primary">
            Contract &amp; Clause Drafting
          </span>
          <h2 className="mt-3 font-heading text-2xl font-semibold text-balance md:text-3xl">
            A model clause is a starting point. Your contract deserves a clause built for it.
          </h2>
          <p className="mt-4 max-w-2xl text-left font-body text-text-on-hero-muted">
            Unusual value, cross-border parties, confidentiality, multi-tier escalation, or a seat
            that needs thought — our drafting team tailors the clause to your agreement, so it holds
            up the day a dispute arrives.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href={applyHref("drafting", { service: "An ADR clause only" })}>Get a Clause Drafted</LinkButton>
            <LinkButton variant="secondaryInverse" href="/dispute-resolution/clause-drafting">
              About the Drafting Service
            </LinkButton>
          </div>
        </aside>
      </section>

      <CtaBand
        title="Need clause language tailored to your contract?"
        primary={{ label: "Contract & Clause Drafting", href: "/dispute-resolution/clause-drafting" }}
        secondary={{ label: "Get a Clause Drafted", href: applyHref("drafting", { service: "An ADR clause only" }) }}
      />
    </main>
  );
}
