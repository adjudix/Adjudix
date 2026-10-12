import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { applyHref } from "@/lib/apply-forms";

export default function ResearchPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Knowledge Centre"
        title="Research & Publications"
        breadcrumbs={[{ label: "Knowledge Centre", href: "/knowledge" }, { label: "Research & Publications" }]}
        intro="Longer-form research on institutional ADR in India and internationally, including redacted award and case summaries, in the interest of transparency."
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-lg border border-border bg-surface p-8">
          <h2 className="font-heading text-xl font-semibold text-text">
            Submit your research
          </h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
            We accept research papers, case commentaries, and articles on ADR for publication.
            Submissions are reviewed by the Secretariat, and case details are always anonymized
            to protect party confidentiality.
          </p>
        </div>
      </section>

      <CtaBand
        title="Interested in contributing research?"
        primary={{ label: "Submit Now", href: applyHref("research") }}
        secondary={{ label: "Blogs & Articles", href: "/knowledge/blog" }}
      />
    </main>
  );
}
