import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { CompetitionPage } from "@/components/patterns/competition-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Mock Conciliation Competition",
  description:
    "A simulated conciliation on a set fact pattern, testing a participant's ability to actively propose settlement terms both sides can accept.",
  path: "/knowledge/competitions/mock-conciliation",
});

function Page() {
  return (
    <CompetitionPage
      title="Mock Conciliation"
      intro="A simulated conciliation on a set fact pattern, testing a participant's ability to actively propose settlement terms both sides can accept."
      format={[
        "Participants act as conciliator on a shared fact pattern",
        "Judged by practicing conciliators from Adjudix's panel",
        "Open to law students, CAs, CS, and early-career professionals",
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/knowledge/competitions/mock-conciliation", metadata);
export default editablePage("/knowledge/competitions/mock-conciliation", Page, metadata);
