import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

const COMPETITIONS = [
  { title: "Mock Arbitration", description: "A simulated arbitration hearing, scored by practicing arbitrators.", href: "/knowledge/competitions/mock-arbitration" },
  { title: "Mock Conciliation", description: "A simulated conciliation, testing proposal-led settlement skill.", href: "/knowledge/competitions/mock-conciliation" },
  { title: "Arbitral Award Writing", description: "Write a reasoned award on a set fact pattern.", href: "/knowledge/competitions/award-writing" },
  { title: "Arbitral Blog/Article Writing", description: "Original writing on any ADR topic, judged for clarity and insight.", href: "/knowledge/competitions/blog-writing" },
];

export default function CompetitionsPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Knowledge Centre"
        title="Competitions"
        breadcrumbs={[{ label: "Knowledge Centre", href: "/knowledge" }, { label: "Competitions" }]}
        intro="For students and early-career professionals to test and showcase ADR skills — mock proceedings and writing competitions, judged by practicing panelists."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-3 sm:grid-cols-2">
          {COMPETITIONS.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary"
            >
              <h2 className="font-heading text-lg font-semibold text-text group-hover:text-primary">
                {c.title}
              </h2>
              <p className="mt-2 font-body text-sm text-text-muted">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Want to be notified of the next competition?"
        primary={{ label: "Register Interest", href: "/contact" }}
        secondary={{ label: "Knowledge Centre", href: "/knowledge" }}
      />
    </main>
  );
}
