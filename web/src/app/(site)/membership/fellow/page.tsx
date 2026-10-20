import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { MembershipTierPage } from "@/components/patterns/membership-tier-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Fellow Membership",
  description:
    "Senior recognition for a sustained record of panel appointments — the credential that signals a practitioner has genuinely built a career in institutional…",
  path: "/membership/fellow",
});

function Page() {
  return (
    <MembershipTierPage
      title="Fellow"
      stars={5}
      applyLabel="Apply for Fellowship"
      intro="Senior recognition for a sustained record of panel appointments — the credential that signals a practitioner has genuinely built a career in institutional ADR, not just completed a course."
      eligibility={[
        "Senior practitioners with a sustained record of panel appointments",
        "Or senior practitioners nominated by the Advisory Council on the basis of standing outside Adjudix",
        "Reviewed and approved case by case, not automatically granted",
      ]}
      benefits={[
        "Use of the Fellow designation",
        "Priority consideration for complex and high-value panel appointments",
        "Invitation to contribute to reviews of the Adjudix Code of ADR Procedure and Training Institute curriculum",
      ]}
      fee="By nomination or application, reviewed by the Advisory Council."
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/membership/fellow", metadata);
export default editablePage("/membership/fellow", Page, metadata);
