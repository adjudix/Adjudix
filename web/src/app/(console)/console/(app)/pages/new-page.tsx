"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useConsoleHref } from "@/components/console/base";
import { Dialog } from "@/components/console/dialog";
import { consoleButton, consoleInput, Field, Notice } from "@/components/console/ui";
import { createPage } from "./actions";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9/]+/g, "-")
    .replace(/\/+/g, "/")
    .replace(/^-+|-+$/g, "");

export function NewPageButton({ pages, startOpen = false }: { pages: { path: string; title: string }[]; startOpen?: boolean }) {
  const router = useRouter();
  const toHref = useConsoleHref();
  const [open, setOpen] = useState(startOpen);
  const [title, setTitle] = useState("");
  const [path, setPath] = useState("");
  const [touched, setTouched] = useState(false);
  const [copyFrom, setCopyFrom] = useState("");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  const create = () =>
    start(async () => {
      setError("");
      const result = await createPage({ path: path || `/${slugify(title)}`, title, copyFrom: copyFrom || undefined });
      if (!result.ok) setError(result.error);
      else router.push(toHref(`/pages/edit?path=${encodeURIComponent(result.path)}`));
    });

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={consoleButton.primary}>
        <Plus aria-hidden="true" /> New page
      </button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="New page"
        description="It starts as a draft with a header and a paragraph. Nothing is on the site until you publish it."
        footer={
          <>
            <button type="button" onClick={() => setOpen(false)} className={consoleButton.secondary}>Cancel</button>
            <button type="button" disabled={pending || !title.trim()} onClick={create} className={consoleButton.primary}>
              Create and open
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          {error && <Notice tone="error">{error}</Notice>}
          <Field label="Title" htmlFor="page-title">
            <input
              id="page-title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!touched) setPath(`/${slugify(e.target.value)}`);
              }}
              placeholder="e.g. Annual ADR Conclave 2027"
              className={consoleInput}
            />
          </Field>
          <Field label="Address" htmlFor="page-path" hint="Where it lives on the site. Use a section first to sit under it, like /events/conclave-2027.">
            <input
              id="page-path"
              value={path}
              onChange={(e) => {
                setTouched(true);
                setPath(`/${slugify(e.target.value.replace(/^\/+/, ""))}`);
              }}
              className={`${consoleInput} font-mono`}
            />
          </Field>
          <Field label="Start from" htmlFor="page-copy">
            <select id="page-copy" value={copyFrom} onChange={(e) => setCopyFrom(e.target.value)} className={consoleInput}>
              <option value="">A blank page</option>
              {pages.map((page) => (
                <option key={page.path} value={page.path}>
                  A copy of “{page.title}” ({page.path})
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Dialog>
    </>
  );
}
