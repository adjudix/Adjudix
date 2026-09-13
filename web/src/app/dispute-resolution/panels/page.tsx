import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { CardGrid } from "@/components/ui/card-grid";

const CATEGORIES = [
  { title: "Debt Recovery & Financial Claims", description: "Unpaid invoices, loan defaults, and disputed accounts.", href: "/dispute-resolution/panels/debt-recovery" },
  { title: "Property Disputes", description: "Title, possession, and co-ownership disagreements.", href: "/dispute-resolution/panels/property" },
  { title: "Contractual Disputes", description: "Breach, interpretation, and performance disagreements.", href: "/dispute-resolution/panels/contractual" },
  { title: "Construction Disputes", description: "Delay, defect, and payment claims on projects.", href: "/dispute-resolution/panels/construction" },
  { title: "Intellectual Property Disputes", description: "Licensing, infringement, and ownership disputes.", href: "/dispute-resolution/panels/intellectual-property" },
  { title: "Employer–Employee Disputes", description: "Severance, non-compete, and workplace grievances.", href: "/dispute-resolution/panels/employment" },
  { title: "Tenancy Disputes", description: "Rent, deposit, and possession disagreements.", href: "/dispute-resolution/panels/tenancy" },
  { title: "Insurance Claims", description: "Repudiation, valuation, and coverage disputes.", href: "/dispute-resolution/panels/insurance" },
  { title: "Miscellaneous", description: "Any other civil or commercial disagreement suited to ADR.", href: "/dispute-resolution/panels/miscellaneous" },
];

export default function PanelsPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Dispute Resolution"
        title="Specialized Panels"
        breadcrumbs={[{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: "Specialized Panels" }]}
        intro="Nine dispute-type categories, each with panelists vetted specifically for that kind of case — because a construction claim and an IP dispute need genuinely different expertise, not the same generalist roster."
        image={{ src: "/images/legal-review.jpg", alt: "Two people reviewing and signing paperwork" }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <CardGrid items={CATEGORIES} />
      </section>

      <CtaBand
        title="Not sure which category fits?"
        description="Tell us about your dispute and we'll route it to the right panel."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "File a Dispute", href: "/odr/file" }}
      />
    </main>
  );
}
