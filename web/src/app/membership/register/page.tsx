import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { MEMBERS, membershipCode, PROFESSIONS, TIERS, TIER_ORDER, type Member } from "@/lib/members";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Register of Members",
  description:
    "The Adjudix Register of Members: every member's membership code, name, membership, and profession.",
  path: "/membership/register",
});

function professionTitle(member: Member) {
  if (member.profession === "students") return "Student";
  return PROFESSIONS.find((profession) => profession.id === member.profession)?.title ?? "";
}

// Kept apart from Our Esteemed Members (client, Oct 2026): the register is
// the plain record, with basic details only.
export default function RegisterPage() {
  const register = TIER_ORDER.flatMap((tierId) => MEMBERS.filter((member) => member.tier === tierId));

  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Membership"
        title="Register of Members"
        breadcrumbs={[{ label: "Membership", href: "/membership" }, { label: "Register of Members" }]}
        intro="Every member carries a membership code: the tier (H Honorary, F Fellow, A Associate, Af Affiliate, S Student), a serial number, and the year of enrolment."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[44rem] border-collapse text-left font-body text-sm">
            <thead className="bg-surface text-xs uppercase tracking-wide text-text-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Membership code</th>
                <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                <th scope="col" className="px-4 py-3 font-semibold">Membership</th>
                <th scope="col" className="px-4 py-3 font-semibold">Profession</th>
                <th scope="col" className="px-4 py-3 font-semibold">Panel Arbitrator</th>
              </tr>
            </thead>
            <tbody>
              {register.map((member) => (
                <tr key={member.name} className="border-t border-border">
                  <td className="px-4 py-2.5 font-mono text-xs tabular-nums text-primary-ink">{membershipCode(member)}</td>
                  <td className="px-4 py-2.5 text-text">{member.name}</td>
                  <td className="px-4 py-2.5 text-text-muted">
                    {TIERS[member.tier].label} [{TIERS[member.tier].postNominal}]
                  </td>
                  <td className="px-4 py-2.5 text-text-muted">{professionTitle(member)}</td>
                  <td className="px-4 py-2.5 text-text-muted">{member.panel ? "Yes" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-body text-sm text-text-muted">
          To verify a member&apos;s standing, write to the Secretariat through the{" "}
          <Link href="/contact" className="font-medium text-primary-ink hover:underline">
            contact page
          </Link>
          .
        </p>
      </section>

      <CtaBand
        title="Become a member"
        primary={{ label: "Compare Tiers", href: "/membership" }}
        secondary={{ label: "Our Esteemed Members", href: "/membership/directory" }}
      />
    </main>
  );
}
