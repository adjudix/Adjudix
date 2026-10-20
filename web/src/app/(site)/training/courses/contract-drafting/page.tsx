import { editableMetadata, editablePage } from "@/lib/pages/editable";
import { CoursePage } from "@/components/patterns/course-page";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Contract Drafting Course",
  description:
    "Drafting arbitration and mediation clauses that actually hold up when a dispute arises — not boilerplate copied from the last contract template.",
  path: "/training/courses/contract-drafting",
});

function Page() {
  return (
    <CoursePage
      slug="contract-drafting"
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
        { title: "Every nuance of ADR contract drafting", body: "All the finer points of drafting contracts and clauses for ADR — seat and venue, governing law, emergency relief, confidentiality, costs, and implementation of the eventual award." },
      ]}
    />
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/training/courses/contract-drafting", metadata);
export default editablePage("/training/courses/contract-drafting", Page, metadata);
