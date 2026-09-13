import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

const CATEGORIES = [
  { title: "Debt Recovery & Financial Claims", href: "/dispute-resolution/panels/debt-recovery" },
  { title: "Property Disputes", href: "/dispute-resolution/panels/property" },
  { title: "Contractual Disputes", href: "/dispute-resolution/panels/contractual" },
  { title: "Construction Disputes", href: "/dispute-resolution/panels/construction" },
  { title: "Intellectual Property Disputes", href: "/dispute-resolution/panels/intellectual-property" },
  { title: "Employer–Employee Disputes", href: "/dispute-resolution/panels/employment" },
  { title: "Tenancy Disputes", href: "/dispute-resolution/panels/tenancy" },
  { title: "Insurance Claims", href: "/dispute-resolution/panels/insurance" },
  { title: "Miscellaneous", href: "/dispute-resolution/panels/miscellaneous" },
];

export default function PanelPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Dispute Resolution"
        title="Our Professional Panel"
        intro="Filterable by dispute type, profession, and jurisdiction — advocates, chartered accountants, and civil engineers vetted before appointment to any case."
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-lg border border-border bg-surface p-8">
          <h2 className="font-heading text-xl font-semibold text-text">
            Founding panel — empanelling now
          </h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
            Adjudix is building its founding panel across all nine specialized categories.
            Qualified advocates, chartered accountants, and civil engineers can apply below;
            a filterable public directory will publish here as panelists are confirmed.
          </p>
        </div>

        <h2 className="mt-12 font-heading text-xl font-semibold text-text">
          Panel categories
        </h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="rounded-full border border-border px-4 py-1.5 font-body text-sm text-text-muted hover:border-primary hover:text-primary"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Apply to join our panel"
        description="Advocates, chartered accountants, and civil engineers with relevant experience can apply."
        primary={{ label: "Apply to the Panel", href: "/contact" }}
        secondary={{ label: "Specialized Panels", href: "/dispute-resolution/panels" }}
      />
    </main>
  );
}
