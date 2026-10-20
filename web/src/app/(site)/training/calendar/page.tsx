import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { CardGrid } from "@/components/ui/card-grid";
import { getTrainingTracks } from "@/lib/content/data";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Upcoming Courses",
  description:
    "Course cohorts across every Training Institute track, with format and faculty confirmed before you enroll.",
  path: "/training/calendar",
});

async function CalendarPage() {
  const TRAINING_TRACKS = await getTrainingTracks();
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Training Institute"
        title="Upcoming Courses"
        breadcrumbs={[{ label: "Training Institute", href: "/training" }, { label: "Upcoming Courses" }]}
        intro="Course cohorts across every Training Institute track, with format and faculty confirmed before you enroll."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-lg border border-border bg-surface p-8">
          <h2 className="font-heading text-xl font-semibold text-text">
            Courses run in rolling cohorts
          </h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
            Each track opens new cohorts through the year. Apply for a track and the Training
            Institute will share the next available dates with you.
          </p>
        </div>
        <div className="mt-10">
          <CardGrid items={TRAINING_TRACKS} columns={2} />
        </div>
      </section>

      <CtaBand
        title="Apply for a course"
        primary={{ label: "Apply Now", href: applyHref("course", { courseLevel: "Professional Course" }) }}
        secondary={{ label: "Browse Courses", href: "/training/courses" }}
      />
    </main>
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/training/calendar", metadata);
export default editablePage("/training/calendar", CalendarPage, metadata);
