import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { IdentityNote, MemberCard } from "@/components/patterns/member-card";
import { IDENTITY_NOTE, MEMBERS, membershipCode, TIERS, TIER_ORDER } from "@/lib/members";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Esteemed Members",
  description:
    "The professionals who make up Adjudix, by membership. To verify a member's standing, contact the Secretariat.",
  path: "/membership/directory",
});

export default function DirectoryPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Membership"
        title="Our Esteemed Members"
        breadcrumbs={[{ label: "Membership", href: "/membership" }, { label: "Our Esteemed Members" }]}
        intro="The professionals who make up Adjudix, by membership. To verify a member's standing, contact the Secretariat."
      />

      <section className="mx-auto max-w-6xl px-6 pt-16">
        <IdentityNote {...IDENTITY_NOTE} />
      </section>

      {TIER_ORDER.map((tierId) => {
        const members = MEMBERS.filter((member) => member.tier === tierId);
        if (members.length === 0) return null;
        const tier = TIERS[tierId];
        return (
          <section key={tierId} aria-labelledby={`tier-${tierId}`} className="mx-auto max-w-6xl px-6 py-12">
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 id={`tier-${tierId}`} className="font-heading text-2xl font-semibold text-text">
                {tier.label}s
              </h2>
              <span className="font-mono text-xs tracking-wider text-primary-ink">[{tier.postNominal}]</span>
              <span className="font-body text-sm text-text-muted">({members.length})</span>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <li key={member.name}>
                  <MemberCard member={member} role={member.panel ? `${tier.label} · Panel Arbitrator` : undefined} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {/* Register of Members, by membership code (client markup, Oct 2026). */}
      <section aria-labelledby="register" className="mx-auto max-w-6xl px-6 py-12">
        <h2 id="register" className="font-heading text-2xl font-semibold text-text">
          Register of Members
        </h2>
        <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
          Every member carries a membership code: the tier (H Honorary, F Fellow, A Associate, Af
          Affiliate, S Student), a serial number, and the year of enrolment.
        </p>
        <div className="mt-6 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[32rem] border-collapse text-left font-body text-sm">
            <thead className="bg-surface text-xs uppercase tracking-wide text-text-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Membership code</th>
                <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                <th scope="col" className="px-4 py-3 font-semibold">Membership</th>
              </tr>
            </thead>
            <tbody>
              {TIER_ORDER.flatMap((tierId) => MEMBERS.filter((member) => member.tier === tierId)).map((member) => (
                <tr key={member.name} className="border-t border-border">
                  <td className="px-4 py-2.5 font-mono text-xs tabular-nums text-primary-ink">{membershipCode(member)}</td>
                  <td className="px-4 py-2.5 text-text">{member.name}</td>
                  <td className="px-4 py-2.5 text-text-muted">
                    {TIERS[member.tier].label} [{TIERS[member.tier].postNominal}]
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CtaBand
        title="Become a member"
        primary={{ label: "Compare Tiers", href: "/membership" }}
        secondary={{ label: "Our Professional Panel", href: "/panel" }}
      />
    </main>
  );
}
