import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

const POINTS = [
  {
    title: "Statutory basis",
    body: "Arbitration proceedings are governed by the Arbitration and Conciliation Act, 1996; mediation and conciliation by the Mediation Act, 2023 and Part III of the 1996 Act respectively.",
  },
  {
    title: "Enforceability",
    body: "Arbitral awards are enforceable as a decree of a civil court. Settlement agreements from mediation and conciliation carry equivalent enforceable status once executed.",
  },
  {
    title: "Confidentiality",
    body: "Case documents and hearing content are confidential to the parties and the appointed neutral, disclosed only where the parties agree or the law requires it.",
  },
  {
    title: "Data handling",
    body: "Personal and case data submitted through the ODR Platform is used only for administering your case, consistent with applicable data protection law.",
  },
];

export default function SecurityPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="ODR Platform"
        title="Security & Enforceability"
        breadcrumbs={[{ label: "ODR Platform", href: "/odr" }, { label: "Security & Enforceability" }]}
        intro="A dispute resolved online is only worth something if the outcome actually holds up. Here's the legal and data-security basis behind every case filed through the ODR Platform."
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="divide-y divide-border border-t border-b border-border">
          {POINTS.map((point) => (
            <div key={point.title} className="py-6">
              <h2 className="font-heading text-lg font-semibold text-text">{point.title}</h2>
              <p className="mt-2 font-body text-sm text-text-muted">{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Questions about how your case is handled?"
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Read Our Privacy Policy", href: "/privacy" }}
      />
    </main>
  );
}
