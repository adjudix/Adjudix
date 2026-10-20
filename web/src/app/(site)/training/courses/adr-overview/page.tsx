import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { CoursePage } from "@/components/patterns/course-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "ADR Overview Course",
  description:
    "A complete grounding in alternative dispute resolution — every mechanism Adjudix administers, when each one fits, and how the outcome is implemented. Open to…",
  path: "/training/courses/adr-overview",
});

function Page() {
  return (
    <CoursePage
      slug="adr-overview"
      title="ADR Overview"
      intro="A complete grounding in alternative dispute resolution — every mechanism Adjudix administers, when each one fits, and how the outcome is implemented. Open to everyone and the foundation for every other track."
      who={[
        "Students of law, commerce, and engineering starting out in ADR",
        "Professionals and business owners who want to understand their options before a dispute arises",
        "Anyone planning to take a specialist track",
      ]}
      curriculum={[
        { title: "The ADR spectrum", body: "Negotiation, conciliation, mediation, Lok Adalat, and arbitration — and how they trade control for finality." },
        { title: "Emergency, hybrid, and corporate ADR", body: "Emergency arbitration, Med-Arb, and standing corporate dispute resolution." },
        { title: "Online and offline proceedings", body: "How the same procedure runs on the ODR Platform and in person." },
        { title: "Implementation of awards and orders", body: "Enforcing awards and settlements in India and abroad." },
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/training/courses/adr-overview", metadata);
export default editablePage("/training/courses/adr-overview", Page, metadata);
