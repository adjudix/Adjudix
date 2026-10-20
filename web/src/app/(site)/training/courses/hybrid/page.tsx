import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { CoursePage } from "@/components/patterns/course-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Hybrid ADR Training Course",
  description:
    "Training in the hybrid model of dispute resolution — running a matter through mediation first and converting it to binding arbitration when settlement isn't…",
  path: "/training/courses/hybrid",
});

function Page() {
  return (
    <CoursePage
      slug="hybrid"
      title="Hybrid ADR Track"
      intro="Training in the hybrid model of dispute resolution — running a matter through mediation first and converting it to binding arbitration when settlement isn't reached, without compromising either process."
      who={[
        "Mediators and arbitrators who want to run hybrid processes",
        "Advocates advising clients on tiered and Med-Arb clauses",
        "In-house counsel designing dispute resolution for long-term contracts",
      ]}
      curriculum={[
        { title: "Designing a hybrid process", body: "Med-Arb, Arb-Med, and tiered processes — choosing the right structure for the dispute." },
        { title: "Confidentiality between phases", body: "Keeping what is said in mediation out of the arbitration, and when to change neutrals." },
        { title: "Conversion and the award", body: "Moving from a failed mediation to a binding, enforceable award under the Adjudix Code of ADR Procedure." },
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/training/courses/hybrid", metadata);
export default editablePage("/training/courses/hybrid", Page, metadata);
