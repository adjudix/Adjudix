import type { Metadata } from "next";
import { and, count, desc, eq, gte, inArray, isNotNull } from "drizzle-orm";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ConsoleLink } from "@/components/console/base";
import { Badge, consoleButton, initials, Notice, timeAgo } from "@/components/console/ui";
import { db, schema } from "@/db";
import { requireUser } from "@/lib/console/auth";
import { now } from "@/lib/console/clock";
import { can } from "@/lib/console/permissions";
import { getCollectionDef } from "@/lib/content/collections";
import { FORM_DEFAULTS, FORM_TYPE } from "@/lib/forms";
import type { FormConfig } from "@/lib/forms/config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

const DAY = 86_400_000;
// India Standard Time, so "today" matches the Secretariat's day.
const IST = 330 * 60_000;
const startOfDay = (time: number) => Math.floor((time + IST) / DAY) * DAY - IST;

function greeting() {
  const hour = new Date(now() + IST).getUTCHours();
  return hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
}

function draftLink(type: string, key: string) {
  if (type === FORM_TYPE) return `/forms/${key}`;
  if (type === "collection") return `/collections/${key}`;
  if (type === "page") return `/pages/${encodeURIComponent(key)}`;
  return "/settings";
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const user = await requireUser();
  const { denied } = await searchParams;
  const seeSubmissions = can(user, "submissions");
  const today = startOfDay(now());
  const weekStart = today - 6 * DAY;

  const [recent, openCount, urgent, drafts, formDocs, activity, byForm] = await Promise.all([
    seeSubmissions
      ? db().select({ createdAt: schema.submissions.createdAt }).from(schema.submissions).where(gte(schema.submissions.createdAt, new Date(weekStart)))
      : Promise.resolve([]),
    seeSubmissions
      ? db().select({ value: count() }).from(schema.submissions).where(inArray(schema.submissions.status, ["new", "in_progress"]))
      : Promise.resolve([{ value: 0 }]),
    seeSubmissions
      ? db().query.submissions.findMany({ where: and(eq(schema.submissions.status, "new"), eq(schema.submissions.urgent, true)), orderBy: desc(schema.submissions.createdAt), limit: 3 })
      : Promise.resolve([]),
    db().query.documents.findMany({ columns: { type: true, key: true, draft: true, draftUpdatedAt: true, draftUpdatedBy: true }, where: isNotNull(schema.documents.draft) }),
    db().query.documents.findMany({ columns: { key: true, published: true }, where: eq(schema.documents.type, FORM_TYPE) }),
    can(user, "audit") ? db().query.auditLog.findMany({ orderBy: desc(schema.auditLog.id), limit: 6 }) : Promise.resolve([]),
    seeSubmissions
      ? db()
          .select({ key: schema.submissions.formKey, name: schema.submissions.formName, value: count() })
          .from(schema.submissions)
          .where(gte(schema.submissions.createdAt, new Date(weekStart)))
          .groupBy(schema.submissions.formKey, schema.submissions.formName)
          .orderBy(desc(count()))
          .limit(4)
      : Promise.resolve([]),
  ]);

  const days = Array.from({ length: 7 }, (_, i) => {
    const start = weekStart + i * DAY;
    const n = recent.filter((row) => row.createdAt.getTime() >= start && row.createdAt.getTime() < start + DAY).length;
    return { label: new Date(start + IST).toLocaleDateString("en-IN", { weekday: "short", timeZone: "UTC" }), n, today: i === 6 };
  });
  const todayCount = days[6].n;
  const yesterday = days[5].n;
  const max = Math.max(1, ...days.map((d) => d.n));
  const weekTotal = days.reduce((sum, d) => sum + d.n, 0);

  const published = new Map(formDocs.map((doc) => [doc.key, doc.published as FormConfig | null]));
  const allForms = [...new Set([...Object.keys(FORM_DEFAULTS), ...formDocs.map((d) => d.key)])];
  const liveForms = allForms.map((slug) => published.get(slug) ?? FORM_DEFAULTS[slug]).filter(Boolean) as FormConfig[];
  const openForms = liveForms.filter((form) => form.enabled).length;

  const draftLabel = (type: string, key: string) => {
    if (type === FORM_TYPE) return (FORM_DEFAULTS[key]?.title ?? key) + " (form)";
    if (type === "collection") return getCollectionDef(key)?.label ?? key;
    if (type === "page") return `Page ${key}`;
    return "Site settings";
  };

  const date = new Date(now() + IST).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const headline = !seeSubmissions
    ? `${greeting()}, ${user.name.split(" ")[0] || "welcome back"}.`
    : todayCount === 0
      ? `${greeting()}. No new requests yet today.`
      : `${greeting()}. ${todayCount} new request${todayCount === 1 ? "" : "s"} came in today.`;

  return (
    <main className="flex flex-1 flex-col">
      <header className="flex flex-wrap items-center gap-3 border-b border-border bg-canvas px-5 py-3.5 sm:px-8">
        <span className="text-sm text-muted-foreground">Console</span>
        <span aria-hidden="true" className="text-(--color-ink-300)">/</span>
        <span className="text-sm font-medium">Dashboard</span>
        <span className="flex-1" />
        {drafts.length > 0 && (
          <Badge tone="amber">
            <span className="size-1.5 rounded-full bg-(--color-warning-600)" aria-hidden="true" />
            {drafts.length} draft{drafts.length === 1 ? "" : "s"} waiting to publish
          </Badge>
        )}
        <a href="/" target="_blank" rel="noreferrer" className={cn(consoleButton.secondary, "h-9")}>
          View live site <ExternalLink aria-hidden="true" />
        </a>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-5 py-8 sm:px-8">
        {denied && <Notice tone="warning">Your role doesn&apos;t include that part of the console. A super admin can add it to your role.</Notice>}
        <section className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1.5 text-xs font-semibold tracking-[0.14em] text-primary-ink uppercase">{date}</p>
            <h1 className="max-w-3xl font-heading text-[2.1rem] leading-tight font-medium tracking-tight text-balance sm:text-[2.4rem]">{headline}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {can(user, "collections", "edit") && (
              <ConsoleLink href="/collections/members" className={consoleButton.secondary}>
                Add member
              </ConsoleLink>
            )}
            {can(user, "pages", "structure") && (
              <ConsoleLink href="/pages?new=1" className={consoleButton.secondary}>
                New page
              </ConsoleLink>
            )}
            {seeSubmissions && (
              <ConsoleLink href="/submissions" className={consoleButton.primary}>
                Open inbox
              </ConsoleLink>
            )}
          </div>
        </section>

        <section aria-label="At a glance" className="grid grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] gap-4">
          {seeSubmissions && (
            <>
              <div className="flex flex-col gap-2.5 rounded-2xl bg-(--color-navy-900) px-5 py-5 text-white">
                <span className="text-sm text-text-on-hero-muted">New today</span>
                <span className="font-heading text-5xl leading-none font-medium tabular-nums">{todayCount}</span>
                <span className="text-sm text-primary">
                  {todayCount === yesterday ? "Same as yesterday" : todayCount > yesterday ? `${todayCount - yesterday} more than yesterday` : `${yesterday - todayCount} fewer than yesterday`}
                </span>
              </div>
              <Stat label="Open submissions" value={openCount[0].value} note="New or in progress" />
            </>
          )}
          <Stat label="Forms taking entries" value={openForms} of={liveForms.length} note={liveForms.length - openForms ? `${liveForms.length - openForms} closed` : "All open"} />
          <Stat label="Drafts waiting" value={drafts.length} note={drafts.length ? "Saved, not yet on the site" : "Everything is published"} />
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          {seeSubmissions && (
            <section className="flex flex-col gap-4 rounded-2xl border border-border bg-canvas p-5 sm:p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="font-heading text-xl font-medium">Submissions, last 7 days</h2>
                <span className="text-sm text-muted-foreground tabular-nums">{weekTotal} in all</span>
              </div>
              <div role="img" aria-label={`Submissions per day: ${days.map((d) => `${d.label} ${d.n}`).join(", ")}`} className="flex h-44 items-end gap-3 pt-2">
                {days.map((d) => (
                  <div key={d.label + d.today} className="flex h-full flex-1 flex-col items-center justify-end gap-2" aria-hidden="true">
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">{d.n}</span>
                    <span
                      className={cn("w-full max-w-11 rounded-t-lg rounded-b-sm", d.today ? "bg-primary" : "bg-(--color-navy-100)")}
                      style={{ height: `${Math.max(4, Math.round((d.n / max) * 120))}px` }}
                    />
                    <span className={cn("text-xs", d.today ? "font-semibold text-foreground" : "text-muted-foreground")}>{d.today ? "Today" : d.label}</span>
                  </div>
                ))}
              </div>
              {byForm.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {byForm.map((row) => (
                    <ConsoleLink key={row.key} href={`/submissions?form=${row.key}&status=all`} className="rounded-full bg-surface px-3 py-1 text-xs text-secondary-text hover:bg-(--color-navy-100)">
                      {row.name} · {row.value}
                    </ConsoleLink>
                  ))}
                </div>
              )}
            </section>
          )}

          <section className="flex flex-col gap-1.5 rounded-2xl border border-border bg-canvas p-5 sm:p-6">
            <h2 className="mb-2 font-heading text-xl font-medium">Needs attention</h2>
            {urgent.map((row) => (
              <ConsoleLink key={row.id} href={`/submissions?id=${row.id}`} className="flex items-start gap-3 rounded-xl bg-ember/6 p-3 hover:bg-ember/10">
                <Badge tone="ember" className="mt-0.5">URGENT</Badge>
                <span className="flex min-w-0 flex-col">
                  <span className="font-semibold">{row.formName}</span>
                  <span className="text-sm text-muted-foreground">
                    {row.reference} · {timeAgo(row.createdAt)} · {row.assignedTo ? "assigned" : "unassigned"}
                  </span>
                </span>
              </ConsoleLink>
            ))}
            {drafts.slice(0, 5).map((doc) => (
              <ConsoleLink key={`${doc.type}:${doc.key}`} href={draftLink(doc.type, doc.key)} className="flex items-start gap-3 rounded-xl p-3 hover:bg-surface">
                <Badge tone="amber" className="mt-0.5">DRAFT</Badge>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate font-semibold">{draftLabel(doc.type, doc.key)}</span>
                  <span className="text-sm text-muted-foreground">
                    Saved {timeAgo(doc.draftUpdatedAt)}
                    {doc.draftUpdatedBy ? ` by ${doc.draftUpdatedBy}` : ""}
                  </span>
                </span>
              </ConsoleLink>
            ))}
            {urgent.length === 0 && drafts.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">Nothing waiting. Urgent filings and unpublished drafts appear here.</p>}
          </section>
        </div>

        {activity.length > 0 && (
          <section className="rounded-2xl border border-border bg-canvas p-5 sm:p-6">
            <div className="mb-2 flex items-baseline justify-between">
              <h2 className="font-heading text-xl font-medium">Recent activity</h2>
              <ConsoleLink href="/audit" className="inline-flex items-center gap-1 text-sm font-medium text-primary-ink hover:underline">
                Full audit log <ArrowRight className="size-3.5" aria-hidden="true" />
              </ConsoleLink>
            </div>
            <ul>
              {activity.map((row) => (
                <li key={row.id} className="flex gap-3 border-t border-border py-3 first:border-t-0">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--color-navy-100) text-[0.7rem] font-semibold text-secondary-text">{initials(row.userEmail ?? "S")}</span>
                  <span className="flex min-w-0 flex-col text-sm">
                    <span>
                      <strong className="font-semibold">{row.userEmail ?? "System"}</strong> {row.summary}
                    </span>
                    <span className="text-xs text-muted-foreground">{timeAgo(row.createdAt)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}

function Stat({ label, value, of, note }: { label: string; value: number; of?: number; note: string }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-border bg-canvas px-5 py-5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-heading text-5xl leading-none font-medium tabular-nums">
        {value}
        {of !== undefined && <span className="text-2xl text-muted-foreground"> / {of}</span>}
      </span>
      <span className="text-sm text-muted-foreground">{note}</span>
    </div>
  );
}
