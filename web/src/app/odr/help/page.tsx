import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Help & FAQs",
  description:
    "Answers to the most common questions about filing, responding, and using the ODR Platform.",
  path: "/odr/help",
});

const FAQS = [
  {
    question: "How do I file a dispute?",
    answer: "Use the File a Dispute form to submit your claim, dispute type, and respondent details. You'll receive a case reference number once it's reviewed.",
  },
  {
    question: "I've been named in a case — what do I do?",
    answer: "Use the Respond to a Dispute page with your case reference number to confirm your participation and access the case file.",
  },
  {
    question: "How much will my case cost?",
    answer: "Use the Rules & Fees Calculator for an indicative administrative fee before you file.",
  },
  {
    question: "What if I just need an arbitrator appointed for a process I'm already running?",
    answer: "That's the Ad Hoc Platform — an appointment-only service, without the full filing process.",
  },
  {
    question: "Who do I contact if I have a technical problem?",
    answer: "Reach our Secretariat through the Contact Us page and describe the issue; we'll follow up directly.",
  },
];

export default function OdrHelpPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="ODR Platform"
        title="Help & FAQs"
        breadcrumbs={[{ label: "ODR Platform", href: "/odr" }, { label: "Help" }]}
        intro="Answers to the most common questions about filing, responding, and using the ODR Platform."
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <FaqAccordion items={FAQS} />
      </section>

      <CtaBand
        title="Still need help?"
        primary={{ label: "Contact Us", href: applyHref("enquiry") }}
        secondary={{ label: "Back to ODR Platform", href: "/odr" }}
      />
    </main>
  );
}
