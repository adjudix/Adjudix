import { PartnerCategoryPage } from "@/components/patterns/partner-category-page";

export default function Page() {
  return (
    <PartnerCategoryPage
      title="Corporate Partners"
      intro="Businesses with a standing, preferred-rate relationship for Corporate Dispute Resolution Services — the institutional pairing to Corporate Membership."
      benefits={[
        "Preferred rates on Corporate Dispute Resolution Services",
        "Priority panel access and a dedicated relationship team",
        "Co-branded thought leadership through the Knowledge Centre",
      ]}
    />
  );
}
