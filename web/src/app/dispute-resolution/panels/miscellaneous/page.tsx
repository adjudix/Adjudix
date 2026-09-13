import { PanelCategoryPage } from "@/components/patterns/panel-category-page";

export default function Page() {
  return (
    <PanelCategoryPage
      title="Miscellaneous"
      intro="Disputes that don't fit neatly into the other eight categories still deserve a specialized panel — tell us the nature of your case and we'll match a suitable panelist."
      qualifies={[
        "Family-business and partnership disputes",
        "Consumer disputes both sides agree to arbitrate",
        "Cross-category disputes spanning more than one specialty",
        "Any other civil, commercial, or contractual disagreement suitable for ADR",
      ]}
    />
  );
}
