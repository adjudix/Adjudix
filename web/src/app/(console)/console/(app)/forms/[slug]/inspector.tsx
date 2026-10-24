"use client";

import { Plus, Trash2, X } from "lucide-react";
import type { QueryField } from "@/components/patterns/query-form";
import { StringList } from "@/components/console/string-list";
import { useConfirm } from "@/components/console/confirm";
import { Switch } from "@/components/console/switch";
import { consoleButton, consoleInput, Field } from "@/components/console/ui";
import { BUILT_IN_LABELS, changeKind, FIELD_KINDS, kindOf, KIND_LABEL } from "@/lib/forms/builder-model";
import type { FormConfig } from "@/lib/forms/config";
import { cn } from "@/lib/utils";

const DISPLAYS: { value: QueryField["display"]; label: string }[] = [
  { value: undefined, label: "Automatic" },
  { value: "pills", label: "Buttons" },
  { value: "cards", label: "Cards" },
  { value: "cards-large", label: "Large cards" },
  { value: "select", label: "Dropdown" },
];

interface Props {
  form: FormConfig;
  field: QueryField | null;
  builtIn: string | null;
  sectionTitles: string[];
  sectionIndex: number;
  canStructure: boolean;
  readOnly: boolean;
  keyError?: string;
  onChange: (next: QueryField) => void;
  onRename: (to: string) => void;
  onForm: (patch: Partial<FormConfig>) => void;
  onMove: (section: number) => void;
  onDelete: () => void;
}

export function Inspector(props: Props) {
  const { field, builtIn } = props;
  if (builtIn) return <BuiltInInspector {...props} name={builtIn} />;
  if (!field) {
    return (
      <div className="flex h-full min-h-60 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-(--color-ink-300) p-8 text-center">
        <p className="font-heading text-lg">Choose a field</p>
        <p className="max-w-xs text-sm text-muted-foreground">Select a field on the left to change its wording, choices and rules, or add a new one.</p>
      </div>
    );
  }
  return <FieldInspector {...props} field={field} />;
}

function Shell({ eyebrow, title, actions, children }: { eyebrow: string; title: string; actions?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-canvas p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.1em] text-primary-ink uppercase">{eyebrow}</p>
          <h2 className="mt-1 truncate font-heading text-2xl font-medium">{title || "Untitled"}</h2>
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}

function SectionPicker({ sectionTitles, sectionIndex, onMove, disabled }: Pick<Props, "sectionTitles" | "sectionIndex" | "onMove"> & { disabled: boolean }) {
  if (sectionTitles.length < 2) return null;
  return (
    <Field label="Section" htmlFor="field-section">
      <select id="field-section" value={sectionIndex} disabled={disabled} onChange={(e) => onMove(Number(e.target.value))} className={consoleInput}>
        {sectionTitles.map((title, index) => (
          <option key={index} value={index}>
            {index + 1} · {title || "Untitled section"}
          </option>
        ))}
      </select>
    </Field>
  );
}

function BuiltInInspector({ form, name, onForm, readOnly, canStructure, ...rest }: Props & { name: string }) {
  const confirm = useConfirm();
  const disabled = readOnly;
  return (
    <Shell eyebrow="Built-in field" title={BUILT_IN_LABELS[name]}>
      <p className="-mt-2 text-sm leading-relaxed text-muted-foreground">
        Every form asks who is writing. These fields are always there; you can change how they behave.
      </p>
      {name === "name" && <p className="text-sm">Always required, so the Institute knows who to reply to.</p>}
      {name === "organization" && (
        <>
          <Field label="Label" htmlFor="org-label">
            <input id="org-label" disabled={disabled} value={form.organizationLabel ?? ""} placeholder="Organization (optional)" onChange={(e) => onForm({ organizationLabel: e.target.value || undefined })} className={consoleInput} />
          </Field>
          <Field label="Ask for it" htmlFor="org-mode">
            <select id="org-mode" disabled={disabled || !canStructure} value={form.organization ?? "optional"} onChange={(e) => onForm({ organization: e.target.value as FormConfig["organization"] })} className={consoleInput}>
              <option value="optional">Optional</option>
              <option value="required">Required</option>
              <option value="hidden">Don&apos;t ask</option>
            </select>
          </Field>
        </>
      )}
      {(name === "email" || name === "phone") && (
        <Field label="How to reach them" htmlFor="contact-mode">
          <select id="contact-mode" disabled={disabled || !canStructure} value={form.contact ?? "either"} onChange={(e) => onForm({ contact: e.target.value as FormConfig["contact"] })} className={consoleInput}>
            <option value="either">Email or phone — at least one</option>
            <option value="email">Email only (no phone field)</option>
          </select>
        </Field>
      )}
      {name === "message" && (
        <>
          <Field label="Label" htmlFor="msg-label">
            <input id="msg-label" disabled={disabled} value={form.messageLabel ?? ""} placeholder="Message" onChange={(e) => onForm({ messageLabel: e.target.value || undefined })} className={consoleInput} />
          </Field>
          <Switch label="Required" disabled={disabled} checked={Boolean(form.messageRequired)} onChange={(on) => onForm({ messageRequired: on || undefined })} />
          {canStructure && (
            <button type="button" disabled={disabled} onClick={async () => {
              if (await confirm({ title: "Remove the message box?", body: "Visitors will no longer be able to write a free-text message on this form.", action: "Remove message box" })) onForm({ noMessage: true });
            }} className={consoleButton.danger}>
              <Trash2 aria-hidden="true" /> Remove the message box
            </button>
          )}
        </>
      )}
      {name === "attachments" && (
        <>
          <Field label="Label" htmlFor="att-label" hint="Up to 5 files, 10 MB in all: PDF, Word, JPG or PNG.">
            <input id="att-label" disabled={disabled} value={form.attachmentsLabel ?? ""} onChange={(e) => onForm({ attachmentsLabel: e.target.value || "Documents" })} className={consoleInput} />
          </Field>
          {canStructure && (
            <button type="button" disabled={disabled} onClick={async () => {
              if (await confirm({ title: "Remove document upload?", body: "Visitors will no longer be able to attach files to this form.", action: "Remove upload" })) onForm({ attachmentsLabel: undefined });
            }} className={consoleButton.danger}>
              <Trash2 aria-hidden="true" /> Remove document upload
            </button>
          )}
        </>
      )}
      <SectionPicker {...rest} disabled={disabled || !canStructure} />
    </Shell>
  );
}

function FieldInspector({ form, field, onChange, onRename, onDelete, readOnly, canStructure, keyError, ...rest }: Props & { field: QueryField }) {
  const kind = kindOf(field);
  const confirm = useConfirm();
  const set = (patch: Partial<QueryField>) => {
    const next = { ...field, ...patch };
    for (const key of Object.keys(next) as (keyof QueryField)[]) if (next[key] === undefined || next[key] === "") delete next[key];
    onChange(next);
  };
  const others = form.fields.flatMap((f) => (f.group ?? [f])).filter((f) => f.name !== field.name && f.type === "select" && (f.options || f.optionGroups));
  const trigger = field.showWhen ? others.find((f) => f.name === field.showWhen!.field) : undefined;
  const triggerOptions = trigger ? (trigger.options ?? trigger.optionGroups?.flatMap((g) => g.options) ?? []) : [];

  return (
    <Shell
      eyebrow={KIND_LABEL[kind] ?? "Field"}
      title={field.label}
      actions={
        canStructure && !readOnly ? (
          <button type="button" aria-label="Delete field" title="Delete field" onClick={onDelete} className="inline-flex size-9 items-center justify-center rounded-lg border border-ember/25 text-ember hover:bg-ember/8">
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        ) : undefined
      }
    >
      <fieldset disabled={readOnly} className="flex flex-col gap-4">
        <Field label="Label" htmlFor="f-label">
          <input id="f-label" value={field.label} onChange={(e) => set({ label: e.target.value })} className={consoleInput} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Field key" htmlFor="f-key" error={keyError} hint="Names this answer in emails and exports.">
            <input id="f-key" value={field.name} disabled={!canStructure} onChange={(e) => onRename(e.target.value.replace(/\s+/g, ""))} className={cn(consoleInput, "font-mono text-[0.8rem]")} />
          </Field>
          <Field label="Kind" htmlFor="f-kind">
            <select id="f-kind" value={kind} disabled={!canStructure || kind === "tiles"} onChange={(e) => onChange(changeKind(field, e.target.value))} className={consoleInput}>
              {kind === "tiles" && <option value="tiles">Topic tiles</option>}
              {FIELD_KINDS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {!field.group && field.type !== "select" && field.type !== "file" && (
          <Field label="Placeholder" htmlFor="f-placeholder" hint="Faint example text inside the box.">
            <input id="f-placeholder" value={field.placeholder ?? ""} onChange={(e) => set({ placeholder: e.target.value || undefined })} className={consoleInput} />
          </Field>
        )}

        <div className="flex flex-col gap-3 rounded-xl bg-surface p-3.5">
          <Switch label="Required" description="The form won't send without it" checked={Boolean(field.required)} onChange={(on) => set({ required: on || undefined })} />
          {kind !== "cards" && kind !== "group" && kind !== "file" && kind !== "tiles" && (
            <Switch label="Half width" description="Sits beside the next half-width field" checked={Boolean(field.half)} onChange={(on) => set({ half: on || undefined })} />
          )}
        </div>

        {field.type === "select" && !field.optionGroups && !field.optionsFrom && (
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium">Choices · {field.options?.length ?? 0}</span>
            </div>
            <StringList label="Choices" singular="choice" value={field.options ?? []} onChange={(options) => set({ options })} />
            <div className="flex flex-wrap gap-1.5 pt-1" role="radiogroup" aria-label="Shown as">
              {DISPLAYS.map((display) => (
                <button
                  key={display.label}
                  type="button"
                  role="radio"
                  aria-checked={field.display === display.value}
                  title={display.value ? undefined : "Buttons for a few short choices, cards for up to six, a dropdown beyond that"}
                  onClick={() => set({ display: display.value })}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium",
                    field.display === display.value ? "bg-secondary-text text-canvas" : "border border-border hover:bg-surface",
                  )}
                >
                  {display.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {field.optionGroups && (
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium">Topics and their choices</span>
            {field.optionGroups.map((group, gi) => (
              <div key={gi} className="flex flex-col gap-2 rounded-xl border border-border p-3">
                <div className="flex gap-2">
                  <input
                    aria-label={`Topic ${gi + 1}`}
                    value={group.label}
                    onChange={(e) => set({ optionGroups: field.optionGroups!.map((g, i) => (i === gi ? { ...g, label: e.target.value } : g)) })}
                    className={cn(consoleInput, "h-9 font-medium")}
                  />
                  <button type="button" aria-label={`Remove topic ${group.label}`} onClick={async () => {
                    if (await confirm({ title: `Remove the topic “${group.label}”?`, body: `Its ${group.options.length} choices go with it.`, action: "Remove topic" })) set({ optionGroups: field.optionGroups!.filter((_, i) => i !== gi) });
                  }} className={consoleButton.icon}>
                    <X aria-hidden="true" />
                  </button>
                </div>
                <StringList label={group.label} singular="choice" value={group.options} onChange={(options) => set({ optionGroups: field.optionGroups!.map((g, i) => (i === gi ? { ...g, options } : g)) })} />
              </div>
            ))}
            <button type="button" onClick={() => set({ optionGroups: [...field.optionGroups!, { label: "New topic", options: ["Choice"] }] })} className={consoleButton.secondary}>
              <Plus aria-hidden="true" /> Add topic
            </button>
          </div>
        )}

        {field.optionsFrom && (
          <div className="flex flex-col gap-3">
            <p className="text-sm">
              <span className="font-medium">Choices depend on</span>{" "}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">{field.optionsFrom.field}</code>
            </p>
            {Object.entries(field.optionsFrom.map).map(([when, options]) => (
              <div key={when} className="flex flex-col gap-2 rounded-xl border border-border p-3">
                <span className="text-xs font-semibold text-muted-foreground">When “{when}” is chosen</span>
                <StringList
                  label={when}
                  singular="choice"
                  value={options}
                  onChange={(next) => set({ optionsFrom: { ...field.optionsFrom!, map: { ...field.optionsFrom!.map, [when]: next } } })}
                />
              </div>
            ))}
          </div>
        )}

        {field.group && (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Parts, side by side</span>
            {field.group.map((part, pi) => (
              <div key={pi} className="grid grid-cols-[1fr_1fr_auto] items-center gap-2">
                <input aria-label={`Part ${pi + 1} label`} value={part.label} onChange={(e) => set({ group: field.group!.map((p, i) => (i === pi ? { ...p, label: e.target.value } : p)) })} className={cn(consoleInput, "h-9")} />
                <input aria-label={`Part ${pi + 1} key`} value={part.name} disabled={!canStructure} onChange={(e) => set({ group: field.group!.map((p, i) => (i === pi ? { ...p, name: e.target.value.replace(/\s+/g, "") } : p)) })} className={cn(consoleInput, "h-9 font-mono text-xs")} />
                {canStructure && field.group!.length > 1 ? (
                  <button type="button" aria-label={`Remove part ${pi + 1}`} onClick={async () => {
                    if (await confirm({ title: `Remove “${part.label}”?`, action: "Remove part" })) set({ group: field.group!.filter((_, i) => i !== pi) });
                  }} className={consoleButton.icon}>
                    <X aria-hidden="true" />
                  </button>
                ) : (
                  <span className="w-9" />
                )}
              </div>
            ))}
            {canStructure && field.group.length < 4 && (
              <button type="button" onClick={() => set({ group: [...field.group!, { name: `${field.name}${String.fromCharCode(65 + field.group!.length)}`, label: `Part ${field.group!.length + 1}` }] })} className={consoleButton.secondary}>
                <Plus aria-hidden="true" /> Add part
              </button>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2.5 rounded-xl bg-surface p-3.5">
          <span className="text-sm font-medium">Show this field only when…</span>
          {others.length === 0 ? (
            <span className="text-xs text-muted-foreground">Add a choice field above it to make this conditional.</span>
          ) : (
            <>
              <select
                aria-label="Depends on"
                value={field.showWhen?.field ?? ""}
                onChange={(e) => set({ showWhen: e.target.value ? { field: e.target.value, values: [] } : undefined })}
                className={cn(consoleInput, "h-9")}
              >
                <option value="">Always show</option>
                {others.map((other) => (
                  <option key={other.name} value={other.name}>
                    “{other.label}” is one of…
                  </option>
                ))}
              </select>
              {trigger && (
                <div className="flex flex-wrap gap-1.5">
                  {triggerOptions.map((value) => {
                    const on = field.showWhen!.values.includes(value);
                    return (
                      <button
                        key={value}
                        type="button"
                        aria-pressed={on}
                        onClick={() => set({ showWhen: { field: trigger.name, values: on ? field.showWhen!.values.filter((v) => v !== value) : [...field.showWhen!.values, value] } })}
                        className={cn("rounded-full px-2.5 py-1 text-xs", on ? "bg-secondary-text text-canvas" : "border border-border bg-canvas hover:bg-surface")}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {field.type === "select" && (field.options?.length ?? 0) > 0 && (
          <Field label="Chosen to begin with" htmlFor="f-default">
            <select id="f-default" value={field.defaultValue ?? ""} onChange={(e) => set({ defaultValue: e.target.value || undefined })} className={consoleInput}>
              <option value="">Nothing</option>
              {field.options!.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        )}
        <SectionPicker {...rest} disabled={!canStructure} />
      </fieldset>
    </Shell>
  );
}
