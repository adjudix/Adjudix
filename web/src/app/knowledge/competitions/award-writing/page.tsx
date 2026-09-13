import { CompetitionPage } from "@/components/patterns/competition-page";

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
