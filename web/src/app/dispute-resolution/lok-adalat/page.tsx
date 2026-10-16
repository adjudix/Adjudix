import { MechanismPage } from "@/components/patterns/mechanism-page";
import { LinkButton } from "@/components/ui/link-button";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Lok Adalat",
  description:
    "A statutory forum for compromise settlement under the Legal Services Authorities Act, 1987 — distinct from arbitration or mediation in that its jurisdiction…",
  path: "/dispute-resolution/lok-adalat",
});

export default function LokAdalatPage() {
  return (
    <MechanismPage
      title="Lok Adalat"
      intro="A statutory forum for compromise settlement under the Legal Services Authorities Act, 1987 — distinct from arbitration or mediation in that its jurisdiction and effect come from statute, not from an agreement between the parties."
      howItWorks={[
        {
          title: "Eligible matter identified",
          description: "Only compoundable civil disputes and certain pre-litigation matters qualify.",
        },
        {
          title: "Reference to Lok Adalat",
          description: "The matter is referred with the consent of both parties.",
        },
        {
          title: "Compromise hearing",
          description: "A panel assists both sides toward a mutually acceptable compromise.",
        },
        {
          title: "Award",
          description: "A settlement has the force of a civil court decree and is final — there is no appeal.",
        },
      ]}
      legalBasisTitle="Legal basis — read this carefully"
      legalBasis="Lok Adalat is a statutory mechanism under the Legal Services Authorities Act, 1987, not a contractual one. Adjudix facilitates access to this forum for eligible matters, but does not itself constitute the Lok Adalat — that authority sits with the Legal Services Authorities. An award made in Lok Adalat is final and binding, and no appeal lies against it."
      faqs={[
        {
          question: "Is Lok Adalat the same as arbitration?",
          answer: "No. Lok Adalat is a statutory compromise forum under the Legal Services Authorities Act — its authority comes from that Act, not from a contract between the parties, as arbitration does.",
        },
        {
          question: "What kinds of disputes qualify?",
          answer: "Generally, compoundable civil disputes and certain matters at the pre-litigation stage. Adjudix can help you confirm whether your matter is eligible.",
        },
      ]}
      extra={
        // Highlighted on the client's markup (Oct 2026): set apart as a lit
        // panel rather than another plain text section.
        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl rounded-lg bg-hero p-8 ring-1 ring-primary/40 text-text-on-hero shadow-xl md:p-10">
            <span className="rounded-full bg-primary px-3 py-1 font-mono text-[0.7rem] font-semibold tracking-widest uppercase text-primary-foreground">
              Only at Adjudix
            </span>
            <h2 className="mt-5 font-heading text-3xl font-semibold md:text-4xl">Adjudix Lok Adalat</h2>
            <p className="mt-4 max-w-2xl font-body text-text-on-hero-muted md:text-lg">
              An Adjudix Lok Adalat can be convened during any ADR proceeding. For a single day, a
              new ADR professional is engaged; each party submits its confidential settlement
              proposal to them, and they act as a conciliator, keeping every proposal secret. That
              secrecy is what makes an out-of-the-box settlement possible — one neither side would
              have put on the table in open proceedings.
            </p>
            <LinkButton href={applyHref("lok-adalat")} className="mt-6">
              Convene an Adjudix Lok Adalat
            </LinkButton>
          </div>
        </section>
      }
      filingLabel="Check Eligibility"
      filingHref={applyHref("lok-adalat")}
    />
  );
}
