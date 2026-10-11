import { PracticeAreaPage } from "@/components/patterns/practice-area-page";

export default function Page() {
  return (
    <PracticeAreaPage
      title="Not Listed Otherwise"
      intro="Disputes that don't fit neatly into the other nine categories still deserve a specialist neutral — tell us the nature of your case and we'll match a suitable panelist."
      qualifies={[
        "Family-business disputes",
        "Consumer disputes both sides agree to arbitrate",
        "Cross-category disputes spanning more than one specialty",
        "Any other civil, commercial, or contractual disagreement suitable for ADR",
      ]}
    />
  );
}
