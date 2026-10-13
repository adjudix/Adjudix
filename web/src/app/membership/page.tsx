import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Membership",
  description:
    "A professional register, not a mailing list. Every tier carries defined eligibility, so membership means something when a client checks it.",
  path: "/membership",
});

// Per the client's compare-tiers markup: five kinds, stars not tier numbers,
// highest standing first, Corporate removed.
const TIERS = [
  {
    title: "Fellow",
    stars: "★★★★★",
    eligibility: "Senior practitioners with a sustained record of panel appointments",
    entry: "By nomination or application, reviewed by the Advisory Council",
    href: "/membership/fellow",
  },
  {
    title: "Associate",
    stars: "★★★★",
    eligibility: "Completed a Training Institute track, or equivalent experience",
    entry: "Free, after completion of a Training Programme under Adjudix",
    href: "/membership/associated",
  },
  {
    title: "Affiliate",
    stars: "★★★",
    eligibility: "Open to early-career professionals",
    entry: "Free, after completing an Apprenticeship or Internship",
    href: "/membership/affiliated",
  },
  {
    title: "Student",
    stars: "★★",
    eligibility: "Students of law, CA/CS, commerce, or engineering",
    entry: "Free for students",
    href: "/membership/student",
  },
  {
    title: "Special Honorary",
    stars: "Beyond stars",
    eligibility: "Conferred for exceptional contribution to ADR",
    entry: "Cannot be claimed — it is earned",
    href: "/membership/honorary",
  },
];

export default function MembershipPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Membership"
        title="Five Kinds of Membership"
        intro="A professional register, not a mailing list. Every tier carries defined eligibility, so membership means something when a client checks it."
        image={{ src: "/images/membership-roundtable.jpg", alt: "Professionals in discussion around a conference roundtable" }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 pr-4 font-body text-sm font-semibold text-text-muted">Membership</th>
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
                    <Link href={tier.href} className="text-primary-ink hover:underline">
                      {tier.title}
                    </Link>
                    <span className="mt-1 block text-primary-hover" aria-label={tier.stars}>
                      {tier.stars}
                    </span>
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
            If you&apos;re a student, start with{" "}
            <Link href="/membership/student" className="text-primary-ink hover:underline">
              Student
            </Link>{" "}
            membership — it&apos;s free. Early-career professionals who have completed an
            Apprenticeship or Internship qualify for{" "}
            <Link href="/membership/affiliated" className="text-primary-ink hover:underline">
              Affiliate
            </Link>
            . If you&apos;ve completed a Training Programme, you likely qualify for{" "}
            <Link href="/membership/associated" className="text-primary-ink hover:underline">
              Associate
            </Link>
            . Senior practitioners with an established record should look at{" "}
            <Link href="/membership/fellow" className="text-primary-ink hover:underline">
              Fellow
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <CtaBand
        title="See who's already a member"
        primary={{ label: "Our Esteemed Members", href: "/membership/directory" }}
        secondary={{ label: "Apply for Membership", href: applyHref("membership") }}
      />
    </main>
  );
}
