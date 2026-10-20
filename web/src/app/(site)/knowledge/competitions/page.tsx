import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { CardGrid } from "@/components/ui/card-grid";
import { getCompetitions } from "@/lib/content/data";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Competitions",
  description:
    "For students and early-career professionals to test and showcase ADR skills — mock proceedings and writing competitions, judged by practicing panelists.",
  path: "/knowledge/competitions",
});

async function CompetitionsPage() {
  const COMPETITIONS = await getCompetitions();
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
        primary={{ label: "Register Interest", href: applyHref("competition") }}
        secondary={{ label: "Knowledge Centre", href: "/knowledge" }}
      />
    </main>
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/knowledge/competitions", metadata);
export default editablePage("/knowledge/competitions", CompetitionsPage, metadata);
