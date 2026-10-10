import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { CardGrid } from "@/components/ui/card-grid";
import { COMPETITIONS } from "@/lib/competitions";


export default function CompetitionsPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Knowledge Centre"
        title="Competitions"
        breadcrumbs={[
          { label: "Knowledge Centre", href: "/knowledge" },
          { label: "Events", href: "/events" },
          { label: "Competitions" },
        ]}
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
