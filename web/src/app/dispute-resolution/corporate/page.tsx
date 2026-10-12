import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { NumberedList } from "@/components/ui/numbered-list";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Corporate Dispute Resolution Services",
  description:
    "Built for how businesses actually decide: disputes resolved through a standing relationship with Adjudix, without disrupting the underlying commercial…",
  path: "/dispute-resolution/corporate",
});

const BENEFITS = [
  {
    title: "Bespoke panel access",
    description: "A relationship team matches each dispute to the right practice area and neutral, every time.",
  },
  {
    title: "Ready-to-insert clauses",
    description: "Arbitration and mediation clauses drafted for your standard commercial contracts.",
  },
  {
    title: "Dedicated relationship team",
    description: "One point of contact across every matter, not a new intake process each time.",
  },
];

export default function CorporatePage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="For businesses"
        title="Corporate Dispute Resolution Services"
        breadcrumbs={[{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: "Corporate Services" }]}
        intro="Built for how businesses actually decide: disputes resolved through a standing relationship with Adjudix, without disrupting the underlying commercial relationship with your counterparty."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-text">
              A standing relationship, not a one-off filing
            </h2>
            <p className="mt-4 font-body text-text-muted">
              Corporate clients rarely have just one dispute. Adjudix&apos;s corporate service sets up
              a standing relationship: pre-agreed clause language for your contracts, a
              relationship team that already understands your business, and priority routing to
              the right practice area for whatever category of dispute arises.
            </p>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-lg">
            <Image
              src="/images/boardroom-collaboration.jpg"
              alt="A panel presenting a case analysis to a seated group around a conference table"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-2xl font-semibold text-text">What&apos;s included</h2>
          <div className="mt-8">
            <NumberedList items={BENEFITS} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Set up a corporate relationship"
        description="Talk to our team about clause language, panel access, and pricing for your business."
        primary={{ label: "Talk to Us", href: applyHref("corporate") }}
        secondary={{ label: "Clause Drafting", href: "/dispute-resolution/clause-drafting" }}
      />
    </main>
  );
}
