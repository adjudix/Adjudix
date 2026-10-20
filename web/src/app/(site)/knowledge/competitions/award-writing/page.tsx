import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { CompetitionPage } from "@/components/patterns/competition-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Arbitral Award Writing Competition",
  description:
    "Write a reasoned arbitral award on a set fact pattern, judged on legal reasoning, clarity, and structure — the exact skill a certified arbitrator needs.",
  path: "/knowledge/competitions/award-writing",
});

function Page() {
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

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/knowledge/competitions/award-writing", metadata);
export default editablePage("/knowledge/competitions/award-writing", Page, metadata);
