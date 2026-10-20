import "server-only";
import { isValidElement } from "react";
import { CompetitionPage } from "@/components/patterns/competition-page";
import { CoursePage } from "@/components/patterns/course-page";
import { MechanismPage } from "@/components/patterns/mechanism-page";
import { MembershipTierPage } from "@/components/patterns/membership-tier-page";
import { PartnerCategoryPage } from "@/components/patterns/partner-category-page";
import { PracticeAreaPage } from "@/components/patterns/practice-area-page";
import { newBlockId, type Block, type PageDoc } from "@/lib/blocks/types";
import { loadDoc } from "@/lib/content/drafts";
import { getContent, listPublishedKeys } from "@/lib/content/store";
import { CODE_PAGE_PATHS, loadCodePage, renderOriginal } from "@/lib/pages/code-pages";
import { HAND_SEEDS, ORIGINAL_NOTES } from "@/lib/pages/seeds";

// Pages in the content store (type "page", key = the page's path). A path
// with a published page document shows its blocks; otherwise the page built
// in code shows. New pages exist only as documents.

export const PAGE_TYPE = "page";

export function normalizePath(path: string) {
  const clean = `/${path}`.replace(/\/+/g, "/").replace(/(.)\/$/, "$1").toLowerCase();
  return /^\/[a-z0-9/_-]*$/.test(clean) ? clean : null;
}

export async function getPageDoc(path: string): Promise<PageDoc | null> {
  return getContent<PageDoc | null>(PAGE_TYPE, path, null);
}

export async function listPublishedPagePaths() {
  return listPublishedKeys(PAGE_TYPE);
}

const PATTERNS = new Map<unknown, string>([
  [MechanismPage, "mechanism"],
  [CoursePage, "course"],
  [PracticeAreaPage, "practiceArea"],
  [MembershipTierPage, "membershipTier"],
  [CompetitionPage, "competition"],
  [PartnerCategoryPage, "partnerCategory"],
]);

const block = (type: string, props: Record<string, unknown>): Block => ({ id: newBlockId(), type, props });

/**
 * What the editor starts from for a page built in code: its own content as
 * blocks where the page is made from one of the site's page templates, a
 * hand-converted set of blocks where one exists, and otherwise the page as
 * one "Original section" that new blocks can go around.
 */
export async function seedPage(path: string): Promise<PageDoc | null> {
  const page = await loadCodePage(path);
  if (!page) return null;
  const meta = { title: page.title, description: page.description };
  const hand = HAND_SEEDS[path];
  if (hand) return { ...meta, blocks: hand().map((b) => ({ ...b, id: newBlockId() })) };

  const node = await renderOriginal(page, {});
  const type = isValidElement(node) ? PATTERNS.get(node.type) : undefined;
  if (type && isValidElement(node)) {
    const { extra, ...props } = node.props as Record<string, unknown>;
    // A mechanism page's extra section is page-specific code; it stays, by reference.
    return { ...meta, blocks: [block(type, { ...props, ...(extra ? { extraSection: path } : {}) })] };
  }
  return { ...meta, blocks: [block("code", { label: ORIGINAL_NOTES[path] ?? `The ${page.title || path} page as built`, source: path })] };
}

/** Every page the console can edit: those in code and those created in the console. */
export async function allPagePaths() {
  return [...new Set([...CODE_PAGE_PATHS, ...(await listPublishedPagePaths())])].sort();
}

/** The page as the editor last left it: its draft, else what is live, else its seed. */
export async function currentPage(path: string) {
  const published = await getPageDoc(path);
  const fallback = published ?? (await seedPage(path));
  return (await loadDoc<PageDoc | null>(PAGE_TYPE, path, fallback)).value;
}
