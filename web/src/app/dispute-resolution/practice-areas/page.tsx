import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { CardGrid } from "@/components/ui/card-grid";
import { applyHref } from "@/lib/apply-forms";

const CATEGORIES = [
  { title: "Debt Recovery & Financial Claims", description: "Unpaid invoices, loan defaults, and disputed accounts.", href: "/dispute-resolution/practice-areas/debt-recovery" },
  { title: "Property Disputes", description: "Title, possession, and co-ownership disagreements.", href: "/dispute-resolution/practice-areas/property" },
  { title: "Contractual Disputes", description: "Breach, interpretation, and performance disagreements.", href: "/dispute-resolution/practice-areas/contractual" },
  { title: "Construction Disputes", description: "Delay, defect, and payment claims on projects.", href: "/dispute-resolution/practice-areas/construction" },
  { title: "Intellectual Property Disputes", description: "Licensing, infringement, and ownership disputes.", href: "/dispute-resolution/practice-areas/intellectual-property" },
  { title: "Employer–Employee Disputes", description: "Severance, non-compete, and workplace grievances.", href: "/dispute-resolution/practice-areas/employment" },
  { title: "Tenancy Disputes", description: "Rent, deposit, and possession disagreements.", href: "/dispute-resolution/practice-areas/tenancy" },
  { title: "Insurance Claims", description: "Repudiation, valuation, and coverage disputes.", href: "/dispute-resolution/practice-areas/insurance" },
  { title: "Partnership Disputes", description: "Profit-sharing, management, exit, and dissolution disputes between partners.", href: "/dispute-resolution/practice-areas/partnership" },
  { title: "Not Listed Otherwise", description: "Any other civil or commercial disagreement suited to ADR.", href: "/dispute-resolution/practice-areas/miscellaneous" },
];

export default function PracticeAreasPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Dispute Resolution"
        title="Practice Areas"
        breadcrumbs={[{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: "Practice Areas" }]}
        intro="The ten subject-matter streams in which Adjudix resolves disputes. Each matter is heard by neutrals from our Professional Panel with the right background for it — because a construction claim and an IP dispute need genuinely different expertise, not the same generalist roster."
        image={{ src: "/images/legal-review.jpg", alt: "Two people reviewing and signing paperwork" }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <CardGrid items={CATEGORIES} />
      </section>

      <CtaBand
        title="Not sure which category fits?"
        description="Tell us about your dispute and we'll route it to the right practice area."
        primary={{ label: "Book a Free Consultation", href: applyHref("consultation") }}
        secondary={{ label: "File a Dispute", href: "/odr/file" }}
      />
    </main>
  );
}
