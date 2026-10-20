import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { MechanismPage } from "@/components/patterns/mechanism-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "International Dispute Resolution",
  description:
    "For cross-border disputes involving a foreign party, foreign-seated proceedings, or a foreign award — administered with the choice-of-law, seat, and…",
  path: "/dispute-resolution/international",
});

function InternationalDisputeResolutionPage() {
  return (
    <MechanismPage
      title="International Dispute Resolution"
      intro="For cross-border disputes involving a foreign party, foreign-seated proceedings, or a foreign award — administered with the choice-of-law, seat, and enforcement questions cross-border matters raise."
      howItWorks={[
        {
          title: "Seat & governing law",
          description: "The parties' clause (or Adjudix, by default) fixes the seat, the governing law, and the language of proceedings.",
        },
        {
          title: "International panel appointment",
          description: "A neutral is appointed from Adjudix's international panel, with cross-border and multi-jurisdictional experience.",
        },
        {
          title: "Proceedings across time zones",
          description: "Hearings run online or in a neutral venue, scheduled to accommodate the parties' time zones.",
        },
        {
          title: "Award & cross-border enforcement",
          description: "The award or settlement is drafted for recognition and enforcement in the relevant foreign jurisdiction.",
        },
      ]}
      legalBasis="India-seated international commercial arbitration is conducted under Part I of the Arbitration and Conciliation Act, 1996; enforcement of foreign awards is governed by Part II, which gives effect to the New York Convention, 1958. The Adjudix Code of ADR Procedure applies to the conduct of proceedings in either case."
      faqs={[
        {
          question: "Is an Adjudix award enforceable outside India?",
          answer: "Awards from India-seated proceedings are generally enforceable in the more than 170 states party to the New York Convention, 1958, subject to that jurisdiction's own procedure for recognition and enforcement.",
        },
        {
          question: "Can the proceedings be conducted in a language other than English?",
          answer: "English is the default, but the parties may agree on another language for all or part of the proceedings when they draft their clause.",
        },
        {
          question: "What if only one party is based outside India?",
          answer: "That's still an international matter — the seat, governing law, and enforcement questions apply whenever either party or the underlying transaction has a genuine foreign element.",
        },
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/dispute-resolution/international", metadata);
export default editablePage("/dispute-resolution/international", InternationalDisputeResolutionPage, metadata);
