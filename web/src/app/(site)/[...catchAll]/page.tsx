import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/render";
import { getPageDoc, normalizePath } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";

// Pages created in the console, at any address no page in code already has.
// They render on first visit and update when republished.

async function load(segments: string[]) {
  const path = normalizePath(segments.join("/"));
  return path ? { path, doc: await getPageDoc(path) } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ catchAll: string[] }> }): Promise<Metadata> {
  const found = await load((await params).catchAll);
  if (!found?.doc) return {};
  const metadata = pageMetadata({ title: found.doc.title, description: found.doc.description, path: found.path });
  return found.doc.noindex ? { ...metadata, robots: { index: false, follow: true } } : metadata;
}

export default async function ConsolePage(props: { params: Promise<{ catchAll: string[] }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const found = await load((await props.params).catchAll);
  if (!found?.doc) notFound();
  return <Blocks blocks={found.doc.blocks} context={{ path: found.path, routeProps: props }} />;
}
