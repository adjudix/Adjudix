import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

export default function CalendarPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Training Institute"
        title="Calendar / Upcoming Courses"
        breadcrumbs={[{ label: "Training Institute", href: "/training" }, { label: "Calendar" }]}
        intro="Scheduled course cohorts across all four tracks, with dates, format, and faculty confirmed before you enroll."
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-lg border border-border bg-surface p-8">
          <h2 className="font-heading text-xl font-semibold text-text">
            No sessions currently scheduled
          </h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
            Adjudix is finalizing its first scheduled cohort. Register your interest and
            we&apos;ll notify you the moment dates are confirmed for any track.
          </p>
        </div>
      </section>

      <CtaBand
        title="Register your interest"
        primary={{ label: "Register Interest", href: "/contact" }}
        secondary={{ label: "Browse Courses", href: "/training/courses" }}
      />
    </main>
  );
}
