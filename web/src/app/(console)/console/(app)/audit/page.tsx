import type { Metadata } from "next";
import { and, desc, eq, like, lt, type SQL } from "drizzle-orm";
import { ConsoleLink } from "@/components/console/base";
import { Badge, consoleInput, EmptyState, initials, PageHead, type Tone } from "@/components/console/ui";
import { db, schema } from "@/db";
import { requirePermission } from "@/lib/console/auth";
import { consoleHref } from "@/lib/console/paths";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Audit log" };

const PAGE = 100;
const TONES: Record<string, Tone> = { publish: "green", delete: "ember", lock: "amber", draft: "neutral", restore: "blue", "sign-in": "navy" };

export default async function AuditPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  await requirePermission("audit");
  const { q, entity, before } = await searchParams;
  const conditions: SQL[] = [];
  if (entity) conditions.push(eq(schema.auditLog.entity, entity));
  if (q) conditions.push(like(schema.auditLog.summary, `%${q.replace(/[%_]/g, "").slice(0, 80)}%`));
  if (before && Number(before)) conditions.push(lt(schema.auditLog.id, Number(before)));
  const rows = await db().query.auditLog.findMany({
    where: conditions.length ? and(...conditions) : undefined,
    orderBy: desc(schema.auditLog.id),
    limit: PAGE,
  });
  const entities = ["form", "collection", "page", "settings", "submission", "media", "user", "role"];
  const link = (patch: Record<string, string | undefined>) => {
    const params = new URLSearchParams(Object.entries({ q, entity, ...patch }).filter(([, v]) => v) as [string, string][]);
    return `/audit${params.size ? `?${params}` : ""}`;
  };

  // One heading per day.
  const dayOf = (date: Date) => date.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const entries = rows.map((row, i) => ({ row, heading: i === 0 || dayOf(rows[i - 1].createdAt) !== dayOf(row.createdAt) ? dayOf(row.createdAt) : null }));
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-8 sm:px-8">
      <PageHead title="Audit log" description="Every change made in the console, by whom and when. Entries can't be edited or removed." />
      <div className="flex flex-wrap items-center gap-2">
        <form action={consoleHref("/audit")} role="search" className="flex-1">
          {entity && <input type="hidden" name="entity" value={entity} />}
          <label className="sr-only" htmlFor="audit-q">Search the log</label>
          <input id="audit-q" type="search" name="q" defaultValue={q} placeholder="Search: a name, a form, a reference…" className={cn(consoleInput, "rounded-full")} />
        </form>
        <ConsoleLink href={link({ entity: undefined, before: undefined })} className={cn("rounded-full px-3.5 py-1.5 text-sm", !entity ? "bg-secondary-text text-canvas" : "border border-border bg-canvas hover:bg-surface")}>
          All
        </ConsoleLink>
        {entities.map((e) => (
          <ConsoleLink key={e} href={link({ entity: e, before: undefined })} className={cn("rounded-full px-3.5 py-1.5 text-sm capitalize", entity === e ? "bg-secondary-text text-canvas" : "border border-border bg-canvas hover:bg-surface")}>
            {e === "collection" ? "collections" : `${e}s`}
          </ConsoleLink>
        ))}
      </div>
      {rows.length === 0 ? (
        <EmptyState title="Nothing logged yet" />
      ) : (
        <ol className="flex flex-col rounded-2xl border border-border bg-canvas">
          {entries.map(({ row, heading }) => {
            return (
              <li key={row.id}>
                {heading && <p className="border-b border-border bg-surface px-5 py-2 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase first:rounded-t-2xl">{heading}</p>}
                <div className="flex items-start gap-3 border-b border-border px-5 py-3 last:border-b-0">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-(--color-navy-100) text-[0.7rem] font-semibold text-secondary-text">
                    {initials(row.userEmail ?? "System")}
                  </span>
                  <p className="min-w-0 flex-1 text-left text-sm leading-relaxed">
                    <strong className="font-semibold">{row.userEmail ?? "System"}</strong> {row.summary}
                  </p>
                  <span className="flex shrink-0 items-center gap-2">
                    <Badge tone={TONES[row.action] ?? "neutral"}>{row.action}</Badge>
                    <time dateTime={row.createdAt.toISOString()} className="text-xs text-muted-foreground tabular-nums">
                      {row.createdAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </time>
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      )}
      {rows.length === PAGE && (
        <ConsoleLink href={link({ before: String(rows[rows.length - 1].id) })} className="self-center rounded-full border border-border bg-canvas px-5 py-2 text-sm hover:bg-surface">
          Older entries
        </ConsoleLink>
      )}
    </main>
  );
}
