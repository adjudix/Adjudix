"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useConsoleHref } from "@/components/console/base";
import { Dialog } from "@/components/console/dialog";
import { consoleButton, consoleInput, Field, Notice } from "@/components/console/ui";
import { createForm } from "./actions";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

export function NewFormButton({ forms }: { forms: { slug: string; title: string }[] }) {
  const router = useRouter();
  const toHref = useConsoleHref();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [copyFrom, setCopyFrom] = useState("");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  const create = () =>
    start(async () => {
      setError("");
      const result = await createForm({ slug: slug || slugify(title), title, copyFrom: copyFrom || undefined });
      if (!result.ok) setError(result.error);
      else router.push(toHref(`/forms/${result.slug}`));
    });

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={consoleButton.primary}>
        <Plus aria-hidden="true" /> New form
      </button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="New form"
        description="It starts as a draft. Nothing appears on the site until you publish it."
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
          <Field label="Title" htmlFor="form-title" hint="The heading visitors see, and the name in the Secretariat's email.">
            <input
              id="form-title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (!slugTouched) setSlug(slugify(event.target.value));
              }}
              placeholder="e.g. Register for the annual conference"
              className={consoleInput}
            />
          </Field>
          <Field label="Address" htmlFor="form-slug" hint={`Opens at /apply/${slug || "…"}. Link to it from any page.`}>
            <input
              id="form-slug"
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(slugify(event.target.value));
              }}
              className={`${consoleInput} font-mono`}
            />
          </Field>
          <Field label="Start from" htmlFor="form-copy">
            <select id="form-copy" value={copyFrom} onChange={(event) => setCopyFrom(event.target.value)} className={consoleInput}>
              <option value="">A blank form</option>
              {forms.map((form) => (
                <option key={form.slug} value={form.slug}>
                  A copy of “{form.title}”
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Dialog>
    </>
  );
}
