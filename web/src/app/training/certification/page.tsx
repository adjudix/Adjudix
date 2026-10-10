import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import Link from "next/link";

const RUBRIC = [
  {
    track: "ADR Overview",
    attests: "A working understanding of every ADR mechanism and how outcomes are implemented. Eligible for all.",
  },
  {
    track: "Arbitrator",
    attests: "Competence to conduct a hearing and issue a reasoned, enforceable award under the Adjudix Code of ADR Procedure.",
  },
  {
    track: "Conciliator",
    attests: "Competence to actively propose and help finalize settlement terms both parties accept.",
  },
  {
    track: "Mediator",
    attests: "Competence to facilitate a settlement the parties reach themselves, without proposing terms.",
  },
  {
    track: "Contract Drafting",
    attests: "Competence to draft enforceable dispute resolution clauses for commercial contracts.",
  },
  {
    track: "Hybrid ADR",
    attests: "Competence to run a hybrid process from mediation through to a binding award, keeping each phase's confidentiality intact.",
  },
];

export default function CertificationPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Training Institute"
        title="Certification & Competence Framework"
        breadcrumbs={[{ label: "Training Institute", href: "/training" }, { label: "Certification" }]}
        intro="What each Adjudix certificate actually attests to — published plainly, so a client evaluating a certificate-holder knows exactly what they're trusting."
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="divide-y divide-border border-t border-b border-border">
          {RUBRIC.map((row) => (
            <div key={row.track} className="py-6">
              <h2 className="font-heading text-lg font-semibold text-text">{row.track}</h2>
              <p className="mt-2 font-body text-sm text-text-muted">{row.attests}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-xl font-semibold text-text">
            How certification connects to the panel and membership
          </h2>
          <p className="mt-3 font-body text-text-muted">
            Completing a track is the entry route into{" "}
            <Link href="/dispute-resolution/panels" className="text-primary hover:underline">
              Specialized Panel
            </Link>{" "}
            eligibility and{" "}
            <Link href="/membership" className="text-primary hover:underline">
              Associate membership
            </Link>
            . Certification alone doesn&apos;t guarantee panel appointment — panelists are also
            vetted for experience and conduct — but it is the defined starting point.
          </p>
        </div>
      </section>

      <CtaBand
        title="Ready to enroll?"
        primary={{ label: "Browse Courses", href: "/training/courses" }}
        secondary={{ label: "View Our Panel", href: "/panel" }}
      />
    </main>
  );
}
