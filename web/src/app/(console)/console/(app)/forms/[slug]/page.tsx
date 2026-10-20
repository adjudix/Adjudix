import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { count, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { requirePermission } from "@/lib/console/auth";
import { can } from "@/lib/console/permissions";
import { listVersions, loadDoc } from "@/lib/content/drafts";
import { FORM_DEFAULTS, FORM_TYPE, getForm, PAGE_FORMS } from "@/lib/forms";
import type { FormConfig } from "@/lib/forms/config";
import { FormBuilder } from "./builder";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const form = await getForm((await params).slug);
  return { title: form?.title ?? "Form" };
}

export default async function FormPage({ params }: { params: Promise<{ slug: string }> }) {
  const user = await requirePermission("forms");
  const { slug } = await params;
  const live = await getForm(slug);
  const doc = await loadDoc<FormConfig | null>(FORM_TYPE, slug, live ?? null);
  if (!doc.value) notFound();

  const [versions, [{ value: total }]] = await Promise.all([
    listVersions(FORM_TYPE, slug),
    db().select({ value: count() }).from(schema.submissions).where(eq(schema.submissions.formKey, slug)),
  ]);

  return (
    <FormBuilder
      // A new draft or publish from the server starts the editor afresh.
      key={`${doc.draftUpdatedAt?.getTime() ?? 0}-${doc.publishedAt?.getTime() ?? 0}`}
      slug={slug}
      initial={doc.value}
      live={doc.isPublished || Boolean(FORM_DEFAULTS[slug]) ? (live ?? null) : null}
      hasDraft={doc.hasDraft}
      draftInfo={doc.draftUpdatedAt ? { at: doc.draftUpdatedAt.toISOString(), by: doc.draftUpdatedBy } : null}
      publishedInfo={doc.publishedAt ? { at: doc.publishedAt.toISOString(), by: doc.publishedBy } : null}
      versions={versions.map((v) => ({ id: v.id, at: v.publishedAt.toISOString(), by: v.publishedBy }))}
      submissions={total}
      publicPath={PAGE_FORMS.has(slug) ? `/odr/${slug.replace("odr-", "")}` : `/apply/${slug}`}
      builtIn={Boolean(FORM_DEFAULTS[slug])}
      permissions={{
        edit: can(user, "forms", "edit"),
        structure: can(user, "forms", "structure"),
        publish: can(user, "forms", "publish"),
        submissions: can(user, "submissions"),
      }}
    />
  );
}
