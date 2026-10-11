import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { NumberedList } from "@/components/ui/numbered-list";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { LinkButton } from "@/components/ui/link-button";
import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  { title: "File", description: "Submit your case online with claimant, respondent, and dispute details." },
  { title: "Neutral appointed", description: "Adjudix appoints an arbitrator, mediator, or conciliator from its Professional Panel, matched to the practice area of the dispute." },
  { title: "Hearing", description: "Document exchange and hearings proceed under the Adjudix Code of ADR Procedure's timelines." },
  { title: "Award / settlement", description: "A binding award or signed settlement agreement closes the case." },
];

const ENTRY_POINTS = [
  { label: "File a Dispute", href: "/odr/file" },
  { label: "Respond to a Dispute", href: "/odr/respond" },
  { label: "Ad Hoc Appointment", href: "/odr/ad-hoc" },
  { label: "Portal Login", href: "/odr/portal" },
];

const FAQS = [
  {
    question: "Do I need a lawyer to use the ODR Platform?",
    answer: "No. The platform is built for individuals and businesses to file directly, though you're welcome to have counsel represent you at any stage.",
  },
  {
    question: "Is an online hearing legally equivalent to an in-person one?",
    answer: "Yes. Hearings conducted through the ODR Platform follow the same Adjudix Code of ADR Procedure as in-person hearings, and the resulting award or settlement has the same legal effect.",
  },
  {
    question: "What happens to my documents and data?",
    answer: "Case documents are held securely and are confidential to the parties and appointed neutral. See our Security & Enforceability page for details.",
  },
];

export default function OdrPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="ODR Platform"
        title="File, respond, or resolve — entirely online"
        intro="The ADR-i Portal takes a dispute from filing to a binding award or signed settlement, without either side needing to set foot in a courtroom."
        image={{ src: "/images/odr-video-hearing.jpg", alt: "A person joining an online hearing by video call" }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal className="flex flex-wrap gap-3">
          {ENTRY_POINTS.map((entry) => (
            <LinkButton key={entry.href} variant="secondary" size="lg" href={entry.href}>
              {entry.label}
            </LinkButton>
          ))}
        </Reveal>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-2xl font-semibold text-text">How it works</h2>
          <div className="mt-8">
            <NumberedList items={STEPS} columns={4} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <Reveal>
          <h2 className="font-heading text-xl font-semibold text-text">Built on a real legal basis</h2>
          <p className="mt-3 font-body text-text-muted">
            Every case filed through the platform is administered under the Arbitration and
            Conciliation Act, 1996, or the Mediation Act, 2023, depending on the mechanism chosen —
            not a private process with no statutory footing. See{" "}
            <span className="font-medium text-text">Security &amp; Enforceability</span> for the
            full legal and data-security basis.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="font-heading text-2xl font-semibold text-text mb-6">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={FAQS} />
      </section>

      <CtaBand
        title="Ready to begin?"
        primary={{ label: "File a Dispute", href: "/odr/file" }}
        secondary={{ label: "Get Help", href: "/odr/help" }}
      />
    </main>
  );
}
