import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/ui/link-button";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { NumberedList } from "@/components/ui/numbered-list";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { Reveal } from "@/components/ui/reveal";
import { FlipStack } from "@/components/ui/flip-stack";
import { AudienceFinder } from "@/components/layout/audience-finder";
import { CODE_EDITIONS } from "@/lib/code-editions";

const PILLARS = [
  {
    title: "Dispute Resolution & Implementation",
    description: "ADR mechanisms and global implementation of orders and awards.",
    href: "/dispute-resolution",
  },
  {
    title: "ODR Platform",
    description: "File, respond, or request an ad hoc appointment.",
    href: "/odr",
  },
  {
    title: "Training Institute",
    description: "Professional and student certification programmes.",
    href: "/training",
  },
];

const SHOWCASE_TILES = [
  {
    image: "/images/legal-review.jpg",
    title: "Practice Areas",
    description: "Ten subject-matter streams, from construction to insurance.",
    href: "/dispute-resolution/practice-areas",
  },
  {
    image: "/images/training-workshop.jpg",
    title: "Training Institute",
    description: "Professional and student certification programmes.",
    href: "/training",
  },
  {
    image: "/images/handshake-resolution.jpg",
    title: "Corporate Dispute Resolution",
    description: "Disputes resolved without disrupting the relationship.",
    href: "/dispute-resolution/corporate",
  },
];

// Stars replace "Tier 01/02/03" labels (client brief), highest standing first.
const MEMBERSHIP_CARDS = [
  {
    eyebrow: "★★★★★",
    title: "Fellow",
    description: "Senior recognition for a sustained record of panel appointments.",
    points: [
      "Priority consideration for high-value appointments",
      "Use of the Fellow designation",
      "A voice in reviews of the Adjudix Code of ADR Procedure",
    ],
    backImage: "/images/boardroom-collaboration.jpg",
    backAlt: "A panel presenting a case analysis to a seated group around a conference table",
  },
  {
    eyebrow: "★★★★",
    title: "Associate",
    description: "Full standing, case-eligible once CPD and experience thresholds are met.",
    points: [
      "Eligibility for appointment to the Professional Panel",
      "Use of the Associate Member designation",
      "Free on completion of a Training Programme under Adjudix",
    ],
    backImage: "/images/legal-review.jpg",
    backAlt: "Two people reviewing and signing paperwork",
  },
  {
    eyebrow: "★★★",
    title: "Affiliate",
    description: "Standing for early-career professionals building toward the register.",
    points: [
      "Open to recent graduates in law, CA/CS, or engineering",
      "Access to Training Institute course discounts",
      "Free on completing an Apprenticeship or Internship",
    ],
    backImage: "/images/training-workshop.jpg",
    backAlt: "A presenter addressing a seated professional workshop group",
  },
  {
    eyebrow: "★★",
    title: "Student",
    description: "The first step on the register for students of law, commerce, and engineering.",
    points: [
      "Free for students",
      "Access to competitions, webinars, and events",
      "A defined path toward Affiliate membership",
    ],
    backImage: "/images/membership-roundtable.jpg",
    backAlt: "Members in discussion around a table",
  },
  {
    eyebrow: "Beyond stars",
    title: "Honorary",
    description: "Special Honorary Membership, conferred by the institute.",
    points: [
      "Cannot be applied for or claimed — it is earned",
      "Conferred for exceptional contribution to ADR",
      "Listed among Our Esteemed Members",
    ],
    backImage: "/images/columns-detail.jpg",
    backAlt: "Classical stone columns",
  },
];

const COMPARISON_ROWS = [
  {
    criterion: "Choosing the decision-maker",
    adjudix: "Parties nominate from our Professional Panel; the institute appoints",
    other: "No structured process, appointment can stall indefinitely",
  },
  {
    criterion: "Timeline",
    adjudix: "Governed by the Adjudix Code of ADR Procedure, with an Emergency Arbitrator route for urgent relief",
    other: "No fixed procedural timeline",
  },
  {
    criterion: "Enforceability",
    adjudix: "Awards enforceable under the Arbitration and Conciliation Act, 1996, or the applicable laws of the concerned country",
    other: "Depends entirely on how the matter was resolved",
  },
];

const FAQ_ITEMS = [
  {
    question: "What is Adjudix?",
    answer:
      "Adjudix Dispute Resolution Institute administers arbitration, mediation, conciliation, and online dispute resolution under the Adjudix Code of ADR Procedure, 2026, alongside a Training Institute and professional membership programme.",
  },
  {
    question: "How do I file a dispute?",
    answer:
      "Use the ODR Platform's filing flow. You'll select a dispute type, provide claimant and respondent details, and see an estimated fee before you submit.",
  },
  {
    question: "Who can join the professional panel?",
    answer:
      "Advocates, chartered accountants, company secretaries, and engineers — civil, IT, and others — with relevant experience can apply. Applications are reviewed and verified before a panelist is listed.",
  },
  {
    question: "Can Adjudix implement an award or order globally?",
    answer:
      "Yes. Adjudix carries arbitral awards, mediated settlements, and Lok Adalat orders through to implementation — in India and in any New York Convention country — through its professional panel. Book a consultation on the Implementation of ADR Orders page.",
  },
  {
    question: "What kinds of membership are there?",
    answer:
      "Five: Fellow (★★★★★), Associate (★★★★), Affiliate (★★★), Student (★★, free for students), and Special Honorary Membership, which sits beyond stars — it cannot be claimed, it is earned.",
  },
  {
    question: "What training and certification programmes do you offer?",
    answer:
      "Six tracks — ADR Overview, Arbitration, Mediation, Conciliation, Contract Drafting, and Hybrid ADR — offered as professional and student courses, each tied to a published Competence Framework.",
  },
  {
    question: "Do you draft contracts and arbitration clauses?",
    answer:
      "Yes. Our Contract & Clause Drafting service tailors arbitration, mediation, and hybrid clauses to your agreement, and our Model Clauses page has ready-to-insert language.",
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
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="relative -mt-20 md:-mt-24 max-w-md rounded-lg bg-hero p-8 md:p-10 text-text-on-hero shadow-xl">
              <h1 className="font-heading text-3xl md:text-4xl font-semibold text-balance">
                Dispute Resolution and assured Implementation under one roof
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <LinkButton variant="primary" size="lg" href="/odr/file">
                  File a Dispute
                </LinkButton>
                <LinkButton variant="secondaryInverse" size="lg" href="/training">
                  Explore Training
                </LinkButton>
              </div>
            </div>

            {/* Audience finder — same overlap technique as the card above,
                echoing iccwbo.org's homepage widget (290px card, 24px
                padding, 52px dropdown, matching its real dimensions),
                pulled up over the same hero image rather than stacked
                below the section. */}
            <div className="relative shrink-0 md:-mt-12 md:w-[290px]">
              <AudienceFinder />
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars — numbered strip, thin dividers, no card boxes */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <NumberedList items={PILLARS} />
      </section>

      {/* Practice Areas showcase — Pattern C: layered bento, mixed tiles */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-3 md:h-[440px] md:grid-cols-[1.4fr_1fr] md:grid-rows-2">
            <div className="rounded-lg bg-hero p-8 md:p-10 text-text-on-hero flex flex-col justify-center md:row-span-2 md:h-full">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-balance max-w-sm">
                Expertise matched to your dispute, not a generic roster
              </h2>
              <p className="mt-3 font-body text-sm text-text-on-hero-muted max-w-sm">
                Ten practice areas, each heard by neutrals from our Professional Panel
                with the right background for that kind of dispute.
              </p>
              <LinkButton
                variant="primary"
                size="default"
                className="mt-6 self-start"
                href="/dispute-resolution/practice-areas"
              >
                Explore Practice Areas
              </LinkButton>
            </div>
            <div className="relative min-h-40 overflow-hidden rounded-lg md:h-full">
              <Image
                src="/images/columns-detail.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="rounded-lg border border-border bg-canvas p-8 flex flex-col justify-center md:h-full">
              <span className="font-mono text-xs tracking-widest uppercase text-primary">
                Panel coverage
              </span>
              <span className="mt-3 font-mono text-5xl font-semibold text-text">10</span>
              <span className="mt-2 font-body text-sm text-text-muted">
                specialized dispute-type panels, each independently vetted
              </span>
            </div>
          </Reveal>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {SHOWCASE_TILES.map((tile, index) => (
              <Reveal key={tile.title} delay={index * 90}>
                <Link
                  href={tile.href}
                  className="group relative block aspect-4/3 overflow-hidden rounded-lg"
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Dispute Resolution — Pattern A: editorial split, no scrim */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="grid gap-10 md:grid-cols-2 md:items-center">
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
        </Reveal>
      </section>

      {/* Rule Book — the three editions of the Code side by side, each one
          building on the last; the current edition is the lit card */}
      <section className="bg-hero px-6 py-20 text-text-on-hero">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-primary">
                The Rule Book
              </span>
              <h2 className="mt-3 max-w-xl font-heading text-2xl font-semibold text-balance md:text-3xl">
                The Adjudix Code of ADR Procedure, in three editions
              </h2>
              <p className="mt-4 max-w-xl text-left font-body text-text-on-hero-muted">
                Our rule book: every case at Adjudix runs on this published Code. Each edition builds
                on the one before it, and every edition opens with our code of conduct, the Moral
                Principles we follow strictly.
              </p>
            </div>
            <LinkButton
              variant="secondaryInverse"
              size="default"
              className="self-start md:self-auto"
              href="/dispute-resolution/rules/code-of-procedure"
            >
              Explore the Code
            </LinkButton>
          </Reveal>

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {CODE_EDITIONS.map((edition, index) => (
              <li key={edition.year} className="relative">
                <Reveal
                  delay={index * 120}
                  className={`flex h-full flex-col rounded-lg p-6 ${
                    edition.current
                      ? "bg-canvas text-foreground shadow-2xl"
                      : "border border-border-on-hero"
                  }`}
                >
                  {index > 0 && (
                    <span
                      className="absolute -left-5 top-10 hidden size-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary font-body text-sm font-semibold text-primary-foreground md:flex"
                      title={`Builds on the ${CODE_EDITIONS[index - 1].year} edition`}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs tracking-widest uppercase text-primary">
                      {edition.edition}
                    </span>
                    {edition.current && (
                      <span className="rounded-full bg-primary/15 px-2.5 py-0.5 font-mono text-[0.7rem] font-semibold text-primary">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-3 font-heading text-5xl font-semibold">{edition.year}</p>
                  <p
                    className={`mt-3 text-left font-body text-sm ${
                      edition.current ? "text-muted-foreground" : "text-text-on-hero-muted"
                    }`}
                  >
                    {edition.summary}
                  </p>

                  <p className="mt-5 font-mono text-[0.7rem] tracking-widest uppercase opacity-70">
                    {index === 0 ? "Established" : `New since ${CODE_EDITIONS[index - 1].year}`}
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {edition.additions.map((item) => (
                      <li key={item} className="flex gap-2 font-body text-sm">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <dl
                      className={`grid grid-cols-3 gap-2 border-t pt-4 ${
                        edition.current ? "border-border" : "border-border-on-hero"
                      }`}
                    >
                      {[
                        { label: "Sections", value: edition.sections },
                        { label: "Pages", value: edition.pages },
                        { label: "Principles", value: edition.principles },
                      ].map((stat) => (
                        <div key={stat.label}>
                          <dt className="font-mono text-[0.65rem] tracking-widest uppercase opacity-70">
                            {stat.label}
                          </dt>
                          <dd className="font-heading text-lg font-semibold">{stat.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-sm font-medium">
                      <Link
                        href={`/dispute-resolution/rules/code-of-procedure/${edition.year}`}
                        className={
                          edition.current
                            ? "rounded-full bg-primary px-4 py-2 text-primary-foreground hover:bg-primary-hover"
                            : "rounded-full border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-primary-foreground"
                        }
                      >
                        Read online
                      </Link>
                      <a href={edition.pdf} download className="text-primary hover:underline">
                        PDF
                      </a>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Membership — an open-book spread: a static left page and a stack of
          flip-through membership cards on the right, deliberately different
          from the Dispute Resolution section above (no photos, no bento) */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <FlipStack
            cards={MEMBERSHIP_CARDS}
            panel={
              <div className="flex h-full flex-col justify-center bg-surface p-8 md:p-10">
                <span className="font-mono text-xs tracking-widest uppercase text-primary">
                  Membership
                </span>
                <h2 className="mt-3 font-heading text-2xl md:text-3xl font-semibold text-balance max-w-sm text-text">
                  A professional register, not a mailing list
                </h2>
                <p className="mt-3 font-body text-sm text-text-muted max-w-sm">
                  Five kinds of membership — Fellow, Associate, Affiliate, Student, and
                  Honorary — each with defined eligibility, so membership means
                  something when a client checks it.
                </p>
                <LinkButton
                  variant="secondary"
                  size="default"
                  className="mt-6 self-start"
                  href="/membership"
                >
                  Explore Membership
                </LinkButton>
              </div>
            }
          />
        </Reveal>
      </section>

      {/* Why choose institutional ADR — Pattern B: confident serif statement */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-text text-balance max-w-md">
              Certainty is not the <em className="italic text-primary">exception</em>,
              it&apos;s the procedure
            </h2>
            <p className="font-body text-text-muted max-w-sm">
              Every case follows the same Adjudix Code of ADR Procedure, 2026, so the
              outcome depends on the merits, not on how the other side behaves.
            </p>
          </Reveal>
          <div className="mt-10">
            <ComparisonTable rows={COMPARISON_ROWS} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <Reveal className="flex flex-col gap-4 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-text text-balance">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-text-muted max-w-sm">
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact the registry
            </Link>{" "}
            directly.
          </p>
        </Reveal>
        <FaqAccordion items={FAQ_ITEMS} />
      </section>
    </main>
  );
}
