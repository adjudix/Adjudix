import { CompetitionPage } from "@/components/patterns/competition-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Arbitral Award Writing Competition",
  description:
    "Write a reasoned arbitral award on a set fact pattern, judged on legal reasoning, clarity, and structure — the exact skill a certified arbitrator needs.",
  path: "/knowledge/competitions/award-writing",
});

export default function Page() {
  return (
    <CompetitionPage
      title="Arbitral Award Writing"
      intro="Write a reasoned arbitral award on a set fact pattern, judged on legal reasoning, clarity, and structure — the exact skill a certified arbitrator needs."
      format={[
        "A shared fact pattern and set of submissions released to all entrants",
        "Entrants submit a written, reasoned award within the competition window",
        "Judged by practicing arbitrators from Adjudix's panel",
      ]}
    />
  );
}
