import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PracticeAreaPage } from "@/components/patterns/practice-area-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Construction Disputes",
  description:
    "Delay, defect, and payment claims on construction and infrastructure projects, heard by panelists with real engineering and quantity-surveying background.",
  path: "/dispute-resolution/practice-areas/construction",
});

function Page() {
  return (
    <PracticeAreaPage
      title="Construction Disputes"
      intro="Delay, defect, and payment claims on construction and infrastructure projects, heard by panelists with real engineering and quantity-surveying background."
      qualifies={[
        "Delay and time-extension claims",
        "Defect and workmanship disputes",
        "Payment and variation claims under a construction contract",
        "Disputes requiring technical, engineering-informed assessment",
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/dispute-resolution/practice-areas/construction", metadata);
export default editablePage("/dispute-resolution/practice-areas/construction", Page, metadata);
