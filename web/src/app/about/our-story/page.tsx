import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

export default function OurStoryPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="About Adjudix"
        title="Our Story"
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Our Story" }]}
        intro="Adjudix Dispute Resolution Institute was founded on a simple observation: the parties to a dispute rarely disagree about wanting it resolved fairly and quickly — they disagree about how. Institutional ADR removes that second disagreement before it starts."
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-heading text-2xl font-semibold text-text">Vision</h2>
        <p className="mt-4 font-body text-text-muted">
          To be the dispute resolution institute India&apos;s businesses, professionals, and
          individuals turn to first — not as a fallback when litigation feels too slow, but as
          the deliberate, first choice for resolving a disagreement under a fair, published
          procedure.
        </p>
        <h2 className="mt-12 font-heading text-2xl font-semibold text-text">Mission</h2>
        <p className="mt-4 font-body text-text-muted">
          Adjudix administers arbitration, mediation, conciliation, and online dispute
          resolution under one Code of Procedure; trains the next generation of arbitrators,
          conciliators, and mediators through a structured Training Institute; and maintains a
          professional membership register that means something because it is earned, not
          simply purchased.
        </p>
      </section>

      <CtaBand
        title="Read our founding principles"
        description="The Moral Code of Principles &amp; Doctrines sets out the ethical commitments behind every case we administer."
        primary={{ label: "Read the Moral Code", href: "/about/moral-code" }}
        secondary={{ label: "Meet Our Leadership", href: "/about/leadership" }}
      />
    </main>
  );
}
