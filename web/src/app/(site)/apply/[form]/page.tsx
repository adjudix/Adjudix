import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { ApplyFormBody } from "@/components/patterns/apply-form";
import { FORM_DEFAULTS, getForm, PAGE_FORMS } from "@/lib/forms";

// Forms written in code are prerendered; forms created in the console
// render on first visit.
export function generateStaticParams() {
  return Object.keys(FORM_DEFAULTS)
    .filter((form) => !PAGE_FORMS.has(form))
    .map((form) => ({ form }));
}

async function load(slug: string) {
  return PAGE_FORMS.has(slug) ? undefined : getForm(slug);
}

export async function generateMetadata({ params }: PageProps<"/apply/[form]">): Promise<Metadata> {
  const form = await load((await params).form);
  return { title: form?.title, robots: { index: false, follow: true } };
}

// The same form as the modal, as a page of its own — for shared links,
// refreshes, and anyone arriving from outside the site.
export default async function ApplyPage({ params, searchParams }: PageProps<"/apply/[form]">) {
  const form = await load((await params).form);
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
        <div className="rounded-2xl border border-border bg-surface p-6 [--form-ground:var(--color-surface)] sm:p-10">
          <ApplyFormBody form={form} params={await searchParams} />
        </div>
      </section>
    </main>
  );
}
