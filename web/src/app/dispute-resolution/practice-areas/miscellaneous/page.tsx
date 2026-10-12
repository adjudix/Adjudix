import { PracticeAreaPage } from "@/components/patterns/practice-area-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Other Disputes",
  description:
    "Disputes that don't fit neatly into the other nine categories still deserve a specialist neutral — tell us the nature of your case and we'll match a suitable…",
  path: "/dispute-resolution/practice-areas/miscellaneous",
});

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
