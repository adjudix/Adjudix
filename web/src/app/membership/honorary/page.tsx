import { MembershipTierPage } from "@/components/patterns/membership-tier-page";

export default function Page() {
  return (
    <MembershipTierPage
      title="Special Honorary"
      stars="beyond"
      applyable={false}
      intro="Beyond stars: Special Honorary Membership is conferred by the institute on individuals whose contribution to dispute resolution stands apart. It cannot be claimed — it is earned."
      eligibility={[
        "Conferred by the institute, on the recommendation of the Advisory Council",
        "Recognises exceptional contribution to ADR, the judiciary, or the profession",
        "Cannot be applied for",
      ]}
      benefits={[
        "Listed among Our Esteemed Members",
        "Use of the Honorary Member designation",
        "Standing invitation to Adjudix events and the annual conference",
      ]}
      fee="Not applicable — Special Honorary Membership is conferred, not purchased."
    />
  );
}
