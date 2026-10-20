import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PracticeAreaPage } from "@/components/patterns/practice-area-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Tenancy Disputes",
  description:
    "Rent, deposit, and possession disagreements between landlords and tenants, resolved faster than a typical rent-control or civil court timeline.",
  path: "/dispute-resolution/practice-areas/tenancy",
});

function Page() {
  return (
    <PracticeAreaPage
      title="Tenancy Disputes"
      intro="Rent, deposit, and possession disagreements between landlords and tenants, resolved faster than a typical rent-control or civil court timeline."
      qualifies={[
        "Rent arrears and payment disputes",
        "Security deposit disagreements at the end of a tenancy",
        "Possession and eviction disputes where both sides agree to arbitrate",
        "Disputes over maintenance or repair obligations under a lease",
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/dispute-resolution/practice-areas/tenancy", metadata);
export default editablePage("/dispute-resolution/practice-areas/tenancy", Page, metadata);
