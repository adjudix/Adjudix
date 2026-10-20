"use server";

import { authorize, Forbidden } from "@/lib/console/auth";
import { can } from "@/lib/console/permissions";
import { discardDraft, loadDoc, publishDoc, restoreVersion, saveDraft, unpublishDoc } from "@/lib/content/drafts";
import { FORM_DEFAULTS, FORM_TYPE, getForm } from "@/lib/forms";
import { cleanFormConfig, NAME_PATTERN, structureOf } from "@/lib/forms/clean";
import { CLOSED_DEFAULTS, type FormConfig } from "@/lib/forms/config";

export type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };

async function guard<T>(run: () => Promise<Result<T>>): Promise<Result<T>> {
  try {
    return await run();
  } catch (cause) {
    if (cause instanceof Forbidden) return { ok: false, error: cause.message };
    if (cause instanceof Error && !cause.message.includes("SQLITE")) return { ok: false, error: cause.message };
    console.error("[forms]", cause);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

const label = (form: Pick<FormConfig, "title">) => `the form “${form.title}”`;

/** The form as the console last left it: its draft, else what is live. */
async function current(slug: string) {
  const live = await getForm(slug);
  const doc = await loadDoc<FormConfig | null>(FORM_TYPE, slug, live ?? null);
  return doc.value;
}

export async function saveFormDraft(slug: string, input: unknown) {
  return guard(async () => {
    const user = await authorize("forms", "edit");
    const before = await current(slug);
    if (!before) return { ok: false, error: "That form no longer exists." };
    const next = cleanFormConfig(slug, input);
    if (structureOf(before) !== structureOf(next) && !can(user, "forms", "structure")) {
      return { ok: false, error: "Your role can edit wording and choices, but not add, remove or move fields." };
    }
    await saveDraft(user, FORM_TYPE, slug, next, label(next));
    return { ok: true };
  });
}

export async function publishForm(slug: string, input?: unknown) {
  return guard(async () => {
    const user = await authorize("forms", "publish");
    if (input !== undefined) {
      const saved = await saveFormDraft(slug, input);
      if (!saved.ok) return saved;
    }
    const form = await current(slug);
    if (!form) return { ok: false, error: "That form no longer exists." };
    await publishDoc(user, FORM_TYPE, slug, label(form));
    return { ok: true };
  });
}

export async function discardFormDraft(slug: string) {
  return guard(async () => {
    const user = await authorize("forms", "edit");
    const form = await current(slug);
    await discardDraft(user, FORM_TYPE, slug, label(form ?? { title: slug }));
    return { ok: true };
  });
}

export async function restoreFormVersion(slug: string, versionId: number) {
  return guard(async () => {
    const user = await authorize("forms", "edit");
    const form = await current(slug);
    await restoreVersion(user, FORM_TYPE, slug, versionId, label(form ?? { title: slug }));
    return { ok: true };
  });
}

export async function createForm(input: { slug: string; title: string; copyFrom?: string }) {
  return guard<{ slug: string }>(async () => {
    const user = await authorize("forms", "structure");
    const slug = input.slug.trim().toLowerCase();
    if (!NAME_PATTERN.test(slug)) return { ok: false, error: "Use letters, numbers and dashes for the address, starting with a letter." };
    if (FORM_DEFAULTS[slug] || (await loadDoc(FORM_TYPE, slug, null)).value) {
      return { ok: false, error: "A form already uses that address." };
    }
    const source = input.copyFrom ? await current(input.copyFrom) : null;
    const base: FormConfig = source
      ? { ...source, slug, title: input.title }
      : {
          slug,
          title: input.title,
          intro: "Tell us a little about your request and we'll be in touch.",
          section: { label: "Contact", href: "/contact" },
          kind: "application",
          fields: [],
          submitLabel: "Submit",
          successTitle: "Received",
          successBody: "Thank you — a member of our team will be in touch shortly.",
          enabled: true,
          ...CLOSED_DEFAULTS,
          inbox: "query",
        };
    await saveDraft(user, FORM_TYPE, slug, cleanFormConfig(slug, base), label(base));
    return { ok: true, slug };
  });
}

/** Removes a form created in the console. Forms written in code can only be closed. */
export async function deleteForm(slug: string) {
  return guard(async () => {
    const user = await authorize("forms", "structure");
    if (FORM_DEFAULTS[slug]) return { ok: false, error: "Forms that came with the site can be closed, but not deleted." };
    const form = await current(slug);
    await unpublishDoc(user, FORM_TYPE, slug, label(form ?? { title: slug }));
    return { ok: true };
  });
}
