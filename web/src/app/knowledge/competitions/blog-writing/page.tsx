import { CompetitionPage } from "@/components/patterns/competition-page";

export default function Page() {
  return (
    <CompetitionPage
      title="Arbitral Blog/Article Writing"
      intro="Original writing on any ADR topic, judged for clarity, accuracy, and insight — the best entries are published on the Knowledge Centre."
      format={[
        "Open topic, within institutional and commercial ADR",
        "Judged for clarity, accuracy, and original insight",
        "Winning entries published on the Knowledge Centre with full attribution",
      ]}
    />
  );
}
