import "server-only";
import type { ComponentType } from "react";
import type { Metadata } from "next";
import { Blocks } from "@/components/blocks/render";
import { registerCodePage } from "@/lib/pages/code-pages";
import { getPageDoc } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";

// Wraps a page built in code so the console can take it over: while the
// path has a published page document, its blocks show instead (and its
// title and description replace the page's own).

type PageComponent = ComponentType<never>;

export function editablePage(path: string, Component: PageComponent, metadata?: Metadata) {
  registerCodePage(path, {
    Component: Component as never,
    title: String((metadata?.title as string | undefined) ?? ""),
    description: String(metadata?.description ?? ""),
  });
  async function EditablePage(props: Record<string, unknown>) {
    const doc = await getPageDoc(path);
    if (doc) return <Blocks blocks={doc.blocks} context={{ path, routeProps: props }} />;
    const Original = Component as unknown as ComponentType<Record<string, unknown>>;
    return <Original {...props} />;
  }
  EditablePage.displayName = `Editable(${Component.displayName ?? Component.name ?? path})`;
  return EditablePage;
}

export function editableMetadata(path: string, metadata: Metadata) {
  return async function generateMetadata(): Promise<Metadata> {
    const doc = await getPageDoc(path);
    if (!doc) return metadata;
    const base = pageMetadata({ title: doc.title || String(metadata.title ?? ""), description: doc.description || String(metadata.description ?? ""), path });
    return doc.noindex ? { ...base, robots: { index: false, follow: true } } : base;
  };
}
