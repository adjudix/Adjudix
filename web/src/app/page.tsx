import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/ui/link-button";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { NumberedList } from "@/components/ui/numbered-list";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { Reveal } from "@/components/ui/reveal";
import { FlipStack } from "@/components/ui/flip-stack";

const PILLARS = [
  {
    title: "Dispute Resolution",
    description: "Arbitration, mediation, conciliation, Lok Adalat.",
    href: "/dispute-resolution",
  },
  {
    title: "ODR Platform",
    description: "File, respond, or request an ad hoc appointment.",
    href: "/odr",
  },
  {
    title: "Training Institute",
    description: "Professional and student certification tracks.",
    href: "/training",
  },
];

const SHOWCASE_TILES = [
  {
    image: "/images/legal-review.jpg",
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

const MEMBERSHIP_CARDS = [
  {
    eyebrow: "Tier 01",
    title: "Affiliated",
    description: "Entry standing for early-career professionals building toward the register.",
    points: [
      "Open to students and recent graduates in law, CA/CS, or engineering",
      "Access to Training Institute course discounts",
      "A defined path toward Associated membership",
    ],
    backImage: "/images/training-workshop.jpg",
    backAlt: "A presenter addressing a seated professional workshop group",
  },
  {
    eyebrow: "Tier 02",
    title: "Associated",
    description: "Full standing, case-eligible once CPD and experience thresholds are met.",
    points: [
      "Eligibility for Specialized Panel appointment",
      "Use of the Associated Member designation",
      "CPD tracking through the Training Institute",
    ],
    backImage: "/images/legal-review.jpg",
    backAlt: "Two people reviewing and signing paperwork",
  },
  {
    eyebrow: "Tier 03",
    title: "Fellow",
    description: "Senior recognition for a sustained record of panel appointments.",
    points: [
      "Priority consideration for high-value appointments",
      "Use of the Fellow designation",
      "A voice in Code of Procedure review",
    ],
    backImage: "/images/boardroom-collaboration.jpg",
    backAlt: "A panel presenting a case analysis to a seated group around a conference table",
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
              <LinkButton variant="primary" size="lg" href="/odr/file">
                File a Dispute
              </LinkButton>
              <LinkButton variant="secondaryInverse" size="lg" href="/training">
                Explore Training
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars — numbered strip, thin dividers, no card boxes */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <NumberedList items={PILLARS} />
      </section>

      {/* Specialized Panels showcase — Pattern C: layered bento, mixed tiles */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-3 md:h-[440px] md:grid-cols-[1.4fr_1fr] md:grid-rows-2">
            <div className="rounded-lg bg-hero p-8 md:p-10 text-text-on-hero flex flex-col justify-center md:row-span-2 md:h-full">
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
              <span className="mt-3 font-mono text-5xl font-semibold text-text">9</span>
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
                  Affiliated, Associated, and Fellow standing each carry defined
                  eligibility and CPD requirements, so membership means something
                  when a client checks it.
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
              Every case follows the same published Code of Procedure, so the
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
