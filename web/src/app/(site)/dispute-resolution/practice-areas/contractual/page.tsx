import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PracticeAreaPage } from "@/components/patterns/practice-area-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Contractual Disputes",
  description:
    "Breach, interpretation, and performance disagreements arising from any commercial contract — the broadest and most common category Adjudix administers.",
  path: "/dispute-resolution/practice-areas/contractual",
});

function Page() {
  return (
    <PracticeAreaPage
      title="Contractual Disputes"
      intro="Breach, interpretation, and performance disagreements arising from any commercial contract — the broadest and most common category Adjudix administers."
      qualifies={[
        "Alleged breach of a commercial contract's terms",
        "Disagreements over contract interpretation",
        "Disputes over performance, delay, or quality of delivery",
        "Termination and post-termination disputes",
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/dispute-resolution/practice-areas/contractual", metadata);
export default editablePage("/dispute-resolution/practice-areas/contractual", Page, metadata);
