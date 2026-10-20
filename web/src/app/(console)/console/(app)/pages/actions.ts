"use server";

import { authorize, Forbidden } from "@/lib/console/auth";
import { can } from "@/lib/console/permissions";
import type { PageDoc } from "@/lib/blocks/types";
import { discardDraft, publishDoc, restoreVersion, saveDraft, unpublishDoc } from "@/lib/content/drafts";
import { currentPage, normalizePath, PAGE_TYPE } from "@/lib/pages";
import { cleanPageDoc, pageStructure } from "@/lib/pages/clean";
import { CODE_PAGE_PATHS } from "@/lib/pages/code-pages";

export type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };

// Addresses the site already uses for something other than pages.
const RESERVED = /^\/(api|apply|console|_next|images|video|code|uploads)(\/|$)/;

async function guard<T>(run: () => Promise<Result<T>>): Promise<Result<T>> {
  try {
    return await run();
  } catch (cause) {
    if (cause instanceof Forbidden) return { ok: false, error: cause.message };
    console.error("[pages]", cause);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

const label = (path: string, doc?: Pick<PageDoc, "title"> | null) => `the page ${doc?.title ? `“${doc.title}” (${path})` : path}`;

export async function savePageDraft(path: string, input: unknown, quiet = false) {
  return guard(async () => {
    const user = await authorize("pages", "edit");
    const before = await currentPage(path);
    if (!before) return { ok: false, error: "That page no longer exists." };
    const next = cleanPageDoc(input, CODE_PAGE_PATHS);
    if (pageStructure(before) !== pageStructure(next) && !can(user, "pages", "structure")) {
      return { ok: false, error: "Your role can edit the words on a page, but not add, remove or move blocks." };
    }
    await saveDraft(user, PAGE_TYPE, path, next, label(path, next), { quiet });
    return { ok: true };
  });
}

export async function publishPage(path: string, input?: unknown) {
  return guard(async () => {
    const user = await authorize("pages", "publish");
    if (input !== undefined) {
      const saved = await savePageDraft(path, input, true);
      if (!saved.ok) return saved;
    }
    const doc = await currentPage(path);
    if (!doc) return { ok: false, error: "That page no longer exists." };
    if (!doc.title.trim()) return { ok: false, error: "Give the page a title in Page settings first." };
    await publishDoc(user, PAGE_TYPE, path, label(path, doc), doc);
    return { ok: true };
  });
}

export async function discardPageDraft(path: string) {
  return guard(async () => {
    const user = await authorize("pages", "edit");
    await discardDraft(user, PAGE_TYPE, path, label(path));
    return { ok: true };
  });
}

export async function restorePageVersion(path: string, versionId: number) {
  return guard(async () => {
    const user = await authorize("pages", "edit");
    await restoreVersion(user, PAGE_TYPE, path, versionId, label(path));
    return { ok: true };
  });
}

/** For a page in code: back to the page as built, with no blocks. */
export async function revertPage(path: string) {
  return guard(async () => {
    const user = await authorize("pages", "publish");
    if (!CODE_PAGE_PATHS.includes(path)) return { ok: false, error: "Only pages that came with the site can be reverted." };
    await unpublishDoc(user, PAGE_TYPE, path, label(path));
    return { ok: true };
  });
}

export async function deletePage(path: string) {
  return guard(async () => {
    const user = await authorize("pages", "delete");
    if (CODE_PAGE_PATHS.includes(path)) return { ok: false, error: "Pages that came with the site can be reverted, but not deleted." };
    await unpublishDoc(user, PAGE_TYPE, path, label(path));
    return { ok: true };
  });
}

export async function createPage(input: { path: string; title: string; copyFrom?: string }) {
  return guard<{ path: string }>(async () => {
    const user = await authorize("pages", "structure");
    const path = normalizePath(input.path.trim());
    if (!path || path === "/") return { ok: false, error: "Use lower-case letters, numbers and dashes, like /events/annual-conclave." };
    if (RESERVED.test(path)) return { ok: false, error: "That address is used by the site for something else." };
    if (CODE_PAGE_PATHS.includes(path) || (await currentPage(path))) return { ok: false, error: "A page already uses that address. Open it from the list instead." };
    const title = input.title.trim().slice(0, 160) || "New page";
    const source = input.copyFrom ? await currentPage(input.copyFrom) : null;
    const doc: PageDoc = source
      ? { ...source, title }
      : {
          title,
          description: "",
          blocks: [
            { id: "b0header", type: "pageHeader", props: { title, eyebrow: "", intro: "", breadcrumbs: [], image: "", imageAlt: "" } },
            { id: "b1text", type: "text", props: { heading: "", paragraphs: ["Write the first paragraph here."], points: [], width: "narrow", background: "canvas" } },
          ],
        };
    await saveDraft(user, PAGE_TYPE, path, cleanPageDoc(doc, CODE_PAGE_PATHS), label(path, doc));
    return { ok: true, path };
  });
}
