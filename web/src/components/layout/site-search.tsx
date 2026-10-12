"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { SearchItem } from "@/lib/search-index";
import { cn } from "@/lib/utils";

const SUGGESTIONS = ["File a Dispute", "Rule Book", "Scholarship", "Student Courses", "Fees", "Panel"];

function match(items: SearchItem[], query: string): SearchItem[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  return items
    .map((item) => {
      const title = item.title.toLowerCase();
      const haystack = `${title} ${item.group.toLowerCase()} ${item.keywords?.toLowerCase() ?? ""}`;
      if (!words.every((word) => haystack.includes(word))) return null;
      // Title matches first, then pages before rule-book sections.
      const score =
        words.filter((word) => title.includes(word)).length * 10 +
        (title.startsWith(words[0]) ? 5 : 0) -
        (item.group.startsWith("Rule Book") ? 3 : 0);
      return { item, score };
    })
    .filter((result) => result !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 30)
    .map((result) => result.item);
}

export function SiteSearch({ items, className }: { items: SearchItem[]; className?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => match(items, query), [items, query]);

  // Ctrl/⌘ + K opens the search from anywhere.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function go(item: SearchItem | undefined) {
    if (!item) return;
    setOpen(false);
    setQuery("");
    router.push(item.href);
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label="Search the site"
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-full border border-border bg-canvas px-3 text-sm text-text-muted hover:border-primary hover:text-text",
              className,
            )}
          >
            <Search className="size-4" aria-hidden="true" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden rounded border border-border px-1.5 font-mono text-[0.65rem] lg:inline">Ctrl K</kbd>
          </button>
        }
      />
      <SheetContent side="top" className="gap-0 p-0" initialFocus={inputRef}>
        <div className="mx-auto w-full max-w-3xl pt-5 pr-14 pb-4 pl-4 md:px-6 md:pt-8">
          <SheetTitle className="sr-only">Search the site</SheetTitle>
          <div className="flex items-center gap-3">
            <Image src="/images/logo-mini.png" alt="" width={512} height={512} className="size-11 shrink-0" />
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-border bg-surface px-4 focus-within:border-primary">
              <Search className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setActive((i) => Math.min(i + 1, results.length - 1));
                  } else if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setActive((i) => Math.max(i - 1, 0));
                  } else if (event.key === "Enter") {
                    event.preventDefault();
                    go(results[active]);
                  }
                }}
                placeholder="Search services, courses, the rule book…"
                aria-label="Search"
                aria-controls="site-search-results"
                className="h-13 min-w-0 flex-1 bg-transparent font-body text-base text-text outline-none placeholder:text-text-muted"
              />
            </div>
          </div>

          <div id="site-search-results" className="mt-3 max-h-[min(28rem,60dvh)] overflow-y-auto overscroll-contain">
            {query.trim() === "" ? (
              <div className="px-1 py-2">
                <p className="font-mono text-[0.68rem] font-semibold tracking-widest text-text-muted uppercase">Popular</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        setQuery(suggestion);
                        inputRef.current?.focus();
                      }}
                      className="rounded-full border border-border px-3 py-1 font-body text-sm text-text hover:border-primary hover:text-primary"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="px-1 py-4 text-left font-body text-sm text-text-muted">
                Nothing found for &ldquo;{query}&rdquo;. Try another word, or{" "}
                <button type="button" className="font-medium text-primary hover:underline" onClick={() => go({ title: "", group: "", href: "/contact" })}>
                  ask us directly
                </button>
                .
              </p>
            ) : (
              <ul role="listbox" aria-label="Search results" className="flex flex-col gap-0.5 pb-2">
                {results.map((item, i) => (
                  <li key={item.href + item.title} role="option" aria-selected={i === active}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(item)}
                      className={cn(
                        "flex w-full items-center justify-between gap-4 rounded-md px-3 py-2.5 text-left",
                        i === active ? "bg-primary/10" : "hover:bg-surface",
                      )}
                    >
                      <span className="font-body text-sm text-text">{item.title}</span>
                      <span className="shrink-0 font-mono text-[0.65rem] tracking-wider text-text-muted uppercase">{item.group}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
