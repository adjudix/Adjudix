import { PracticeAreaPage } from "@/components/patterns/practice-area-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Partnership Disputes",
  description:
    "Disputes between partners — in firms, LLPs, and joint ventures — resolved privately and quickly, so the business can keep running or wind down in an orderly…",
  path: "/dispute-resolution/practice-areas/partnership",
});

export default function Page() {
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
