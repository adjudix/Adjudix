"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Lock, Monitor, Plus, Redo2, Smartphone, Undo2 } from "lucide-react";
import { QueryForm, type QueryField } from "@/components/patterns/query-form";
import { ClosedForm } from "@/components/patterns/apply-form";
import { ConsoleLink } from "@/components/console/base";
import { PublishBar, type VersionRow } from "@/components/console/publish-bar";
import { useHistory, useUndoShortcuts } from "@/components/console/use-history";
import { Switch } from "@/components/console/switch";
import { consoleButton, Notice } from "@/components/console/ui";
import { BUILT_IN_LABELS, FIELD_KINDS, kindOf, KIND_LABEL, layoutOf, renameField, uniqueName } from "@/lib/forms/builder-model";
import type { FormConfig } from "@/lib/forms/config";
import { cn } from "@/lib/utils";
import { discardFormDraft, publishForm, restoreFormVersion, saveFormDraft } from "../actions";
import { FieldBoard } from "./field-board";
import { Inspector } from "./inspector";
import { FormSettings } from "./settings";

const KEY_PATTERN = /^[a-zA-Z][a-zA-Z0-9_-]{0,47}$/;
const readOnlyFlag = (permissions: { edit: boolean }) => !permissions.edit;

export function FormBuilder({
  slug,
  initial,
  live,
  hasDraft,
  draftInfo,
  publishedInfo,
  versions,
  submissions,
  publicPath,
  builtIn,
  permissions,
}: {
  slug: string;
  initial: FormConfig;
  live: FormConfig | null;
  hasDraft: boolean;
  draftInfo: { at: string; by: string | null } | null;
  publishedInfo: { at: string; by: string | null } | null;
  versions: VersionRow[];
  submissions: number;
  publicPath: string;
  builtIn: boolean;
  permissions: { edit: boolean; structure: boolean; publish: boolean; submissions: boolean };
}) {
  const router = useRouter();
  const history = useHistory<FormConfig>(initial);
  const form = history.value;
  const setForm = history.set;
  useUndoShortcuts(history.undo, history.redo, !readOnlyFlag(permissions));
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [tab, setTab] = useState<"fields" | "settings">("fields");
  const [selected, setSelected] = useState<string | null>(initial.fields[0]?.name ?? null);
  const [device, setDevice] = useState<"desktop" | "phone">("desktop");
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [keyDraft, setKeyDraft] = useState<{ from: string; to: string } | null>(null);
  const [pending, start] = useTransition();

  const readOnly = readOnlyFlag(permissions);
  const canStructure = permissions.structure && !readOnly;
  const dirty = JSON.stringify(form) !== saved;
  const layout = useMemo(() => layoutOf(form), [form]);
  // Blank choices being typed in aren't real options yet.
  const previewFields = useMemo(
    () => form.fields.map((field) => (field.options ? { ...field, options: [...new Set(field.options.filter((o) => o.trim()))] } : field)),
    [form.fields],
  );
  const sectionOf = (name: string) => layout.findIndex((section) => section.fields.includes(name));
  const customField = form.fields.find((field) => field.name === selected) ?? null;
  const builtInSelected = selected && BUILT_IN_LABELS[selected] && !customField ? selected : null;

  const patch = (next: Partial<FormConfig>) => setForm((current) => ({ ...current, ...next }), `form:${Object.keys(next).join()}`);
  const setLayout = (sections: FormConfig["sections"]) => patch({ sections });

  function run(task: () => Promise<{ ok: true } | { ok: false; error: string }>, success: string) {
    setMessage(null);
    start(async () => {
      const result = await task();
      if (!result.ok) setMessage({ tone: "error", text: result.error });
      else {
        setSaved(JSON.stringify(form));
        setMessage({ tone: "success", text: success });
        router.refresh();
      }
    });
  }

  function addField(kindId: string) {
    const kind = FIELD_KINDS.find((k) => k.id === kindId)!;
    const name = uniqueName(form, kind.make("x").label);
    const field = kind.make(name);
    const target = selected && sectionOf(selected) >= 0 ? sectionOf(selected) : layout.length - 1;
    const sections = layout.map((section, index) => {
      if (index !== target) return section;
      const at = selected ? section.fields.indexOf(selected) + 1 : section.fields.length;
      return { ...section, fields: [...section.fields.slice(0, at || section.fields.length), name, ...section.fields.slice(at || section.fields.length)] };
    });
    setForm({ ...form, fields: [...form.fields, field], sections });
    setSelected(name);
  }

  function updateField(next: QueryField) {
    setForm({ ...form, fields: form.fields.map((field) => (field.name === selected ? next : field)) }, `field:${selected}`);
  }

  /** A field type dropped from the palette at a precise spot. */
  function insertField(kindId: string, sectionIndex: number, index: number) {
    const kind = FIELD_KINDS.find((k) => k.id === kindId);
    if (!kind) return;
    const name = uniqueName(form, kind.make("x").label);
    const sections = layout.map((section, i) =>
      i === sectionIndex ? { ...section, fields: [...section.fields.slice(0, index), name, ...section.fields.slice(index)] } : section,
    );
    setForm({ ...form, fields: [...form.fields, kind.make(name)], sections });
    setSelected(name);
  }

  function deleteField(name: string) {
    setForm({
      ...form,
      fields: form.fields.filter((field) => field.name !== name),
      sections: layout.map((section) => ({ ...section, fields: section.fields.filter((n) => n !== name) })),
    });
    setSelected(null);
  }

  function rename(to: string) {
    if (!selected) return;
    const from = keyDraft?.from ?? selected;
    setKeyDraft({ from, to });
    const clash = to !== selected && (Boolean(BUILT_IN_LABELS[to]) || form.fields.some((f) => f.name === to || f.group?.some((g) => g.name === to)));
    if (KEY_PATTERN.test(to) && !clash) {
      setForm(renameField({ ...form, sections: layout }, selected, to));
      setSelected(to);
      setKeyDraft(null);
    }
  }

  const keyError = keyDraft
    ? !KEY_PATTERN.test(keyDraft.to)
      ? "Letters, numbers, - or _, starting with a letter."
      : "Another field already uses this key."
    : undefined;

  function moveTo(name: string, target: number) {
    setLayout(
      layout.map((section, index) => ({
        ...section,
        fields: index === target ? [...section.fields.filter((n) => n !== name), name] : section.fields.filter((n) => n !== name),
      })),
    );
  }

  const label = (name: string) => form.fields.find((f) => f.name === name)?.label ?? (name === "message" ? form.messageLabel || "Message" : name === "attachments" ? form.attachmentsLabel || "Documents" : BUILT_IN_LABELS[name]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PublishBar
        crumbs={[{ label: "Forms", href: "/forms" }]}
        title={form.title || "Untitled form"}
        isLive={Boolean(live)}
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
          <>
          {!readOnly && (
            <span className="flex items-center rounded-full border border-border">
              <button type="button" onClick={history.undo} disabled={!history.canUndo} aria-label="Undo" title="Undo (Ctrl+Z)" className="inline-flex size-9 items-center justify-center rounded-l-full text-secondary-text hover:bg-surface disabled:opacity-35">
                <Undo2 className="size-4" aria-hidden="true" />
              </button>
              <span className="h-5 w-px bg-border" aria-hidden="true" />
              <button type="button" onClick={history.redo} disabled={!history.canRedo} aria-label="Redo" title="Redo (Ctrl+Shift+Z)" className="inline-flex size-9 items-center justify-center rounded-r-full text-secondary-text hover:bg-surface disabled:opacity-35">
                <Redo2 className="size-4" aria-hidden="true" />
              </button>
            </span>
          )}
          <Switch
            className="rounded-full border border-border px-3 py-1.5"
            label={form.enabled ? "Taking entries" : "Closed"}
            checked={form.enabled}
            disabled={readOnly}
            onChange={(enabled) => patch({ enabled })}
          />
          </>
        }
        onSave={() => run(() => saveFormDraft(slug, form), "Draft saved. Publish when you're ready for visitors to see it.")}
        onPublish={() => run(() => publishForm(slug, dirty ? form : undefined), "Published. The site shows the new version now.")}
        onDiscard={() => {
          if (!hasDraft) {
            setForm(JSON.parse(saved) as FormConfig);
            return;
          }
          run(() => discardFormDraft(slug), "Draft discarded.");
        }}
        onRestore={(id) => run(() => restoreFormVersion(slug, id), "That version is now the draft. Check it, then publish.")}
      />

      <nav aria-label="Form editor" className="flex gap-1 overflow-x-auto border-b border-border bg-canvas px-5 sm:px-7">
        {(
          [
            ["fields", `Fields · ${form.fields.length}`],
            ["settings", "Form settings"],
          ] as const
        ).map(([id, text]) => (
          <button
            key={id}
            type="button"
            aria-current={tab === id || undefined}
            onClick={() => setTab(id)}
            className={cn("border-b-2 px-3.5 py-3 text-sm whitespace-nowrap", tab === id ? "border-primary font-semibold text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}
          >
            {text}
          </button>
        ))}
        <span className="flex-1" />
        {permissions.submissions && (
          <ConsoleLink href={`/submissions?form=${slug}`} className="px-3.5 py-3 text-sm whitespace-nowrap text-muted-foreground hover:text-foreground">
            Submissions · {submissions}
          </ConsoleLink>
        )}
        {live && (
          <a href={publicPath} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-3 text-sm whitespace-nowrap text-muted-foreground hover:text-foreground">
            Open on site <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </nav>

      {readOnly && (
        <div className="px-5 pt-5 sm:px-7">
          <Notice>Your role can view this form but not change it.</Notice>
        </div>
      )}

      {tab === "settings" ? (
        <div className="p-5 sm:p-7">
          <FormSettings form={form} onForm={patch} readOnly={readOnly} canStructure={canStructure} />
        </div>
      ) : (
        <div className="flex flex-wrap items-start gap-5 p-5 sm:p-7">
          <section aria-label="Fields" className="flex min-w-0 flex-[1_1_19rem] flex-col gap-4">
            <FieldBoard
              layout={layout}
              kinds={FIELD_KINDS}
              selected={selected}
              canStructure={canStructure}
              readOnly={readOnly}
              onSelect={setSelected}
              onLayout={(sections) => setLayout(sections)}
              onInsert={insertField}
              onAddKind={addField}
              item={(name) => {
                const field = form.fields.find((f) => f.name === name);
                return {
                  name,
                  title: label(name),
                  locked: !field,
                  required: Boolean(
                    field
                      ? field.required
                      : name === "name" || (name === "organization" && form.organization === "required") || (name === "email" && form.contact === "email") || (name === "message" && form.messageRequired),
                  ),
                  meta: (
                    <>
                      {!field && <Lock className="size-3" aria-hidden="true" />}
                      {field ? KIND_LABEL[kindOf(field)] : "Built in"}
                      {field?.showWhen && " · conditional"}
                      {field?.type === "select" && field.options && ` · ${field.options.length} choices`}
                    </>
                  ),
                };
              }}
              extraActions={
                <>
                  {form.noMessage && (
                    <button type="button" onClick={() => patch({ noMessage: undefined })} className={cn(consoleButton.ghost, "text-primary-ink")}>
                      <Plus aria-hidden="true" /> Message box
                    </button>
                  )}
                  {!form.attachmentsLabel && (
                    <button type="button" onClick={() => patch({ attachmentsLabel: "Supporting documents" })} className={cn(consoleButton.ghost, "text-primary-ink")}>
                      <Plus aria-hidden="true" /> Document upload
                    </button>
                  )}
                </>
              }
            />
          </section>

          <section aria-label="Field settings" className="min-w-0 flex-[1_1_19rem]">
            <Inspector
              form={form}
              field={customField}
              builtIn={builtInSelected}
              sectionTitles={layout.map((s) => s.title)}
              sectionIndex={selected ? sectionOf(selected) : 0}
              canStructure={canStructure}
              readOnly={readOnly}
              keyError={keyError}
              onChange={updateField}
              onRename={rename}
              onForm={patch}
              onMove={(target) => selected && moveTo(selected, target)}
              onDelete={() => selected && deleteField(selected)}
            />
          </section>

          <section aria-label="Live preview" className="flex min-w-0 flex-[1.3_1_24rem] flex-col gap-2.5 xl:sticky xl:top-20">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">Live preview</h2>
              <div className="flex gap-1 rounded-full bg-(--color-navy-100) p-0.5" role="radiogroup" aria-label="Preview width">
                {(
                  [
                    ["desktop", Monitor, "Desktop"],
                    ["phone", Smartphone, "Phone"],
                  ] as const
                ).map(([id, Icon, text]) => (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={device === id}
                    onClick={() => setDevice(id)}
                    className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium", device === id ? "bg-canvas shadow-sm" : "text-muted-foreground")}
                  >
                    <Icon className="size-3.5" aria-hidden="true" /> {text}
                  </button>
                ))}
              </div>
            </div>
            <div className={cn("mx-auto w-full overflow-hidden rounded-[1.1rem] bg-canvas shadow-[0_12px_32px_rgb(15_31_61/0.12)] ring-1 ring-border", device === "phone" && "max-w-[24rem]")}>
              <div className="border-b border-border px-6 pt-6 pb-4">
                <h3 className="font-heading text-2xl font-semibold">{form.title || "Untitled form"}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{form.intro}</p>
              </div>
              <div className={cn("scrollbar-refined max-h-[70dvh] overflow-y-auto px-6 py-6", device === "phone" && "preview-phone")}>
                {form.enabled ? (
                  <QueryForm
                    key={JSON.stringify(form)}
                    preview
                    formName={form.title}
                    formKey={slug}
                    fields={previewFields}
                    kind={form.kind}
                    sections={layout}
                    tone={form.tone}
                    submitLabel={form.submitLabel}
                    successTitle={form.successTitle}
                    successBody={form.successBody}
                    organization={form.organization}
                    organizationLabel={form.organizationLabel}
                    contact={form.contact}
                    messageLabel={form.messageLabel}
                    messageRequired={form.messageRequired}
                    noMessage={form.noMessage}
                    attachmentsLabel={form.attachmentsLabel}
                  />
                ) : (
                  <ClosedForm form={form} />
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Fill it in to try it — the preview checks answers like the real form, but never sends anything.
              {!builtIn && !live && " This form isn't on the site until you publish it, and link to it from a page."}
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
