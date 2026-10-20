import "server-only";
import { cache } from "react";
import type { Article } from "@/lib/articles";
import type { CodeEdition } from "@/lib/code-editions";
import type { CodeText } from "@/lib/code";
import { getCollectionDef } from "@/lib/content/collections";
import { getContent } from "@/lib/content/store";
import type { FeeSchedule } from "@/lib/fee-schedule";
import type { Member } from "@/lib/members";
import type { ModelClause } from "@/lib/model-clauses";
import { DEFAULT_SETTINGS, type NavLink, type SiteSettings } from "@/lib/site-settings";
import type { StudentCourse, TrainingTrack } from "@/lib/training-tracks";

// The site's collections as published in the console (or, until then, as
// written in code). Pages read their data through these, never from the
// lib/ constants directly, so a publish reaches every page that shows it.

export const COLLECTION_TYPE = "collection";

/** Items an admin has hidden stay in the console but never reach the site. */
export const HIDDEN = "_hidden";

// Optional parts that pages show only when present ("if it has points, list
// them"). A saved item holds [] or "" for them instead, so those are dropped.
const OPTIONAL = new Set(["points", "flow", "branches", "definitions", "lead"]);

function prune(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(prune);
  if (!value || typeof value !== "object") return value;
  const out: Record<string, unknown> = {};
  for (const [key, inner] of Object.entries(value)) {
    if (OPTIONAL.has(key) && (inner === "" || inner == null || (Array.isArray(inner) && inner.length === 0))) continue;
    out[key] = prune(inner);
  }
  return out;
}

async function read<T>(key: string): Promise<T> {
  const def = getCollectionDef(key);
  if (!def) throw new Error(`Unknown collection: ${key}`);
  const value = prune(await getContent<unknown>(COLLECTION_TYPE, key, def.defaults()));
  if (def.kind === "list" && Array.isArray(value)) {
    return value
      .filter((item) => !(item && typeof item === "object" && (item as Record<string, unknown>)[HIDDEN]))
      .map((item) => {
        const rest = { ...(item as Record<string, unknown>) };
        delete rest[HIDDEN];
        return rest;
      }) as T;
  }
  return value as T;
}

export const getMembers = cache(() => read<Member[]>("members"));
export const getTrainingTracks = cache(() => read<TrainingTrack[]>("training-tracks"));
export const getStudentCourses = cache(() => read<{ fee: number; courses: StudentCourse[] }>("student-courses"));
export const getCompetitions = cache(() => read<{ title: string; description: string; href: string }[]>("competitions"));
export const getArticles = cache(() => read<Article[]>("articles"));
export const getModelClauses = cache(() => read<ModelClause[]>("model-clauses"));
export const getCodeEditions = cache(() => read<CodeEdition[]>("code-editions"));
export const getMoralPrinciples = cache(() => read<{ edition: number; principles: { title: string; body: string }[] }>("moral-principles"));

export const getCodeTexts = cache(() => read<CodeText[]>("code-texts"));
export async function getCodeText(year: string) {
  return (await getCodeTexts()).find((text) => String(text.year) === year);
}

export async function getTrack(slug: string) {
  const track = (await getTrainingTracks()).find((t) => t.slug === slug);
  if (!track) throw new Error(`Unknown training track: ${slug}`);
  return track;
}

type StoredSlab = Omit<FeeSchedule["tribunalSlabs"][number], "to" | "ceiling"> & { to: number | null; ceiling: number | null };

/** The fee schedule, with JSON's nulls turned back into "and above" and "no ceiling". */
export const getFeeSchedule = cache(async (): Promise<FeeSchedule> => {
  const stored = await read<Omit<FeeSchedule, "tribunalSlabs" | "adminSlabs"> & { tribunalSlabs: StoredSlab[]; adminSlabs: StoredSlab[] }>("fee-schedule");
  const slabs = (list: StoredSlab[]) =>
    list.map((slab) => ({ ...slab, to: slab.to ?? Infinity, ceiling: slab.ceiling ?? undefined }));
  return { ...stored, tribunalSlabs: slabs(stored.tribunalSlabs), adminSlabs: slabs(stored.adminSlabs) };
});

export const SETTINGS_TYPE = "settings";

/** Site-wide settings; a setting added after the last publish takes its default. */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const stored = await getContent<Partial<SiteSettings>>(SETTINGS_TYPE, "site", DEFAULT_SETTINGS);
  const settings = { ...DEFAULT_SETTINGS, ...stored };
  // Saved menus hold empty lists and null stars where a link has none; the
  // header reads any list as a dropdown, so those are left out.
  const link = (l: NavLink) => ({ ...l, stars: l.stars ?? undefined });
  settings.navGroups = settings.navGroups.map((group) => ({
    label: group.label,
    href: group.href || undefined,
    children: group.children?.length ? group.children.map(link) : undefined,
    sections: group.sections?.length ? group.sections.map((section) => ({ ...section, links: section.links.map(link) })) : undefined,
  }));
  settings.secondaryLinks = settings.secondaryLinks.map(link);
  return settings;
});
