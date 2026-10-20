import type { Metadata } from "next";
import { ChevronRight, Search } from "lucide-react";
import { ConsoleLink } from "@/components/console/base";
import { Badge, consoleInput, PageHead } from "@/components/console/ui";
import { requirePermission } from "@/lib/console/auth";
import { consoleHref } from "@/lib/console/paths";
import { can } from "@/lib/console/permissions";
import type { PageDoc } from "@/lib/blocks/types";
import { listDocs } from "@/lib/content/drafts";
import { PAGE_TYPE } from "@/lib/pages";
import { CODE_PAGE_PATHS, loadCodePage } from "@/lib/pages/code-pages";
import { cn } from "@/lib/utils";
import { NewPageButton } from "./new-page";

export const metadata: Metadata = { title: "Pages" };

const SECTION_LABELS: Record<string, string> = {
  "": "Home",
  about: "About",
  "dispute-resolution": "Dispute Resolution",
  training: "Training Institute",
  membership: "Membership",
  knowledge: "Knowledge Centre",
  odr: "ODR Platform",
  partners: "Partners",
};

export default async function PagesPage({ searchParams }: { searchParams: Promise<{ q?: string; new?: string }> }) {
  const user = await requirePermission("pages");
  const { q, new: openNew } = await searchParams;
  const docs = new Map((await listDocs(PAGE_TYPE)).map((doc) => [doc.key, doc]));
  const paths = [...new Set([...CODE_PAGE_PATHS, ...docs.keys()])].sort();
  const rows = await Promise.all(
    paths.map(async (path) => {
      const doc = docs.get(path);
      const code = CODE_PAGE_PATHS.includes(path) ? await loadCodePage(path) : undefined;
      const shown = (doc?.draft ?? doc?.published) as PageDoc | null | undefined;
      return {
        path,
        title: shown?.title || code?.title || path,
        builtIn: Boolean(code),
        edited: doc?.published != null,
        draft: doc?.draft != null,
        blocks: shown?.blocks.length,
      };
    }),
  );
  const filtered = q ? rows.filter((row) => `${row.title} ${row.path}`.toLowerCase().includes(q.toLowerCase())) : rows;
  const groups = new Map<string, typeof rows>();
  for (const row of filtered) {
    const first = row.path.split("/")[1] ?? "";
    const key = row.builtIn ? (SECTION_LABELS[first] ?? "Other pages") : "Made in the console";
    groups.set(key, [...(groups.get(key) ?? []), row]);
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-5 py-8 sm:px-8">
      <PageHead
        title="Pages"
        description={`${rows.length} pages. Open one to edit it as blocks: change any text, add, move or hide sections, and preview before publishing.`}
        actions={can(user, "pages", "structure") ? <NewPageButton pages={rows.map((r) => ({ path: r.path, title: r.title }))} startOpen={openNew === "1"} /> : undefined}
      />
      <form action={consoleHref("/pages")} role="search" className="relative max-w-md">
        <label htmlFor="pages-q" className="sr-only">Find a page</label>
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <input id="pages-q" type="search" name="q" defaultValue={q} placeholder="Find a page by title or address" className={cn(consoleInput, "rounded-full pl-10")} />
      </form>
      {[...groups.entries()].map(([group, list]) => (
        <section key={group} className="flex flex-col gap-2">
          <h2 className="px-1 text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">{group}</h2>
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-canvas">
            {list.map((row) => (
              <li key={row.path}>
                <ConsoleLink href={`/pages/edit?path=${encodeURIComponent(row.path)}`} className="group flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3.5 transition-colors hover:bg-surface">
                  <span className="flex min-w-0 flex-[1_1_18rem] flex-col">
                    <span className="font-medium">{row.title}</span>
                    <span className="font-mono text-xs text-muted-foreground">{row.path}</span>
                  </span>
                  <span className="flex gap-1.5">
                    {row.draft && <Badge tone="amber">Draft</Badge>}
                    {row.edited ? <Badge tone="green">{row.builtIn ? "Edited in console" : "Live"}</Badge> : row.builtIn ? <Badge tone="neutral">As built</Badge> : <Badge tone="neutral">Not published</Badge>}
                  </span>
                  <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </ConsoleLink>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
