import { CompetitionPage } from "@/components/patterns/competition-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mock Arbitration Competition",
  description:
    "A simulated arbitration hearing on a set fact pattern, scored by practicing arbitrators on advocacy, procedure, and case theory.",
  path: "/knowledge/competitions/mock-arbitration",
});

export default function Page() {
  return (
    <CompetitionPage
      title="Mock Arbitration"
      intro="A simulated arbitration hearing on a set fact pattern, scored by practicing arbitrators on advocacy, procedure, and case theory."
      format={[
        "Teams represent claimant and respondent before a mock tribunal",
        "Judged by practicing arbitrators from Adjudix's panel",
        "Open to law students and early-career advocates",
      ]}
    />
  );
}
