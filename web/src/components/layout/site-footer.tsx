import Link from "next/link";
import Image from "next/image";

// Columns follow the client's Oct 2026 footer markup. The Institute column is
// organised around their Who / What / Why / How / Where framing.
const FOOTER_GROUPS = [
  {
    title: "Dispute Resolution",
    links: [
      { label: "ADR Mechanisms", href: "/dispute-resolution" },
      { label: "Emergency Arbitration", href: "/dispute-resolution/emergency" },
      { label: "Practice Areas", href: "/dispute-resolution/practice-areas" },
      { label: "Rules & Governance", href: "/dispute-resolution/rules" },
      { label: "Corporate Services", href: "/dispute-resolution/corporate" },
      { label: "Implementation", href: "/implementation" },
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
      { label: "Professional Courses", href: "/training/courses" },
      { label: "Student Courses", href: "/training/courses#student-courses" },
      { label: "Apprenticeships & Internships", href: "/training/apprenticeships" },
    ],
  },
  {
    title: "Institute",
    links: [
      { label: "Who We Are", href: "/about/our-story" },
      { label: "What We Do", href: "/dispute-resolution" },
      { label: "Why Us", href: "/about" },
      { label: "Our Professional Panel", href: "/panel" },
      { label: "Online & Offline", href: "/dispute-resolution/offline" },
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
              <h2 className="font-heading text-sm font-semibold mb-3">
                {group.title}
              </h2>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.label}>
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
              alt="Adjudix Dispute Resolution Institute — Dispute Resolved & Implemented at your Doorstep"
              width={277}
              height={64}
              className="h-14 w-auto md:h-16"
            />
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <p className="text-xs text-text-on-hero-muted">
                &copy; {new Date().getFullYear()} Adjudix Dispute Resolution Institute. All rights reserved.
              </p>
              <span className="hidden text-xs text-text-on-hero-muted sm:inline" aria-hidden="true">
                &middot;
              </span>
              <Link
                href="/credits"
                className="inline-flex items-center gap-2 self-start border-b border-transparent pb-px text-xs font-semibold text-primary transition-colors hover:border-primary hover:text-text-on-hero"
              >
                <Image
                  src="/images/kapivic-logo.png"
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 rounded-sm bg-white p-px"
                />
                Built by Kapivic — get one like this →
              </Link>
            </div>
            <div className="flex items-center gap-6 text-sm text-text-on-hero-muted">
              <Link href="/privacy" className="hover:text-text-on-hero">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-text-on-hero">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
