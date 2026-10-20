import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PartnerCategoryPage } from "@/components/patterns/partner-category-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Education Partners",
  description:
    "Law schools, business schools, and universities that refer students into Adjudix's Training Institute and Student membership.",
  path: "/partners/education",
});

function Page() {
  return (
    <PartnerCategoryPage
      title="Education Partners"
      intro="Law schools, business schools, and universities that refer students into Adjudix's Training Institute and Student membership."
      benefits={[
        "A referral pipeline into Training Institute courses for your students",
        "Guest lectures and workshops delivered by Adjudix faculty",
        "Priority apprenticeship placements for your graduates",
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/partners/education", metadata);
export default editablePage("/partners/education", Page, metadata);
