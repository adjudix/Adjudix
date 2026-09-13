import Link from "next/link";
import { LinkButton } from "@/components/ui/link-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Scale, Laptop, GraduationCap, CheckCircle2, XCircle } from "lucide-react";

const PILLARS = [
  {
    icon: Scale,
    title: "Dispute Resolution",
    description:
      "Arbitration, mediation, conciliation, and Lok Adalat, administered under a published Code of Procedure with a panel specialized by dispute type.",
    href: "/dispute-resolution",
  },
  {
    icon: Laptop,
    title: "ODR Platform",
    description:
      "File a dispute, respond to one, or request an ad hoc appointment online, with a role-based portal for parties, arbitrators, and case managers.",
    href: "/odr",
  },
  {
    icon: GraduationCap,
    title: "Training Institute",
    description:
      "Professional and student tracks for arbitrators, conciliators, and mediators, with certification tied to a published competence framework.",
    href: "/training",
  },
];

const COMPARISON_ROWS = [
  {
    criterion: "Choosing the decision-maker",
    adjudix: "Parties nominate from a specialized panel; the institute appoints if they can't agree",
    other: "No structured process, appointment can stall indefinitely",
  },
  {
    criterion: "Timeline",
    adjudix: "Governed by the Code of Procedure, with an Emergency Arbitrator route for urgent relief",
    other: "No fixed procedural timeline",
  },
  {
    criterion: "Enforceability",
    adjudix: "Awards enforceable under the Arbitration and Conciliation Act, 1996",
    other: "Depends entirely on how the matter was resolved",
  },
];

const FAQ_ITEMS = [
  {
    question: "What is Adjudix?",
    answer:
      "Adjudix Dispute Resolution Institute administers arbitration, mediation, conciliation, and online dispute resolution under a published Code of Procedure, alongside a Training Institute and professional membership programme.",
  },
  {
    question: "How do I file a dispute?",
    answer:
      "Use the ODR Platform's filing flow. You'll select a dispute type, provide claimant and respondent details, and see an estimated fee before you submit.",
  },
  {
    question: "Who can join the professional panel?",
    answer:
      "Advocates, chartered accountants, and civil engineers with relevant experience can apply. Applications are reviewed and verified before a panelist is listed.",
  },
];

export default function Home() {
  return (
    <main className="bg-canvas flex-1">
      {/* Hero */}
      <section className="bg-hero text-text-on-hero px-6 py-24 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold text-balance max-w-3xl mx-auto">
          Arbitration, mediation, and ADR under one roof
        </h1>
        <p className="mt-4 font-body text-lg text-text-on-hero-muted max-w-xl mx-auto">
          Dialogue. Dispute. Resolution. A better tomorrow.
        </p>
        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <LinkButton variant="primary" size="lg" href="/odr/file">
            File a Dispute
          </LinkButton>
          <LinkButton
            variant="secondary"
            size="lg"
            className="border-border-on-hero text-text-on-hero"
            href="/training"
          >
            Explore Training
          </LinkButton>
          <LinkButton
            variant="ghost"
            size="lg"
            className="text-text-on-hero"
            href="/membership"
          >
            Become a Member
          </LinkButton>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-surface px-6 py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center font-body text-sm text-text-muted">
          <span>Governed by a published Code of Procedure</span>
          <span aria-hidden="true">&middot;</span>
          <span>Panel specialized by dispute type</span>
          <span aria-hidden="true">&middot;</span>
          <span>Arbitration &middot; Mediation &middot; Conciliation &middot; ODR</span>
        </div>
      </section>

      {/* Three pillars */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Card key={pillar.title} className="border-border">
              <CardHeader>
                <pillar.icon className="size-6 text-primary" aria-hidden="true" />
                <CardTitle className="font-heading text-xl mt-3">
                  {pillar.title}
                </CardTitle>
                <CardDescription className="text-text-muted">
                  {pillar.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={pillar.href}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Learn more &rarr;
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why ADR-i comparison */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-text text-center">
            Why choose institutional ADR
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 font-body text-sm font-semibold text-text-muted">
                    Criterion
                  </th>
                  <th className="py-3 pr-4 font-body text-sm font-semibold text-primary">
                    Adjudix
                  </th>
                  <th className="py-3 font-body text-sm font-semibold text-text-muted">
                    Ad hoc / litigation
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.criterion} className="border-b border-border align-top">
                    <td className="py-4 pr-4 font-body text-sm font-medium text-text">
                      {row.criterion}
                    </td>
                    <td className="py-4 pr-4 font-body text-sm text-text">
                      <span className="flex gap-2">
                        <CheckCircle2
                          className="size-4 shrink-0 mt-0.5 text-primary"
                          aria-hidden="true"
                        />
                        {row.adjudix}
                      </span>
                    </td>
                    <td className="py-4 font-body text-sm text-text-muted">
                      <span className="flex gap-2">
                        <XCircle
                          className="size-4 shrink-0 mt-0.5 text-text-muted"
                          aria-hidden="true"
                        />
                        {row.other}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-2xl px-6 py-20">
        <h2 className="font-heading text-2xl font-semibold text-text mb-6">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={FAQ_ITEMS} />
      </section>
    </main>
  );
}
