import { CoursePage } from "@/components/patterns/course-page";

export default function Page() {
  return (
    <CoursePage
      title="Contract Drafting Track"
      intro="Drafting arbitration and mediation clauses that actually hold up when a dispute arises — not boilerplate copied from the last contract template."
      who={[
        "In-house counsel drafting commercial contracts",
        "Advocates advising clients on dispute resolution clauses",
        "Contract managers responsible for standard-form agreements",
      ]}
      curriculum={[
        { title: "Anatomy of a dispute resolution clause", body: "What a clause must specify to be enforceable: seat, institution, mechanism, and language." },
        { title: "Hybrid and tiered clauses", body: "Drafting mediation-first, arbitration-fallback clause structures." },
        { title: "Common drafting failures", body: "Pathological clauses that create jurisdictional disputes instead of preventing them." },
      ]}
    />
  );
}
