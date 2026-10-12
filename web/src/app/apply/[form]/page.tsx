import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { ApplyFormBody } from "@/components/patterns/apply-form";
import { APPLY_FORMS, getApplyForm } from "@/lib/apply-forms";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(APPLY_FORMS).map((form) => ({ form }));
}

export async function generateMetadata({ params }: PageProps<"/apply/[form]">): Promise<Metadata> {
  const form = getApplyForm((await params).form);
  return { title: form ? `${form.title} · Adjudix` : "Adjudix" };
}

// The same form as the modal, as a page of its own — for shared links,
// refreshes, and anyone arriving from outside the site.
export default async function ApplyPage({ params, searchParams }: PageProps<"/apply/[form]">) {
  const form = getApplyForm((await params).form);
  if (!form) notFound();

  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow={form.section.label}
        title={form.title}
        breadcrumbs={[form.section, { label: form.title }]}
        intro={form.intro}
      />
      <section className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10">
          <ApplyFormBody form={form} params={await searchParams} />
        </div>
      </section>
    </main>
  );
}
