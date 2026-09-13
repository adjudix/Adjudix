import Image from "next/image";
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

const SHOWCASE_TILES = [
  {
    image: "/images/columns-detail.jpg",
    title: "Specialized Panels",
    description: "Nine dispute-type categories, each with vetted specialists.",
    href: "/dispute-resolution/panels",
  },
  {
    image: "/images/training-workshop.jpg",
    title: "Training Institute",
    description: "Professional and student certification tracks.",
    href: "/training",
  },
  {
    image: "/images/handshake-resolution.jpg",
    title: "Corporate Dispute Resolution",
    description: "Disputes resolved without disrupting the relationship.",
    href: "/dispute-resolution/corporate",
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
      {/* Hero — Pattern D: photo shown whole, message in a floating card */}
      <section className="relative">
        <div className="relative h-[420px] md:h-[480px] w-full">
          <Image
            src="/images/hero-law-library.jpg"
            alt="A grand institutional reading room"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative -mt-20 md:-mt-24 max-w-md rounded-lg bg-hero p-8 md:p-10 text-text-on-hero shadow-xl">
            <h1 className="font-heading text-3xl md:text-4xl font-semibold text-balance">
              Arbitration, mediation, and ADR under one roof
            </h1>
            <p className="mt-3 font-body text-text-on-hero-muted">
              Dialogue. Dispute. Resolution. A better tomorrow.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton variant="primary" size="default" href="/odr/file">
                File a Dispute
              </LinkButton>
              <LinkButton
                variant="secondary"
                size="default"
                className="border-border-on-hero text-text-on-hero"
                href="/training"
              >
                Explore Training
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-surface px-6 py-6 mt-10">
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

      {/* Specialized Panels showcase — Pattern C: layered bento, mixed tiles */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-3 md:grid-cols-[1.6fr_1fr]">
            <div className="rounded-lg bg-hero p-8 md:p-10 text-text-on-hero flex flex-col justify-center">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-balance max-w-sm">
                A panel built around your dispute, not a generic roster
              </h2>
              <p className="mt-3 font-body text-sm text-text-on-hero-muted max-w-sm">
                Nine specialized categories, each with panelists vetted for that
                specific dispute type, from construction claims to intellectual
                property.
              </p>
              <LinkButton
                variant="primary"
                size="default"
                className="mt-6 self-start"
                href="/dispute-resolution/panels"
              >
                View the full panel
              </LinkButton>
            </div>
            <div className="rounded-lg border border-border bg-canvas p-6 flex flex-col justify-center">
              <span className="font-mono text-3xl font-semibold text-primary">9</span>
              <span className="mt-1 text-sm text-text-muted">
                specialized dispute-type panels, each independently vetted
              </span>
            </div>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {SHOWCASE_TILES.map((tile) => (
              <Link
                key={tile.title}
                href={tile.href}
                className="group relative aspect-4/3 overflow-hidden rounded-lg"
              >
                <Image
                  src={tile.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-hero/90 via-hero/10 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {tile.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/80">{tile.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Dispute Resolution — Pattern A: editorial split, no scrim */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-primary">
              For businesses
            </span>
            <h2 className="mt-3 font-heading text-2xl md:text-3xl font-semibold text-text text-balance">
              Corporate dispute resolution, built for how businesses actually decide
            </h2>
            <p className="mt-4 font-body text-text-muted">
              Bespoke panel access, arbitration clauses ready to insert into commercial
              contracts, and a dedicated relationship team, for businesses that need
              disputes resolved without disrupting the underlying commercial
              relationship.
            </p>
            <LinkButton
              variant="secondary"
              size="default"
              className="mt-6"
              href="/dispute-resolution/corporate"
            >
              Corporate Dispute Resolution Services
            </LinkButton>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-lg order-first md:order-last">
            <Image
              src="/images/boardroom-collaboration.jpg"
              alt="A panel presenting a case analysis to a seated group around a conference table"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why choose institutional ADR — Pattern B: confident serif statement */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-text text-balance max-w-md">
              Certainty is not the <em className="italic text-primary">exception</em>,
              it&apos;s the procedure
            </h2>
            <p className="font-body text-text-muted max-w-sm">
              Every case follows the same published Code of Procedure, so the
              outcome depends on the merits, not on how the other side behaves.
            </p>
          </div>
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
