"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Copy, Eye, EyeOff, Plus, Redo2, Search, Trash2, Undo2 } from "lucide-react";
import { PublishBar, type VersionRow } from "@/components/console/publish-bar";
import { SchemaFields } from "@/components/console/schema-editor";
import { SortableList } from "@/components/console/sortable";
import { Badge, consoleButton, consoleInput, EmptyState, Notice } from "@/components/console/ui";
import { useHistory, useUndoShortcuts } from "@/components/console/use-history";
import { newRowId, useRowIds } from "@/components/console/use-row-ids";
import { useMediaPicker } from "@/components/console/media-picker";
import type { CollectionDef } from "@/lib/content/collections";
import { blankRecord } from "@/lib/content/schema";
import { cn } from "@/lib/utils";
import { discardCollectionDraft, publishCollection, restoreCollectionVersion, saveCollectionDraft } from "../actions";

type Item = Record<string, unknown>;
const HIDDEN = "_hidden";

export function CollectionEditor({
  def,
  initial,
  isLive,
  hasDraft,
  draftInfo,
  publishedInfo,
  versions,
  permissions,
}: {
  def: Omit<CollectionDef, "defaults">;
  initial: unknown;
  isLive: boolean;
  hasDraft: boolean;
  draftInfo: { at: string; by: string | null } | null;
  publishedInfo: { at: string; by: string | null } | null;
  versions: VersionRow[];
  permissions: { edit: boolean; structure: boolean; publish: boolean };
}) {
  const router = useRouter();
  const history = useHistory<unknown>(initial);
  const value = history.value;
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [pending, start] = useTransition();
  const media = useMediaPicker();
  const readOnly = !permissions.edit;
  useUndoShortcuts(history.undo, history.redo, !readOnly);
  const dirty = JSON.stringify(value) !== saved;

  function run(task: () => Promise<{ ok: true } | { ok: false; error: string }>, success: string) {
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
  }

  const undoRedo = !readOnly && (
    <span className="flex items-center rounded-full border border-border">
      <button type="button" onClick={history.undo} disabled={!history.canUndo} aria-label="Undo" title="Undo (Ctrl+Z)" className="inline-flex size-9 items-center justify-center rounded-l-full text-secondary-text hover:bg-surface disabled:opacity-35">
        <Undo2 className="size-4" aria-hidden="true" />
      </button>
      <span className="h-5 w-px bg-border" aria-hidden="true" />
      <button type="button" onClick={history.redo} disabled={!history.canRedo} aria-label="Redo" title="Redo (Ctrl+Shift+Z)" className="inline-flex size-9 items-center justify-center rounded-r-full text-secondary-text hover:bg-surface disabled:opacity-35">
        <Redo2 className="size-4" aria-hidden="true" />
      </button>
    </span>
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PublishBar
        crumbs={[{ label: "Collections", href: "/collections" }]}
        title={def.label}
        isLive={isLive}
        hasDraft={hasDraft}
        dirty={dirty}
        pending={pending}
        canEdit={permissions.edit}
        canPublish={permissions.publish}
        draftInfo={draftInfo}
        publishedInfo={publishedInfo}
        versions={versions}
        message={message}
        extra={undoRedo}
        onSave={() => run(() => saveCollectionDraft(def.key, value), "Draft saved.")}
        onPublish={() => run(() => publishCollection(def.key, dirty ? value : undefined), "Published. Every page that shows this now has the new version.")}
        onDiscard={() => (hasDraft ? run(() => discardCollectionDraft(def.key), "Draft discarded.") : history.set(JSON.parse(saved)))}
        onRestore={(id) => run(() => restoreCollectionVersion(def.key, id), "That version is now the draft. Check it, then publish.")}
      />
      <div className="flex flex-col gap-4 p-5 sm:p-7">
        <p className="max-w-3xl text-sm text-muted-foreground">{def.description}</p>
        {def.note && <Notice tone="warning">{def.note}</Notice>}
        {readOnly && <Notice>Your role can view this collection but not change it.</Notice>}
        {def.kind === "record" ? (
          <div className="max-w-4xl rounded-2xl border border-border bg-canvas p-5 sm:p-6">
            <SchemaFields fields={def.fields} value={value as Item} onChange={(next, group) => history.set(next, group)} idPrefix={def.key} media={media.picker} disabled={readOnly} />
          </div>
        ) : (
          <ListEditor def={def} items={value as Item[]} onChange={(next, group) => history.set(next, group)} readOnly={readOnly} canStructure={permissions.structure && !readOnly} media={media.picker} />
        )}
      </div>
      {media.dialog}
    </div>
  );
}

function ListEditor({
  def,
  items,
  onChange,
  readOnly,
  canStructure,
  media,
}: {
  def: Omit<CollectionDef, "defaults">;
  items: Item[];
  onChange: (next: Item[], group?: string) => void;
  readOnly: boolean;
  canStructure: boolean;
  media: Parameters<typeof SchemaFields>[0]["media"];
}) {
  // Stable row ids that survive reordering, adding and removing.
  const [ids, setIds] = useRowIds(items.length);
  const [selected, setSelected] = useState<string | null>(ids[0] ?? null);
  const [query, setQuery] = useState("");

  const titleOf = (item: Item, index: number) => String((def.titleKey && item[def.titleKey]) || `${def.singular ?? "Item"} ${index + 1}`);
  const subtitleOf = (item: Item) => (def.subtitleKey ? String(item[def.subtitleKey] ?? "") : "");
  const index = selected ? ids.indexOf(selected) : -1;
  const current = index >= 0 ? items[index] : null;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .map((item, i) => ({ item, id: ids[i], i }))
      .filter(({ item }) => !q || JSON.stringify(item).toLowerCase().includes(q));
  }, [items, query, ids]);

  const commit = (next: Item[], nextIds: string[], group?: string) => {
    setIds(nextIds);
    onChange(next, group);
  };

  function add() {
    const id = newRowId();
    const at = index >= 0 ? index + 1 : items.length;
    commit([...items.slice(0, at), blankRecord(def.fields), ...items.slice(at)], [...ids.slice(0, at), id, ...ids.slice(at)]);
    setSelected(id);
    setQuery("");
  }

  function duplicate(i: number) {
    const id = newRowId();
    commit([...items.slice(0, i + 1), structuredClone(items[i]), ...items.slice(i + 1)], [...ids.slice(0, i + 1), id, ...ids.slice(i + 1)]);
    setSelected(id);
  }

  function remove(i: number) {
    const nextIds = ids.filter((_, j) => j !== i);
    commit(items.filter((_, j) => j !== i), nextIds);
    setSelected(nextIds[Math.min(i, nextIds.length - 1)] ?? null);
  }

  const toggleHidden = (i: number) =>
    commit(
      items.map((item, j) => {
        if (j !== i) return item;
        const { [HIDDEN]: hidden, ...rest } = item;
        return hidden ? rest : { ...rest, [HIDDEN]: true };
      }),
      ids,
    );

  return (
    <div className="flex flex-wrap items-start gap-5">
      <section aria-label={`${def.label} list`} className="flex min-w-0 flex-[1_1_20rem] flex-col gap-2 rounded-2xl border border-border bg-canvas p-2 lg:sticky lg:top-20 lg:max-w-md">
        <div className="flex items-center gap-2 p-1.5">
          <label className="relative flex-1">
            <span className="sr-only">Search {def.label}</span>
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${items.length} ${def.singular ?? "item"}s`} className={cn(consoleInput, "h-9 rounded-full bg-surface pl-9")} />
          </label>
          {canStructure && (
            <button type="button" onClick={add} className={cn(consoleButton.primary, "h-9 px-3.5")}>
              <Plus aria-hidden="true" /> Add
            </button>
          )}
        </div>
        <div className="scrollbar-refined max-h-[70dvh] overflow-y-auto">
          {query ? (
            <ul className="flex flex-col gap-0.5">
              {visible.map(({ item, id, i }) => (
                <li key={id}>
                  <Row title={titleOf(item, i)} subtitle={subtitleOf(item)} hidden={Boolean(item[HIDDEN])} active={id === selected} onClick={() => setSelected(id)} handle={<span className="w-7" />} />
                </li>
              ))}
              {visible.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted-foreground">Nothing matches “{query}”.</li>}
            </ul>
          ) : (
            <SortableList
              items={items.map((item, i) => ({ item, id: ids[i], i }))}
              ids={ids}
              onReorder={(rows) => !readOnly && commit(rows.map((r) => r.item), rows.map((r) => r.id))}
              className="flex flex-col gap-0.5"
              renderItem={({ item, id, i }, _index, handle) => (
                <Row title={titleOf(item, i)} subtitle={subtitleOf(item)} hidden={Boolean(item[HIDDEN])} active={id === selected} onClick={() => setSelected(id)} handle={readOnly ? <span className="w-7" /> : handle} />
              )}
            />
          )}
        </div>
      </section>

      <section aria-label="Item" className="min-w-0 flex-[2_1_28rem]">
        {current ? (
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-canvas p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-[0.1em] text-primary-ink uppercase">
                  {def.singular ?? "Item"} {index + 1} of {items.length}
                </p>
                <h2 className="mt-1 font-heading text-2xl font-medium text-balance">{titleOf(current, index)}</h2>
              </div>
              {!readOnly && (
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => toggleHidden(index)} className={consoleButton.secondary}>
                    {current[HIDDEN] ? <Eye aria-hidden="true" /> : <EyeOff aria-hidden="true" />}
                    {current[HIDDEN] ? "Show on site" : "Hide from site"}
                  </button>
                  {canStructure && (
                    <>
                      <button type="button" onClick={() => duplicate(index)} className={consoleButton.secondary}>
                        <Copy aria-hidden="true" /> Duplicate
                      </button>
                      <button type="button" onClick={() => remove(index)} className={consoleButton.danger}>
                        <Trash2 aria-hidden="true" /> Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            {Boolean(current[HIDDEN]) && <Notice tone="warning">Hidden: kept here, but not shown anywhere on the site.</Notice>}
            <SchemaFields
              key={selected}
              fields={def.fields}
              value={current}
              idPrefix={selected!}
              media={media}
              disabled={readOnly}
              onChange={(next, group) => onChange(items.map((item, j) => (j === index ? { ...next, ...(item[HIDDEN] ? { [HIDDEN]: true } : {}) } : item)), group)}
            />
          </div>
        ) : (
          <EmptyState title={items.length ? `Choose a ${def.singular ?? "item"}` : `No ${def.singular ?? "item"}s yet`} body={canStructure ? "Add one with the button on the left." : undefined} />
        )}
      </section>
    </div>
  );
}

function Row({ title, subtitle, hidden, active, onClick, handle }: { title: string; subtitle: string; hidden: boolean; active: boolean; onClick: () => void; handle: React.ReactNode }) {
  return (
    <div className={cn("flex items-center gap-1.5 rounded-xl border px-1.5 py-1.5 transition-colors", active ? "border-primary bg-(--color-gold-100)" : "border-transparent hover:bg-surface")}>
      {handle}
      <button type="button" onClick={onClick} aria-current={active || undefined} className="flex min-w-0 flex-1 flex-col py-0.5 text-left">
        <span className={cn("truncate text-sm font-medium", hidden && "text-muted-foreground line-through decoration-(--color-ink-300)")}>{title}</span>
        {subtitle && <span className="truncate text-xs text-muted-foreground">{subtitle}</span>}
      </button>
      {hidden && <Badge tone="neutral">Hidden</Badge>}
    </div>
  );
}
