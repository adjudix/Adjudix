import type { Metadata } from "next";
import { MediaLibrary } from "@/components/console/media-library";
import { PageHead } from "@/components/console/ui";
import { requirePermission } from "@/lib/console/auth";
import { can } from "@/lib/console/permissions";

export const metadata: Metadata = { title: "Media" };

export default async function MediaPage() {
  const user = await requirePermission("media");
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-5 py-8 sm:px-8">
      <PageHead title="Media" description="Images, PDFs and videos for the site. Upload here, then choose them in any page block or collection, or copy their address." />
      <MediaLibrary canEdit={can(user, "media", "edit")} canDelete={can(user, "media", "delete")} />
    </main>
  );
}
