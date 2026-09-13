import { PanelCategoryPage } from "@/components/patterns/panel-category-page";

export default function Page() {
  return (
    <PanelCategoryPage
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
