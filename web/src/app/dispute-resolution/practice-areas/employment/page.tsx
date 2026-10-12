import { PracticeAreaPage } from "@/components/patterns/practice-area-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Employer–Employee Disputes",
  description:
    "Disagreements arising from an employment relationship, resolved confidentially and without the reputational exposure of a public tribunal filing.",
  path: "/dispute-resolution/practice-areas/employment",
});

export default function Page() {
  return (
    <PracticeAreaPage
      title="Employer–Employee Disputes"
      intro="Disagreements arising from an employment relationship, resolved confidentially and without the reputational exposure of a public tribunal filing."
      qualifies={[
        "Disputes over severance, notice, or termination terms",
        "Non-compete and confidentiality-clause disagreements",
        "Disputes over bonus, commission, or incentive calculations",
        "Workplace grievances the parties agree to resolve outside statutory forums",
      ]}
    />
  );
}
