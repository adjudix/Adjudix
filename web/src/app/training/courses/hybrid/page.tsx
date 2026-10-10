import { CoursePage } from "@/components/patterns/course-page";

export default function Page() {
  return (
    <CoursePage
      slug="hybrid"
      title="Hybrid ADR Track"
      intro="Training in the hybrid model of dispute resolution — running a matter through mediation first and converting it to binding arbitration when settlement isn't reached, without compromising either process."
      who={[
        "Mediators and arbitrators who want to run hybrid processes",
        "Advocates advising clients on tiered and Med-Arb clauses",
        "In-house counsel designing dispute resolution for long-term contracts",
      ]}
      curriculum={[
        { title: "Designing a hybrid process", body: "Med-Arb, Arb-Med, and tiered processes — choosing the right structure for the dispute." },
        { title: "Confidentiality between phases", body: "Keeping what is said in mediation out of the arbitration, and when to change neutrals." },
        { title: "Conversion and the award", body: "Moving from a failed mediation to a binding, enforceable award under the Adjudix Code of ADR Procedure." },
      ]}
    />
  );
}
