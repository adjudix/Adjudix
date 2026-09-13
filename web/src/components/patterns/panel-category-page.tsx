import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

export interface PanelCategoryPageProps {
  title: string;
  intro: string;
  qualifies: string[];
}

export function PanelCategoryPage({ title, intro, qualifies }: PanelCategoryPageProps) {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Specialized Panels"
        title={title}
        breadcrumbs={[
          { label: "Dispute Resolution", href: "/dispute-resolution" },
          { label: "Specialized Panels", href: "/dispute-resolution/panels" },
          { label: title },
        ]}
        intro={intro}
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-heading text-2xl font-semibold text-text">What qualifies</h2>
        <ul className="mt-6 flex flex-col gap-3">
          {qualifies.map((item) => (
            <li key={item} className="flex gap-3 font-body text-text-muted">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-lg border border-border bg-canvas p-8">
          <h2 className="font-heading text-xl font-semibold text-text">
            Panel for this category — empanelling now
          </h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
            Adjudix is building out its founding panel for {title.toLowerCase()}. Qualified
            advocates, chartered accountants, and engineers can apply to join; parties with a
            live matter in this category can proceed directly to filing and Adjudix will appoint
            a suitably specialized panelist.
          </p>
        </div>
      </section>

      <CtaBand
        title={`Have a ${title.toLowerCase()} matter?`}
        description="File online, or speak with our team about which mechanism fits your case."
        primary={{ label: "File a Dispute", href: "/odr/file" }}
        secondary={{ label: "View Full Panel", href: "/panel" }}
      />
    </main>
  );
}
