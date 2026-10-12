import { MechanismPage } from "@/components/patterns/mechanism-page";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Implementation of ADR Orders & Awards",
  description:
    "An award or settlement only matters once it is carried out. Adjudix takes your arbitral award, mediated settlement, or Lok Adalat order through to…",
  path: "/implementation",
});

export default function ImplementationPage() {
  return (
    <MechanismPage
      eyebrow="Implementation of ADR Orders"
      title="Implementation of ADR Orders & Awards"
      intro="An award or settlement only matters once it is carried out. Adjudix takes your arbitral award, mediated settlement, or Lok Adalat order through to implementation — in India and globally — so a dispute that is resolved on paper is resolved in fact."
      howItWorks={[
        {
          title: "Book a consultation",
          description: "Share the award, order, or settlement agreement and the counterparty's details with our team.",
        },
        {
          title: "Enforcement strategy",
          description: "We assess where the counterparty's assets are and which forum and law apply to enforcement.",
        },
        {
          title: "Execution",
          description: "Enforcement proceedings are filed and pursued through our professional panel, wherever they are needed.",
        },
        {
          title: "Recovery",
          description: "The order is carried out and the outcome is reported back to you at every step.",
        },
      ]}
      legalBasisTitle="How enforcement works"
      legalBasis="A domestic arbitral award is enforced in the same manner as a decree of court under Section 36 of the Arbitration and Conciliation Act, 1996. Foreign awards are enforced under Part II of the Act, which gives effect to the New York Convention, 1958, and awards made in India can be enforced abroad in any Convention country under that country's applicable laws. Mediated settlement agreements are enforceable under the Mediation Act, 2023, and Lok Adalat awards are deemed decrees of a civil court."
      faqs={[
        {
          question: "Can Adjudix implement an award it did not administer?",
          answer: "Yes. Book a consultation with the award or order you hold, and our team will advise on enforcement whichever institution or tribunal issued it.",
        },
        {
          question: "Can an award be enforced outside India?",
          answer: "Yes. Awards made in India can be enforced in any New York Convention country under that country's applicable laws, and Adjudix coordinates implementation globally through its professional panel.",
        },
      ]}
      filingLabel="Book a Consultation"
      filingHref={applyHref("implementation")}
    />
  );
}
