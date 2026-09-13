import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

const SECTIONS = [
  {
    title: "Blogs & Articles",
    description: "Plain-language explainers on ADR mechanisms, procedure, and practice.",
    href: "/knowledge/blog",
  },
  {
    title: "Research & Publications",
    description: "Longer-form research on institutional ADR in India and internationally.",
    href: "/knowledge/research",
  },
  {
    title: "Competitions",
    description: "Mock arbitration, mock conciliation, and writing competitions for students and early-career professionals.",
    href: "/knowledge/competitions",
  },
];

export default function KnowledgePage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Knowledge Centre"
        title="One place for everything Adjudix publishes"
        intro="Blogs, research, and competition output, filterable and searchable — a narrow, curated library rather than a sprawling, unstructured blog."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-3 sm:grid-cols-3">
          {SECTIONS.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary"
            >
              <h2 className="font-heading text-lg font-semibold text-text group-hover:text-primary">
                {section.title}
              </h2>
              <p className="mt-2 font-body text-sm text-text-muted">{section.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Want new publications in your inbox?"
        description="Subscribe to be notified as we publish."
        primary={{ label: "Subscribe", href: "/contact" }}
        secondary={{ label: "Browse Competitions", href: "/knowledge/competitions" }}
      />
    </main>
  );
}
