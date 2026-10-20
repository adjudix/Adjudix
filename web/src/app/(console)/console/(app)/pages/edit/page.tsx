import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requirePermission } from "@/lib/console/auth";
import { consoleHref } from "@/lib/console/paths";
import { can } from "@/lib/console/permissions";
import { listVersions, loadDoc } from "@/lib/content/drafts";
import { getPageDoc, normalizePath, PAGE_TYPE, seedPage } from "@/lib/pages";
import { CODE_PAGE_PATHS } from "@/lib/pages/code-pages";
import type { PageDoc } from "@/lib/blocks/types";
import { PageEditor } from "./editor";

export const metadata: Metadata = { title: "Edit page" };

export default async function EditPage({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  const user = await requirePermission("pages");
  const path = normalizePath((await searchParams).path ?? "");
  if (!path) notFound();
  const published = await getPageDoc(path);
  const seed = published ?? (await seedPage(path));
  const doc = await loadDoc<PageDoc | null>(PAGE_TYPE, path, seed);
  if (!doc.value) notFound();
  const versions = await listVersions(PAGE_TYPE, path);
  const builtIn = CODE_PAGE_PATHS.includes(path);

  return (
    <PageEditor
      key={`${path}-${doc.draftUpdatedAt?.getTime() ?? 0}-${doc.publishedAt?.getTime() ?? 0}`}
      path={path}
      initial={doc.value}
      builtIn={builtIn}
      // A page in code is on the site already; a console page once published.
      isLive={builtIn || doc.isPublished}
      edited={doc.isPublished}
      hasDraft={doc.hasDraft}
      draftInfo={doc.draftUpdatedAt ? { at: doc.draftUpdatedAt.toISOString(), by: doc.draftUpdatedBy } : null}
      publishedInfo={doc.publishedAt ? { at: doc.publishedAt.toISOString(), by: doc.publishedBy } : null}
      versions={versions.map((v) => ({ id: v.id, at: v.publishedAt.toISOString(), by: v.publishedBy }))}
      previewUrl={consoleHref(`/preview?path=${encodeURIComponent(path)}`)}
      permissions={{
        edit: can(user, "pages", "edit"),
        structure: can(user, "pages", "structure"),
        publish: can(user, "pages", "publish"),
        delete: can(user, "pages", "delete"),
        media: can(user, "media"),
      }}
    />
  );
}
