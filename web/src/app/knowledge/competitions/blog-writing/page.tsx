import { CompetitionPage } from "@/components/patterns/competition-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ADR Blog & Article Writing Competition",
  description:
    "Original writing on any ADR topic, judged for clarity, accuracy, and insight — the best entries are published on the Knowledge Centre.",
  path: "/knowledge/competitions/blog-writing",
});

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
