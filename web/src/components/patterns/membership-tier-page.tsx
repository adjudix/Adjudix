import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

export interface MembershipTierPageProps {
  title: string;
  intro: string;
  eligibility: string[];
  benefits: string[];
  fee: string;
  applyHref?: string;
}

export function MembershipTierPage({
  title,
  intro,
  eligibility,
  benefits,
  fee,
  applyHref = "/contact",
}: MembershipTierPageProps) {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Membership"
        title={`${title} Membership`}
        breadcrumbs={[{ label: "Membership", href: "/membership" }, { label: title }]}
        intro={intro}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-xl font-semibold text-text">Eligibility</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {eligibility.map((item) => (
                <li key={item} className="flex gap-3 font-body text-text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold text-text">Benefits</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {benefits.map((item) => (
                <li key={item} className="flex gap-3 font-body text-text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <span className="font-mono text-xs tracking-widest uppercase text-primary">Fee</span>
          <p className="mt-2 font-body text-lg text-text">{fee}</p>
        </div>
      </section>

      <CtaBand
        title={`Apply for ${title} Membership`}
        primary={{ label: `Apply for ${title}`, href: applyHref }}
        secondary={{ label: "Compare All Tiers", href: "/membership" }}
      />
    </main>
  );
}
