"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Copy, ExternalLink, Eye, EyeOff, Lock, Monitor, Plus, Redo2, RotateCcw, Settings2, Smartphone, Tablet, Trash2, Undo2 } from "lucide-react";
import { useConsoleHref } from "@/components/console/base";
import { Dialog } from "@/components/console/dialog";
import { useMediaPicker } from "@/components/console/media-picker";
import { PublishBar, type VersionRow } from "@/components/console/publish-bar";
import { SchemaFields } from "@/components/console/schema-editor";
import { SortableList } from "@/components/console/sortable";
import { Switch } from "@/components/console/switch";
import { Badge, consoleButton, consoleInput, consoleTextarea, Field, Notice } from "@/components/console/ui";
import { useHistory, useUndoShortcuts } from "@/components/console/use-history";
import { BLOCK_MAP, BLOCK_TYPES, newBlockId, type Block, type BlockType, type PageDoc } from "@/lib/blocks/types";
import { blankRecord } from "@/lib/content/schema";
import { cn } from "@/lib/utils";
import { deletePage, discardPageDraft, publishPage, restorePageVersion, revertPage, savePageDraft } from "../actions";

const DEVICES = {
  desktop: { width: 1280, icon: Monitor, label: "Desktop" },
  tablet: { width: 820, icon: Tablet, label: "Tablet" },
  phone: { width: 390, icon: Smartphone, label: "Phone" },
} as const;
const GROUPS: BlockType["group"][] = ["Layout", "Text", "Lists & tables", "Actions", "Data", "Page templates"];
const AUTOSAVE_MS = 1200;

export function PageEditor({
  path,
  initial,
  builtIn,
  isLive,
  edited,
  hasDraft,
  draftInfo,
  publishedInfo,
  versions,
  previewUrl,
  permissions,
}: {
  path: string;
  initial: PageDoc;
  builtIn: boolean;
  isLive: boolean;
  edited: boolean;
  hasDraft: boolean;
  draftInfo: { at: string; by: string | null } | null;
  publishedInfo: { at: string; by: string | null } | null;
  versions: VersionRow[];
  previewUrl: string;
  permissions: { edit: boolean; structure: boolean; publish: boolean; delete: boolean; media: boolean };
}) {
  const router = useRouter();
  const toHref = useConsoleHref();
  const history = useHistory<PageDoc>(initial);
  const doc = history.value;
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [autosaved, setAutosaved] = useState(() => JSON.stringify(initial));
  const [selected, setSelected] = useState<string | null>(initial.blocks[0]?.id ?? null);
  const [panel, setPanel] = useState<"block" | "page">("block");
  const [library, setLibrary] = useState(false);
  const [device, setDevice] = useState<keyof typeof DEVICES>("desktop");
  const [previewVersion, setPreviewVersion] = useState(0);
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [confirm, setConfirm] = useState<"revert" | "delete" | null>(null);
  const [pending, start] = useTransition();
  const media = useMediaPicker();

  const readOnly = !permissions.edit;
  const canStructure = permissions.structure && !readOnly;
  useUndoShortcuts(history.undo, history.redo, !readOnly);
  const serialized = JSON.stringify(doc);
  const block = doc.blocks.find((b) => b.id === selected) ?? null;
  const type = block ? BLOCK_MAP.get(block.type) : undefined;

  const setBlocks = (blocks: Block[], group?: string) => history.set({ ...doc, blocks }, group);
  const updateBlock = (id: string, patch: Partial<Block>, group?: string) => setBlocks(doc.blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)), group);

  // Autosave the draft shortly after each change, then refresh the preview.
  const saving = useRef(false);
  useEffect(() => {
    if (readOnly || serialized === autosaved) return;
    const timer = window.setTimeout(async () => {
      if (saving.current) return;
      saving.current = true;
      const result = await savePageDraft(path, doc, true);
      saving.current = false;
      if (!result.ok) setMessage({ tone: "error", text: result.error });
      else {
        setAutosaved(serialized);
        setPreviewVersion((v) => v + 1);
      }
    }, AUTOSAVE_MS);
    return () => window.clearTimeout(timer);
  }, [serialized, autosaved, readOnly, path, doc]);

  function run(task: () => Promise<{ ok: true } | { ok: false; error: string }>, success: string, after?: () => void) {
    setMessage(null);
    start(async () => {
      const result = await task();
      if (!result.ok) setMessage({ tone: "error", text: result.error });
      else {
        setSaved(serialized);
        setAutosaved(serialized);
        setMessage({ tone: "success", text: success });
        after?.();
        router.refresh();
      }
    });
  }

  function addBlock(typeId: string) {
    const t = BLOCK_MAP.get(typeId)!;
    const next: Block = { id: newBlockId(), type: typeId, props: blankRecord(t.fields) };
    const at = selected ? doc.blocks.findIndex((b) => b.id === selected) + 1 : doc.blocks.length;
    setBlocks([...doc.blocks.slice(0, at), next, ...doc.blocks.slice(at)]);
    setSelected(next.id);
    setPanel("block");
    setLibrary(false);
  }

  function duplicate(id: string) {
    const index = doc.blocks.findIndex((b) => b.id === id);
    const copy = { ...structuredClone(doc.blocks[index]), id: newBlockId() };
    setBlocks([...doc.blocks.slice(0, index + 1), copy, ...doc.blocks.slice(index + 1)]);
    setSelected(copy.id);
  }

  function remove(id: string) {
    const index = doc.blocks.findIndex((b) => b.id === id);
    const next = doc.blocks.filter((b) => b.id !== id);
    setBlocks(next);
    setSelected(next[Math.min(index, next.length - 1)]?.id ?? null);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PublishBar
        crumbs={[{ label: "Pages", href: "/pages" }]}
        title={doc.title || path}
        isLive={isLive}
        hasDraft={hasDraft || serialized !== saved}
        dirty={false}
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
            <span className="hidden text-xs text-muted-foreground lg:inline">{readOnly ? "" : serialized === autosaved ? "Draft saved" : "Saving…"}</span>
            {(isLive || edited) && (
              <a href={path} target="_blank" rel="noreferrer" className={cn(consoleButton.ghost)} title="Open the live page">
                <ExternalLink aria-hidden="true" />
              </a>
            )}
          </>
        }
        onSave={() => run(() => savePageDraft(path, doc), "Draft saved.")}
        onPublish={() => run(() => publishPage(path, doc), "Published. The page on the site shows these blocks now.")}
        onDiscard={() => run(() => discardPageDraft(path), "Draft discarded.")}
        onRestore={(id) => run(() => restorePageVersion(path, id), "That version is now the draft. Check it, then publish.")}
      />

      {readOnly && (
        <div className="px-5 pt-4 sm:px-7">
          <Notice>Your role can view this page but not change it.</Notice>
        </div>
      )}

      <div className="flex flex-wrap items-start gap-5 p-5 sm:p-7">
        <section aria-label="Blocks" className="flex min-w-0 flex-[1_1_17rem] flex-col gap-3 xl:sticky xl:top-20 xl:max-w-xs">
          <div className="flex flex-col gap-1 rounded-2xl border border-border bg-canvas p-2">
            <div className="flex items-center justify-between px-2.5 pt-2 pb-1.5">
              <h2 className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">Blocks · {doc.blocks.length}</h2>
              <button type="button" onClick={() => setPanel("page")} aria-pressed={panel === "page"} className={cn(consoleButton.ghost, "h-8 px-2 text-xs")}>
                <Settings2 aria-hidden="true" /> Page settings
              </button>
            </div>
            <SortableList
              items={doc.blocks}
              ids={doc.blocks.map((b) => b.id)}
              onReorder={(next) => canStructure && setBlocks(next)}
              className="flex flex-col gap-0.5"
              renderItem={(b, index, handle) => {
                const t = BLOCK_MAP.get(b.type);
                const active = b.id === selected && panel === "block";
                return (
                  <div className={cn("flex items-center gap-1 rounded-xl border px-1.5 py-1.5 transition-colors", active ? "border-primary bg-(--color-gold-100)" : "border-transparent hover:bg-surface", b.hidden && "opacity-60")}>
                    {canStructure ? handle : <span className="w-7" />}
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-(--color-navy-100) font-mono text-[0.68rem] font-semibold text-secondary-text">{index + 1}</span>
                    <button type="button" onClick={() => { setSelected(b.id); setPanel("block"); }} aria-pressed={active} className="flex min-w-0 flex-1 flex-col px-1 py-0.5 text-left">
                      <span className="flex items-center gap-1 truncate text-sm font-medium">
                        {b.type === "code" && <Lock className="size-3 shrink-0" aria-hidden="true" />}
                        {t?.label ?? b.type}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">{t?.summary?.(b.props) || t?.hint}</span>
                    </button>
                    {!readOnly && (
                      <button type="button" aria-label={b.hidden ? `Show ${t?.label}` : `Hide ${t?.label}`} title={b.hidden ? "Show on the page" : "Hide from the page"} onClick={() => updateBlock(b.id, { hidden: !b.hidden || undefined })} className={consoleButton.icon}>
                        {b.hidden ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                      </button>
                    )}
                  </div>
                );
              }}
            />
            {canStructure && (
              <button type="button" onClick={() => setLibrary(true)} className="m-1 inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-dashed border-(--color-ink-300) text-sm font-medium text-primary-ink hover:border-primary hover:bg-(--color-gold-100)/50">
                <Plus className="size-4" aria-hidden="true" /> Add a block
              </button>
            )}
          </div>
          {builtIn && edited && permissions.publish && (
            <button type="button" onClick={() => setConfirm("revert")} className={consoleButton.secondary}>
              <RotateCcw aria-hidden="true" /> Back to the page as built
            </button>
          )}
          {!builtIn && permissions.delete && (
            <button type="button" onClick={() => setConfirm("delete")} className={consoleButton.danger}>
              <Trash2 aria-hidden="true" /> Delete this page
            </button>
          )}
        </section>

        <Preview
          url={previewUrl}
          version={previewVersion}
          device={device}
          setDevice={setDevice}
          selected={panel === "block" ? selected : null}
          onSelect={(id) => {
            setSelected(id);
            setPanel("block");
          }}
        />

        <section aria-label="Settings" className="min-w-0 flex-[1_1_20rem] xl:sticky xl:top-20 xl:max-h-[calc(100dvh-6rem)] xl:max-w-md xl:overflow-y-auto scrollbar-refined">
          {panel === "page" ? (
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-canvas p-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.1em] text-primary-ink uppercase">Page settings</p>
                <h2 className="mt-1 font-heading text-2xl font-medium">{path}</h2>
              </div>
              <fieldset disabled={readOnly} className="flex flex-col gap-4">
                <Field label="Title" htmlFor="page-title" hint="In the browser tab and search results, followed by the Institute's name.">
                  <input id="page-title" value={doc.title} onChange={(e) => history.set({ ...doc, title: e.target.value }, "page-title")} className={consoleInput} />
                </Field>
                <Field label="Description" htmlFor="page-description" hint="The line under the title in search results and link previews. About 150 characters.">
                  <textarea id="page-description" rows={3} value={doc.description} onChange={(e) => history.set({ ...doc, description: e.target.value }, "page-description")} className={consoleTextarea} />
                </Field>
                <span className="text-xs text-muted-foreground tabular-nums">{doc.description.length} characters</span>
                <Switch label="Keep out of search engines" description="Not listed in the sitemap; search engines are asked not to show it." checked={Boolean(doc.noindex)} onChange={(on) => history.set({ ...doc, noindex: on || undefined })} />
              </fieldset>
            </div>
          ) : block && type ? (
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-canvas p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-[0.1em] text-primary-ink uppercase">{type.label}</p>
                  <h2 className="mt-1 truncate font-heading text-2xl font-medium">{type.summary?.(block.props) || type.hint}</h2>
                </div>
                {canStructure && (
                  <div className="flex gap-1">
                    <button type="button" aria-label="Duplicate block" title="Duplicate" onClick={() => duplicate(block.id)} className={consoleButton.icon}>
                      <Copy aria-hidden="true" />
                    </button>
                    <button type="button" aria-label="Delete block" title="Delete" onClick={() => remove(block.id)} className={cn(consoleButton.icon, "hover:bg-ember/8 hover:text-ember")}>
                      <Trash2 aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
              {block.hidden && <Notice tone="warning">Hidden: it stays in the page&apos;s draft but isn&apos;t shown on the site.</Notice>}
              {block.type === "code" ? (
                <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
                  <p className="font-medium text-foreground">{String(block.props.label ?? "")}</p>
                  <p>
                    <Badge tone="navy">Built in</Badge> This part of the page is built into the site&apos;s code, so its words aren&apos;t edited here. You can move it, hide it, or add blocks before and after it.
                  </p>
                  <p>To change its content, rebuild it with blocks — add Text, Tiles or Table blocks with the words you want, then hide this one.</p>
                </div>
              ) : (
                <SchemaFields
                  key={block.id}
                  fields={type.fields}
                  value={block.props}
                  onChange={(props, group) => updateBlock(block.id, { props }, `${block.id}:${group}`)}
                  idPrefix={block.id}
                  media={permissions.media ? media.picker : undefined}
                  disabled={readOnly}
                />
              )}
            </div>
          ) : (
            <div className="flex min-h-60 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-(--color-ink-300) p-8 text-center">
              <p className="font-heading text-lg">Choose a block</p>
              <p className="max-w-xs text-sm text-muted-foreground">Pick one on the left, or click a section in the preview.</p>
            </div>
          )}
        </section>
      </div>

      <Dialog open={library} onOpenChange={setLibrary} title="Add a block" description="It goes after the selected block. Every block uses the site's own design." wide>
        <div className="flex flex-col gap-6">
          {GROUPS.map((group) => {
            const types = BLOCK_TYPES.filter((t) => t.group === group && !t.internal);
            if (!types.length) return null;
            return (
              <section key={group}>
                <h3 className="mb-2 text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">{group}</h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {types.map((t) => (
                    <button key={t.id} type="button" onClick={() => addBlock(t.id)} className="flex flex-col items-start rounded-xl border border-border bg-surface px-3.5 py-3 text-left transition-colors hover:border-primary hover:bg-(--color-gold-100)/60">
                      <span className="text-sm font-semibold text-secondary-text">{t.label}</span>
                      <span className="text-xs text-muted-foreground">{t.hint}</span>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Dialog>

      <Dialog
        open={confirm !== null}
        onOpenChange={(open) => !open && setConfirm(null)}
        title={confirm === "revert" ? "Go back to the page as built?" : "Delete this page?"}
        description={confirm === "revert" ? "The site shows the page from code again. Its blocks stay in History, so you can restore them." : `${path} stops working at once. Its history is kept.`}
        footer={
          <>
            <button type="button" onClick={() => setConfirm(null)} className={consoleButton.secondary}>Cancel</button>
            <button
              type="button"
              onClick={() => {
                const action = confirm;
                setConfirm(null);
                if (action === "revert") run(() => revertPage(path), "The page is back to how it was built.");
                else run(() => deletePage(path), "Page deleted.", () => router.push(toHref("/pages")));
              }}
              className={consoleButton.danger}
            >
              {confirm === "revert" ? "Revert" : "Delete page"}
            </button>
          </>
        }
      >
        <p className="text-sm text-muted-foreground">This is recorded in the audit log.</p>
      </Dialog>
      {media.dialog}
    </div>
  );
}

/**
 * The draft in a frame at real device width, scaled to fit the column.
 * Clicking a section in it selects that block.
 */
function Preview({
  url,
  version,
  device,
  setDevice,
  selected,
  onSelect,
}: {
  url: string;
  version: number;
  device: keyof typeof DEVICES;
  setDevice: (d: keyof typeof DEVICES) => void;
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [boxWidth, setBoxWidth] = useState(800);
  const width = DEVICES[device].width;
  const scale = Math.min(1, boxWidth / width);
  const src = useMemo(() => `${url}&v=${version}`, [url, version]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setBoxWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const highlight = useCallback(() => {
    const docEl = frame.current?.contentDocument;
    if (!docEl) return;
    let style = docEl.getElementById("adx-highlight");
    if (!style) {
      style = docEl.createElement("style");
      style.id = "adx-highlight";
      docEl.head.appendChild(style);
    }
    style.textContent = `[data-block] > * { cursor: pointer; transition: outline-color .15s }
      [data-block]:hover > * { outline: 2px dashed rgb(238 179 43 / .6); outline-offset: -2px }
      ${selected ? `[data-block="${selected}"] > * { outline: 3px solid #EEB32B !important; outline-offset: -3px }` : ""}
      a, button { pointer-events: none }`;
    if (selected) docEl.querySelector(`[data-block="${selected}"] > *`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selected]);

  useEffect(highlight, [highlight]);

  function onLoad() {
    const docEl = frame.current?.contentDocument;
    if (!docEl) return;
    docEl.addEventListener("click", (event) => {
      const target = (event.target as HTMLElement).closest("[data-block]");
      if (target) {
        event.preventDefault();
        onSelect(target.getAttribute("data-block")!);
      }
    });
    highlight();
  }

  return (
    <section aria-label="Preview" className="flex min-w-0 flex-[2.4_1_30rem] flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">Draft preview</h2>
        <div className="flex gap-1 rounded-full bg-(--color-navy-100) p-0.5" role="radiogroup" aria-label="Preview width">
          {(Object.keys(DEVICES) as (keyof typeof DEVICES)[]).map((id) => {
            const Icon = DEVICES[id].icon;
            return (
              <button key={id} type="button" role="radio" aria-checked={device === id} onClick={() => setDevice(id)} className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium", device === id ? "bg-canvas shadow-sm" : "text-muted-foreground")}>
                <Icon className="size-3.5" aria-hidden="true" /> {DEVICES[id].label}
              </button>
            );
          })}
        </div>
      </div>
      <div ref={box} className="w-full">
        <div
          className="mx-auto overflow-hidden rounded-[1.1rem] bg-canvas shadow-[0_12px_32px_rgb(15_31_61/0.12)] ring-1 ring-border"
          style={{ width: width * scale, height: `calc((100dvh - 12rem))` }}
        >
          <iframe
            ref={frame}
            key={device}
            title="Draft preview"
            src={src}
            onLoad={onLoad}
            style={{ width, height: `calc((100dvh - 12rem) / ${scale})`, transform: `scale(${scale})`, transformOrigin: "0 0", border: 0 }}
          />
        </div>
      </div>
    </section>
  );
}
