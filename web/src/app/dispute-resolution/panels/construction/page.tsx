import { PanelCategoryPage } from "@/components/patterns/panel-category-page";

export default function Page() {
  return (
    <PanelCategoryPage
      title="Construction Disputes"
      intro="Delay, defect, and payment claims on construction and infrastructure projects, heard by panelists with real engineering and quantity-surveying background."
      qualifies={[
        "Delay and time-extension claims",
        "Defect and workmanship disputes",
        "Payment and variation claims under a construction contract",
        "Disputes requiring technical, engineering-informed assessment",
      ]}
    />
  );
}
