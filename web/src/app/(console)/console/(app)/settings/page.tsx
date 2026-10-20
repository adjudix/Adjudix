import type { Metadata } from "next";
import { requirePermission } from "@/lib/console/auth";
import { can } from "@/lib/console/permissions";
import { SETTINGS_TYPE } from "@/lib/content/data";
import { listVersions, loadDoc } from "@/lib/content/drafts";
import { DEFAULT_SETTINGS } from "@/lib/site-settings";
import { SettingsEditor } from "./editor";

export const metadata: Metadata = { title: "Site settings" };

export default async function SettingsPage() {
  const user = await requirePermission("settings");
  const [doc, versions] = await Promise.all([loadDoc(SETTINGS_TYPE, "site", DEFAULT_SETTINGS), listVersions(SETTINGS_TYPE, "site")]);
  return (
    <SettingsEditor
      key={`${doc.draftUpdatedAt?.getTime() ?? 0}-${doc.publishedAt?.getTime() ?? 0}`}
      // A setting added since the last publish shows with its default.
      initial={{ ...DEFAULT_SETTINGS, ...(doc.value as object) }}
      hasDraft={doc.hasDraft}
      draftInfo={doc.draftUpdatedAt ? { at: doc.draftUpdatedAt.toISOString(), by: doc.draftUpdatedBy } : null}
      publishedInfo={doc.publishedAt ? { at: doc.publishedAt.toISOString(), by: doc.publishedBy } : null}
      versions={versions.map((v) => ({ id: v.id, at: v.publishedAt.toISOString(), by: v.publishedBy }))}
      permissions={{ edit: can(user, "settings", "edit"), publish: can(user, "settings", "publish") }}
    />
  );
}
