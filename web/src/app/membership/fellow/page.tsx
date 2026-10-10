import { MembershipTierPage } from "@/components/patterns/membership-tier-page";

export default function Page() {
  return (
    <MembershipTierPage
      title="Fellow"
      intro="Senior recognition for a sustained record of panel appointments — the credential that signals a practitioner has genuinely built a career in institutional ADR, not just completed a course."
      eligibility={[
        "Associated member for a sustained period, with a demonstrated appointment record",
        "Or senior practitioners nominated by the Advisory Council on the basis of standing outside Adjudix",
        "Reviewed and approved case by case, not automatically granted",
      ]}
      benefits={[
        "Use of the Fellow designation",
        "Priority consideration for complex and high-value panel appointments",
        "Invitation to contribute to reviews of the Adjudix Code of ADR Procedure and Training Institute curriculum",
      ]}
      fee="By nomination or application, reviewed by the Advisory Council. No standard fee — details confirmed during review."
    />
  );
}
