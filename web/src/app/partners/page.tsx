import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

const CATEGORIES = [
  { title: "Education Partners", description: "Law schools and universities referring students into our Training Institute.", href: "/partners/education" },
  { title: "Training Partners", description: "Organizations co-delivering courses alongside the Training Institute.", href: "/partners/training" },
  { title: "Corporate Partners", description: "Businesses with a preferred-rate relationship for dispute resolution services.", href: "/partners/corporate" },
];

export default function PartnersPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Our Partners"
        title="Institutional Partnerships"
        intro="Adjudix's network of education, training, and corporate partners — each category structured around a different kind of ongoing relationship."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-3 sm:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary"
            >
              <h2 className="font-heading text-lg font-semibold text-text group-hover:text-primary">
                {cat.title}
              </h2>
              <p className="mt-2 font-body text-sm text-text-muted">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Interested in partnering with Adjudix?"
        primary={{ label: "Talk to Us", href: "/contact" }}
      />
    </main>
  );
}
