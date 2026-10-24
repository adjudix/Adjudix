"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { Check, Copy, FileText, Film, Trash2, Upload } from "lucide-react";
import { useConsoleHref } from "@/components/console/base";
import { useConfirm } from "@/components/console/confirm";
import { consoleButton, consoleInput, Notice, timeAgo } from "@/components/console/ui";
import { cn } from "@/lib/utils";
import { deleteMedia, listMedia, updateAlt, type MediaRow } from "@/app/(console)/console/(app)/media/actions";

const size = (bytes: number) => (bytes > 1_000_000 ? `${(bytes / 1_048_576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

/**
 * The media library: drop files to upload, then copy an address or pick a
 * file. Used as its own page and inside the picker dialog.
 */
export function MediaLibrary({
  accept = "any",
  onPick,
  canEdit = true,
  canDelete = false,
}: {
  accept?: "image" | "any";
  onPick?: (row: MediaRow) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}) {
  const toHref = useConsoleHref();
  const [rows, setRows] = useState<MediaRow[] | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [over, setOver] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [, start] = useTransition();
  const confirm = useConfirm();
  const input = useRef<HTMLInputElement>(null);

  const refresh = useCallback(() => {
    listMedia()
      .then(setRows)
      .catch(() => setError("Couldn't load the media library."));
  }, []);
  useEffect(refresh, [refresh]);

  async function upload(files: FileList | File[]) {
    if (!files.length) return;
    setError("");
    setUploading(true);
    const data = new FormData();
    for (const file of files) data.append("file", file);
    try {
      const response = await fetch(toHref("/media-upload"), { method: "POST", body: data });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) setError(body.error ?? "Upload failed.");
      else {
        refresh();
        if (body.files?.[0]) setSelected(body.files[0].id);
      }
    } finally {
      setUploading(false);
    }
  }

  const shown = (rows ?? []).filter((row) => accept === "any" || row.contentType.startsWith("image/"));
  const current = shown.find((row) => row.id === selected);

  return (
    <div className="flex flex-col gap-4">
      {error && <Notice tone="error">{error}</Notice>}
      {canEdit && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            upload(e.dataTransfer.files);
          }}
          className={cn(
            "flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors",
            over ? "border-primary bg-(--color-gold-100)/60" : "border-(--color-ink-300) bg-surface",
          )}
        >
          <Upload className="size-6 text-secondary-text" aria-hidden="true" />
          <p className="text-sm font-medium">{uploading ? "Uploading…" : "Drop images or PDFs here"}</p>
          <p className="text-xs text-muted-foreground">PNG, JPG, WebP, GIF, PDF or MP4, up to 15 MB each</p>
          <button type="button" onClick={() => input.current?.click()} disabled={uploading} className={cn(consoleButton.secondary, "mt-1")}>
            Choose files
          </button>
          <input
            ref={input}
            type="file"
            multiple
            hidden
            accept={accept === "image" ? "image/*" : "image/*,application/pdf,video/mp4"}
            onChange={(e) => {
              if (e.target.files) upload(e.target.files);
              e.target.value = "";
            }}
          />
        </div>
      )}

      {rows === null ? (
        <p className="py-8 text-center text-sm text-muted-foreground">Loading…</p>
      ) : shown.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">Nothing uploaded yet.</p>
      ) : (
        <div className="flex flex-wrap items-start gap-4">
          <ul className="grid min-w-0 flex-[2_1_24rem] grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))] gap-3">
            {shown.map((row) => (
              <li key={row.id}>
                <button
                  type="button"
                  onClick={() => setSelected(row.id)}
                  onDoubleClick={() => onPick?.(row)}
                  aria-pressed={selected === row.id}
                  className={cn(
                    "group flex w-full flex-col overflow-hidden rounded-xl border bg-canvas text-left transition-shadow",
                    selected === row.id ? "border-primary ring-2 ring-primary/40" : "border-border hover:shadow-[0_6px_18px_rgb(15_31_61/0.1)]",
                  )}
                >
                  <span className="flex aspect-[4/3] items-center justify-center bg-surface">
                    {row.contentType.startsWith("image/") ? (
                      // eslint-disable-next-line @next/next/no-img-element -- previews of uploaded files
                      <img src={row.url} alt={row.alt} className="size-full object-cover" loading="lazy" />
                    ) : row.contentType.startsWith("video/") ? (
                      <Film className="size-8 text-muted-foreground" aria-hidden="true" />
                    ) : (
                      <FileText className="size-8 text-muted-foreground" aria-hidden="true" />
                    )}
                  </span>
                  <span className="truncate px-2.5 pt-2 text-xs font-medium">{row.filename}</span>
                  <span className="px-2.5 pb-2 text-[0.7rem] text-muted-foreground">{size(row.size)}</span>
                </button>
              </li>
            ))}
          </ul>
          {current && (
            <aside className="flex min-w-0 flex-[1_1_16rem] flex-col gap-3 rounded-2xl border border-border bg-canvas p-4 lg:sticky lg:top-24">
              <p className="truncate text-sm font-semibold">{current.filename}</p>
              <p className="text-xs text-muted-foreground">
                {size(current.size)} · uploaded {timeAgo(new Date(current.createdAt))}
                {current.uploadedBy ? ` by ${current.uploadedBy}` : ""}
              </p>
              <div className="flex gap-2">
                <input readOnly value={current.url} aria-label="Address" className={cn(consoleInput, "h-9 font-mono text-[0.7rem]")} onFocus={(e) => e.target.select()} />
                <button
                  type="button"
                  aria-label="Copy address"
                  onClick={() => {
                    navigator.clipboard?.writeText(current.url);
                    setCopied(current.id);
                  }}
                  className={consoleButton.icon}
                >
                  {copied === current.id ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                </button>
              </div>
              {current.contentType.startsWith("image/") && (
                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Description for screen readers
                  <textarea
                    key={current.id}
                    defaultValue={current.alt}
                    disabled={!canEdit}
                    rows={2}
                    onBlur={(e) => start(async () => void (await updateAlt(current.id, e.target.value)))}
                    placeholder="What the image shows"
                    className={cn(consoleInput, "h-auto py-2 font-normal")}
                  />
                </label>
              )}
              {onPick && (
                <button type="button" onClick={() => onPick(current)} className={consoleButton.primary}>
                  Use this file
                </button>
              )}
              {canDelete && (
                <button
                  type="button"
                  onClick={async () => {
                    if (!(await confirm({ title: `Delete ${current.filename}?`, body: "The file is deleted for good. Any page or collection still using its address will show a broken image or link.", action: "Delete file" }))) return;
                    start(async () => {
                      const result = await deleteMedia(current.id);
                      if (!result.ok) setError(result.error);
                      else {
                        setSelected(null);
                        refresh();
                      }
                    });
                  }}
                  className={consoleButton.danger}
                >
                  <Trash2 aria-hidden="true" /> Delete
                </button>
              )}
              {canDelete && <p className="text-xs text-muted-foreground">Pages that still use this address will show a broken image.</p>}
            </aside>
          )}
        </div>
      )}
    </div>
  );
}
