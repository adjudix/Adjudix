import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { MechanismPage } from "@/components/patterns/mechanism-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Offline Dispute Resolution",
  description:
    "For parties who prefer to meet in person and file on paper, Adjudix administers every mechanism offline — with the same panel, the same timelines, and the…",
  path: "/dispute-resolution/offline",
});

function OfflinePage() {
  return (
    <MechanismPage
      title="Offline Dispute Resolution"
      intro="For parties who prefer to meet in person and file on paper, Adjudix administers every mechanism offline — with the same panel, the same timelines, and the same enforceable outcome as a case run on the ODR Platform."
      howItWorks={[
        {
          title: "File on paper",
          description: "Submit your filing in person or by post to the Secretariat, with supporting documents.",
        },
        {
          title: "In-person hearings",
          description: "Hearings and sessions are scheduled at a mutually convenient venue.",
        },
        {
          title: "Outcome",
          description: "The award, settlement, or order is issued and delivered to the parties in hard copy.",
        },
      ]}
      legalBasis="Offline proceedings are conducted under the same statutes as online ones — the Arbitration and Conciliation Act, 1996, the Mediation Act, 2023, and the Legal Services Authorities Act, 1987 — and under the Adjudix Code of ADR Procedure, 2026. The Offline Procedure Handbook sets out the practical steps."
      faqs={[
        {
          question: "Can a case move between online and offline?",
          answer: "Yes. Parties can agree to hold some hearings in person and others on the ODR Platform; this is the hybrid route.",
        },
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/dispute-resolution/offline", metadata);
export default editablePage("/dispute-resolution/offline", OfflinePage, metadata);
