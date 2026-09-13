import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { CardGrid } from "@/components/ui/card-grid";

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
        <CardGrid items={COMPETITIONS} columns={2} />
      </section>

      <CtaBand
        title="Want to be notified of the next competition?"
        primary={{ label: "Register Interest", href: "/contact" }}
        secondary={{ label: "Knowledge Centre", href: "/knowledge" }}
      />
    </main>
  );
}
