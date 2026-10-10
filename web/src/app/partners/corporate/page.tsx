import { PartnerCategoryPage } from "@/components/patterns/partner-category-page";

export default function Page() {
  return (
    <PartnerCategoryPage
      title="Corporate Partners"
      intro="Businesses with a standing, preferred-rate relationship for Corporate Dispute Resolution Services."
      benefits={[
        "Preferred rates on Corporate Dispute Resolution Services",
        "Priority panel access and a dedicated relationship team",
        "Co-branded thought leadership through the Knowledge Centre",
      ]}
      status={{
        title: "Confidential by design",
        body: "Our corporate partnerships are confidential. Speak to the Secretariat to discuss a preferred-rate relationship.",
      }}
    />
  );
}
