import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ConsoleLink } from "@/components/console/base";
import { Badge, PageHead } from "@/components/console/ui";
import { requirePermission } from "@/lib/console/auth";
import { COLLECTIONS } from "@/lib/content/collections";
import { COLLECTION_TYPE } from "@/lib/content/data";
import { listDocs } from "@/lib/content/drafts";

export const metadata: Metadata = { title: "Collections" };

export default async function CollectionsPage() {
  await requirePermission("collections");
  const docs = new Map((await listDocs(COLLECTION_TYPE)).map((doc) => [doc.key, doc]));
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-5 py-8 sm:px-8">
      <PageHead title="Collections" description="The structured data behind the site's lists, tables and cards. Change it once here and every page that shows it follows." />
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {COLLECTIONS.map((collection) => {
          const doc = docs.get(collection.key);
          const value = (doc?.draft ?? doc?.published ?? collection.defaults()) as unknown;
          const count = Array.isArray(value) ? value.length : null;
          return (
            <li key={collection.key}>
              <ConsoleLink
                href={`/collections/${collection.key}`}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-canvas p-5 transition-[border-color,box-shadow] hover:border-secondary-border/50 hover:shadow-[0_8px_24px_rgb(15_31_61/0.08)]"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-heading text-xl font-medium">{collection.label}</span>
                  {count !== null && <span className="font-heading text-2xl text-muted-foreground tabular-nums">{count}</span>}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">{collection.description}</span>
                <span className="mt-auto flex items-center justify-between pt-2">
                  <span className="flex gap-1.5">
                    {doc?.draft != null && <Badge tone="amber">Draft</Badge>}
                    {doc?.published != null ? <Badge tone="green">Edited in console</Badge> : <Badge tone="neutral">As built</Badge>}
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </ConsoleLink>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
