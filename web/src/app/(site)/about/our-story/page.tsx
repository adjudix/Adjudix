import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Our Story",
  description:
    "Adjudix Dispute Resolution Institute was founded on a simple observation: the parties to a dispute rarely disagree about wanting it resolved fairly and…",
  path: "/about/our-story",
});

function OurStoryPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="About Adjudix"
        title="Our Story"
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Our Story" }]}
        intro="Adjudix Dispute Resolution Institute was founded on a simple observation: the parties to a dispute rarely disagree about wanting it resolved fairly and quickly — they disagree about how. Institutional ADR removes that second disagreement before it starts — and Adjudix carries the matter through to implementation of the order or award, backed by a Training Institute that builds the profession."
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-heading text-2xl font-semibold text-text">Vision</h2>
        <p className="mt-4 font-body text-text-muted">
          To be the dispute resolution institute that businesses, professionals, and
          individuals around the world turn to first — not as a fallback when litigation feels too slow, but as
          the deliberate, first choice for resolving a disagreement under a fair, published
          procedure.
        </p>
        <h2 className="mt-12 font-heading text-2xl font-semibold text-text">Mission</h2>
        <p className="mt-4 font-body text-text-muted">
          Adjudix administers arbitration, mediation, conciliation, Lok Adalat, emergency
          arbitration, hybrid Med-Arb, and corporate ADR, online and offline, under the Adjudix
          Code of ADR Procedure; secures the implementation of orders and awards globally; trains the next generation of arbitrators,
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

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/about/our-story", metadata);
export default editablePage("/about/our-story", OurStoryPage, metadata);
