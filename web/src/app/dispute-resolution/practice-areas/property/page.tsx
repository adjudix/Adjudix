import { PracticeAreaPage } from "@/components/patterns/practice-area-page";

export default function Page() {
  return (
    <PracticeAreaPage
      title="Property Disputes"
      intro="Title, possession, and co-ownership disagreements resolved by panelists who understand property law and valuation, not just general civil procedure."
      qualifies={[
        "Disputes between co-owners or joint developers",
        "Possession and boundary disagreements",
        "Disputes arising from sale, lease, or development agreements",
        "Valuation disagreements requiring an expert-informed neutral",
      ]}
    />
  );
}
