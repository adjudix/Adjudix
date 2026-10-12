import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { CardGrid } from "@/components/ui/card-grid";
import { TRAINING_TRACKS as TRACKS } from "@/lib/training-tracks";
import { Reveal } from "@/components/ui/reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Training & Certification Institute",
  description:
    "Six professional and student tracks — ADR Overview, Arbitration, Mediation, Conciliation, Contract Drafting, and Hybrid ADR — each tied to a published…",
  path: "/training",
});

export default function TrainingPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Training Institute"
        title="A serious credential, not an afterthought"
        intro="Six professional and student tracks — ADR Overview, Arbitration, Mediation, Conciliation, Contract Drafting, and Hybrid ADR — each tied to a published Competence Framework — so a certificate actually means something to a client checking it."
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
        description="See what each certificate attests to, meet our faculty, or see upcoming courses."
        primary={{ label: "Certification Framework", href: "/training/certification" }}
        secondary={{ label: "Upcoming Courses", href: "/training/calendar" }}
      />
    </main>
  );
}
