import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PartnerCategoryPage } from "@/components/patterns/partner-category-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Training Partners",
  description:
    "Organizations co-delivering courses alongside the Training Institute, from professional bodies to corporate learning teams.",
  path: "/partners/training",
});

function Page() {
  return (
    <PartnerCategoryPage
      title="Training Partners"
      intro="Organizations co-delivering courses alongside the Training Institute, from professional bodies to corporate learning teams."
      benefits={[
        "Co-branded course delivery under Adjudix's Competence Framework",
        "Shared faculty and curriculum development",
        "Recognition for your organization's members completing a track",
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/partners/training", metadata);
export default editablePage("/partners/training", Page, metadata);
