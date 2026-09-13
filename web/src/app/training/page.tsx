import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import Image from "next/image";

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
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative aspect-4/3 overflow-hidden rounded-lg order-first">
            <Image
              src="/images/training-workshop.jpg"
              alt="A presenter addressing a seated professional workshop group"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-semibold text-text">
              From first course to panel appointment
            </h2>
            <p className="mt-4 font-body text-text-muted">
              Training at Adjudix isn&apos;t a standalone certificate mill — it&apos;s connected
              directly to panel eligibility and membership standing. What you learn in a track is
              what a client is actually trusting when they see your credential.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-2xl font-semibold text-text">Course tracks</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {TRACKS.map((track) => (
              <Link
                key={track.title}
                href={track.href}
                className="group rounded-lg border border-border bg-canvas p-6 transition-colors hover:border-primary"
              >
                <h3 className="font-heading text-lg font-semibold text-text group-hover:text-primary">
                  {track.title}
                </h3>
                <p className="mt-2 font-body text-sm text-text-muted">{track.description}</p>
              </Link>
            ))}
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
