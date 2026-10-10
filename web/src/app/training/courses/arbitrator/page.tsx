import { CoursePage } from "@/components/patterns/course-page";

export default function Page() {
  return (
    <CoursePage
      slug="arbitrator"
      title="Arbitrator Track"
      intro="A Professional track for practicing advocates, CAs, and engineers, and a Student track for those building toward the profession — both leading toward Specialized Panel eligibility."
      who={[
        "Advocates seeking to add arbitration practice to their existing work",
        "Chartered accountants and engineers of every discipline — not only civil — seeking panel eligibility in their specialty",
        "Law students and recent graduates building toward a career as an arbitrator",
      ]}
      curriculum={[
        { title: "Foundations of arbitration law", body: "The Arbitration and Conciliation Act, 1996, and how an institutional Code of Procedure applies it in practice." },
        { title: "Conducting a hearing", body: "Managing pleadings, evidence, and hearings within a published procedural timeline." },
        { title: "Drafting a reasoned award", body: "Structuring an award that withstands challenge under Section 34." },
        { title: "Specialization module", body: "A focused module in one of the ten Specialized Panel dispute types." },
      ]}
    />
  );
}
