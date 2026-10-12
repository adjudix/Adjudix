import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { CardGrid } from "@/components/ui/card-grid";
import { COMPETITIONS } from "@/lib/competitions";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Upcoming & Past Events",
  description:
    "CPD-style events, courses, and Adjudix's flagship annual conference, browsable by date.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Events"
        title="Upcoming & Past Events"
        intro="CPD-style events, courses, and Adjudix's flagship annual conference, browsable by date."
        image={{ src: "/images/boardroom-collaboration.jpg", alt: "A panel presenting a case analysis to a seated group around a conference table" }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-heading text-2xl font-semibold text-text">Competitions</h2>
        <p className="mt-3 max-w-2xl font-body text-text-muted">
          Mock proceedings and writing competitions for students and early-career
          professionals, judged by practicing panelists.
        </p>
        <div className="mt-8">
          <CardGrid items={COMPETITIONS} columns={2} />
        </div>
      </section>

      <section className="bg-surface px-6 py-16">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-heading text-xl font-semibold text-text">
            Our flagship conference
          </h2>
          <p className="mt-3 font-body text-text-muted">
            Adjudix&apos;s annual flagship conference brings together arbitrators, mediators,
            counsel, and corporate users of ADR. Apply now and we&apos;ll notify you of every
            upcoming event and edition.
          </p>
        </Reveal>
      </section>

      <CtaBand
        title="Apply now to be notified"
        primary={{ label: "Register Interest", href: applyHref("event") }}
        secondary={{ label: "Browse Training Courses", href: "/training/courses" }}
      />
    </main>
  );
}
