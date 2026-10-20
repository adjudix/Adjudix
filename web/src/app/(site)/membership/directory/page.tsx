import { editableMetadata, editablePage } from "@/lib/pages/editable";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { IdentityNote, MemberCard } from "@/components/patterns/member-card";
import { getMembers } from "@/lib/content/data";
import { IDENTITY_NOTE, membershipCodes, TIERS, TIER_ORDER } from "@/lib/members";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Our Esteemed Members",
  description:
    "The professionals who make up Adjudix, by membership. To verify a member's standing, contact the Secretariat.",
  path: "/membership/directory",
});

async function DirectoryPage() {
  const all = await getMembers();
  const codes = membershipCodes(all);
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
        const members = all.filter((member) => member.tier === tierId);
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
                  <MemberCard member={member} code={codes.get(member)} role={member.panel ? `${tier.label} · Panel Arbitrator` : undefined} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <p className="font-body text-sm text-text-muted">
          Membership codes and basic details for every member are kept in the{" "}
          <Link href="/membership/register" className="font-medium text-primary-ink hover:underline">
            Register of Members
          </Link>
          .
        </p>
      </section>

      <CtaBand
        title="Become a member"
        primary={{ label: "Compare Tiers", href: "/membership" }}
        secondary={{ label: "Our Professional Panel", href: "/panel" }}
      />
    </main>
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/membership/directory", metadata);
export default editablePage("/membership/directory", DirectoryPage, metadata);
