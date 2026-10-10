import { MechanismPage } from "@/components/patterns/mechanism-page";

export default function ArbitrationPage() {
  return (
    <MechanismPage
      title="Arbitration"
      intro="A neutral arbitrator (or panel of arbitrators) hears both sides and issues a binding, enforceable award — for both domestic disputes and cross-border commercial matters."
      howItWorks={[
        {
          title: "Notice & appointment",
          description: "The claimant files a notice; an arbitrator is appointed from the specialized panel.",
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
          answer: "Parties may jointly nominate an arbitrator from the specialized panel matched to their dispute type; if they can't agree, Adjudix appoints one.",
        },
        {
          question: "Does Adjudix handle international arbitration?",
          answer: "Yes, for both India-seated international commercial arbitration and cross-border matters where the parties choose Adjudix as the administering institution.",
        },
      ]}
    />
  );
}
