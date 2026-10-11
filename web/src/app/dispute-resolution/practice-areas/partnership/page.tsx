import { PracticeAreaPage } from "@/components/patterns/practice-area-page";

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
