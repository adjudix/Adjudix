import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { MechanismPage } from "@/components/patterns/mechanism-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Conciliation",
  description:
    "A more active neutral than a mediator, a conciliator actively proposes settlement terms for both sides to accept, reject, or refine — a middle path between…",
  path: "/dispute-resolution/conciliation",
});

function ConciliationPage() {
  return (
    <MechanismPage
      title="Conciliation"
      intro="A more active neutral than a mediator, a conciliator actively proposes settlement terms for both sides to accept, reject, or refine — a middle path between mediation and arbitration."
      howItWorks={[
        {
          title: "Invitation & agreement",
          description: "One party invites conciliation; proceedings begin once the other side agrees.",
        },
        {
          title: "Statements of position",
          description: "Each side submits a written statement describing the dispute and their position.",
        },
        {
          title: "Proposed terms",
          description: "The conciliator proposes settlement terms, which the parties can accept, reject, or negotiate.",
        },
        {
          title: "Settlement agreement",
          description: "Accepted terms are recorded in a signed settlement agreement.",
        },
      ]}
      legalBasis="Conciliation at Adjudix is conducted under Part III of the Arbitration and Conciliation Act, 1996. A settlement agreement signed by both parties has the same status and effect as an arbitral award on agreed terms."
      faqs={[
        {
          question: "How is conciliation different from mediation?",
          answer: "A mediator facilitates the parties toward their own solution; a conciliator actively proposes settlement terms of their own for the parties to consider.",
        },
        {
          question: "Is the conciliator's proposal binding?",
          answer: "No — the parties must actively accept a proposed settlement in writing before it becomes binding.",
        },
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/dispute-resolution/conciliation", metadata);
export default editablePage("/dispute-resolution/conciliation", ConciliationPage, metadata);
