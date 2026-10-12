import { MechanismPage } from "@/components/patterns/mechanism-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Arbitration",
  description:
    "A neutral arbitrator (or panel of arbitrators) hears both sides and issues a binding, enforceable award — for both domestic disputes and cross-border…",
  path: "/dispute-resolution/arbitration",
});

export default function ArbitrationPage() {
  return (
    <MechanismPage
      title="Arbitration"
      intro="A neutral arbitrator (or panel of arbitrators) hears both sides and issues a binding, enforceable award — for both domestic disputes and cross-border commercial matters."
      howItWorks={[
        {
          title: "Notice & appointment",
          description: "The claimant files a notice; an arbitrator is appointed from our Professional Panel.",
        },
        {
          title: "Pleadings & evidence",
          description: "Both sides exchange statements of claim and defence, and submit supporting evidence.",
        },
        {
          title: "Hearing",
          description: "The arbitrator hears arguments, in person or online, under the Adjudix Code of ADR Procedure's timelines.",
        },
        {
          title: "Award",
          description: "A reasoned, binding award is issued and is enforceable as a decree of court.",
        },
      ]}
      legalBasis="Arbitration under Adjudix is conducted in accordance with the Arbitration and Conciliation Act, 1996 (as amended), and the Adjudix Code of ADR Procedure, 2026. Awards are enforceable in the same manner as a decree of a civil court, and international awards are enforceable under the New York Convention where applicable."
      faqs={[
        {
          question: "Is an Adjudix arbitration award final?",
          answer: "Yes. An arbitral award is final and binding on the parties, subject only to the limited grounds for challenge set out in Section 34 of the Arbitration and Conciliation Act, 1996.",
        },
        {
          question: "Can I choose my own arbitrator?",
          answer: "Parties may jointly nominate an arbitrator from our Professional Panel, matched to the practice area of the dispute; otherwise Adjudix appoints one.",
        },
        {
          question: "Does Adjudix handle international arbitration?",
          answer: "Yes, for both India-seated international commercial arbitration and cross-border matters where the parties choose Adjudix as the administering institution.",
        },
        {
          question: "Will Adjudix help implement the award?",
          answer: "Yes — implementation is our USP. Adjudix carries the award through to enforcement in India and in any New York Convention country, under the applicable laws of the concerned country.",
        },
        {
          question: "What if I need urgent relief before the tribunal is formed?",
          answer: "Apply for Emergency Arbitration. An emergency arbitrator can grant interim relief before the full tribunal is constituted.",
        },
        {
          question: "Can we try mediation first and still get a binding award?",
          answer: "Yes. Our Hybrid ADR Mechanism (Med-Arb) starts with mediation and converts to binding arbitration if a settlement isn't reached.",
        },
        {
          question: "Can arbitration be conducted online or offline?",
          answer: "Both. Hearings can run fully on the ODR Platform, fully in person, or a mix of the two.",
        },
        {
          question: "Do you draft arbitration clauses?",
          answer: "Yes. Our Contract & Clause Drafting service tailors the clause to your contract; ready-to-insert language is on the Model Clauses page.",
        },
        {
          question: "How are fees calculated?",
          answer: "The platform's administrative fee is a tiered percentage of the amount in dispute — see the Rules & Fees Calculator for an example estimate. Arbitrator fees are separate.",
        },
      ]}
    />
  );
}
