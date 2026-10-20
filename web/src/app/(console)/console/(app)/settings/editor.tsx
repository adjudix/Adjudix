"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Redo2, Undo2 } from "lucide-react";
import { useMediaPicker } from "@/components/console/media-picker";
import { PublishBar, type VersionRow } from "@/components/console/publish-bar";
import { SchemaFields } from "@/components/console/schema-editor";
import { Notice } from "@/components/console/ui";
import { useHistory, useUndoShortcuts } from "@/components/console/use-history";
import type { FieldSpec } from "@/lib/content/schema";
import { SETTINGS_FIELDS } from "@/lib/site-settings";
import { cn } from "@/lib/utils";
import { discardSettingsDraft, publishSettings, restoreSettingsVersion, saveSettingsDraft } from "./actions";

// Groups of settings, each a panel with its own jump link.
const GROUPS: { id: string; title: string; keys: string[] }[] = [
  { id: "notices", title: "Announcement and pop-up", keys: ["announcement", "consultation", "introReel"] },
  { id: "menus", title: "Menus", keys: ["navGroups", "secondaryLinks"] },
  { id: "footer", title: "Footer", keys: ["footerGroups", "copyright"] },
  { id: "contact", title: "Contact and languages", keys: ["mailboxes", "languages"] },
];

export function SettingsEditor({
  initial,
  hasDraft,
  draftInfo,
  publishedInfo,
  versions,
  permissions,
}: {
  initial: object;
  hasDraft: boolean;
  draftInfo: { at: string; by: string | null } | null;
  publishedInfo: { at: string; by: string | null } | null;
  versions: VersionRow[];
  permissions: { edit: boolean; publish: boolean };
}) {
  const router = useRouter();
  const history = useHistory<Record<string, unknown>>(initial as Record<string, unknown>);
  const value = history.value;
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [pending, start] = useTransition();
  const media = useMediaPicker();
  const readOnly = !permissions.edit;
  useUndoShortcuts(history.undo, history.redo, !readOnly);
  const dirty = JSON.stringify(value) !== saved;

  const run = (task: () => Promise<{ ok: true } | { ok: false; error: string }>, success: string) => {
    setMessage(null);
    start(async () => {
      const result = await task();
      if (!result.ok) setMessage({ tone: "error", text: result.error });
      else {
        setSaved(JSON.stringify(value));
        setMessage({ tone: "success", text: success });
        router.refresh();
      }
    });
  };

  const fieldsFor = (keys: string[]) => keys.map((key) => SETTINGS_FIELDS.find((f) => f.key === key)).filter(Boolean) as FieldSpec[];

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PublishBar
        crumbs={[]}
        title="Site settings"
        isLive
        hasDraft={hasDraft}
        dirty={dirty}
        pending={pending}
        canEdit={permissions.edit}
        canPublish={permissions.publish}
        draftInfo={draftInfo}
        publishedInfo={publishedInfo}
        versions={versions}
        message={message}
        extra={
          !readOnly && (
            <span className="flex items-center rounded-full border border-border">
              <button type="button" onClick={history.undo} disabled={!history.canUndo} aria-label="Undo" title="Undo (Ctrl+Z)" className="inline-flex size-9 items-center justify-center rounded-l-full text-secondary-text hover:bg-surface disabled:opacity-35">
                <Undo2 className="size-4" aria-hidden="true" />
              </button>
              <span className="h-5 w-px bg-border" aria-hidden="true" />
              <button type="button" onClick={history.redo} disabled={!history.canRedo} aria-label="Redo" title="Redo (Ctrl+Shift+Z)" className="inline-flex size-9 items-center justify-center rounded-r-full text-secondary-text hover:bg-surface disabled:opacity-35">
                <Redo2 className="size-4" aria-hidden="true" />
              </button>
            </span>
          )
        }
        onSave={() => run(() => saveSettingsDraft(value), "Draft saved.")}
        onPublish={() => run(() => publishSettings(dirty ? value : undefined), "Published. Every page uses the new settings now.")}
        onDiscard={() => (hasDraft ? run(() => discardSettingsDraft(), "Draft discarded.") : history.set(JSON.parse(saved)))}
        onRestore={(id) => run(() => restoreSettingsVersion(id), "That version is now the draft. Check it, then publish.")}
      />
      <div className="flex flex-wrap items-start gap-6 p-5 sm:p-7">
        <nav aria-label="Settings sections" className="flex min-w-0 flex-[1_1_12rem] flex-col gap-1 lg:sticky lg:top-24 lg:max-w-56">
          {GROUPS.map((group) => (
            <a key={group.id} href={`#${group.id}`} className={cn("rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-canvas hover:text-foreground")}>
              {group.title}
            </a>
          ))}
        </nav>
        <div className="flex min-w-0 flex-[4_1_36rem] flex-col gap-6">
          {readOnly && <Notice>Your role can view the settings but not change them.</Notice>}
          {GROUPS.map((group) => (
            <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="scroll-mt-24 rounded-2xl border border-border bg-canvas p-5 sm:p-6">
              <h2 id={`${group.id}-title`} className="mb-5 font-heading text-2xl font-medium">
                {group.title}
              </h2>
              <SchemaFields fields={fieldsFor(group.keys)} value={value} onChange={(next, g) => history.set(next, g)} idPrefix={group.id} media={media.picker} disabled={readOnly} />
            </section>
          ))}
        </div>
      </div>
      {media.dialog}
    </div>
  );
}
