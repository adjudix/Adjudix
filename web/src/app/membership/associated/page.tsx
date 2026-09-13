import { MembershipTierPage } from "@/components/patterns/membership-tier-page";

export default function Page() {
  return (
    <MembershipTierPage
      title="Associated"
      intro="Full standing, case-eligible once CPD and experience thresholds are met — the tier most Training Institute graduates move into."
      eligibility={[
        "Completed a Training Institute track (Arbitrator, Conciliator, or Mediator)",
        "Or equivalent demonstrated professional experience in ADR",
        "In good standing with any relevant professional body (Bar Council, ICAI, ICSI, or engineering council)",
      ]}
      benefits={[
        "Eligibility for Specialized Panel appointment",
        "Use of the Associated Member designation",
        "Continuing education and CPD tracking through the Training Institute",
      ]}
      fee="Free, after verification of certification and professional standing."
    />
  );
}
