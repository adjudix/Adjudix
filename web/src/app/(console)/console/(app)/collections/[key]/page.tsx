import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requirePermission } from "@/lib/console/auth";
import { can } from "@/lib/console/permissions";
import { getCollectionDef } from "@/lib/content/collections";
import { COLLECTION_TYPE } from "@/lib/content/data";
import { listVersions, loadDoc } from "@/lib/content/drafts";
import { CollectionEditor } from "./editor";

export async function generateMetadata({ params }: { params: Promise<{ key: string }> }): Promise<Metadata> {
  return { title: getCollectionDef((await params).key)?.label ?? "Collection" };
}

export default async function CollectionPage({ params }: { params: Promise<{ key: string }> }) {
  const user = await requirePermission("collections");
  const { key } = await params;
  const def = getCollectionDef(key);
  if (!def) notFound();
  const [doc, versions] = await Promise.all([loadDoc(COLLECTION_TYPE, key, def.defaults()), listVersions(COLLECTION_TYPE, key)]);
  // Everything but the defaults, which are code and stay on the server.
  const definition: Omit<typeof def, "defaults"> & { defaults?: unknown } = { ...def };
  delete definition.defaults;

  return (
    <CollectionEditor
      key={`${doc.draftUpdatedAt?.getTime() ?? 0}-${doc.publishedAt?.getTime() ?? 0}`}
      def={definition}
      initial={doc.value}
      // Every collection is on the site from the start, as written in code.
      isLive
      hasDraft={doc.hasDraft}
      draftInfo={doc.draftUpdatedAt ? { at: doc.draftUpdatedAt.toISOString(), by: doc.draftUpdatedBy } : null}
      publishedInfo={doc.publishedAt ? { at: doc.publishedAt.toISOString(), by: doc.publishedBy } : null}
      versions={versions.map((v) => ({ id: v.id, at: v.publishedAt.toISOString(), by: v.publishedBy }))}
      permissions={{ edit: can(user, "collections", "edit"), structure: can(user, "collections", "structure"), publish: can(user, "collections", "publish") }}
    />
  );
}
