"use client";

import Link from "next/link";
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

interface NavLink {
  label: string;
  href: string;
}

interface NavGroup {
  label: string;
  href?: string;
  children?: NavLink[];
}

// Structure per planning/sitemap.md's "Top-level nav" section, labels
// shortened (Training Institute -> Training, Knowledge Centre -> Knowledge)
// and Contact moved to the utility bar to keep the main row to 7 items.
const NAV_GROUPS: NavGroup[] = [
  { label: "About", href: "/about" },
  {
    label: "Dispute Resolution",
    href: "/dispute-resolution",
    children: [
      { label: "Arbitration", href: "/dispute-resolution/arbitration" },
      { label: "Mediation", href: "/dispute-resolution/mediation" },
      { label: "Conciliation", href: "/dispute-resolution/conciliation" },
      { label: "Lok Adalat", href: "/dispute-resolution/lok-adalat" },
      { label: "Emergency Arbitration", href: "/dispute-resolution/emergency" },
      { label: "Specialized Panels", href: "/dispute-resolution/panels" },
      { label: "Rules & Fees Calculator", href: "/dispute-resolution/fees" },
      { label: "Model Clauses", href: "/dispute-resolution/model-clauses" },
      { label: "Our Professional Panel", href: "/panel" },
      {
        label: "Corporate Dispute Resolution",
        href: "/dispute-resolution/corporate",
      },
    ],
  },
  { label: "ODR Platform", href: "/odr" },
  {
    label: "Training",
    href: "/training",
    children: [
      { label: "Courses", href: "/training/courses" },
      { label: "Certification", href: "/training/certification" },
      { label: "Faculty", href: "/training/faculty" },
      { label: "Calendar", href: "/training/calendar" },
      { label: "Apprenticeships", href: "/training/apprenticeships" },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    children: [
      { label: "Compare Tiers", href: "/membership" },
      { label: "Affiliated", href: "/membership/affiliated" },
      { label: "Associated", href: "/membership/associated" },
      { label: "Fellow", href: "/membership/fellow" },
      { label: "Corporate", href: "/membership/corporate" },
      { label: "Our Esteemed Members", href: "/membership/directory" },
    ],
  },
  {
    label: "Knowledge",
    href: "/knowledge",
    children: [
      { label: "Blogs & Articles", href: "/knowledge/blog" },
      { label: "Research & Publications", href: "/knowledge/research" },
      { label: "Competitions", href: "/knowledge/competitions" },
    ],
  },
  { label: "Events", href: "/events" },
];

const navLinkClass =
  "inline-flex items-center px-3 py-2 text-[0.92rem] font-medium tracking-tight text-text transition-colors hover:text-primary data-popup-open:text-primary data-open:text-primary rounded-none bg-transparent hover:bg-transparent focus:bg-transparent";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur supports-backdrop-filter:bg-canvas/80">
      {/* Utility bar: quiet, small, secondary actions only */}
      <div className="hidden lg:block border-b border-border bg-surface">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-end gap-6 px-6 text-xs font-medium">
          <Link
            href="/dispute-resolution/emergency"
            className="text-ember hover:opacity-80"
          >
            Emergency Arbitration
          </Link>
          <Link href="/contact" className="text-text-muted hover:text-text">
            Contact
          </Link>
          <Link
            href="/odr/portal"
            className="text-text-muted hover:text-text"
          >
            Portal Login
          </Link>
        </div>
      </div>

      {/* Primary row: logo + nav only, no competing buttons */}
      <div className="border-b border-border">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="font-heading text-xl font-semibold tracking-tight text-text shrink-0"
          >
            Adjudix
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              {NAV_GROUPS.map((group) =>
                group.children ? (
                  <NavigationMenuItem key={group.label}>
                    <NavigationMenuTrigger className={navLinkClass}>
                      {group.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-64 gap-1 p-1">
                        {group.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink
                              render={
                                <Link
                                  href={child.href}
                                  className="block px-3 py-2 text-sm text-text hover:bg-surface hover:text-primary rounded-md"
                                >
                                  {child.label}
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

          <Sheet>
            <SheetTrigger
              render={
                <button
                  type="button"
                  aria-label="Open menu"
                  className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-text hover:bg-surface"
                >
                  <Menu className="size-5" aria-hidden="true" />
                </button>
              }
            />
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="font-heading">Adjudix</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 pb-4" aria-label="Mobile">
                {NAV_GROUPS.map((group) => (
                  <div key={group.label} className="border-b border-border py-2">
                    <Link
                      href={group.href ?? "#"}
                      className="block py-1.5 text-sm font-medium text-text"
                    >
                      {group.label}
                    </Link>
                    {group.children && (
                      <div className="ml-3 mt-1 flex flex-col gap-1">
                        {group.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="py-1 text-sm text-text-muted"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
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
