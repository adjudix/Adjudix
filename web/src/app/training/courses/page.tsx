import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { CardGrid } from "@/components/ui/card-grid";

const TRACKS = [
  { title: "Arbitrator Track", href: "/training/courses/arbitrator", description: "Professional and student tracks toward panel-eligible arbitration practice." },
  { title: "Conciliator Track", href: "/training/courses/conciliator", description: "Active, proposal-led settlement facilitation." },
  { title: "Mediator Track", href: "/training/courses/mediator", description: "Facilitative technique for guiding parties to their own settlement." },
  { title: "Contract Drafting Track", href: "/training/courses/contract-drafting", description: "Drafting enforceable arbitration and mediation clauses." },
];

export default function CoursesPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Training Institute"
        title="Courses"
        breadcrumbs={[{ label: "Training Institute", href: "/training" }, { label: "Courses" }]}
        intro="Four tracks, each tied to a published Competence Framework and a path into panel eligibility."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <CardGrid items={TRACKS} columns={2} />
      </section>

      <CtaBand
        title="Not sure which track fits?"
        primary={{ label: "Talk to Us", href: "/contact" }}
        secondary={{ label: "Certification Framework", href: "/training/certification" }}
      />
    </main>
  );
}
