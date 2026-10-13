import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms governing use of this website and Adjudix's dispute resolution services. Effective from the institute's founding; version 1.0.",
  path: "/terms",
});

const SECTIONS = [
  {
    title: "Acceptance of terms",
    body: "By using the ODR Platform or engaging Adjudix as an administering institution, you agree to these terms and to the Adjudix Code of ADR Procedure, 2026.",
  },
  {
    title: "Scope of services",
    body: "Adjudix administers arbitration, mediation, conciliation, emergency arbitration, hybrid (Med-Arb) and corporate ADR, and access to Lok Adalat, online and offline; supports the implementation of orders and awards; drafts contracts and dispute resolution clauses; and operates a Training Institute and membership programme, as described throughout this site.",
  },
  {
    title: "Fees",
    body: "Administrative fees are indicative until a case is filed, at which point a final fee is confirmed in writing before proceedings begin.",
  },
  {
    title: "Limitation of liability",
    body: "Adjudix administers proceedings but does not guarantee any particular outcome. Awards and settlement agreements are the product of the appointed neutral's independent judgment or the parties' own agreement.",
  },
];

export default function TermsPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        intro="The terms governing use of this website and Adjudix's dispute resolution services. Effective from the institute's founding; version 1.0."
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="divide-y divide-border border-t border-b border-border">
          {SECTIONS.map((section) => (
            <div key={section.title} className="py-6">
              <h2 className="font-heading text-lg font-semibold text-text">{section.title}</h2>
              <p className="mt-2 font-body text-sm text-text-muted">{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-xl font-semibold text-text">Grievance Redressal</h2>
          <p className="mt-3 font-body text-text-muted">
            If you believe Adjudix, a panelist, or the ODR Platform has fallen short of the
            standards set out in our Moral Code of Principles or the Adjudix Code of ADR Procedure, submit a
            grievance through our{" "}
            <Link
              href={applyHref("enquiry", { queryType: "Feedback or Grievance" })}
              className="text-primary-ink hover:underline"
            >
              grievance form
            </Link>
            , describing the matter in detail. The Secretariat reviews every grievance and responds directly.
          </p>
        </div>
      </section>
    </main>
  );
}
