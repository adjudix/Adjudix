import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { NumberedList } from "@/components/ui/numbered-list";
import { LinkButton } from "@/components/ui/link-button";
import { applyHref } from "@/lib/apply-forms";

const STEPS = [
  { title: "Complete a track (optional)", description: "Finishing the Arbitrator, Conciliator, or Mediator track relevant to your interest helps, but isn't required." },
  { title: "Apply for placement", description: "Apply for an apprenticeship placement shadowing an active panelist on real cases." },
  { title: "Supervised practice", description: "Work under supervision before independent panel appointment." },
];

// Client markup (Oct 2026): "No option for applying for internship — to be added."
const PROGRAMMES = [
  {
    eyebrow: "For students",
    title: "Internships",
    body: "For law, commerce, and engineering students. Interns work with the Secretariat and the panel on research, case preparation, drafting, and observing proceedings.",
    facts: ["4 weeks to 3 months", "Remote, in office, or hybrid", "Certificate on completion"],
    cta: "Apply for an Internship",
    href: applyHref("internship"),
  },
  {
    eyebrow: "For graduates & professionals",
    title: "Apprenticeships",
    body: "Apprentices shadow an active panelist on real cases, then practise under supervision as the route to independent panel appointment.",
    facts: ["Open to graduates of any Training Institute track", "Full-time, part-time, or weekends", "Leads to panel appointment"],
    cta: "Apply for an Apprenticeship",
    href: applyHref("apprenticeship"),
  },
];

export default function ApprenticeshipsPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Training Institute"
        title="Apprenticeship & Internship Programme"
        breadcrumbs={[{ label: "Training Institute", href: "/training" }, { label: "Apprenticeship & Internships" }]}
        intro="Classroom training only goes so far. Internships give students hands-on exposure to ADR practice; the Apprenticeship Programme places Training Institute graduates alongside experienced panelists on real cases, under supervision, before independent appointment."
      />

      <section className="mx-auto max-w-6xl px-6 pt-16">
        <div className="grid gap-6 md:grid-cols-2">
          {PROGRAMMES.map((programme) => (
            <article key={programme.title} className="flex flex-col rounded-2xl border border-border bg-surface p-8">
              <p className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">{programme.eyebrow}</p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">{programme.title}</h2>
              <p className="mt-3 text-left font-body text-muted-foreground hyphens-none">{programme.body}</p>
              <ul className="mt-5 flex flex-1 flex-col gap-2">
                {programme.facts.map((fact) => (
                  <li key={fact} className="flex gap-3 text-left font-body text-sm text-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {fact}
                  </li>
                ))}
              </ul>
              <LinkButton variant="primary" size="lg" href={programme.href} className="mt-7 self-start">
                {programme.cta}
              </LinkButton>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-heading text-2xl font-semibold text-foreground">The apprenticeship path</h2>
        <div className="mt-8">
          <NumberedList items={STEPS} />
        </div>
      </section>

      <CtaBand
        title="Ready to apply?"
        description="Students apply for an internship; graduates and professionals for an apprenticeship."
        primary={{ label: "Apply for an Internship", href: applyHref("internship") }}
        secondary={{ label: "Apply for an Apprenticeship", href: applyHref("apprenticeship") }}
      />
    </main>
  );
}
