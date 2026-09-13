import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

export default function DirectoryPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Membership"
        title="Our Esteemed Members"
        breadcrumbs={[{ label: "Membership", href: "/membership" }, { label: "Our Esteemed Members" }]}
        intro="A public showcase of Adjudix members, filterable by tier, specialization, and location — published only with each member's explicit consent."
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-lg border border-border bg-surface p-8">
          <h2 className="font-heading text-xl font-semibold text-text">
            Our founding members are joining now
          </h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
            As Adjudix&apos;s membership register grows, consenting members will be featured here with
            their tier, specialization, and credentials. Interested in being among the first?
          </p>
        </div>
      </section>

      <CtaBand
        title="Become a member"
        primary={{ label: "Compare Tiers", href: "/membership" }}
        secondary={{ label: "Talk to Us", href: "/contact" }}
      />
    </main>
  );
}
