import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { applyHref } from "@/lib/apply-forms";

export default function LeadershipPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="About Adjudix"
        title="Leadership & Governance"
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Leadership & Governance" }]}
        intro="Adjudix is governed by a Secretariat and an Advisory Council, responsible for the Adjudix Code of ADR Procedure, panel empanelment, and the Training Institute's curriculum."
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-heading text-2xl font-semibold text-text">Governance structure</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h3 className="font-heading text-lg font-semibold text-text">Secretariat</h3>
            <p className="mt-2 font-body text-sm text-text-muted">
              Manages day-to-day case administration, panel appointments, and the ODR Platform.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <h3 className="font-heading text-lg font-semibold text-text">Advisory Council</h3>
            <p className="mt-2 font-body text-sm text-text-muted">
              Reviews and approves the Adjudix Code of ADR Procedure, and oversees panel empanelment
              standards.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <h3 className="font-heading text-lg font-semibold text-text">
              Training Oversight Body
            </h3>
            <p className="mt-2 font-body text-sm text-text-muted">
              Sets and audits the Competence Framework behind every Training Institute
              certification.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-lg border border-border bg-surface p-8">
          <h2 className="font-heading text-xl font-semibold text-text">
            Leadership enquiries
          </h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
            The Secretariat and Advisory Council respond to governance and leadership enquiries
            directly. Write to the Secretariat for credentials or an introduction.
          </p>
        </div>
      </section>

      <CtaBand
        title="Have a governance question?"
        description="Reach the Secretariat directly through our contact form."
        primary={{ label: "Contact Us", href: applyHref("enquiry") }}
        secondary={{ label: "Read Our Moral Code", href: "/about/moral-code" }}
      />
    </main>
  );
}
