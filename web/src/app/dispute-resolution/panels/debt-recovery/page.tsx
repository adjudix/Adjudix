import { PanelCategoryPage } from "@/components/patterns/panel-category-page";

export default function Page() {
  return (
    <PanelCategoryPage
      title="Debt Recovery & Financial Claims"
      intro="Unpaid invoices, loan defaults, and other financial claims resolved through arbitration or conciliation, without the years a civil recovery suit can take."
      qualifies={[
        "Unpaid invoices or outstanding commercial debts",
        "Loan or credit agreement defaults not routed through statutory recovery tribunals",
        "Disputed accounts and reconciliation disagreements between businesses",
        "Claims arising from dishonoured payment instruments",
      ]}
    />
  );
}
