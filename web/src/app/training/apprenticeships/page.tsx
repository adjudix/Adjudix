import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { NumberedList } from "@/components/ui/numbered-list";

const STEPS = [
  { title: "Complete a track", description: "Finish the Arbitrator, Conciliator, or Mediator track relevant to your interest." },
  { title: "Apply for placement", description: "Apply for an apprenticeship placement shadowing an active panelist on real cases." },
  { title: "Supervised practice", description: "Work under supervision before independent panel appointment." },
];

export default function ApprenticeshipsPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Training Institute"
        title="Apprenticeship & Internship Programme"
        breadcrumbs={[{ label: "Training Institute", href: "/training" }, { label: "Apprenticeships" }]}
        intro="Classroom training only goes so far. The Apprenticeship Programme places Training Institute graduates alongside experienced panelists on real cases, under supervision, before independent appointment."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <NumberedList items={STEPS} />
      </section>

      <CtaBand
        title="Interested in an apprenticeship?"
        description="Open to graduates of any Training Institute track."
        primary={{ label: "Apply", href: "/contact" }}
        secondary={{ label: "Browse Courses", href: "/training/courses" }}
      />
    </main>
  );
}
