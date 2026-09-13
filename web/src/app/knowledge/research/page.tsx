import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

export default function ResearchPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Knowledge Centre"
        title="Research & Publications"
        breadcrumbs={[{ label: "Knowledge Centre", href: "/knowledge" }, { label: "Research & Publications" }]}
        intro="Longer-form research on institutional ADR in India and internationally, including redacted award and case summaries once published, in the interest of transparency."
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-lg border border-border bg-surface p-8">
          <h2 className="font-heading text-xl font-semibold text-text">
            Our research programme is being established
          </h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
            As Adjudix builds a caseload, redacted award summaries and original research will be
            published here, with case details anonymized to protect party confidentiality.
          </p>
        </div>
      </section>

      <CtaBand
        title="Interested in contributing research?"
        primary={{ label: "Talk to Us", href: "/contact" }}
        secondary={{ label: "Blogs & Articles", href: "/knowledge/blog" }}
      />
    </main>
  );
}
