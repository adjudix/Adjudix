import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

const TOPICS = [
  "Basics of arbitration",
  "The most relevant sections of the Arbitration Act and their practical implementation",
  "The hybrid ADR process (Med-Arb)",
  "Emergency arbitration",
  "How arbitral awards are implemented, in India and globally",
  "Corporate ADR and contract & arbitration clause drafting",
];

export default function BlogPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Knowledge Centre"
        title="Blogs & Articles"
        breadcrumbs={[{ label: "Knowledge Centre", href: "/knowledge" }, { label: "Blogs & Articles" }]}
        intro="Plain-language explainers on ADR mechanisms, procedure, and practice — filterable by dispute type and mechanism."
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="font-heading text-xl font-semibold text-text">Topics we write on</h2>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {TOPICS.map((topic) => (
            <li key={topic} className="py-4 font-body text-text">
              {topic}
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title="Get notified when we publish"
        primary={{ label: "Subscribe", href: "/contact" }}
        secondary={{ label: "Research & Publications", href: "/knowledge/research" }}
      />
    </main>
  );
}
