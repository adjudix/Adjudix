import { PartnerCategoryPage } from "@/components/patterns/partner-category-page";

export default function Page() {
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
