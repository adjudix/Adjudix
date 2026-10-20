"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  Database,
  FileText,
  History,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  SlidersHorizontal,
  X,
  type LucideIcon,
} from "lucide-react";
import { ConsoleLink, useConsoleHref } from "@/components/console/base";
import { cn } from "@/lib/utils";

export interface NavItem {
  href: string;
  label: string;
  icon: keyof typeof ICONS;
  count?: number;
  children?: { href: string; label: string }[];
}

const ICONS = {
  dashboard: LayoutDashboard,
  submissions: Inbox,
  forms: ClipboardList,
  pages: FileText,
  collections: Database,
  media: ImageIcon,
  settings: SlidersHorizontal,
  access: ShieldCheck,
  audit: History,
} satisfies Record<string, LucideIcon>;

export function Sidebar({
  main,
  admin,
  user,
  signOut,
}: {
  main: NavItem[];
  admin: NavItem[];
  user: { label: string; detail: string; initials: string };
  signOut: () => Promise<void>;
}) {
  const pathname = usePathname();
  const toHref = useConsoleHref();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    const full = toHref(href);
    return href === "/" ? pathname === full || pathname === `${full}/` : pathname === full || pathname.startsWith(`${full}/`);
  };

  const item = (entry: NavItem) => {
    const Icon = ICONS[entry.icon];
    const active = isActive(entry.href);
    return (
      <li key={entry.href}>
        <ConsoleLink
          href={entry.href}
          onClick={() => setOpen(false)}
          aria-current={active ? "page" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-[0.6rem] px-3 py-2 text-sm font-medium transition-colors duration-150",
            active
              ? "bg-(--color-navy-700) text-white shadow-[inset_0_0_0_1px_var(--color-navy-600)]"
              : "text-text-on-hero-muted hover:bg-white/6 hover:text-white",
          )}
        >
          <Icon className={cn("size-[1.1rem] shrink-0", active ? "text-primary" : "")} strokeWidth={1.8} aria-hidden="true" />
          <span className="flex-1">{entry.label}</span>
          {entry.count ? (
            <span className="rounded-full bg-primary px-2 py-px text-[0.7rem] font-semibold text-primary-foreground tabular-nums">{entry.count}</span>
          ) : null}
        </ConsoleLink>
        {entry.children && active && (
          <ul className="mt-0.5 mb-1 flex flex-col pl-10 text-[0.82rem]">
            {entry.children.map((child) => (
              <li key={child.href}>
                <ConsoleLink
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-1.5 transition-colors",
                    pathname === toHref(child.href) ? "font-medium text-white" : "text-text-on-hero-muted hover:text-white",
                  )}
                >
                  {child.label}
                </ConsoleLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between bg-(--color-navy-950) px-4 py-3 lg:hidden">
        <span className="font-heading text-lg font-semibold text-white">Adjudix Console</span>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="console-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex size-10 items-center justify-center rounded-lg text-white hover:bg-white/10"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>
      <nav
        id="console-nav"
        aria-label="Console"
        className={cn(
          "scrollbar-refined z-30 flex-col gap-6 overflow-y-auto bg-(--color-navy-950) px-3.5 py-5 text-text-on-hero-muted",
          "lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-64 lg:shrink-0",
          open ? "fixed inset-x-0 top-16 bottom-0 flex" : "hidden",
        )}
      >
        <ConsoleLink href="/" className="hidden items-center gap-2.5 px-2 lg:flex">
          <Image src="/images/logo-icon.png" alt="" width={34} height={34} className="size-[2.1rem] rounded-[0.55rem] bg-white object-contain p-0.5" />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-lg font-semibold text-white">Adjudix</span>
            <span className="text-[0.68rem] font-medium tracking-[0.14em] text-(--color-ink-500) uppercase">Console</span>
          </span>
        </ConsoleLink>
        <ul className="flex flex-col gap-0.5">{main.map(item)}</ul>
        {admin.length > 0 && (
          <div>
            <p className="px-3 pb-1.5 text-[0.68rem] font-medium tracking-[0.14em] text-(--color-ink-500) uppercase">Administration</p>
            <ul className="flex flex-col gap-0.5">{admin.map(item)}</ul>
          </div>
        )}
        <div className="mt-auto flex items-center gap-2.5 rounded-xl bg-(--color-navy-900) p-3">
          <ConsoleLink href="/account" className="flex min-w-0 flex-1 items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--color-navy-600) text-xs font-semibold text-white">
              {user.initials}
            </span>
            <span className="flex min-w-0 flex-col leading-snug">
              <span className="truncate text-sm font-medium text-white">{user.label}</span>
              <span className="truncate text-xs">{user.detail}</span>
            </span>
          </ConsoleLink>
          <form action={signOut}>
            <button
              type="submit"
              aria-label="Sign out"
              title="Sign out"
              className="inline-flex size-9 items-center justify-center rounded-lg text-text-on-hero-muted hover:bg-white/10 hover:text-white"
            >
              <LogOut className="size-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </nav>
    </>
  );
}
