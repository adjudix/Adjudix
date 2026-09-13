import { CompetitionPage } from "@/components/patterns/competition-page";

export default function Page() {
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
