import { MembershipTierPage } from "@/components/patterns/membership-tier-page";

export default function Page() {
  return (
    <MembershipTierPage
      title="Affiliated"
      intro="Entry standing for students and early-career professionals building toward the register — the first step on Adjudix's membership ladder."
      eligibility={[
        "Law, CA/CS, or engineering students, or recent graduates",
        "Early-career advocates, CAs, CS, or engineers with an interest in ADR",
        "No prior Training Institute certification required",
      ]}
      benefits={[
        "Access to Training Institute course discounts",
        "Invitations to Adjudix events and webinars",
        "A defined path toward Associated membership",
      ]}
      fee="Free, after verification of student or early-career status."
    />
  );
}
