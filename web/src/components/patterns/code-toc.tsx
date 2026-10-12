"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export interface TocChapter {
  id: string;
  no: string;
  title: string;
  sections: string;
  isNew: boolean;
}

export interface TocPart {
  id: string;
  label: string;
  title: string;
  chapters: TocChapter[];
}

interface CodeTocProps {
  year: number;
  parts: TocPart[];
}

// Tracks the sticky site header's height in --site-header-h so the reader's
// sticky contents and section anchors sit just below it at every breakpoint.
function useHeaderHeight() {
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const root = document.documentElement;
    const update = () => root.style.setProperty("--site-header-h", `${header.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--site-header-h");
    };
  }, []);
}

// The chapter heading most recently scrolled past is the one being read.
function useActiveId(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const offset = (document.querySelector("header")?.offsetHeight ?? 0) + 120;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

function TocList({
  year,
  parts,
  active,
  onNavigate,
}: CodeTocProps & { active: string; onNavigate?: () => void }) {
  const link = (id: string, isActive: boolean) =>
    cn(
      "block rounded-md border-l-2 px-3 py-1.5 text-left font-body text-sm transition-colors",
      isActive
        ? "border-primary bg-primary/10 font-medium text-foreground"
        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
    );

  return (
    <nav aria-label={`Contents of the ${year} Code`} className="flex flex-col gap-5">
      <a href="#preamble" onClick={onNavigate} className={link("preamble", active === "preamble")}>
        Preamble &middot; Moral Principles
      </a>
      {parts.map((part) => (
        <div key={part.id}>
          <a
            href={`#${part.id}`}
            onClick={onNavigate}
            className="block px-3 font-mono text-[0.7rem] font-semibold tracking-widest text-primary uppercase hover:underline"
          >
            {part.label}
          </a>
          <p className="mt-0.5 px-3 text-left font-heading text-sm font-semibold text-foreground">{part.title}</p>
          <ul className="mt-2 flex flex-col gap-0.5">
            {part.chapters.map((chapter) => (
              <li key={chapter.id}>
                <a href={`#${chapter.id}`} onClick={onNavigate} className={link(chapter.id, active === chapter.id)}>
                  <span className="flex items-baseline justify-between gap-2">
                    <span>
                      <span className="font-mono text-xs text-muted-foreground">{chapter.no}.</span> {chapter.title}
                    </span>
                    {chapter.isNew && (
                      <span className="shrink-0 rounded-full bg-ember/10 px-1.5 font-mono text-[0.6rem] font-semibold text-ember uppercase">
                        New
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block font-mono text-[0.68rem] text-muted-foreground">{chapter.sections}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function CodeToc({ year, parts }: CodeTocProps) {
  useHeaderHeight();
  const [ids] = useState(() => ["preamble", ...parts.flatMap((part) => part.chapters.map((c) => c.id))]);
  const active = useActiveId(ids);
  const [open, setOpen] = useState(false);

  const activeChapter = parts.flatMap((part) => part.chapters).find((c) => c.id === active);
  const activeLabel = activeChapter ? `Chapter ${activeChapter.no} · ${activeChapter.title}` : "Preamble · Moral Principles";

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <div className="sticky hidden max-h-[calc(100dvh-var(--site-header-h,0px)-3rem)] overflow-y-auto overscroll-contain pr-2 pb-6 lg:block lg:top-[calc(var(--site-header-h,0px)+1.5rem)]">
        <p className="mb-4 px-3 font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Contents
        </p>
        <TocList year={year} parts={parts} active={active} />
      </div>

      {/* Phones and tablets: a sticky bar showing where you are, opening the contents */}
      <div className="sticky top-[var(--site-header-h,0px)] z-30 -mx-6 border-b border-border bg-canvas/95 px-6 py-2 backdrop-blur lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-md py-1.5 text-left font-body text-sm"
              >
                <List className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate text-foreground">{activeLabel}</span>
                <span className="shrink-0 font-medium text-primary">Contents</span>
              </button>
            }
          />
          <SheetContent side="left" className="w-80 gap-0 overflow-hidden data-[side=left]:h-dvh">
            <SheetHeader>
              <SheetTitle className="font-heading">The Code, {year}</SheetTitle>
            </SheetHeader>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-8">
              <TocList year={year} parts={parts} active={active} onNavigate={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
