import { MechanismPage } from "@/components/patterns/mechanism-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mediation",
  description:
    "A neutral mediator facilitates a structured conversation between the parties — the outcome is whatever the parties themselves agree to, not something imposed…",
  path: "/dispute-resolution/mediation",
});

export default function MediationPage() {
  return (
    <MechanismPage
      title="Mediation"
      intro="A neutral mediator facilitates a structured conversation between the parties — the outcome is whatever the parties themselves agree to, not something imposed on them."
      howItWorks={[
        {
          title: "Request & mediator appointment",
          description: "Either party requests mediation; a mediator is appointed from the panel.",
        },
        {
          title: "Joint & private sessions",
          description: "The mediator meets with both parties together and separately to surface real interests.",
        },
        {
          title: "Settlement",
          description: "If terms are reached, they're recorded in a written settlement agreement.",
        },
      ]}
      legalBasis="Mediation at Adjudix follows the Mediation Act, 2023, and the Adjudix Code of ADR Procedure. A settlement agreement reached in mediation is enforceable in the same manner as a judgment of a court, once registered as required under the Act."
      faqs={[
        {
          question: "Is mediation binding?",
          answer: "The process itself isn't binding — either party can withdraw at any point. Once a settlement agreement is signed, however, it becomes enforceable.",
        },
        {
          question: "What happens if mediation doesn't reach a settlement?",
          answer: "The parties remain free to pursue arbitration, litigation, or another mechanism. Nothing said during mediation can be used against a party later.",
        },
        {
          question: "What is the Mediation Act, 2023?",
          answer: "India's first standalone law on mediation. It covers pre-litigation mediation, institutional and online mediation, the confidentiality of what is said in mediation, and the enforcement of mediated settlements, and it sets up the Mediation Council of India to regulate mediators and mediation institutions.",
        },
        {
          question: "How long can a mediation under the Act take?",
          answer: "The Act sets a limit of 120 days from the first appearance before the mediator, which the parties may extend by consent for up to 60 more days. Most Adjudix mediations finish well inside that window.",
        },
        {
          question: "Can a mediated settlement be challenged?",
          answer: "Only on narrow grounds: fraud, corruption, impersonation, or that the dispute was not fit for mediation. Otherwise a signed mediated settlement agreement is final and binding and can be enforced like a court judgment.",
        },
      ]}
    />
  );
}
