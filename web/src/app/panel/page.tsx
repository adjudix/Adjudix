import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

// The panel is shown by profession (client brief): one common panel rather
// than a separate roster per dispute type.
const PROFESSIONS = [
  { numeral: "I", title: "Lawyers", description: "Advocates and legal practitioners, including senior counsel and retired judicial officers." },
  { numeral: "II", title: "CA / CS", description: "Chartered accountants and company secretaries for financial, accounts, and corporate disputes." },
  { numeral: "III", title: "Engineers", description: "Civil, IT, and other engineers for construction, technology, and technical disputes." },
];

export default function PanelPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Dispute Resolution"
        title="Our Professional Panel"
        intro="Filterable by dispute type, profession, and jurisdiction — advocates, chartered accountants, civil engineers, IT engineers, and other professionals vetted before appointment to any case."
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-heading text-2xl font-semibold text-text">Panel categories</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {PROFESSIONS.map((profession) => (
            <div key={profession.title} className="rounded-lg border border-border bg-surface p-6">
              <span className="font-mono text-sm font-semibold text-primary">{profession.numeral}.</span>
              <h3 className="mt-2 font-heading text-lg font-semibold text-text">{profession.title}</h3>
              <p className="mt-2 font-body text-sm text-text-muted">{profession.description}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Apply to join our panel"
        description="Advocates, chartered accountants, company secretaries, and engineers of every discipline with relevant experience can apply."
        primary={{ label: "Apply to the Panel", href: "/contact" }}
        secondary={{ label: "Specialized Panels", href: "/dispute-resolution/panels" }}
      />
    </main>
  );
}
