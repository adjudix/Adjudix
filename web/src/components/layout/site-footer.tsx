import Link from "next/link";
import Image from "next/image";

const FOOTER_GROUPS = [
  {
    title: "Dispute Resolution",
    links: [
      { label: "Arbitration", href: "/dispute-resolution/arbitration" },
      { label: "Mediation", href: "/dispute-resolution/mediation" },
      { label: "Specialized Panels", href: "/dispute-resolution/panels" },
      { label: "Rules & Governance", href: "/dispute-resolution/rules" },
      { label: "Corporate Services", href: "/dispute-resolution/corporate" },
    ],
  },
  {
    title: "ODR Platform",
    links: [
      { label: "How It Works", href: "/odr" },
      { label: "File a Dispute", href: "/odr/file" },
      { label: "Respond to a Dispute", href: "/odr/respond" },
      { label: "Portal Login", href: "/odr/portal" },
    ],
  },
  {
    title: "Training Institute",
    links: [
      { label: "Courses", href: "/training/courses" },
      { label: "Certification", href: "/training/certification" },
      { label: "Calendar", href: "/training/calendar" },
      { label: "Apprenticeships", href: "/training/apprenticeships" },
    ],
  },
  {
    title: "Institute",
    links: [
      { label: "About / Why ADR-i", href: "/about" },
      { label: "Membership", href: "/membership" },
      { label: "Knowledge Centre", href: "/knowledge" },
      { label: "Events", href: "/events" },
      { label: "Our Partners", href: "/partners" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-hero text-text-on-hero">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {FOOTER_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="font-heading text-sm font-semibold mb-3">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-on-hero-muted hover:text-text-on-hero"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-border-on-hero pt-8">
          <div className="inline-block rounded-lg bg-white px-6 py-4">
            <Image
              src="/images/logo-horizontal.png"
              alt="Adjudix Dispute Resolution Institute — Dialogue, Dispute, Resolution, A Better Tomorrow"
              width={665}
              height={167}
              className="h-14 w-auto md:h-16"
            />
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-text-on-hero-muted">
              &copy; {new Date().getFullYear()} Adjudix Dispute Resolution Institute. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-text-on-hero-muted">
              <Link href="/privacy" className="hover:text-text-on-hero">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-text-on-hero">
                Terms &amp; Conditions
              </Link>
              <div className="flex items-center gap-4">
                <a href="https://linkedin.com" className="hover:text-text-on-hero">
                  LinkedIn
                </a>
                <a href="https://youtube.com" className="hover:text-text-on-hero">
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
