import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

export default function FacultyPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Training Institute"
        title="Faculty"
        breadcrumbs={[{ label: "Training Institute", href: "/training" }, { label: "Faculty" }]}
        intro="Adjudix's course faculty is drawn from practicing arbitrators, conciliators, mediators, and subject-matter specialists across our Specialized Panels."
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-lg border border-border bg-surface p-8">
          <h2 className="font-heading text-xl font-semibold text-text">
            Founding faculty — being confirmed
          </h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
            Adjudix is finalizing its founding faculty roster alongside its first scheduled
            course cohort. Individual faculty profiles and credentials will be published here
            once confirmed.
          </p>
        </div>
      </section>

      <CtaBand
        title="Interested in teaching a module?"
        description="Practicing arbitrators, conciliators, and mediators can apply to join our faculty."
        primary={{ label: "Apply to Teach", href: "/contact" }}
        secondary={{ label: "Browse Courses", href: "/training/courses" }}
      />
    </main>
  );
}
