import type { Metadata } from "next";
import { asc, count, desc, eq } from "drizzle-orm";
import { Download, Inbox, Search } from "lucide-react";
import { ConsoleLink } from "@/components/console/base";
import { Badge, consoleButton, consoleInput, EmptyState, timeAgo } from "@/components/console/ui";
import { db, schema } from "@/db";
import { requirePermission } from "@/lib/console/auth";
import { consoleHref } from "@/lib/console/paths";
import { can } from "@/lib/console/permissions";
import { listSubmissions, readFilters } from "@/lib/console/submissions";
import { cn } from "@/lib/utils";
import { SubmissionDetail } from "./detail";

export const metadata: Metadata = { title: "Submissions" };

const STATUSES = [
  { id: "new", label: "New" },
  { id: "in_progress", label: "In progress" },
  { id: "closed", label: "Closed" },
  { id: "all", label: "All" },
];

export default async function SubmissionsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const user = await requirePermission("submissions");
  const params = await searchParams;
  const filters = readFilters(params);
  const status = filters.status ?? "new";
  const selectedId = Number(Array.isArray(params.id) ? params.id[0] : params.id) || null;

  const [rows, counts, forms, people] = await Promise.all([
    listSubmissions(filters, user.id),
    db().select({ status: schema.submissions.status, value: count() }).from(schema.submissions).groupBy(schema.submissions.status),
    db().selectDistinct({ key: schema.submissions.formKey, name: schema.submissions.formName }).from(schema.submissions).orderBy(asc(schema.submissions.formName)),
    db().query.users.findMany({ columns: { id: true, email: true, name: true }, where: eq(schema.users.disabled, false) }),
  ]);
  const countOf = (id: string) => (id === "all" ? counts.reduce((sum, c) => sum + c.value, 0) : (counts.find((c) => c.status === id)?.value ?? 0));
  const selected = selectedId
    ? await db().query.submissions.findFirst({ where: eq(schema.submissions.id, selectedId) })
    : rows[0];
  const notes = selected
    ? await db()
        .select({ id: schema.submissionNotes.id, body: schema.submissionNotes.body, createdAt: schema.submissionNotes.createdAt, email: schema.users.email, name: schema.users.name })
        .from(schema.submissionNotes)
        .leftJoin(schema.users, eq(schema.users.id, schema.submissionNotes.userId))
        .where(eq(schema.submissionNotes.submissionId, selected.id))
        .orderBy(desc(schema.submissionNotes.createdAt))
    : [];

  const query = (patch: Record<string, string | undefined>) => {
    const next = new URLSearchParams();
    for (const [key, value] of Object.entries({ status, form: filters.form, q: filters.q, days: filters.days, mine: filters.mine, ...patch })) {
      if (value) next.set(key, value);
    }
    const text = next.toString();
    return `/submissions${text ? `?${text}` : ""}`;
  };
  const exportHref = consoleHref(`/submissions-export?${new URLSearchParams(Object.entries({ ...filters, status }).filter(([, v]) => v) as [string, string][])}`);

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <header className="flex flex-wrap items-center gap-3 border-b border-border bg-canvas px-5 py-4 sm:px-7">
        <h1 className="font-heading text-3xl font-medium">Submissions</h1>
        <span className="flex-1" />
        <form action={consoleHref("/submissions")} className="flex min-w-60 flex-1 items-center gap-2 sm:flex-none" role="search">
          <input type="hidden" name="status" value={status} />
          {filters.form && <input type="hidden" name="form" value={filters.form} />}
          <label className="relative flex-1">
            <span className="sr-only">Search submissions</span>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input type="search" name="q" defaultValue={filters.q} placeholder="Name, email, phone or ADX reference" className={cn(consoleInput, "rounded-full bg-surface pl-10 sm:w-80")} />
          </label>
        </form>
        <a href={exportHref} className={consoleButton.secondary}>
          <Download aria-hidden="true" /> Export CSV
        </a>
      </header>

      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-canvas px-5 py-3 sm:px-7">
        {STATUSES.map((s) => (
          <ConsoleLink
            key={s.id}
            href={query({ status: s.id, id: undefined })}
            aria-current={status === s.id || undefined}
            className={cn("rounded-full px-3.5 py-1.5 text-sm", status === s.id ? "bg-secondary-text font-medium text-canvas" : "border border-border hover:bg-surface")}
          >
            {s.label} · <span className="tabular-nums">{countOf(s.id)}</span>
          </ConsoleLink>
        ))}
        <span className="mx-1 h-6 w-px bg-border" aria-hidden="true" />
        <FilterMenu
          label={forms.find((f) => f.key === filters.form)?.name ?? "All forms"}
          options={[{ label: "All forms", href: query({ form: undefined, id: undefined }) }, ...forms.map((f) => ({ label: f.name, href: query({ form: f.key, id: undefined }) }))]}
        />
        <FilterMenu
          label={filters.days ? `Last ${filters.days} days` : "Any time"}
          options={[
            { label: "Any time", href: query({ days: undefined }) },
            { label: "Last 7 days", href: query({ days: "7" }) },
            { label: "Last 30 days", href: query({ days: "30" }) },
            { label: "Last 90 days", href: query({ days: "90" }) },
          ]}
        />
        <ConsoleLink
          href={query({ mine: filters.mine === "1" ? undefined : "1", id: undefined })}
          aria-pressed={filters.mine === "1"}
          className={cn("rounded-full px-3.5 py-1.5 text-sm", filters.mine === "1" ? "bg-(--color-gold-100) font-medium text-(--color-gold-800) ring-1 ring-primary" : "border border-border hover:bg-surface")}
        >
          Assigned to me
        </ConsoleLink>
      </div>

      {rows.length === 0 && !selected ? (
        <div className="p-7">
          <EmptyState
            title={filters.q || filters.form || filters.days || filters.mine ? "Nothing matches these filters" : status === "new" ? "No new submissions" : "Nothing here yet"}
            body="Every form on the site lands here as it is sent, with its documents."
          />
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-wrap items-stretch">
          <section aria-label="Submission list" className="min-w-0 flex-[1_1_22rem] border-r border-border bg-canvas lg:max-w-[28rem]">
            <ul>
              {rows.map((row) => {
                const active = row.id === selected?.id;
                return (
                  <li key={row.id}>
                    <ConsoleLink
                      href={query({ id: String(row.id) })}
                      scroll={false}
                      aria-current={active || undefined}
                      className={cn("flex gap-3 border-b border-border px-5 py-3.5 transition-colors", active ? "bg-(--color-gold-100)" : "hover:bg-surface")}
                    >
                      <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", row.status === "new" ? "bg-primary" : "bg-transparent")} aria-label={row.status === "new" ? "New" : undefined} />
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="flex justify-between gap-2">
                          <span className="truncate font-semibold">{row.name}</span>
                          <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(row.createdAt)}</span>
                        </span>
                        <span className="truncate text-sm text-muted-foreground">{row.formName}</span>
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-mono">{row.reference}</span>
                          {row.urgent && <Badge tone="ember" className="px-1.5 py-0 text-[0.65rem]">URGENT</Badge>}
                          {row.files.length > 0 && <span>· {row.files.length} file{row.files.length === 1 ? "" : "s"}</span>}
                        </span>
                      </span>
                    </ConsoleLink>
                  </li>
                );
              })}
            </ul>
            {rows.length === 60 && <p className="px-5 py-4 text-xs text-muted-foreground">Showing the latest 60. Search or filter to find older ones.</p>}
          </section>
          <section aria-label="Submission" className="min-w-0 flex-[2_1_28rem] p-5 sm:p-7">
            {selected ? (
              <SubmissionDetail
                key={selected.id}
                submission={{
                  ...selected,
                  createdAt: selected.createdAt.toISOString(),
                }}
                notes={notes.map((note) => ({ id: note.id, body: note.body, at: note.createdAt.toISOString(), by: note.name || note.email || "Removed user" }))}
                people={people.map((p) => ({ id: p.id, label: p.name || p.email }))}
                canEdit={can(user, "submissions", "edit")}
                canDelete={can(user, "submissions", "delete")}
                fileBase={consoleHref(`/submission-file/${selected.id}`)}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <Inbox className="size-6" aria-hidden="true" />
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

function FilterMenu({ label, options }: { label: string; options: { label: string; href: string }[] }) {
  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm hover:bg-surface [&::-webkit-details-marker]:hidden">
        <span className="max-w-48 truncate">{label}</span>
        <span aria-hidden="true" className="text-xs text-muted-foreground">▾</span>
      </summary>
      <div className="absolute top-10 left-0 z-20 flex max-h-80 w-72 flex-col overflow-y-auto rounded-xl border border-border bg-canvas p-1.5 shadow-[0_12px_32px_rgb(15_31_61/0.14)]">
        {options.map((option) => (
          <ConsoleLink key={option.href} href={option.href} className="rounded-lg px-3 py-2 text-sm hover:bg-surface">
            {option.label}
          </ConsoleLink>
        ))}
      </div>
    </details>
  );
}
