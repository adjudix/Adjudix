import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { CardGrid } from "@/components/ui/card-grid";
import Link from "next/link";
import { getStudentCourses, getTrainingTracks } from "@/lib/content/data";
import { formatRupees } from "@/lib/training-tracks";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Professional & Student Courses",
  description:
    "Six professional tracks, each tied to a published Competence Framework and a path into panel eligibility, and student courses for those starting out in ADR.",
  path: "/training/courses",
});

async function CoursesPage() {
  const TRACKS = await getTrainingTracks();
  const { fee: STUDENT_COURSE_FEE, courses: STUDENT_COURSES } = await getStudentCourses();
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Training Institute"
        title="Courses"
        breadcrumbs={[{ label: "Training Institute", href: "/training" }, { label: "Courses" }]}
        intro="Six professional tracks, each tied to a published Competence Framework and a path into panel eligibility, and student courses for those starting out in ADR."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-heading text-2xl font-semibold text-text">Professional Courses</h2>
        <div className="mt-8">
          <CardGrid items={TRACKS} columns={2} />
        </div>
      </section>

      <section id="student-courses" className="scroll-mt-20 md:scroll-mt-64 bg-surface px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-2xl font-semibold text-text">Student Courses</h2>
          <p className="mt-3 max-w-3xl text-left font-body text-text-muted">
            For students of law, commerce, and engineering who want to build a career in ADR. Student
            members receive student pricing, and scholarships are available on every course.
          </p>
          <p className="mt-5 inline-flex max-w-3xl flex-wrap items-baseline gap-x-2 rounded-md bg-primary/10 px-4 py-3 text-left font-body text-sm text-text">
            <strong className="font-heading text-lg font-semibold">{formatRupees(STUDENT_COURSE_FEE)}</strong>
            per course, refunded in full when you complete the course and pass its test.
          </p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {STUDENT_COURSES.map((course, i) => (
              <li key={course.slug} className="flex flex-col rounded-lg border border-border bg-canvas p-6">
                <span className="font-mono text-xs font-semibold text-primary-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">{course.title}</h3>
                <p className="mt-2 flex-1 text-left font-body text-sm text-muted-foreground">{course.description}</p>
                <p className="mt-4 font-body text-sm text-text">
                  <span className="font-heading text-base font-semibold">{formatRupees(STUDENT_COURSE_FEE)}</span>{" "}
                  <span className="text-muted-foreground">· refundable</span>
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-sm font-medium">
                  <Link
                    href={applyHref("course", { courseLevel: "Student Course", course: course.title, status: "Student" })}
                    className="rounded-full bg-primary px-4 py-2 text-primary-foreground hover:bg-primary-hover"
                  >
                    Enrol
                  </Link>
                  <Link
                    href={applyHref("scholarship", { courseLevel: "Student Course", course: course.title, status: "Student" })}
                    className="text-primary-ink hover:underline"
                  >
                    Apply for Scholarship
                  </Link>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-left font-body text-sm text-muted-foreground">
            Every professional track above is also offered as a student course &mdash; the same
            Competence Framework, taught for those building toward the profession. Looking for
            hands-on experience?{" "}
            <Link href="/training/apprenticeships" className="font-medium text-primary-ink hover:underline">
              Apprenticeships &amp; internships
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand
        title="Not sure which track fits?"
        primary={{ label: "Enrol in a Course", href: applyHref("course") }}
        secondary={{ label: "Certification Framework", href: "/training/certification" }}
      />
    </main>
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/training/courses", metadata);
export default editablePage("/training/courses", CoursesPage, metadata);
