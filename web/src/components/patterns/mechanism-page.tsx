import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { NumberedList, type NumberedListItem } from "@/components/ui/numbered-list";
import { FaqAccordion, type FaqItem } from "@/components/ui/faq-accordion";

export interface MechanismPageProps {
  eyebrow?: string;
  title: string;
  intro: string;
  legalBasisTitle?: string;
  legalBasis: string;
  howItWorks: NumberedListItem[];
  faqs?: FaqItem[];
  filingLabel?: string;
  filingHref?: string;
  panelHref?: string;
}

export function MechanismPage({
  eyebrow = "Dispute Resolution",
  title,
  intro,
  legalBasisTitle = "Legal basis",
  legalBasis,
  howItWorks,
  faqs,
  filingLabel = "File a Dispute",
  filingHref = "/odr/file",
  panelHref = "/dispute-resolution/panels",
}: MechanismPageProps) {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        breadcrumbs={[{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: title }]}
        intro={intro}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-heading text-2xl font-semibold text-text">How it works</h2>
        <div className="mt-8">
          <NumberedList items={howItWorks} columns={howItWorks.length >= 4 ? 4 : 3} />
        </div>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-xl font-semibold text-text">{legalBasisTitle}</h2>
          <p className="mt-3 font-body text-text-muted">{legalBasis}</p>
        </div>
      </section>

      {faqs && faqs.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="font-heading text-2xl font-semibold text-text mb-6">
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={faqs} />
        </section>
      )}

      <CtaBand
        title={`Ready to start a ${title.toLowerCase()} case?`}
        description="File online through the ODR Platform, or view the relevant specialized panel."
        primary={{ label: filingLabel, href: filingHref }}
        secondary={{ label: "View Our Panel", href: panelHref }}
      />
    </main>
  );
}
