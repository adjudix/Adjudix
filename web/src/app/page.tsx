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

const DISPUTE_CARDS = [
  {
    image: "/images/columns-detail.jpg",
    alt: "A classical colonnade",
    title: "Specialized Panels",
    description: "Nine dispute-type categories, each with vetted specialists.",
  },
  {
    image: "/images/handshake-resolution.jpg",
    alt: "Close-up handshake between two professionals",
    title: "Corporate Dispute Resolution",
    description: "Disputes resolved without disrupting the relationship.",
  },
  {
    image: "/images/legal-review.jpg",
    alt: "Two people reviewing and signing paperwork",
    title: "Rules & Governance",
    description: "One published Code of Procedure, versioned and public.",
  },
];

const MEMBERSHIP_CARDS = [
  {
    eyebrow: "Tier 01",
    title: "Affiliated",
    description: "Entry standing for early-career professionals building toward the register.",
  },
  {
    eyebrow: "Tier 02",
    title: "Associated",
    description: "Full standing, case-eligible once CPD and experience thresholds are met.",
  },
  {
    eyebrow: "Tier 03",
    title: "Fellow",
    description: "Senior recognition for a sustained record of panel appointments.",
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

      {/* Specialized Panels — 1:1 split, interactive flip-stack instead of a static photo */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 md:grid-cols-2 md:items-stretch">
            <div className="flex flex-col justify-center rounded-lg bg-hero p-8 md:p-10 text-text-on-hero h-[420px] md:h-[480px]">
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
            <FlipStack cards={DISPUTE_CARDS} />
          </Reveal>
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

      {/* Membership — 1:1 split, flip-through membership cards (no photos: a
          deliberately different treatment from the Dispute Resolution
          section above, not the same bento reused with new words) */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="grid gap-6 md:grid-cols-2 md:items-stretch">
          <div className="flex flex-col justify-center h-[420px] md:h-[480px]">
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
          <FlipStack cards={MEMBERSHIP_CARDS} />
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
