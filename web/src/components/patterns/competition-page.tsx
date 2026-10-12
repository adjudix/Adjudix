import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { applyHref } from "@/lib/apply-forms";

export interface CompetitionPageProps {
  title: string;
  intro: string;
  format: string[];
}

export function CompetitionPage({ title, intro, format }: CompetitionPageProps) {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Knowledge Centre"
        title={title}
        breadcrumbs={[
          { label: "Knowledge Centre", href: "/knowledge" },
          { label: "Events", href: "/events" },
          { label: "Competitions", href: "/knowledge/competitions" },
          { label: title },
        ]}
        intro={intro}
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-heading text-xl font-semibold text-text">Format</h2>
        <ul className="mt-6 flex flex-col gap-3">
          {format.map((item) => (
            <li key={item} className="flex gap-3 font-body text-text-muted">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-lg border border-border bg-canvas p-8">
          <h2 className="font-heading text-lg font-semibold text-text">Apply now</h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
            Apply now and we&apos;ll notify you with the dates and rules for the next edition.
          </p>
        </div>
      </section>

      <CtaBand
        title="Apply now, we will notify you"
        primary={{ label: "Register Now", href: applyHref("competition", { competition: title }) }}
        secondary={{ label: "All Competitions", href: "/knowledge/competitions" }}
      />
    </main>
  );
}
