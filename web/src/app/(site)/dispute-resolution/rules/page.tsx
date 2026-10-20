import { editableMetadata, editablePage } from "@/lib/pages/editable";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { CodeExplainer } from "@/components/patterns/code-explainer";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Rules & Governance",
  description:
    "Every document that defines how a case at Adjudix is actually run — kept versioned and publicly accessible, the same way we'd want the other side's institute…",
  path: "/dispute-resolution/rules",
});

const DOCS = [
  {
    title: "Adjudix Code of ADR Procedure — the Rule Book",
    description: "The single governing procedure for every case Adjudix administers, in its 2018, 2021, and 2026 editions.",
    href: "/dispute-resolution/rules/code-of-procedure",
  },
  {
    title: "Moral Code of Principles & Doctrines — the Code of Conduct",
    description: "The ethical principles binding every neutral; they form the Preamble of the Rule Book.",
    href: "/about/moral-code",
  },
  {
    title: "Online Procedure Handbook",
    description: "Step-by-step guidance for parties and panelists using the ODR Platform.",
    href: "/dispute-resolution/rules/online-handbook",
  },
  {
    title: "Offline Procedure Handbook",
    description: "Guidance for in-person hearings and paper-based filings.",
    href: "/dispute-resolution/rules/offline-handbook",
  },
  {
    title: "Model Clauses",
    description: "Ready-to-insert arbitration, mediation, and emergency-relief clause language.",
    href: "/dispute-resolution/model-clauses",
  },
  {
    title: "Rules & Fees Calculator",
    description: "An indicative estimate of the administrative fee for your case.",
    href: "/dispute-resolution/fees",
  },
];

function RulesHubPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Dispute Resolution"
        title="Rules & Governance"
        breadcrumbs={[{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: "Rules & Governance" }]}
        intro="Every document that defines how a case at Adjudix is actually run — kept versioned and publicly accessible, the same way we'd want the other side's institute to behave."
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <CodeExplainer className="mb-12" />
        <div className="flex flex-col divide-y divide-border border-t border-b border-border">
          {DOCS.map((doc) => (
            <Link
              key={doc.title}
              href={doc.href}
              className="group flex flex-col gap-1 py-6 transition-colors hover:text-primary-ink"
            >
              <h2 className="font-heading text-lg font-semibold text-text group-hover:text-primary-ink">
                {doc.title}
              </h2>
              <p className="font-body text-sm text-text-muted">{doc.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Questions about a specific rule?"
        primary={{ label: "Contact Us", href: applyHref("enquiry") }}
        secondary={{ label: "About Adjudix", href: "/about" }}
      />
    </main>
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/dispute-resolution/rules", metadata);
export default editablePage("/dispute-resolution/rules", RulesHubPage, metadata);
