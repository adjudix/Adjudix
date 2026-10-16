import { MechanismPage } from "@/components/patterns/mechanism-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hybrid ADR Mechanism (Med-Arb)",
  description:
    "Mediation first, with an automatic fallback to binding arbitration if a settlement isn't reached — the parties get a genuine chance to settle on their own…",
  path: "/dispute-resolution/hybrid",
});

export default function HybridPage() {
  return (
    <MechanismPage
      title="Hybrid ADR Mechanism (Med-Arb)"
      intro="Mediation first, with an automatic fallback to binding arbitration if a settlement isn't reached — the parties get a genuine chance to settle on their own terms, without losing the certainty of a final, binding outcome."
      howItWorks={[
        {
          title: "Mediation phase",
          description: "The parties attempt to settle through facilitated mediation, as a first step.",
        },
        {
          title: "Automatic escalation",
          description: "If mediation doesn't produce a settlement within the agreed window, the matter converts to arbitration.",
        },
        {
          title: "Arbitration phase",
          description: "Unsettled issues proceed to a binding arbitral award — before the same neutral, or a separate one if the clause says so.",
        },
      ]}
      legalBasis="The mediation phase is conducted under the Mediation Act, 2023, and the arbitration phase under the Arbitration and Conciliation Act, 1996. The two-stage structure is set out in the parties' arbitration clause or submission agreement, and in the Adjudix Code of ADR Procedure."
      faqs={[
        {
          question: "Why use a hybrid process instead of just arbitration?",
          answer: "It gives the parties a genuine opportunity to reach their own settlement first, while guaranteeing a binding outcome if they can't. Many commercial parties prefer to try mediation before committing to a fully adversarial process.",
        },
        {
          question: "Does the same neutral handle both phases?",
          answer: "You choose. Adjudix offers two kinds of Med-Arb: with the same neutral, who already knows the negotiations from mediation and carries on as arbitrator; or with separate neutrals, where the Institute appoints a different arbitrator. If your clause doesn't say, the same neutral continues. Our model clauses cover both options.",
        },
      ]}
    />
  );
}
