import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

export interface PartnerCategoryPageProps {
  title: string;
  intro: string;
  benefits: string[];
}

export function PartnerCategoryPage({ title, intro, benefits }: PartnerCategoryPageProps) {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Our Partners"
        title={title}
        breadcrumbs={[{ label: "Our Partners", href: "/partners" }, { label: title }]}
        intro={intro}
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-heading text-xl font-semibold text-text">What partnership includes</h2>
        <ul className="mt-6 flex flex-col gap-3">
          {benefits.map((item) => (
            <li key={item} className="flex gap-3 font-body text-text-muted">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-lg border border-border bg-canvas p-8">
          <h2 className="font-heading text-lg font-semibold text-text">
            Partnerships coming soon
          </h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
            Adjudix is establishing its first {title.toLowerCase()} relationships. Get in touch
            to discuss a partnership.
          </p>
        </div>
      </section>

      <CtaBand
        title={`Become a ${title}`}
        primary={{ label: "Talk to Us", href: "/contact" }}
        secondary={{ label: "All Partner Categories", href: "/partners" }}
      />
    </main>
  );
}
