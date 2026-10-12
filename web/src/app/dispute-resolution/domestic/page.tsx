import { MechanismPage } from "@/components/patterns/mechanism-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Domestic Dispute Resolution",
  description:
    "For disputes between parties within India — commercial, contractual, employment, or civil — resolved under Indian law through whichever mechanism fits the…",
  path: "/dispute-resolution/domestic",
});

export default function DomesticDisputeResolutionPage() {
  return (
    <MechanismPage
      title="Domestic Dispute Resolution"
      intro="For disputes between parties within India — commercial, contractual, employment, or civil — resolved under Indian law through whichever mechanism fits the case: arbitration, mediation, conciliation, Lok Adalat, emergency arbitration, hybrid Med-Arb, or corporate ADR."
      howItWorks={[
        {
          title: "Intake & mechanism fit",
          description: "Adjudix reviews the dispute and the parties' clause (if any) to route it to the right process.",
        },
        {
          title: "Panel assignment",
          description: "A neutral is appointed from our Professional Panel, matched to the practice area of the dispute.",
        },
        {
          title: "Proceedings",
          description: "Hearings or sessions run under the Adjudix Code of ADR Procedure's domestic timelines, in person or online.",
        },
        {
          title: "Binding outcome",
          description: "An award, settlement, or consent decree is issued, enforceable under Indian law.",
        },
      ]}
      legalBasis="Domestic matters are administered under the Arbitration and Conciliation Act, 1996, the Mediation Act, 2023, and — for Lok Adalat referrals — the Legal Services Authorities Act, 1987, alongside the Adjudix Code of ADR Procedure, 2026."
      faqs={[
        {
          question: "Which mechanism should I choose for a domestic dispute?",
          answer: "It depends on the relationship and the outcome you need: arbitration for a binding award, mediation or conciliation to preserve a relationship, Lok Adalat for eligible matters, emergency arbitration for urgent interim relief, hybrid Med-Arb to try settlement before a binding award, or corporate ADR for an ongoing business relationship. Each has its own page under Dispute Resolution.",
        },
        {
          question: "Do both parties need to be based in India?",
          answer: "A dispute is treated as domestic when it doesn't involve a foreign party or cross-border enforcement question. If either applies, see International Dispute Resolution instead.",
        },
        {
          question: "Can domestic proceedings be conducted online?",
          answer: "Yes — Adjudix's ODR Platform supports fully online domestic proceedings, or a hybrid of online and in-person sessions where the parties prefer it.",
        },
      ]}
    />
  );
}
