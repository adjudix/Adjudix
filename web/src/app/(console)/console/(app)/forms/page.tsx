import type { Metadata } from "next";
import { count, gte } from "drizzle-orm";
import { ChevronRight } from "lucide-react";
import { ConsoleLink } from "@/components/console/base";
import { Badge, PageHead } from "@/components/console/ui";
import { db, schema } from "@/db";
import { requirePermission } from "@/lib/console/auth";
import { daysAgo } from "@/lib/console/clock";
import { can } from "@/lib/console/permissions";
import { listDocs } from "@/lib/content/drafts";
import { FORM_DEFAULTS, FORM_TYPE, PAGE_FORMS } from "@/lib/forms";
import type { FormConfig } from "@/lib/forms/config";
import { NewFormButton } from "./new-form";

export const metadata: Metadata = { title: "Forms" };

const KIND_LABELS: Record<string, string> = {
  filing: "Filing in steps",
  application: "Application",
  registration: "Registration",
  enquiry: "Enquiry",
  subscribe: "Subscribe",
};

export default async function FormsPage() {
  const user = await requirePermission("forms");
  const [docs, weekly] = await Promise.all([
    listDocs(FORM_TYPE),
    db()
      .select({ formKey: schema.submissions.formKey, value: count() })
      .from(schema.submissions)
      .where(gte(schema.submissions.createdAt, daysAgo(7)))
      .groupBy(schema.submissions.formKey),
  ]);
  const byKey = new Map(docs.map((doc) => [doc.key, doc]));
  const counts = new Map(weekly.map((row) => [row.formKey, row.value]));
  const slugs = [...new Set([...Object.keys(FORM_DEFAULTS), ...docs.map((doc) => doc.key)])];

  const rows = slugs.map((slug) => {
    const doc = byKey.get(slug);
    const live = (doc?.published as FormConfig | null) ?? FORM_DEFAULTS[slug] ?? null;
    const shown = (doc?.draft as FormConfig | null) ?? live;
    return {
      slug,
      form: shown!,
      isLive: Boolean(live),
      enabled: live?.enabled ?? false,
      hasDraft: doc?.draft != null,
      week: counts.get(slug) ?? 0,
      custom: !FORM_DEFAULTS[slug],
    };
  });
  const groups = new Map<string, typeof rows>();
  for (const row of rows) {
    const key = row.form.section.label;
    groups.set(key, [...(groups.get(key) ?? []), row]);
  }
  const open = rows.filter((row) => row.isLive && row.enabled).length;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-5 py-8 sm:px-8">
      <PageHead
        title="Forms"
        description={`${open} of ${rows.length} forms are taking entries. Open one to change its fields, choices and wording, close it, or see what it looks like.`}
        actions={can(user, "forms", "structure") ? <NewFormButton forms={rows.map((row) => ({ slug: row.slug, title: row.form.title }))} /> : undefined}
      />
      {[...groups.entries()].map(([section, list]) => (
        <section key={section} aria-labelledby={`group-${section}`} className="flex flex-col gap-2">
          <h2 id={`group-${section}`} className="px-1 text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
            {section}
          </h2>
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-canvas">
            {list.map((row) => (
              <li key={row.slug}>
                <ConsoleLink href={`/forms/${row.slug}`} className="group flex flex-wrap items-center gap-x-4 gap-y-1.5 px-5 py-4 transition-colors hover:bg-surface">
                  <span className="flex min-w-0 flex-[1_1_18rem] flex-col">
                    <span className="font-medium text-foreground">{row.form.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {KIND_LABELS[row.form.kind] ?? row.form.kind} · {row.form.fields.length} fields ·{" "}
                      {PAGE_FORMS.has(row.slug) ? `/odr/${row.slug.replace("odr-", "")}` : `/apply/${row.slug}`}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground tabular-nums">{row.week} this week</span>
                  <span className="flex gap-1.5">
                    {row.form.tone === "urgent" && <Badge tone="ember">Urgent</Badge>}
                    {row.hasDraft && <Badge tone="amber">Draft changes</Badge>}
                    {!row.isLive ? <Badge tone="neutral">Not published</Badge> : row.enabled ? <Badge tone="green">Live</Badge> : <Badge tone="neutral">Closed</Badge>}
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

