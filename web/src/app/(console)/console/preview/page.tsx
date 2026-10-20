import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/render";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { requirePermission } from "@/lib/console/auth";
import { getSiteSettings } from "@/lib/content/data";
import { currentPage, normalizePath } from "@/lib/pages";

export const metadata: Metadata = { title: "Preview" };

// The page editor's preview: the page's latest draft, inside the real site
// header and footer. Shown in the editor's frame; never indexed or linked.
export default async function PreviewPage({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  await requirePermission("pages");
  const path = normalizePath((await searchParams).path ?? "");
  const doc = path ? await currentPage(path) : null;
  if (!path || !doc) notFound();
  const settings = await getSiteSettings();
  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <AnnouncementBar announcement={settings.announcement} />
      <SiteHeader searchItems={[]} navGroups={settings.navGroups} secondaryLinks={settings.secondaryLinks} languages={settings.languages} />
      <div className="flex flex-1 flex-col">
        <Blocks blocks={doc.blocks} context={{ path, routeProps: {} }} />
      </div>
      <SiteFooter groups={settings.footerGroups} copyright={settings.copyright} />
    </div>
  );
}
