"use client";

import Link from "next/link";
import { LinkButton } from "@/components/ui/link-button";
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

// Structure per planning/sitemap.md's "Top-level nav" section.
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
    label: "Training Institute",
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
    label: "Knowledge Centre",
    href: "/knowledge",
    children: [
      { label: "Blogs & Articles", href: "/knowledge/blog" },
      { label: "Research & Publications", href: "/knowledge/research" },
      { label: "Competitions", href: "/knowledge/competitions" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-canvas/95 backdrop-blur supports-backdrop-filter:bg-canvas/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="font-heading text-lg font-semibold text-text shrink-0"
        >
          Adjudix
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {NAV_GROUPS.map((group) =>
              group.children ? (
                <NavigationMenuItem key={group.label}>
                  <NavigationMenuTrigger>{group.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-64 gap-1">
                      {group.children.map((child) => (
                        <li key={child.href}>
                          <NavigationMenuLink
                            render={<Link href={child.href}>{child.label}</Link>}
                          />
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={group.label}>
                  <NavigationMenuLink
                    render={<Link href={group.href!}>{group.label}</Link>}
                  />
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:block shrink-0">
          <LinkButton variant="primary" size="sm" href="/odr/portal">
            Portal Login
          </LinkButton>
        </div>

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
              <LinkButton
                variant="primary"
                size="sm"
                className="mt-4"
                href="/odr/portal"
              >
                Portal Login
              </LinkButton>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
