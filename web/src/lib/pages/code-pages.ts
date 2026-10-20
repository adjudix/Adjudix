import "server-only";
import { isValidElement, type ComponentType, type ReactNode } from "react";
import { PAGE_LOADERS } from "@/lib/pages/loaders";

// The pages built in code (app/(site)/**/page.tsx). Each registers itself
// here with editablePage(), so the console can start a page's blocks from
// what it shows today, and an "Original section" block can still draw it.

// Typed loosely: page components take route props, or none.
type AnyComponent = ComponentType<Record<string, unknown>>;

interface CodePage {
  Component: AnyComponent;
  title: string;
  description: string;
}

const globalPages = globalThis as unknown as { adjudixCodePages?: Map<string, CodePage> };
export const CODE_PAGES = (globalPages.adjudixCodePages ??= new Map<string, CodePage>());

export function registerCodePage(path: string, page: CodePage) {
  CODE_PAGES.set(path, page);
}

/** The code page at `path`, loading its module if it hasn't been yet. */
export async function loadCodePage(path: string): Promise<CodePage | undefined> {
  if (!CODE_PAGES.has(path)) await PAGE_LOADERS[path]?.();
  return CODE_PAGES.get(path);
}

export const CODE_PAGE_PATHS = Object.keys(PAGE_LOADERS);

/** Calls a page component as React would, to read what it returns. */
export async function renderOriginal(page: CodePage, routeProps: Record<string, unknown>): Promise<ReactNode> {
  const props = {
    params: Promise.resolve({}),
    searchParams: Promise.resolve({}),
    ...routeProps,
  };
  return (await (page.Component as unknown as (p: unknown) => ReactNode | Promise<ReactNode>)(props)) as ReactNode;
}

/**
 * Draws an original page — the whole of it, or (for a mechanism page) the
 * extra section it adds between its legal basis and its steps.
 */
export async function renderCodeSection(path: string, routeProps: Record<string, unknown>, part: "page" | "extra"): Promise<ReactNode> {
  const page = await loadCodePage(path);
  if (!page) return null;
  const node = await renderOriginal(page, routeProps);
  if (part === "page") return node;
  return isValidElement(node) ? ((node.props as { extra?: ReactNode }).extra ?? null) : null;
}
