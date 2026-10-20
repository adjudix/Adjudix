import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PracticeAreaPage } from "@/components/patterns/practice-area-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Property Disputes",
  description:
    "Title, possession, and co-ownership disagreements resolved by panelists who understand property law and valuation, not just general civil procedure.",
  path: "/dispute-resolution/practice-areas/property",
});

function Page() {
  return (
    <PracticeAreaPage
      title="Property Disputes"
      intro="Title, possession, and co-ownership disagreements resolved by panelists who understand property law and valuation, not just general civil procedure."
      qualifies={[
        "Disputes between co-owners or joint developers",
        "Possession and boundary disagreements",
        "Disputes arising from sale, lease, or development agreements",
        "Valuation disagreements requiring an expert-informed neutral",
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/dispute-resolution/practice-areas/property", metadata);
export default editablePage("/dispute-resolution/practice-areas/property", Page, metadata);
