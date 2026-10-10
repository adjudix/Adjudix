import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { CardGrid } from "@/components/ui/card-grid";
import { TRAINING_TRACKS as TRACKS } from "@/lib/training-tracks";


export default function CoursesPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Training Institute"
        title="Courses"
        breadcrumbs={[{ label: "Training Institute", href: "/training" }, { label: "Courses" }]}
        intro="Six tracks, each tied to a published Competence Framework and a path into panel eligibility."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-heading text-2xl font-semibold text-text">Professional Courses</h2>
        <div className="mt-8">
          <CardGrid items={TRACKS} columns={2} />
        </div>
      </section>

      <section id="student-courses" className="scroll-mt-40 bg-surface px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-text">Student Courses</h2>
          <p className="mt-3 font-body text-text-muted">
            Every track is also offered as a student course for students of law, commerce, and
            engineering — the same Competence Framework, taught for those building toward the
            profession. Student members receive student pricing, and scholarships are available.
          </p>
        </div>
      </section>

      <CtaBand
        title="Not sure which track fits?"
        primary={{ label: "Talk to Us", href: "/contact" }}
        secondary={{ label: "Certification Framework", href: "/training/certification" }}
      />
    </main>
  );
}
