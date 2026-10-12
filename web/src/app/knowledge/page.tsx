import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { CardGrid } from "@/components/ui/card-grid";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Knowledge Centre",
  description:
    "Blogs, research, and competition output, filterable and searchable — a narrow, curated library rather than a sprawling, unstructured blog.",
  path: "/knowledge",
});

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
        image={{ src: "/images/hero-law-library.jpg", alt: "A grand institutional reading room" }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <CardGrid items={SECTIONS} />
      </section>

      <CtaBand
        title="Want new publications in your inbox?"
        description="Subscribe to be notified as we publish."
        primary={{ label: "Subscribe", href: applyHref("subscribe") }}
        secondary={{ label: "Browse Competitions", href: "/knowledge/competitions" }}
      />
    </main>
  );
}
