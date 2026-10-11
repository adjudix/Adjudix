"use client";

import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  // Membership tiers carry a star rating (client brief: stars, not "Tier 01").
  stars?: number;
  // Rendered indented beneath the previous link (Competitions under Events).
  nested?: boolean;
  // Bold + ember, for links the client asked to stand out.
  highlight?: boolean;
}

interface NavSection {
  label: string;
  links: NavLink[];
}

interface NavGroup {
  label: string;
  href?: string;
  children?: NavLink[];
  // Grouped, labeled columns for a mega-menu-style dropdown — used where a
  // flat list would bury an important distinction (Dispute Resolution's
  // types vs. its mechanisms/services) in one long list.
  sections?: NavSection[];
}

// Main (large) row. Structure follows the client's Oct 2026 markup: Events
// moved under Knowledge, Our Professional Panel and Implementation promoted
// to top level.
const NAV_GROUPS: NavGroup[] = [
  { label: "About", href: "/about" },
  {
    label: "Dispute Resolution",
    href: "/dispute-resolution",
    sections: [
      {
        label: "By Type",
        links: [
          { label: "Domestic Dispute Resolution", href: "/dispute-resolution/domestic" },
          { label: "International Dispute Resolution", href: "/dispute-resolution/international" },
          { label: "Online Dispute Resolution", href: "/odr" },
          { label: "Offline Dispute Resolution", href: "/dispute-resolution/offline" },
          { label: "Hybrid Dispute Resolution", href: "/dispute-resolution/hybrid" },
          { label: "Emergency Arbitration", href: "/dispute-resolution/emergency" },
          { label: "Practice Areas", href: "/dispute-resolution/practice-areas" },
        ],
      },
      {
        label: "Mechanisms & Services",
        links: [
          { label: "Hybrid ADR Mechanism", href: "/dispute-resolution/hybrid" },
          { label: "Arbitration", href: "/dispute-resolution/arbitration" },
          { label: "Mediation", href: "/dispute-resolution/mediation" },
          { label: "Conciliation", href: "/dispute-resolution/conciliation" },
          { label: "Lok Adalat", href: "/dispute-resolution/lok-adalat" },
          { label: "Emergency Arbitration", href: "/dispute-resolution/emergency" },
          { label: "Corporate Dispute Resolution", href: "/dispute-resolution/corporate" },
        ],
      },
    ],
  },
  {
    label: "Training & Certification Courses",
    href: "/training",
    children: [
      { label: "Professional Courses", href: "/training/courses" },
      { label: "Student Courses", href: "/training/courses#student-courses" },
      { label: "Faculty", href: "/training/faculty" },
      { label: "Upcoming Courses", href: "/training/calendar" },
    ],
  },
  {
    label: "Memberships",
    href: "/membership",
    children: [
      { label: "Compare Tiers", href: "/membership" },
      { label: "Fellow", href: "/membership/fellow", stars: 5 },
      { label: "Associate", href: "/membership/associated", stars: 4 },
      { label: "Affiliate", href: "/membership/affiliated", stars: 3 },
      { label: "Student", href: "/membership/student", stars: 2 },
      { label: "Special Honorary (beyond stars)", href: "/membership/honorary" },
      { label: "Our Esteemed Members", href: "/membership/directory", highlight: true },
    ],
  },
  {
    label: "Knowledge",
    href: "/knowledge",
    children: [
      { label: "Blogs & Articles", href: "/knowledge/blog" },
      { label: "Research & Publications", href: "/knowledge/research" },
      { label: "Events", href: "/events" },
      { label: "Competitions", href: "/knowledge/competitions", nested: true },
    ],
  },
  { label: "Our Professional Panel", href: "/panel" },
  { label: "Implementation of ADR Orders", href: "/implementation" },
];

// Second (small) row, left side: services and programmes the client added.
const SECONDARY_LINKS: NavLink[] = [
  { label: "Contract & Clause Drafting", href: "/dispute-resolution/clause-drafting" },
  { label: "Rules & Fees Calculator", href: "/dispute-resolution/fees" },
  { label: "Model Clauses", href: "/dispute-resolution/model-clauses" },
  { label: "Apprenticeship & Internships", href: "/training/apprenticeships" },
  { label: "Our Esteemed Partners", href: "/partners" },
];

const navLinkClass =
  "inline-flex items-center px-1.5 py-2 text-[0.84rem] font-medium xl:px-2.5 xl:text-[0.92rem] tracking-tight text-text transition-colors hover:text-primary data-popup-open:text-primary data-open:text-primary rounded-none bg-transparent hover:bg-transparent focus:bg-transparent";

const dropdownLinkClass =
  "flex items-center justify-between gap-3 px-3 py-2 text-sm text-text hover:bg-surface hover:text-primary rounded-md";

function Stars({ count }: { count: number }) {
  return (
    <span className="text-primary-hover tracking-tight" aria-label={`${count} stars`}>
      {"★".repeat(count)}
    </span>
  );
}

function LinkLabel({ link }: { link: NavLink }) {
  return (
    <>
      <span className={cn(link.highlight && "font-semibold text-ember")}>{link.label}</span>
      {link.stars ? <Stars count={link.stars} /> : null}
    </>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur supports-backdrop-filter:bg-canvas/80">
      {/* Top bar: brand mark only, centered */}
      <div className="hidden md:block border-b border-border bg-surface">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-center px-6">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              id="site-logo-target"
              src="/images/logo-horizontal.png"
              alt="Adjudix Dispute Resolution Institute"
              width={1876}
              height={434}
              priority
              className="h-14 w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Main row (tablet and up): the primary navigation. Below xl (iPads)
          the links wrap onto a second line rather than collapsing to a menu. */}
      <div className="hidden md:block border-b border-border">
        <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-center px-4 py-1 xl:px-6 xl:py-0">
          <NavigationMenu>
            <NavigationMenuList className="flex-wrap xl:gap-0.5">
              {NAV_GROUPS.map((group) =>
                group.sections ? (
                  <NavigationMenuItem key={group.label}>
                    <NavigationMenuTrigger className={navLinkClass}>
                      {group.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[560px] grid-cols-2 gap-6 p-4">
                        {group.sections.map((section) => (
                          <div key={section.label}>
                            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                              {section.label}
                            </p>
                            <ul className="flex flex-col gap-1">
                              {section.links.map((link) => (
                                <li key={link.label}>
                                  <NavigationMenuLink
                                    render={
                                      <Link href={link.href} className={dropdownLinkClass}>
                                        <LinkLabel link={link} />
                                      </Link>
                                    }
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : group.children ? (
                  <NavigationMenuItem key={group.label}>
                    <NavigationMenuTrigger className={navLinkClass}>
                      {group.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-72 gap-1 p-1">
                        {group.children.map((child) => (
                          <li key={child.label} className={cn(child.nested && "ml-4")}>
                            <NavigationMenuLink
                              render={
                                <Link href={child.href} className={dropdownLinkClass}>
                                  <LinkLabel link={child} />
                                </Link>
                              }
                            />
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={group.label}>
                    <NavigationMenuLink
                      render={
                        <Link href={group.href!} className={navLinkClass}>
                          {group.label}
                        </Link>
                      }
                    />
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* Secondary row (tablet and up, small): services on the left, utility links on the right */}
      <div className="hidden md:block border-b border-border bg-surface">
        <div className="mx-auto flex min-h-10 max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-1 px-4 py-2 text-xs font-medium xl:justify-between xl:px-6 xl:py-0">
          <nav aria-label="Services" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {SECONDARY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-text-muted hover:text-text">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <Link href="/dispute-resolution/emergency" className="text-ember hover:opacity-80">
              Emergency Arbitration
            </Link>
            <Link href="/contact" className="text-text-muted hover:text-text">
              Contact
            </Link>
            <Link href="/odr/portal" className="text-text-muted hover:text-text">
              Portal Login
            </Link>
          </div>
        </div>
      </div>

      {/* Compact bar (phones, below md): logo + menu sheet */}
      <div className="border-b border-border md:hidden">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              id="site-logo-target-mobile"
              src="/images/logo-icon.png"
              alt="Adjudix"
              width={1191}
              height={612}
              priority
              className="h-9 w-auto"
            />
          </Link>

          <Sheet>
            <SheetTrigger
              render={
                <button
                  type="button"
                  aria-label="Open menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-text hover:bg-surface"
                >
                  <Menu className="size-5" aria-hidden="true" />
                </button>
              }
            />
            {/* The list scrolls inside its own area, sized to the visible viewport
                (dvh) so iOS Safari's toolbar can't hide the bottom links. */}
            <SheetContent side="right" className="w-80 gap-0 overflow-hidden data-[side=right]:h-dvh">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2.5 font-heading">
                  <Image
                    src="/images/logo-icon.png"
                    alt=""
                    width={1191}
                    height={612}
                    className="h-7 w-auto"
                  />
                  Adjudix
                </SheetTitle>
              </SheetHeader>
              <nav
                className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-4 pb-8"
                aria-label="Mobile"
              >
                {NAV_GROUPS.map((group) => (
                  <div key={group.label} className="border-b border-border py-2">
                    <Link
                      href={group.href ?? "#"}
                      className="block py-1.5 text-sm font-medium text-text"
                    >
                      {group.label}
                    </Link>
                    {group.sections && (
                      <div className="ml-3 mt-1 flex flex-col gap-3">
                        {group.sections.map((section) => (
                          <div key={section.label}>
                            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                              {section.label}
                            </p>
                            <div className="mt-1 flex flex-col gap-1">
                              {section.links.map((link) => (
                                <Link
                                  key={link.label}
                                  href={link.href}
                                  className="py-1 text-sm text-text-muted"
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {group.children && (
                      <div className="ml-3 mt-1 flex flex-col gap-1">
                        {group.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={cn(
                              "flex items-center justify-between gap-3 py-1 text-sm text-text-muted",
                              child.nested && "ml-3"
                            )}
                          >
                            <LinkLabel link={child} />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex flex-col gap-1 border-b border-border py-2">
                  {SECONDARY_LINKS.map((link) => (
                    <Link key={link.href} href={link.href} className="py-1 text-sm text-text-muted">
                      {link.label}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/dispute-resolution/emergency"
                  className="mt-4 text-sm font-medium text-ember"
                >
                  Emergency Arbitration
                </Link>
                <Link href="/contact" className="mt-2 text-sm text-text-muted">
                  Contact
                </Link>
                <Link href="/odr/portal" className="mt-2 text-sm text-text-muted">
                  Portal Login
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
