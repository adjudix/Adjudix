import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq-accordion";

const faqItems = [
  {
    question: "What is Adjudix?",
    answer:
      "Adjudix Dispute Resolution Institute is an arbitration, mediation, conciliation, and online dispute resolution institute.",
  },
  {
    question: "How do I file a dispute?",
    answer: "Use the ODR Platform's filing flow, accessible from this page.",
  },
];

export default function Home() {
  return (
    <main className="bg-canvas min-h-screen flex-1">
      <section className="bg-hero text-text-on-hero px-8 py-24 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold text-balance">
          Adjudix Dispute Resolution Institute
        </h1>
        <p className="mt-4 font-body text-lg text-text-on-hero-muted max-w-2xl mx-auto">
          Dialogue. Dispute. Resolution. A better tomorrow.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Button variant="primary" size="lg">
            File a Dispute
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="border-border-on-hero text-text-on-hero"
          >
            Explore Training Institute
          </Button>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-8 py-16">
        <h2 className="font-heading text-2xl font-semibold text-text mb-6">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={faqItems} />
      </section>
    </main>
  );
}
