import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { CardGrid } from "@/components/ui/card-grid";
import { applyHref } from "@/lib/apply-forms";

const CATEGORIES = [
  { title: "Education Partners", description: "Law schools and universities referring students into our Training Institute.", href: "/partners/education" },
  { title: "Training Partners", description: "Organizations co-delivering courses alongside the Training Institute.", href: "/partners/training" },
  { title: "Corporate Partners", description: "Businesses with a preferred-rate relationship for dispute resolution services. Kept confidential.", href: "/partners/corporate" },
];

export default function PartnersPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Our Partners"
        title="Institutional Partnerships"
        intro="Adjudix's network of education, training, and corporate partners — each category structured around a different kind of ongoing relationship."
        image={{ src: "/images/handshake-resolution.jpg", alt: "Close-up handshake between two professionals" }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <CardGrid items={CATEGORIES} />
      </section>

      <CtaBand
        title="Interested in partnering with Adjudix?"
        primary={{ label: "Become a Partner", href: applyHref("partnership") }}
      />
    </main>
  );
}
