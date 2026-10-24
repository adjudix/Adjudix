"use client";

import { useEffect, useState, type ReactNode } from "react";
import { History, RotateCcw } from "lucide-react";
import { ConsoleLink } from "@/components/console/base";
import { useConfirm } from "@/components/console/confirm";
import { Dialog } from "@/components/console/dialog";
import { Badge, consoleButton, Notice, timeAgo } from "@/components/console/ui";

export interface VersionRow {
  id: number;
  at: string;
  by: string | null;
}

/**
 * The top of every editor: where you are, whether the site shows this yet,
 * and Save draft / Publish. Warns before leaving with unsaved changes.
 */
export function PublishBar({
  crumbs,
  title,
  isLive,
  hasDraft,
  dirty,
  pending,
  canEdit,
  canPublish,
  draftInfo,
  publishedInfo,
  versions,
  extra,
  message,
  onSave,
  onPublish,
  onDiscard,
  onRestore,
}: {
  crumbs: { label: string; href: string }[];
  title: string;
  isLive: boolean;
  hasDraft: boolean;
  dirty: boolean;
  pending: boolean;
  canEdit: boolean;
  canPublish: boolean;
  draftInfo: { at: string; by: string | null } | null;
  publishedInfo: { at: string; by: string | null } | null;
  versions: VersionRow[];
  extra?: ReactNode;
  message?: { tone: "error" | "success"; text: string } | null;
  onSave: () => void;
  onPublish: () => void;
  onDiscard: () => void;
  onRestore: (id: number) => void;
}) {
  const [history, setHistory] = useState(false);
  const confirm = useConfirm();

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const status = dirty ? (
    <Badge tone="amber">Unsaved changes</Badge>
  ) : hasDraft ? (
    <Badge tone="amber">Draft not published</Badge>
  ) : isLive ? (
    <Badge tone="green">Live</Badge>
  ) : (
    <Badge tone="neutral">Not published</Badge>
  );

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-canvas/95 backdrop-blur supports-backdrop-filter:bg-canvas/85 max-lg:top-16">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-5 py-3 sm:px-7">
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
          {crumbs.map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-2">
              <ConsoleLink href={crumb.href} className="hover:text-foreground">
                {crumb.label}
              </ConsoleLink>
              <span aria-hidden="true" className="text-(--color-ink-300)">/</span>
            </span>
          ))}
        </nav>
        <h1 className="min-w-0 truncate font-heading text-xl font-medium text-foreground">{title}</h1>
        {status}
        <span className="flex-1" />
        <span className="hidden text-xs text-muted-foreground xl:inline">
          {draftInfo && hasDraft
            ? `Draft saved ${timeAgo(new Date(draftInfo.at))}${draftInfo.by ? ` by ${draftInfo.by}` : ""}`
            : publishedInfo
              ? `Published ${timeAgo(new Date(publishedInfo.at))}${publishedInfo.by ? ` by ${publishedInfo.by}` : ""}`
              : ""}
        </span>
        {extra}
        <button type="button" onClick={() => setHistory(true)} className={consoleButton.secondary} disabled={!versions.length} title={versions.length ? undefined : "Nothing published from the console yet"}>
          <History aria-hidden="true" /> History
        </button>
        {canEdit && (hasDraft || dirty) && (
          <button
            type="button"
            onClick={async () => {
              if (await confirm({ title: "Discard your changes?", body: "Everything since the last publish is thrown away, and the editor goes back to what is live.", action: "Discard changes" })) onDiscard();
            }}
            disabled={pending}
            className={consoleButton.ghost}
          >
            Discard
          </button>
        )}
        {canEdit && (
          <button type="button" onClick={onSave} disabled={pending || !dirty} className={consoleButton.secondary}>
            Save draft
          </button>
        )}
        {canPublish && (
          <button type="button" onClick={onPublish} disabled={pending || (!dirty && !hasDraft)} className={consoleButton.primary}>
            {pending ? "Working…" : "Publish"}
          </button>
        )}
      </div>
      {message && (
        <div className="px-5 pb-3 sm:px-7">
          <Notice tone={message.tone}>{message.text}</Notice>
        </div>
      )}
      <Dialog open={history} onOpenChange={setHistory} title="Published versions" description="Restoring copies a version into the draft, so you can check it before publishing again.">
        <ul className="divide-y divide-border">
          {versions.map((version, index) => (
            <li key={version.id} className="flex items-center gap-3 py-3">
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-medium">
                  {new Date(version.at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                  {index === 0 && <span className="ml-2"><Badge tone="green">Live</Badge></span>}
                </span>
                <span className="text-xs text-muted-foreground">{version.by ?? "Unknown"}</span>
              </span>
              {canEdit && index > 0 && (
                <button
                  type="button"
                  onClick={async () => {
                    setHistory(false);
                    if (await confirm({ title: "Restore this version?", body: "It replaces your current draft. What is live doesn't change until you publish.", action: "Restore version" })) onRestore(version.id);
                  }}
                  className={consoleButton.secondary}
                >
                  <RotateCcw aria-hidden="true" /> Restore
                </button>
              )}
            </li>
          ))}
        </ul>
      </Dialog>
    </header>
  );
}
