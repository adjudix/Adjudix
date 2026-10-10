import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

export interface PanelCategoryPageProps {
  title: string;
  intro: string;
  qualifies: string[];
}

const OPEN_ENDED_ITEM = "Any other such related issue";

export function PanelCategoryPage({ title, intro, qualifies }: PanelCategoryPageProps) {
  // Every list stays inclusive; the Miscellaneous page already ends with its own catch-all.
  const items = qualifies.at(-1)?.startsWith("Any other") ? qualifies : [...qualifies, OPEN_ENDED_ITEM];
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
          {items.map((item) => (
            <li key={item} className="flex gap-3 font-body text-text-muted">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
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
