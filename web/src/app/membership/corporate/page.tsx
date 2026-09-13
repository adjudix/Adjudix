import { MembershipTierPage } from "@/components/patterns/membership-tier-page";

export default function Page() {
  return (
    <MembershipTierPage
      title="Corporate"
      intro="An ongoing relationship, not a single case. Distinct from Corporate Dispute Resolution Services — this is standing membership for a business or institution, with the transactional service available on top of it."
      eligibility={[
        "Businesses, law firms, or institutions seeking an ongoing relationship with Adjudix",
        "No prior case history required",
      ]}
      benefits={[
        "Priority routing and dedicated relationship team for every matter",
        "Preferred rates on Corporate Dispute Resolution Services",
        "Pre-agreed model clause language for your standard contracts",
      ]}
      fee="Contact us for terms — pricing depends on your organization's size and expected caseload."
    />
  );
}
