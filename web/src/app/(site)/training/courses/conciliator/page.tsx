import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { CoursePage } from "@/components/patterns/course-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Conciliator Training Course",
  description:
    "Training in active, proposal-led settlement facilitation — for practitioners who want to help parties reach terms, not just hear a case and decide it.",
  path: "/training/courses/conciliator",
});

function Page() {
  return (
    <CoursePage
      slug="conciliator"
      title="Conciliator Track"
      intro="Training in active, proposal-led settlement facilitation — for practitioners who want to help parties reach terms, not just hear a case and decide it."
      who={[
        "Advocates and professionals wanting to add conciliation to their practice",
        "HR and dispute-resolution professionals handling internal disputes",
        "Anyone building toward Adjudix's conciliator panel",
      ]}
      curriculum={[
        { title: "Conciliation under Indian law", body: "Part III of the Arbitration and Conciliation Act, 1996, and how it differs from mediation and arbitration." },
        { title: "Proposing settlement terms", body: "Techniques for actively proposing terms both sides can accept." },
        { title: "Drafting settlement agreements", body: "Writing a settlement agreement that carries the same force as an arbitral award on agreed terms." },
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/training/courses/conciliator", metadata);
export default editablePage("/training/courses/conciliator", Page, metadata);
