import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { PracticeAreaPage } from "@/components/patterns/practice-area-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Partnership Disputes",
  description:
    "Disputes between partners — in firms, LLPs, and joint ventures — resolved privately and quickly, so the business can keep running or wind down in an orderly…",
  path: "/dispute-resolution/practice-areas/partnership",
});

function Page() {
  return (
    <PracticeAreaPage
      title="Partnership Disputes"
      intro="Disputes between partners — in firms, LLPs, and joint ventures — resolved privately and quickly, so the business can keep running or wind down in an orderly way."
      qualifies={[
        "Profit-sharing, capital contribution, and accounts disputes",
        "Management, decision-making, and deadlock disagreements",
        "Retirement, expulsion, and exit of a partner",
        "Dissolution and division of partnership assets",
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/dispute-resolution/practice-areas/partnership", metadata);
export default editablePage("/dispute-resolution/practice-areas/partnership", Page, metadata);
