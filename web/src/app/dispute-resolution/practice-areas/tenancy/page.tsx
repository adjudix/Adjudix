import { PracticeAreaPage } from "@/components/patterns/practice-area-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tenancy Disputes",
  description:
    "Rent, deposit, and possession disagreements between landlords and tenants, resolved faster than a typical rent-control or civil court timeline.",
  path: "/dispute-resolution/practice-areas/tenancy",
});

export default function Page() {
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
