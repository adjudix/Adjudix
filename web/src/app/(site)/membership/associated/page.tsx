import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { MembershipTierPage } from "@/components/patterns/membership-tier-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Associate Membership",
  description:
    "Full standing, case-eligible once CPD and experience thresholds are met — the membership most Training Institute graduates move into.",
  path: "/membership/associated",
});

function Page() {
  return (
    <MembershipTierPage
      title="Associate"
      stars={4}
      intro="Full standing, case-eligible once CPD and experience thresholds are met — the membership most Training Institute graduates move into."
      eligibility={[
        "Completed any of our Professional Training & Certification Courses",
        "Or equivalent demonstrated professional experience in ADR",
        "In good standing with any relevant professional body (Bar Council, ICAI, ICSI, or engineering council)",
      ]}
      benefits={[
        "Eligibility for appointment to the Professional Panel",
        "Use of the Associate Member designation",
        "Continuing education and CPD tracking through the Training Institute",
      ]}
      fee="Free, after completion of a Training Programme under Adjudix, or on payment of a membership fee subject to review by the Advisory Council."
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/membership/associated", metadata);
export default editablePage("/membership/associated", Page, metadata);
