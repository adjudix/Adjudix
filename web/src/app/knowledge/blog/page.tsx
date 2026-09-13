import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

export default function BlogPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Knowledge Centre"
        title="Blogs & Articles"
        breadcrumbs={[{ label: "Knowledge Centre", href: "/knowledge" }, { label: "Blogs & Articles" }]}
        intro="Plain-language explainers on ADR mechanisms, procedure, and practice — filterable by dispute type and mechanism once published."
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-lg border border-border bg-surface p-8">
          <h2 className="font-heading text-xl font-semibold text-text">
            Our first articles are in progress
          </h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
            Adjudix is building a sustained publishing schedule, not a one-time launch batch.
            Subscribe to be notified as new articles go live.
          </p>
        </div>
      </section>

      <CtaBand
        title="Get notified when we publish"
        primary={{ label: "Subscribe", href: "/contact" }}
        secondary={{ label: "Research & Publications", href: "/knowledge/research" }}
      />
    </main>
  );
}
