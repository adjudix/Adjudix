import { PracticeAreaPage } from "@/components/patterns/practice-area-page";

export default function Page() {
  return (
    <PracticeAreaPage
      title="Insurance Claims"
      intro="Claim repudiation, valuation, and coverage disputes between policyholders and insurers, heard by panelists familiar with policy wording and claims practice."
      qualifies={[
        "Repudiated or partially settled claims",
        "Disputes over claim valuation or quantum",
        "Coverage and policy-interpretation disagreements",
        "Delay in claim settlement disputes",
      ]}
    />
  );
}
