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

export default function PanelsPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Dispute Resolution"
        title="Specialized Panels"
        breadcrumbs={[{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: "Specialized Panels" }]}
        intro="Nine dispute-type categories, each with panelists vetted specifically for that kind of case — because a construction claim and an IP dispute need genuinely different expertise, not the same generalist roster."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary"
            >
              <h2 className="font-heading text-lg font-semibold text-text group-hover:text-primary">
                {cat.title}
              </h2>
              <span className="mt-3 inline-block text-sm font-medium text-primary">
                View panel &rarr;
              </span>
            </Link>
          ))}
        </div>
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
