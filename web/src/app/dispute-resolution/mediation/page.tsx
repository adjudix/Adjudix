import { MechanismPage } from "@/components/patterns/mechanism-page";

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
      legalBasis="Mediation at Adjudix follows the Mediation Act, 2023, and Adjudix's Code of Procedure. A settlement agreement reached in mediation is enforceable in the same manner as a judgment of a court, once registered as required under the Act."
      faqs={[
        {
          question: "Is mediation binding?",
          answer: "The process itself isn't binding — either party can withdraw at any point. Once a settlement agreement is signed, however, it becomes enforceable.",
        },
        {
          question: "What happens if mediation doesn't reach a settlement?",
          answer: "The parties remain free to pursue arbitration, litigation, or another mechanism. Nothing said during mediation can be used against a party later.",
        },
      ]}
    />
  );
}
