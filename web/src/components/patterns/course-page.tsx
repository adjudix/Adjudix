import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

export interface CoursePageProps {
  title: string;
  intro: string;
  who: string[];
  curriculum: { title: string; body: string }[];
}

export function CoursePage({ title, intro, who, curriculum }: CoursePageProps) {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Training Institute"
        title={title}
        breadcrumbs={[
          { label: "Training Institute", href: "/training" },
          { label: "Courses", href: "/training/courses" },
          { label: title },
        ]}
        intro={intro}
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-heading text-xl font-semibold text-text">Who this track is for</h2>
        <ul className="mt-6 flex flex-col gap-3">
          {who.map((item) => (
            <li key={item} className="flex gap-3 font-body text-text-muted">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-xl font-semibold text-text">What you&apos;ll cover</h2>
          <div className="mt-8 divide-y divide-border border-t border-b border-border">
            {curriculum.map((module) => (
              <div key={module.title} className="py-6">
                <h3 className="font-heading text-lg font-semibold text-text">{module.title}</h3>
                <p className="mt-2 font-body text-sm text-text-muted">{module.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-lg border border-border bg-surface p-8">
          <h2 className="font-heading text-lg font-semibold text-text">Enrollment opening soon</h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
            Adjudix is finalizing the first scheduled cohort for this track, with real dates,
            faculty, and fees. Register your interest and we&apos;ll notify you the moment
            enrollment opens.
          </p>
        </div>
      </section>

      <CtaBand
        title="Register your interest"
        description="Be the first to know when enrollment opens for this track."
        primary={{ label: "Register Interest", href: "/contact" }}
        secondary={{ label: "Certification Framework", href: "/training/certification" }}
      />
    </main>
  );
}
