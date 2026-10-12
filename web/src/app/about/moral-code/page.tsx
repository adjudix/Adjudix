import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { CodeExplainer } from "@/components/patterns/code-explainer";
import MORAL_PRINCIPLES from "@/lib/moral-principles.json";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Moral Code of Principles & Doctrines",
  description:
    "The Adjudix code of conduct: the ethical principles binding every case, neutral, and member of the Institute. It is not the rule book — it forms the Preamble…",
  path: "/about/moral-code",
});

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"];

// The Moral Principles form the Preamble of the Adjudix Code of ADR
// Procedure; the JSON is generated with the Code (scripts/adjudix-code).
const ARTICLES = MORAL_PRINCIPLES.principles.map((principle, i) => ({
  title: `${ROMAN[i]}. ${principle.title}`,
  body: principle.body,
}));

export default function MoralCodePage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="About Adjudix"
        title="Moral Code of Principles & Doctrines"
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Moral Code" }]}
        intro="The Adjudix code of conduct: the ethical principles binding every case, neutral, and member of the Institute. It is not the rule book — it forms the Preamble of the rule book, the Adjudix Code of ADR Procedure."
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <CodeExplainer className="mb-12" />
        <p className="font-body text-text-muted">
          <strong className="text-text">Preamble.</strong> Innovation in the means of resolving
          disputes must never be purchased at the cost of fairness. The following Moral
          Principles form the Preamble of the Adjudix Code of ADR Procedure, 2026. They bind the
          Institute, its Secretariat, and every arbitrator, emergency arbitrator, mediator, and
          conciliator acting under it, and every provision of the Code is read in the manner that
          best gives effect to them.
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
          <strong className="text-text">Edition 2026.</strong> Every neutral subscribes to these
          Principles in writing on accepting an appointment. The 2018 and 2021 editions of the
          Code carry their own Preambles, available with each edition on the Code page.
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
