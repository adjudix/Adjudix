import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { Reveal } from "@/components/ui/reveal";

const TIERS = [
  {
    title: "Affiliated",
    eligibility: "Open to students and early-career professionals",
    entry: "Free, after verification",
    href: "/membership/affiliated",
  },
  {
    title: "Associated",
    eligibility: "Completed a Training Institute track, or equivalent experience",
    entry: "Free, after verification",
    href: "/membership/associated",
  },
  {
    title: "Fellow",
    eligibility: "Senior practitioners with a sustained record of panel appointments",
    entry: "By nomination or application, reviewed by the Advisory Council",
    href: "/membership/fellow",
  },
  {
    title: "Corporate",
    eligibility: "Businesses and institutions seeking an ongoing relationship",
    entry: "Contact us for terms",
    href: "/membership/corporate",
  },
];

export default function MembershipPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Membership"
        title="Compare Tiers"
        intro="A professional register, not a mailing list. Every tier carries defined eligibility, so membership means something when a client checks it."
        image={{ src: "/images/membership-roundtable.jpg", alt: "Professionals in discussion around a conference roundtable" }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 pr-4 font-body text-sm font-semibold text-text-muted">Tier</th>
                <th className="py-3 pr-4 font-body text-sm font-semibold text-text-muted">Eligibility</th>
                <th className="py-3 font-body text-sm font-semibold text-text-muted">Entry</th>
              </tr>
            </thead>
            <tbody>
              {TIERS.map((tier) => (
                <tr
                  key={tier.title}
                  className="border-b border-border align-top transition-colors hover:bg-surface"
                >
                  <td className="py-4 pr-4 font-body text-sm font-medium">
                    <Link href={tier.href} className="text-primary hover:underline">
                      {tier.title}
                    </Link>
                  </td>
                  <td className="py-4 pr-4 font-body text-sm text-text">{tier.eligibility}</td>
                  <td className="py-4 font-body text-sm text-text-muted">{tier.entry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      <section className="bg-surface px-6 py-16">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-heading text-xl font-semibold text-text">
            Not sure which tier fits?
          </h2>
          <p className="mt-3 font-body text-text-muted">
            If you&apos;re a student or new to the field, start with{" "}
            <Link href="/membership/affiliated" className="text-primary hover:underline">
              Affiliated
            </Link>
            . If you&apos;ve completed a Training Institute track, you likely qualify for{" "}
            <Link href="/membership/associated" className="text-primary hover:underline">
              Associated
            </Link>
            . Senior practitioners with an established record should look at{" "}
            <Link href="/membership/fellow" className="text-primary hover:underline">
              Fellow
            </Link>
            . Businesses should see{" "}
            <Link href="/membership/corporate" className="text-primary hover:underline">
              Corporate Membership
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <CtaBand
        title="See who's already a member"
        primary={{ label: "Our Esteemed Members", href: "/membership/directory" }}
        secondary={{ label: "Talk to Us", href: "/contact" }}
      />
    </main>
  );
}
