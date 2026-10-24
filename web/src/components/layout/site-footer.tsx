import Link from "next/link";
import Image from "next/image";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/site-settings";

export function SiteFooter({
  groups: FOOTER_GROUPS = DEFAULT_SETTINGS.footerGroups,
  copyright = DEFAULT_SETTINGS.copyright,
}: {
  groups?: SiteSettings["footerGroups"];
  copyright?: string;
}) {
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
              alt="Adjudix Dispute Resolution Institute — Dispute Resolved & Implemented under one Roof"
              width={277}
              height={64}
              className="h-14 w-auto md:h-16"
            />
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <p className="text-xs text-text-on-hero-muted">
                &copy; {new Date().getFullYear()} {copyright}
              </p>
              <span className="hidden text-xs text-text-on-hero-muted sm:inline" aria-hidden="true">
                &middot;
              </span>
              <Link
                href="/credits"
                className="inline-flex items-center gap-2 self-start border-b border-transparent pb-px text-xs font-semibold text-primary-ink transition-colors hover:border-primary hover:text-text-on-hero"
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
