import { MechanismPage } from "@/components/patterns/mechanism-page";

export default function LokAdalatPage() {
  return (
    <MechanismPage
      title="Lok Adalat"
      intro="A statutory forum for compromise settlement under the Legal Services Authorities Act, 1987 — distinct from arbitration or mediation in that its jurisdiction and effect come from statute, not from an agreement between the parties."
      howItWorks={[
        {
          title: "Eligible matter identified",
          description: "Only compoundable civil disputes and certain pre-litigation matters qualify.",
        },
        {
          title: "Reference to Lok Adalat",
          description: "The matter is referred with the consent of both parties.",
        },
        {
          title: "Compromise hearing",
          description: "A panel assists both sides toward a mutually acceptable compromise.",
        },
        {
          title: "Award",
          description: "A settlement has the force of a civil court decree and is final — there is no appeal.",
        },
      ]}
      legalBasisTitle="Legal basis — read this carefully"
      legalBasis="Lok Adalat is a statutory mechanism under the Legal Services Authorities Act, 1987, not a contractual one. Adjudix facilitates access to this forum for eligible matters, but does not itself constitute the Lok Adalat — that authority sits with the Legal Services Authorities. An award made in Lok Adalat is final and binding, and no appeal lies against it."
      faqs={[
        {
          question: "Is Lok Adalat the same as arbitration?",
          answer: "No. Lok Adalat is a statutory compromise forum under the Legal Services Authorities Act — its authority comes from that Act, not from a contract between the parties, as arbitration does.",
        },
        {
          question: "What kinds of disputes qualify?",
          answer: "Generally, compoundable civil disputes and certain matters at the pre-litigation stage. Adjudix can help you confirm whether your matter is eligible.",
        },
      ]}
      filingLabel="Check Eligibility"
      filingHref="/contact"
    />
  );
}
