import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { FeeCalculator } from "./fee-calculator";

export default function FeesPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Rules & Governance"
        title="Rules & Fees Calculator"
        breadcrumbs={[{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: "Fees Calculator" }]}
        intro="An indicative estimate of Adjudix's administrative fee, based on the amount in dispute. Arbitrator or mediator fees are separate and confirmed at filing."
      />

      <section className="mx-auto max-w-2xl px-6 py-16">
        <FeeCalculator />
      </section>

      <CtaBand
        title="Ready to file?"
        description="Start your case through the ODR Platform, with a confirmed fee before you submit."
        primary={{ label: "File a Dispute", href: "/odr/file" }}
        secondary={{ label: "Code of Procedure", href: "/dispute-resolution/rules/code-of-procedure" }}
      />
    </main>
  );
}
