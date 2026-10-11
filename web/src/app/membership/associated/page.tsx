import { MembershipTierPage } from "@/components/patterns/membership-tier-page";

export default function Page() {
  return (
    <MembershipTierPage
      title="Associate"
      stars={4}
      intro="Full standing, case-eligible once CPD and experience thresholds are met — the membership most Training Institute graduates move into."
      eligibility={[
        "Completed a Training Programme under Adjudix, or equivalent experience",
        "Or equivalent demonstrated professional experience in ADR",
        "In good standing with any relevant professional body (Bar Council, ICAI, ICSI, or engineering council)",
      ]}
      benefits={[
        "Eligibility for appointment to the Professional Panel",
        "Use of the Associate Member designation",
        "Continuing education and CPD tracking through the Training Institute",
      ]}
      fee="Free, after completion of a Training Programme under Adjudix."
    />
  );
}
