import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { applyHref } from "@/lib/apply-forms";

export interface MembershipTierPageProps {
  title: string;
  intro: string;
  eligibility: string[];
  benefits: string[];
  fee: string;
  applyHref?: string;
  // Star rating shown as the eyebrow; "beyond" for Honorary (beyond stars).
  stars?: number | "beyond";
  applyLabel?: string;
  // Honorary membership cannot be applied for.
  applyable?: boolean;
}

export function MembershipTierPage({
  title,
  intro,
  eligibility,
  benefits,
  fee,
  applyHref: href,
  stars,
  applyLabel = `Apply for ${title} Membership`,
  applyable = true,
}: MembershipTierPageProps) {
  const eyebrow =
    stars === "beyond" ? "Membership · Beyond stars" : stars ? `Membership · ${"★".repeat(stars)}` : "Membership";
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow={eyebrow}
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

      {applyable ? (
        <CtaBand
          title={applyLabel}
          primary={{ label: applyLabel, href: href ?? applyHref("membership", { tier: title }) }}
          secondary={{ label: "Compare All Tiers", href: "/membership" }}
        />
      ) : (
        <CtaBand
          title="Conferred, never claimed"
          description="Honorary membership is conferred by the institute and cannot be applied for."
          primary={{ label: "Our Esteemed Members", href: "/membership/directory" }}
          secondary={{ label: "Compare All Tiers", href: "/membership" }}
        />
      )}
    </main>
  );
}
