"use client";

import { useState, type ReactNode } from "react";
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
import { ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { SiteSearch } from "@/components/layout/site-search";
import { LanguagePicker } from "@/components/layout/language-picker";
import { DEFAULT_SETTINGS, type NavGroup, type NavLink } from "@/lib/site-settings";
import type { SearchItem } from "@/lib/search-index";

const navLinkClass =
  "inline-flex items-center px-1.5 py-2 text-[0.84rem] font-medium xl:px-2.5 xl:text-[0.92rem] tracking-tight text-text transition-colors hover:text-primary-ink data-popup-open:text-primary-ink data-open:text-primary-ink rounded-none bg-transparent hover:bg-transparent focus:bg-transparent";

const dropdownLinkClass =
  "flex items-center justify-between gap-3 px-3 py-2 text-sm text-text hover:bg-surface hover:text-primary-ink rounded-md";

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
      <span className={cn("flex items-center gap-2", link.highlight && "font-semibold text-primary-ink")}>
        {/* A sub-item hangs off the item above it with a small corner
            connector, so it reads as part of that item, not a stray indent. */}
        {link.nested && (
          <span
            className="-mt-1.5 size-2.5 shrink-0 rounded-bl-sm border-b border-l border-text-muted/60"
            aria-hidden="true"
          />
        )}
        {link.label}
        {/* Highlighted items (client markup) carry the brand gold, so they
            stand out while staying in the site's palette. */}
        {link.highlight && <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />}
      </span>
      {link.stars ? <Stars count={link.stars} /> : null}
    </>
  );
}

const mobileLinkClass = "flex items-center justify-between gap-3 py-1.5 text-sm text-text";

// One fold-out menu in the phone menu sheet.
function MobileGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="group border-b border-border">
      <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-[0.95rem] font-semibold text-text [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown
          className="size-4 text-text-muted transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="flex flex-col pb-3 pl-3">{children}</div>
    </details>
  );
}

export function SiteHeader({
  searchItems,
  navGroups: NAV_GROUPS = DEFAULT_SETTINGS.navGroups,
  secondaryLinks: SECONDARY_LINKS = DEFAULT_SETTINGS.secondaryLinks,
  languages = DEFAULT_SETTINGS.languages,
}: {
  searchItems: SearchItem[];
  navGroups?: NavGroup[];
  secondaryLinks?: NavLink[];
  languages?: { code: string; label: string }[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur supports-backdrop-filter:bg-canvas/80">
      {/* Top bar: brand mark only, centered */}
      <div className="hidden md:block border-b border-border bg-surface">
        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-center px-6">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              id="site-logo-target"
              src="/images/logo-horizontal.png"
              alt="Adjudix Dispute Resolution Institute"
              width={242}
              height={56}
              priority
              className="h-14 w-auto"
            />
          </Link>
          <LanguagePicker languages={languages} className="absolute right-6 text-xs font-medium" />
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
                          <li key={child.label} className={cn(child.nested && "-mt-1 ml-3")}>
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
            <SiteSearch items={searchItems} className="h-7" />
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
              src="/images/logo-mini.png"
              alt="Adjudix"
              width={36}
              height={36}
              priority
              className="h-9 w-auto"
            />
          </Link>

          <div className="flex items-center gap-2">
            <SiteSearch items={searchItems} className="w-9 justify-center px-0" />
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              {/* Labelled and filled in the brand gold so visitors notice the
                  menu holds every service (client markup, Oct 2026). */}
              <SheetTrigger
                render={
                  <button
                    type="button"
                    aria-label="Open menu"
                    className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-3.5 font-body text-sm font-semibold text-primary-foreground shadow-sm ring-2 ring-primary/30 ring-offset-2 ring-offset-canvas hover:bg-primary-hover"
                  >
                    <Menu className="size-4" aria-hidden="true" />
                    Menu
                  </button>
                }
              />
              {/* The list scrolls inside its own area, sized to the visible viewport
                  (dvh) so iOS Safari's toolbar can't hide the bottom links. */}
              <SheetContent
                side="right"
                className="w-[22rem] max-w-[calc(100vw-2rem)] gap-0 overflow-hidden data-[side=right]:h-dvh"
              >
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2.5 font-heading">
                    <Image
                      src="/images/logo-mini.png"
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-auto"
                    />
                    Adjudix
                  </SheetTitle>
                </SheetHeader>
                <nav
                  className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 pb-8"
                  aria-label="Mobile"
                  // Any link tapped in the menu closes it, so the page it opens is visible.
                  onClick={(event) => {
                    if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
                  }}
                >
                  {/* The actions people come for most, first. */}
                  <div className="grid grid-cols-2 gap-2 pb-3">
                    <Link
                      href="/odr/file"
                      className="rounded-md bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground"
                    >
                      File a Dispute
                    </Link>
                    <Link
                      href="/dispute-resolution/emergency"
                      className="rounded-md border border-ember px-3 py-2.5 text-center text-sm font-semibold text-ember"
                    >
                      Emergency Arbitration
                    </Link>
                  </div>

                  {/* Each menu folds open on its own, so the list stays short
                      enough to scan instead of one long scroll of links. */}
                  {NAV_GROUPS.map((group) =>
                    group.sections || group.children ? (
                      <MobileGroup key={group.label} label={group.label}>
                        {group.href && (
                          <Link href={group.href} className="py-1.5 text-sm font-medium text-primary-ink">
                            {group.label} — overview
                          </Link>
                        )}
                        {group.sections?.map((section) => (
                          <div key={section.label} className="mt-2">
                            <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-text-muted">
                              {section.label}
                            </p>
                            <div className="mt-1 flex flex-col">
                              {section.links.map((link) => (
                                <Link key={link.label} href={link.href} className={mobileLinkClass}>
                                  <LinkLabel link={link} />
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                        {group.children?.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={cn(mobileLinkClass, child.nested && "ml-1")}
                          >
                            <LinkLabel link={child} />
                          </Link>
                        ))}
                      </MobileGroup>
                    ) : (
                      <Link
                        key={group.label}
                        href={group.href!}
                        className="border-b border-border py-3 text-[0.95rem] font-semibold text-text"
                      >
                        {group.label}
                      </Link>
                    )
                  )}
                  <MobileGroup label="Services & Programmes">
                    {SECONDARY_LINKS.map((link) => (
                      <Link key={link.href} href={link.href} className={mobileLinkClass}>
                        {link.label}
                      </Link>
                    ))}
                  </MobileGroup>

                  <div className="mt-4 flex flex-col gap-2">
                    <Link href="/contact" className="text-sm font-medium text-text">
                      Contact Us
                    </Link>
                    <Link href="/odr/portal" className="text-sm font-medium text-text">
                      Portal Login
                    </Link>
                    <LanguagePicker languages={languages} className="mt-2 text-sm font-medium" />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
