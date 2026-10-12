import { CoursePage } from "@/components/patterns/course-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mediator Training Course",
  description:
    "Facilitative technique for guiding parties toward their own settlement — the skill of asking the right question, not proposing the answer.",
  path: "/training/courses/mediator",
});

export default function Page() {
  return (
    <CoursePage
      slug="mediator"
      title="Mediator Track"
      intro="Facilitative technique for guiding parties toward their own settlement — the skill of asking the right question, not proposing the answer."
      who={[
        "Advocates and professionals wanting to add mediation to their practice",
        "Family, workplace, and community mediators seeking formal certification",
        "Anyone building toward Adjudix's mediator panel",
      ]}
      curriculum={[
        { title: "Mediation under the Mediation Act, 2023", body: "The statutory framework and how it makes a settlement agreement enforceable." },
        { title: "Facilitative technique", body: "Joint and private sessions, active listening, and surfacing real interests behind stated positions." },
        { title: "Closing a settlement", body: "Turning an agreed outcome into a signed, enforceable settlement agreement." },
      ]}
    />
  );
}
