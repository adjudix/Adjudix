import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PracticeAreaPage } from "@/components/patterns/practice-area-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Other Disputes",
  description:
    "Disputes that don't fit neatly into the other nine categories still deserve a specialist neutral — tell us the nature of your case and we'll match a suitable…",
  path: "/dispute-resolution/practice-areas/miscellaneous",
});

function Page() {
  return (
    <PracticeAreaPage
      title="Not Listed Otherwise"
      intro="Disputes that don't fit neatly into the other nine categories still deserve a specialist neutral — tell us the nature of your case and we'll match a suitable panelist."
      qualifies={[
        "Family-business disputes",
        "Consumer disputes both sides agree to arbitrate",
        "Cross-category disputes spanning more than one specialty",
        "Any other civil, commercial, or contractual disagreement suitable for ADR",
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/dispute-resolution/practice-areas/miscellaneous", metadata);
export default editablePage("/dispute-resolution/practice-areas/miscellaneous", Page, metadata);
