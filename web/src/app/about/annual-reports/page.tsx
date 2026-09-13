import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

export default function AnnualReportsPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="About Adjudix"
        title="Annual Reports"
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Annual Reports" }]}
        intro="Adjudix publishes an annual report covering caseload, panel growth, and Training Institute outcomes, once a first full year of operation is complete."
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-lg border border-border bg-surface p-8">
          <h2 className="font-heading text-xl font-semibold text-text">
            Our first annual report is in preparation
          </h2>
          <p className="mt-2 font-body text-sm text-text-muted">
            As a newly founded institute, Adjudix will publish its first annual report at the
            close of its first full operating year. Reports will be archived here by year, in
            the same manner as the Code of Procedure&apos;s version history.
          </p>
        </div>
      </section>

      <CtaBand
        title="Want to be notified when it's published?"
        description="Subscribe through the Knowledge Centre, or get in touch directly."
        primary={{ label: "Knowledge Centre", href: "/knowledge" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </main>
  );
}
