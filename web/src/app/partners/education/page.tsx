import { PartnerCategoryPage } from "@/components/patterns/partner-category-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Education Partners",
  description:
    "Law schools, business schools, and universities that refer students into Adjudix's Training Institute and Student membership.",
  path: "/partners/education",
});

export default function Page() {
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
