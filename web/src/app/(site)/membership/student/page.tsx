import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { MembershipTierPage } from "@/components/patterns/membership-tier-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Student Membership",
  description:
    "The first step on Adjudix's membership ladder, for students of law, commerce, and engineering who want to build a career in ADR.",
  path: "/membership/student",
});

function Page() {
  return (
    <MembershipTierPage
      title="Student"
      stars={2}
      intro="The first step on Adjudix's membership ladder, for students of law, commerce, and engineering who want to build a career in ADR."
      eligibility={[
        "Currently enrolled students of law, CA/CS, commerce, or engineering",
        "Or anyone who has attended an Adjudix webinar or event",
        "No prior ADR experience or certification required",
      ]}
      benefits={[
        "Access to competitions, webinars, and events",
        "Student pricing on Training Institute courses",
        "A defined path toward Affiliate membership through an Apprenticeship or Internship",
      ]}
      fee="Free for students."
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/membership/student", metadata);
export default editablePage("/membership/student", Page, metadata);
