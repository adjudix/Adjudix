import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PracticeAreaPage } from "@/components/patterns/practice-area-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Insurance Claims",
  description:
    "Claim repudiation, valuation, and coverage disputes between policyholders and insurers, heard by panelists familiar with policy wording and claims practice.",
  path: "/dispute-resolution/practice-areas/insurance",
});

function Page() {
  return (
    <PracticeAreaPage
      title="Insurance Claims"
      intro="Claim repudiation, valuation, and coverage disputes between policyholders and insurers, heard by panelists familiar with policy wording and claims practice."
      qualifies={[
        "Repudiated or partially settled claims",
        "Disputes over claim valuation or quantum",
        "Coverage and policy-interpretation disagreements",
        "Delay in claim settlement disputes",
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/dispute-resolution/practice-areas/insurance", metadata);
export default editablePage("/dispute-resolution/practice-areas/insurance", Page, metadata);
