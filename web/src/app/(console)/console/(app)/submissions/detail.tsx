"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileText, Mail, Phone, Trash2 } from "lucide-react";
import { Dialog } from "@/components/console/dialog";
import { Badge, consoleButton, consoleInput, initials, Notice, timeAgo } from "@/components/console/ui";
import { cn } from "@/lib/utils";
import { addNote, assign, deleteSubmission, setStatus } from "./actions";

interface Detail {
  id: number;
  reference: string;
  formName: string;
  status: "new" | "in_progress" | "closed";
  urgent: boolean;
  assignedTo: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  organization: string | null;
  answers: { key: string; label: string; value: string }[];
  files: { name: string; size: number; url?: string }[];
  site: string | null;
  emailed: boolean;
  createdAt: string;
}

const NEXT_STATUS = {
  new: { to: "in_progress", label: "Mark in progress" },
  in_progress: { to: "closed", label: "Close" },
  closed: { to: "in_progress", label: "Reopen" },
} as const;

const size = (bytes: number) => (bytes > 1_000_000 ? `${(bytes / 1_048_576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

export function SubmissionDetail({
  submission: s,
  notes,
  people,
  canEdit,
  canDelete,
  fileBase,
}: {
  submission: Detail;
  notes: { id: number; body: string; at: string; by: string }[];
  people: { id: string; label: string }[];
  canEdit: boolean;
  canDelete: boolean;
  fileBase: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const run = (task: () => Promise<{ ok: true } | { ok: false; error: string }>, after?: () => void) =>
    start(async () => {
      setError("");
      const result = await task();
      if (!result.ok) setError(result.error);
      else {
        after?.();
        router.refresh();
      }
    });

  const received = new Date(s.createdAt);
  const next = NEXT_STATUS[s.status];

  return (
    <article className="mx-auto flex max-w-4xl flex-col gap-5">
      {error && <Notice tone="error">{error}</Notice>}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="flex flex-wrap items-center gap-2">
            {s.urgent && <Badge tone="ember">URGENT</Badge>}
            <span className="font-mono text-sm text-muted-foreground">{s.reference}</span>
            <Badge tone={s.status === "new" ? "gold" : s.status === "closed" ? "neutral" : "blue"}>{s.status === "in_progress" ? "In progress" : s.status === "new" ? "New" : "Closed"}</Badge>
          </span>
          <h2 className="font-heading text-3xl font-medium text-balance">{s.formName}</h2>
          <span className="text-sm text-muted-foreground">
            Received {received.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })} ({timeAgo(received)})
            {s.site ? ` via ${s.site}` : ""} · {s.emailed ? "emailed to the mailbox" : "not emailed — read it here"}
          </span>
        </div>
        {canEdit && (
          <div className="flex flex-wrap gap-2">
            <label className="sr-only" htmlFor="assignee">
              Assigned to
            </label>
            <select id="assignee" value={s.assignedTo ?? ""} disabled={pending} onChange={(e) => run(() => assign(s.id, e.target.value || null))} className={cn(consoleInput, "h-10 w-auto rounded-full")}>
              <option value="">Unassigned</option>
              {people.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
            <button type="button" disabled={pending} onClick={() => run(() => setStatus(s.id, next.to))} className={consoleButton.navy}>
              {next.label}
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="flex flex-col gap-1 rounded-2xl border border-border bg-canvas p-4">
          <span className="text-xs text-muted-foreground">From</span>
          <span className="font-semibold">{s.name}</span>
          {s.organization && <span className="text-sm text-muted-foreground">{s.organization}</span>}
        </div>
        <div className="flex flex-col gap-1.5 rounded-2xl border border-border bg-canvas p-4 sm:col-span-2">
          <span className="text-xs text-muted-foreground">Contact</span>
          <span className="flex flex-wrap gap-x-5 gap-y-1">
            {s.email && (
              <a href={`mailto:${s.email}?subject=${encodeURIComponent(`Re: ${s.formName} [${s.reference}]`)}`} className="inline-flex items-center gap-1.5 font-medium text-primary-ink hover:underline">
                <Mail className="size-4" aria-hidden="true" /> {s.email}
              </a>
            )}
            {s.phone && (
              <a href={`tel:${s.phone}`} className="inline-flex items-center gap-1.5 font-medium text-primary-ink hover:underline">
                <Phone className="size-4" aria-hidden="true" /> {s.phone}
              </a>
            )}
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-canvas">
        {s.answers.length === 0 && <p className="px-5 py-4 text-sm text-muted-foreground">No other answers.</p>}
        <dl className="divide-y divide-border">
          {s.answers.map((answer) => (
            <div key={answer.key} className="flex flex-wrap gap-x-6 gap-y-1 px-5 py-3.5">
              <dt className="flex-[0_0_13rem] text-sm text-muted-foreground">{answer.label}</dt>
              <dd className="min-w-0 flex-[1_1_16rem] text-sm leading-relaxed break-words whitespace-pre-line">{answer.value}</dd>
            </div>
          ))}
        </dl>
        {s.files.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t border-border px-5 py-4">
            {s.files.map((file, index) =>
              file.url ? (
                <a key={index} href={`${fileBase}/${index}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm hover:bg-(--color-navy-100)">
                  <FileText className="size-4 text-secondary-text" aria-hidden="true" /> {file.name} <span className="text-muted-foreground">· {size(file.size)}</span>
                </a>
              ) : (
                <span key={index} className="inline-flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm text-muted-foreground" title="Kept only in the email">
                  <FileText className="size-4" aria-hidden="true" /> {file.name} · in the email
                </span>
              ),
            )}
          </div>
        )}
      </div>

      <section aria-label="Internal notes" className="flex flex-col gap-3 rounded-2xl border border-border bg-canvas p-5">
        <h3 className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">Internal notes · never sent to the visitor</h3>
        {notes.map((n) => (
          <div key={n.id} className="flex gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--color-navy-100) text-[0.7rem] font-semibold text-secondary-text">{initials(n.by)}</span>
            <p className="text-left text-sm leading-relaxed">
              <strong className="font-semibold">{n.by}</strong> <span className="text-xs text-muted-foreground">{timeAgo(new Date(n.at))}</span>
              <span className="block whitespace-pre-line">{n.body}</span>
            </p>
          </div>
        ))}
        {canEdit && (
          <form
            className="flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              run(() => addNote(s.id, note), () => setNote(""));
            }}
          >
            <label className="sr-only" htmlFor="note">
              Add a note
            </label>
            <input id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note for the team…" className={consoleInput} />
            <button type="submit" disabled={pending || !note.trim()} className={consoleButton.primary}>
              Add
            </button>
          </form>
        )}
      </section>

      {canDelete && (
        <div>
          <button type="button" onClick={() => setConfirmDelete(true)} className={consoleButton.danger}>
            <Trash2 aria-hidden="true" /> Delete submission
          </button>
        </div>
      )}
      <Dialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete this submission?"
        description={`${s.reference} and its notes are removed from the console for good. The copy in the mailbox isn't affected.`}
        footer={
          <>
            <button type="button" onClick={() => setConfirmDelete(false)} className={consoleButton.secondary}>Cancel</button>
            <button type="button" onClick={() => { setConfirmDelete(false); run(() => deleteSubmission(s.id)); }} className={consoleButton.danger}>Delete</button>
          </>
        }
      >
        <p className="text-sm text-muted-foreground">To keep it but take it off the list, close it instead.</p>
      </Dialog>
    </article>
  );
}
