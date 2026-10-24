"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, Copy, Plus, Trash2 } from "lucide-react";
import { SortableList } from "@/components/console/sortable";
import { StringList } from "@/components/console/string-list";
import { Switch } from "@/components/console/switch";
import { newRowId, useRowIds } from "@/components/console/use-row-ids";
import { useConfirm } from "@/components/console/confirm";
import { consoleButton, consoleInput, consoleTextarea, Field } from "@/components/console/ui";
import { blankRecord, type FieldSpec } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

// Renders editing controls for any value described by the schema language
// in lib/content/schema — the same description the server cleans against.
// Collections, page blocks and site settings all edit through this.

type Value = unknown;
type Record_ = Record<string, Value>;

export interface MediaPicker {
  /** Opens the media library and resolves with the chosen file's address. */
  pick: (accept: "image" | "any") => Promise<string | null>;
}

export function SchemaFields({
  fields,
  value,
  onChange,
  idPrefix,
  media,
  disabled,
}: {
  fields: FieldSpec[];
  value: Record_;
  onChange: (next: Record_, group?: string) => void;
  idPrefix: string;
  media?: MediaPicker;
  disabled?: boolean;
}) {
  return (
    <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
      {fields.map((spec) => (
        <div key={spec.key} className={cn(spec.half ? "" : "sm:col-span-2")}>
          <FieldControl
            spec={spec}
            value={value?.[spec.key]}
            id={`${idPrefix}-${spec.key}`}
            media={media}
            disabled={disabled}
            onChange={(next) => onChange({ ...value, [spec.key]: next }, `${idPrefix}-${spec.key}`)}
          />
        </div>
      ))}
    </div>
  );
}

function FieldControl({
  spec,
  value,
  id,
  onChange,
  media,
  disabled,
}: {
  spec: FieldSpec;
  value: Value;
  id: string;
  onChange: (next: Value) => void;
  media?: MediaPicker;
  disabled?: boolean;
}) {
  const label = (
    <>
      {spec.label}
      {spec.required && <span className="ml-1 text-ember">*</span>}
    </>
  );
  switch (spec.type) {
    case "text":
    case "date":
      return (
        <Field label={label} htmlFor={id} hint={spec.help}>
          <input id={id} type={spec.type === "date" ? "date" : "text"} disabled={disabled} value={String(value ?? "")} placeholder={spec.placeholder} onChange={(e) => onChange(e.target.value)} className={consoleInput} />
        </Field>
      );
    case "url":
    case "image":
      return (
        <Field label={label} htmlFor={id} hint={spec.help ?? (spec.type === "image" ? "An image from Media, or its address." : "A page on the site (/about) or a full web address.")}>
          <div className="flex gap-2">
            <input id={id} disabled={disabled} value={String(value ?? "")} placeholder={spec.type === "image" ? "/images/…" : "/…"} onChange={(e) => onChange(e.target.value)} className={cn(consoleInput, "font-mono text-[0.8rem]")} />
            {media && (
              <button
                type="button"
                disabled={disabled}
                onClick={async () => {
                  const chosen = await media.pick(spec.type === "image" ? "image" : "any");
                  if (chosen) onChange(chosen);
                }}
                className={consoleButton.secondary}
              >
                Choose…
              </button>
            )}
          </div>
          {spec.type === "image" && typeof value === "string" && value && (
            // eslint-disable-next-line @next/next/no-img-element -- a preview of any address, local or remote
            <img src={value} alt="" className="mt-2 h-24 w-auto rounded-lg border border-border object-cover" />
          )}
        </Field>
      );
    case "textarea":
      return (
        <Field label={label} htmlFor={id} hint={spec.help}>
          <textarea id={id} disabled={disabled} rows={spec.rows ?? 4} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className={consoleTextarea} />
        </Field>
      );
    case "number": {
      const isNull = value === null || value === undefined;
      return (
        <Field label={label} htmlFor={id} hint={spec.help}>
          <div className="flex items-center gap-2">
            <input
              id={id}
              type="number"
              inputMode="decimal"
              step={spec.step ?? 1}
              min={spec.min}
              disabled={disabled || (spec.nullable && isNull)}
              value={isNull ? "" : Number(value)}
              placeholder={spec.nullable && isNull ? spec.nullLabel : undefined}
              onChange={(e) => onChange(e.target.value === "" ? (spec.nullable ? null : 0) : Number(e.target.value))}
              className={cn(consoleInput, "tabular-nums")}
            />
            {spec.nullable && (
              <label className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                <input type="checkbox" disabled={disabled} checked={isNull} onChange={(e) => onChange(e.target.checked ? null : 0)} className="size-4 accent-(--color-navy-800)" />
                {spec.nullLabel ?? "None"}
              </label>
            )}
          </div>
        </Field>
      );
    }
    case "boolean":
      return <Switch label={spec.label} description={spec.help} disabled={disabled} checked={Boolean(value)} onChange={onChange} className="pt-1" />;
    case "select":
      return (
        <Field label={label} htmlFor={id} hint={spec.help}>
          <select id={id} disabled={disabled} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className={consoleInput}>
            {spec.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      );
    case "strings":
      return (
        <fieldset disabled={disabled} className="flex flex-col gap-2">
          <legend className="mb-1.5 text-sm font-medium">{label}</legend>
          <StringList label={spec.label} singular={spec.singular} multiline={spec.multiline} value={Array.isArray(value) ? value.map(String) : []} onChange={onChange} />
        </fieldset>
      );
    case "numbers": {
      const list = Array.isArray(value) ? value.map(Number) : [];
      return <NumberList spec={spec} label={label} list={list} onChange={onChange} disabled={disabled} />;
    }
    case "object":
      return (
        <fieldset disabled={disabled} className="rounded-xl border border-border p-4">
          <legend className="px-1.5 text-sm font-semibold">{spec.label}</legend>
          <SchemaFields fields={spec.fields} value={(value as Record_) ?? {}} onChange={(next) => onChange(next)} idPrefix={id} media={media} disabled={disabled} />
        </fieldset>
      );
    case "list":
      return <ListField spec={spec} value={Array.isArray(value) ? (value as Record_[]) : []} onChange={onChange} id={id} media={media} disabled={disabled} />;
  }
}

/** A nested list (fee slabs, an article's sections): collapsible, reorderable rows. */
function ListField({
  spec,
  value,
  onChange,
  media,
  disabled,
}: {
  spec: Extract<FieldSpec, { type: "list" }>;
  value: Record_[];
  onChange: (next: Record_[]) => void;
  id: string;
  media?: MediaPicker;
  disabled?: boolean;
}) {
  const [ids, setIds] = useRowIds(value.length);
  const confirm = useConfirm();
  const [open, setOpen] = useState<string | null>(null);

  const titleOf = (item: Record_, index: number) => {
    const raw = spec.titleKey ? item?.[spec.titleKey] : undefined;
    const text = typeof raw === "number" ? new Intl.NumberFormat("en-IN").format(raw) : String(raw ?? "").trim();
    return text || `${spec.singular ?? "Item"} ${index + 1}`;
  };

  const update = (next: Record_[], nextIds: string[]) => {
    setIds(nextIds);
    onChange(next);
  };

  return (
    <fieldset disabled={disabled} className="flex flex-col gap-2">
      <legend className="mb-1.5 flex w-full items-baseline justify-between text-sm font-medium">
        <span>{spec.label}</span>
        <span className="text-xs font-normal text-muted-foreground">{value.length}</span>
      </legend>
      <SortableList
        items={value.map((item, index) => ({ item, key: ids[index] }))}
        ids={ids}
        onReorder={(rows) => update(rows.map((r) => r.item), rows.map((r) => r.key))}
        className="flex flex-col gap-1.5"
        renderItem={(row, index, handle) => {
          const expanded = open === row.key;
          return (
            <div className={cn("rounded-xl border bg-canvas", expanded ? "border-secondary-border/50 shadow-[0_4px_12px_rgb(15_31_61/0.06)]" : "border-border")}>
              <div className="flex items-center gap-1 px-1.5 py-1">
                {handle}
                <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : row.key)} className="flex min-w-0 flex-1 items-center gap-2 py-1.5 text-left text-sm font-medium">
                  <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", expanded && "rotate-180")} aria-hidden="true" />
                  <span className="truncate">{titleOf(row.item, index)}</span>
                </button>
                <button
                  type="button"
                  aria-label={`Duplicate ${titleOf(row.item, index)}`}
                  title="Duplicate"
                  onClick={() => {
                    const copy = structuredClone(row.item);
                    const key = newRowId();
                    update([...value.slice(0, index + 1), copy, ...value.slice(index + 1)], [...ids.slice(0, index + 1), key, ...ids.slice(index + 1)]);
                    setOpen(key);
                  }}
                  className={consoleButton.icon}
                >
                  <Copy aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label={`Remove ${titleOf(row.item, index)}`}
                  title="Remove"
                  onClick={async () => {
                    if (!(await confirm({ title: `Remove “${titleOf(row.item, index)}”?`, body: `This ${spec.singular ?? "item"} and everything in it will be removed.`, action: `Remove ${spec.singular ?? "item"}` }))) return;
                    update(value.filter((_, i) => i !== index), ids.filter((_, i) => i !== index));
                  }}
                  className={cn(consoleButton.icon, "hover:bg-ember/8 hover:text-ember")}
                >
                  <Trash2 aria-hidden="true" />
                </button>
              </div>
              {expanded && (
                <div className="border-t border-border px-4 py-4">
                  <SchemaFields fields={spec.of} value={row.item} onChange={(next) => onChange(value.map((item, i) => (i === index ? next : item)))} idPrefix={row.key} media={media} disabled={disabled} />
                </div>
              )}
            </div>
          );
        }}
      />
      <button
        type="button"
        onClick={() => {
          const key = newRowId();
          update([...value, blankRecord(spec.of)], [...ids, key]);
          setOpen(key);
        }}
        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-dashed border-(--color-ink-300) text-sm font-medium text-primary-ink hover:border-primary hover:bg-(--color-gold-100)/50"
      >
        <Plus className="size-4" aria-hidden="true" /> Add {spec.singular ?? "item"}
      </button>
    </fieldset>
  );
}

function NumberList({
  spec,
  label,
  list,
  onChange,
  disabled,
}: {
  spec: Extract<FieldSpec, { type: "numbers" }>;
  label: ReactNode;
  list: number[];
  onChange: (next: Value) => void;
  disabled?: boolean;
}) {
  const confirm = useConfirm();
  return (
    <fieldset disabled={disabled} className="flex flex-col gap-2">
      <legend className="mb-1.5 text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {list.map((n, index) => (
          <span key={index} className="flex items-center gap-1">
            <input
              aria-label={`${spec.label} ${index + 1}`}
              type="number"
              value={n}
              onChange={(e) => onChange(list.map((x, i) => (i === index ? Number(e.target.value) : x)))}
              className={cn(consoleInput, "h-9 w-32 tabular-nums")}
            />
            <button
              type="button"
              aria-label={`Remove ${spec.singular ?? "value"} ${index + 1}`}
              onClick={async () => {
                if (n !== 0 && !(await confirm({ title: `Remove ${new Intl.NumberFormat("en-IN").format(n)}?`, action: `Remove ${spec.singular ?? "value"}` }))) return;
                onChange(list.filter((_, i) => i !== index));
              }}
              className={consoleButton.icon}
            >
              <Trash2 aria-hidden="true" />
            </button>
          </span>
        ))}
        <button type="button" onClick={() => onChange([...list, 0])} className={cn(consoleButton.secondary, "h-9")}>
          <Plus aria-hidden="true" /> Add {spec.singular ?? "value"}
        </button>
      </div>
    </fieldset>
  );
}
