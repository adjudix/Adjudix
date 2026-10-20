import "server-only";
import { APPLY_FORMS, type ApplyForm } from "@/lib/apply-forms";
import { getContent, listPublishedKeys } from "@/lib/content/store";
import { CLOSED_DEFAULTS, type FormConfig } from "@/lib/forms/config";
import { ODR_FILING, ODR_RESPONSE } from "@/lib/odr-forms";

// Every form on the site, as published from the console — or, until a form
// is first published there, as written in code (lib/apply-forms, lib/odr-forms).

export const FORM_TYPE = "form";

const withDefaults = (form: ApplyForm): FormConfig => ({
  ...form,
  enabled: true,
  ...CLOSED_DEFAULTS,
  inbox: form.kind === "filing" ? "secretariat" : "query",
});

export const FORM_DEFAULTS: Record<string, FormConfig> = Object.fromEntries(
  [...Object.values(APPLY_FORMS), ODR_FILING, ODR_RESPONSE].map((form) => [form.slug, withDefaults(form)]),
);

/** Forms opened at /apply/<slug>; the ODR forms have pages of their own. */
export const PAGE_FORMS = new Set(["odr-file", "odr-respond"]);

export async function getForm(slug: string): Promise<FormConfig | undefined> {
  const fallback = FORM_DEFAULTS[slug];
  const form = await getContent<FormConfig | null>(FORM_TYPE, slug, fallback ?? null);
  // A form saved before a setting existed takes that setting's default.
  return form ? { ...(fallback ?? withDefaults(form)), ...form, slug } : undefined;
}

/** The slugs of every form: those written in code and those created in the console. */
export async function listFormSlugs(): Promise<string[]> {
  const published = await listPublishedKeys(FORM_TYPE);
  return [...new Set([...Object.keys(FORM_DEFAULTS), ...published])];
}

/** Finds a form by its title — how submissions named their form before slugs. */
export async function getFormByTitle(title: string): Promise<FormConfig | undefined> {
  for (const slug of await listFormSlugs()) {
    const form = await getForm(slug);
    if (form?.title === title) return form;
  }
  return undefined;
}
