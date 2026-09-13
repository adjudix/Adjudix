import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { CardGrid } from "@/components/ui/card-grid";
import { Reveal } from "@/components/ui/reveal";

const TRACKS = [
  {
    title: "Arbitrator Track",
    description: "Professional and student tracks toward panel-eligible arbitration practice.",
    href: "/training/courses/arbitrator",
  },
  {
    title: "Conciliator Track",
    description: "Training in active, proposal-led settlement facilitation.",
    href: "/training/courses/conciliator",
  },
  {
    title: "Mediator Track",
    description: "Facilitative technique for guiding parties to their own settlement.",
    href: "/training/courses/mediator",
  },
  {
    title: "Contract Drafting Track",
    description: "Drafting enforceable arbitration and mediation clauses for commercial contracts.",
    href: "/training/courses/contract-drafting",
  },
];

export default function TrainingPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Training Institute"
        title="A serious credential, not an afterthought"
        intro="Professional and student tracks for arbitrators, conciliators, and mediators, each tied to a published Competence Framework — so a certificate actually means something to a client checking it."
        image={{ src: "/images/training-workshop.jpg", alt: "A presenter addressing a seated professional workshop group" }}
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold text-text">
            From first course to panel appointment
          </h2>
          <p className="mt-4 font-body text-text-muted">
            Training at Adjudix isn&apos;t a standalone certificate mill — it&apos;s connected
            directly to panel eligibility and membership standing. What you learn in a track is
            what a client is actually trusting when they see your credential.
          </p>
        </Reveal>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-heading text-2xl font-semibold text-text">Course tracks</h2>
          </Reveal>
          <div className="mt-8">
            <CardGrid items={TRACKS} columns={2} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Explore the full picture"
        description="See what each certificate attests to, meet our faculty, or check the calendar."
        primary={{ label: "Certification Framework", href: "/training/certification" }}
        secondary={{ label: "View Calendar", href: "/training/calendar" }}
      />
    </main>
  );
}
