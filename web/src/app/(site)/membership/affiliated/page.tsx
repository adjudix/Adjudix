import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { MembershipTierPage } from "@/components/patterns/membership-tier-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Affiliate Membership",
  description:
    "Standing for early-career professionals building toward the register.",
  path: "/membership/affiliated",
});

function Page() {
  return (
    <MembershipTierPage
      title="Affiliate"
      stars={3}
      intro="Standing for early-career professionals building toward the register."
      eligibility={[
        "Recent graduates in law, CA/CS, or engineering",
        "Early-career advocates, CAs, CS, or engineers with an interest in ADR",
        "Completed an Apprenticeship or Internship with Adjudix",
      ]}
      benefits={[
        "Access to Training Institute course discounts",
        "Invitations to Adjudix events and webinars",
        "A defined path toward Associate membership",
      ]}
      fee="Free, after completing an Apprenticeship or Internship, or on payment of a membership fee subject to review by the Advisory Council."
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/membership/affiliated", metadata);
export default editablePage("/membership/affiliated", Page, metadata);
