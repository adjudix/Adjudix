import { PageHeader } from "@/components/layout/page-header";
import Link from "next/link";
import { CtaBand } from "@/components/layout/cta-band";
import { LinkButton } from "@/components/ui/link-button";
import { getTrack } from "@/lib/content/data";
import { formatRupees } from "@/lib/training-tracks";
import { applyHref as formHref } from "@/lib/apply-forms";

export interface CoursePageProps {
  // Key into the Training tracks collection, which holds the fee.
  slug: string;
  title: string;
  intro: string;
  who: string[];
  curriculum: { title: string; body: string }[];
}

export async function CoursePage({ slug, title, intro, who, curriculum }: CoursePageProps) {
  const track = await getTrack(slug);
  const applyHref = formHref("course", { courseLevel: "Professional Course", course: track.title });
  const scholarshipHref = formHref("scholarship", { courseLevel: "Professional Course", course: track.title });
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
        <div className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-primary-ink">
              Course fee
            </span>
            <p className="mt-2 font-heading text-3xl font-semibold text-text">
              <span className="mr-3 text-lg text-text-muted line-through">
                <span className="sr-only">Was </span>
                {formatRupees(track.mrp)}
              </span>
              {formatRupees(track.price)}
            </p>
            <p className="mt-1 text-left font-body text-xs text-text-muted">Discounted fee</p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <LinkButton href={applyHref} size="lg">
              Apply Now
            </LinkButton>
            <Link href={scholarshipHref} className="text-sm font-medium text-primary-ink hover:underline">
              Apply for Scholarship
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Apply now"
        description="Apply for this track, or ask about a scholarship."
        primary={{ label: "Apply Now", href: applyHref }}
        secondary={{ label: "Apply for Scholarship", href: scholarshipHref }}
      />
    </main>
  );
}
