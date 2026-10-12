import { MembershipTierPage } from "@/components/patterns/membership-tier-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Affiliate Membership",
  description:
    "Standing for early-career professionals building toward the register.",
  path: "/membership/affiliated",
});

export default function Page() {
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
      fee="Free, after completing an Apprenticeship or Internship."
    />
  );
}
