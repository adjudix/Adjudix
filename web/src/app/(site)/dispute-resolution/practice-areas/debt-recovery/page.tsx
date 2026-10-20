import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PracticeAreaPage } from "@/components/patterns/practice-area-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Debt Recovery & Financial Claims",
  description:
    "Unpaid invoices, loan defaults, and other financial claims resolved through arbitration or conciliation, without the years a civil recovery suit can take.",
  path: "/dispute-resolution/practice-areas/debt-recovery",
});

function Page() {
  return (
    <PracticeAreaPage
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

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/dispute-resolution/practice-areas/debt-recovery", metadata);
export default editablePage("/dispute-resolution/practice-areas/debt-recovery", Page, metadata);
