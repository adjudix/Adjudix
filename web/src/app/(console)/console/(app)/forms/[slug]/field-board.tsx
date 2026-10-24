"use client";

import { useId, useState, type ReactNode } from "react";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import type { FormSection } from "@/components/patterns/query-form";
import { consoleButton } from "@/components/console/ui";
import { useConfirm } from "@/components/console/confirm";
import type { FieldKind } from "@/lib/forms/builder-model";
import { cn } from "@/lib/utils";

// The builder's field column as one drag-and-drop board: fields move within
// and between sections, and field types drag in from the palette to the spot
// they're dropped on. While dragging, the board works on its own copy of the
// layout and hands it back once, on drop — so a whole drag is one undo step.

const NEW = "__new-field";
const PALETTE = "palette:";
const SECTION = "section:";

export interface BoardItem {
  name: string;
  title: string;
  meta: ReactNode;
  required: boolean;
  locked: boolean;
}

export function FieldBoard({
  layout,
  item,
  kinds,
  selected,
  canStructure,
  readOnly,
  onSelect,
  onLayout,
  onInsert,
  onAddKind,
  extraActions,
}: {
  layout: FormSection[];
  item: (name: string) => BoardItem;
  kinds: FieldKind[];
  selected: string | null;
  canStructure: boolean;
  readOnly: boolean;
  onSelect: (name: string) => void;
  onLayout: (next: FormSection[]) => void;
  /** Places a new field of `kind` at `index` in section `section`. */
  onInsert: (kind: string, section: number, index: number) => void;
  /** A palette button clicked rather than dragged. */
  onAddKind: (kind: string) => void;
  extraActions?: ReactNode;
}) {
  const id = useId();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const [working, setWorking] = useState<FormSection[] | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const shown = working ?? layout;

  const containerOf = (target: string, sections: FormSection[]) =>
    target.startsWith(SECTION) ? Number(target.slice(SECTION.length)) : sections.findIndex((s) => s.fields.includes(target));

  function onDragStart(event: DragStartEvent) {
    setActive(String(event.active.id));
    setWorking(layout.map((s) => ({ ...s, fields: [...s.fields] })));
  }

  function onDragOver({ active: dragged, over }: DragOverEvent) {
    if (!over || !working) return;
    const activeId = String(dragged.id);
    const moving = activeId.startsWith(PALETTE) ? NEW : activeId;
    const overId = String(over.id);
    if (overId === moving) return;
    const to = containerOf(overId, working);
    if (to < 0) return;
    const from = containerOf(moving, working);
    if (from === to) {
      // The new field's gap follows the pointer within a section; existing
      // fields are animated by the sortable list itself until the drop.
      if (moving === NEW && !overId.startsWith(SECTION)) {
        setWorking((sections) =>
          sections?.map((s, i) => {
            if (i !== to) return s;
            const fromIndex = s.fields.indexOf(NEW);
            const toIndex = s.fields.indexOf(overId);
            return fromIndex === toIndex || toIndex < 0 ? s : { ...s, fields: arrayMove(s.fields, fromIndex, toIndex) };
          }) ?? sections,
        );
      }
      return;
    }
    // Entering another section: take the item (or the new field's gap) across.
    setWorking((sections) => {
      if (!sections) return sections;
      const next = sections.map((s) => ({ ...s, fields: s.fields.filter((name) => name !== moving) }));
      const target = next[to].fields;
      const at = overId.startsWith(SECTION) ? target.length : Math.max(0, target.indexOf(overId));
      target.splice(at, 0, moving);
      return next;
    });
  }

  function onDragEnd({ active: dragged, over }: DragEndEvent) {
    const sections = working;
    setActive(null);
    setWorking(null);
    if (!sections) return;
    const activeId = String(dragged.id);
    const moving = activeId.startsWith(PALETTE) ? NEW : activeId;
    let result = sections;
    if (over) {
      const overId = String(over.id);
      const container = containerOf(moving, sections);
      if (container >= 0 && !overId.startsWith(SECTION)) {
        const list = sections[container].fields;
        const from = list.indexOf(moving);
        const to = list.indexOf(overId);
        if (from >= 0 && to >= 0 && from !== to) {
          result = sections.map((s, i) => (i === container ? { ...s, fields: arrayMove(list, from, to) } : s));
        }
      }
    }
    if (moving === NEW) {
      const container = containerOf(NEW, result);
      if (over && container >= 0) onInsert(activeId.slice(PALETTE.length), container, result[container].fields.indexOf(NEW));
      return;
    }
    if (JSON.stringify(result) !== JSON.stringify(layout)) onLayout(result);
  }

  const activeKind = active?.startsWith(PALETTE) ? kinds.find((k) => `${PALETTE}${k.id}` === active) : undefined;
  const activeItem = active && !active.startsWith(PALETTE) ? item(active) : undefined;

  return (
    <DndContext id={id} sensors={sensors} collisionDetection={closestCorners} onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd} onDragCancel={() => { setActive(null); setWorking(null); }}>
      {canStructure && (
        <div className="rounded-2xl border border-border bg-canvas p-4">
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <h2 className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">Add a field</h2>
            <span className="text-xs text-muted-foreground">drag into the form, or click</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {kinds.map((kind) => (
              <PaletteButton key={kind.id} kind={kind} onClick={() => onAddKind(kind.id)} />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1 rounded-2xl border border-border bg-canvas p-2">
        {shown.map((section, index) => (
          <SectionDrop key={index} index={index} section={section} sections={shown} canStructure={canStructure} readOnly={readOnly} onLayout={onLayout} layout={layout}>
            <SortableContext items={section.fields} strategy={verticalListSortingStrategy}>
              {section.fields.length === 0 && (
                <p className="mx-1 rounded-xl border border-dashed border-(--color-ink-300) px-3 py-4 text-center text-xs text-muted-foreground">Drop a field here</p>
              )}
              {section.fields.map((name) =>
                name === NEW ? (
                  <SortableField key={NEW} id={NEW} disabled>
                    {() => (
                      <div className="rounded-xl border-2 border-dashed border-primary bg-(--color-gold-100)/60 px-3 py-3 text-sm font-medium text-(--color-gold-800)">
                        New {activeKind?.label.toLowerCase() ?? "field"} goes here
                      </div>
                    )}
                  </SortableField>
                ) : (
                  <SortableField key={name} id={name} disabled={!canStructure}>
                    {(handle) => <FieldRow entry={item(name)} handle={canStructure ? handle : null} selected={selected === name} onSelect={() => onSelect(name)} />}
                  </SortableField>
                ),
              )}
            </SortableContext>
          </SectionDrop>
        ))}
        {canStructure && (
          <div className="flex flex-wrap gap-2 p-2">
            <button type="button" onClick={() => onLayout([...layout, { title: "New section", fields: [] }])} className={cn(consoleButton.ghost, "text-primary-ink")}>
              <Plus aria-hidden="true" /> Section
            </button>
            {extraActions}
          </div>
        )}
      </div>

      <DragOverlay dropAnimation={{ duration: 160, easing: "cubic-bezier(0.2, 0, 0, 1)" }}>
        {activeItem ? (
          <div className="rotate-[0.6deg] rounded-xl bg-canvas shadow-[0_16px_40px_rgb(15_31_61/0.22)] ring-1 ring-primary">
            <FieldRow entry={activeItem} handle={<span className="inline-flex size-7 items-center justify-center text-muted-foreground"><GripVertical className="size-4" aria-hidden="true" /></span>} selected onSelect={() => {}} />
          </div>
        ) : activeKind ? (
          <div className="flex w-44 flex-col rounded-xl border border-primary bg-(--color-gold-100) px-3 py-2.5 shadow-[0_16px_40px_rgb(15_31_61/0.22)]">
            <span className="text-[0.8rem] font-semibold text-secondary-text">{activeKind.label}</span>
            <span className="text-[0.7rem] text-muted-foreground">{activeKind.hint}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function PaletteButton({ kind, onClick }: { kind: FieldKind; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `${PALETTE}${kind.id}` });
  return (
    <button
      type="button"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={onClick}
      aria-label={`${kind.label}: click to add after the selected field, or drag into the form`}
      className={cn(
        "flex cursor-grab touch-none flex-col items-start rounded-xl border border-dashed border-(--color-ink-300) bg-surface px-3 py-2.5 text-left transition-colors hover:border-primary hover:bg-(--color-gold-100)/60 active:cursor-grabbing",
        isDragging && "opacity-40",
      )}
    >
      <span className="text-[0.8rem] font-medium text-secondary-text">{kind.label}</span>
      <span className="text-[0.7rem] text-muted-foreground">{kind.hint}</span>
    </button>
  );
}

function SectionDrop({
  index,
  section,
  sections,
  layout,
  canStructure,
  readOnly,
  onLayout,
  children,
}: {
  index: number;
  section: FormSection;
  sections: FormSection[];
  layout: FormSection[];
  canStructure: boolean;
  readOnly: boolean;
  onLayout: (next: FormSection[]) => void;
  children: ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `${SECTION}${index}` });
  const confirm = useConfirm();
  return (
    <div ref={setNodeRef} className={cn("flex flex-col gap-0.5 rounded-xl pb-1 transition-colors", isOver && "bg-(--color-gold-100)/35")}>
      {(sections.length > 1 || canStructure) && (
        <div className="flex items-center gap-2 px-2 pt-2 pb-1">
          <span className="font-mono text-xs font-semibold text-primary-ink">{index + 1}</span>
          <input
            aria-label={`Section ${index + 1} title`}
            value={section.title}
            disabled={readOnly}
            placeholder={sections.length > 1 ? "Section title" : "Untitled section"}
            onChange={(e) => onLayout(layout.map((s, i) => (i === index ? { ...s, title: e.target.value } : s)))}
            className="min-w-0 flex-1 rounded-md bg-transparent px-1.5 py-1 text-sm font-semibold text-primary-ink outline-none placeholder:font-normal placeholder:text-muted-foreground hover:bg-surface focus:bg-surface"
          />
          {canStructure && layout.length > 1 && (
            <button
              type="button"
              aria-label={`Remove section ${index + 1}`}
              title="Remove section (its fields join the next one)"
              onClick={async () => {
                if (!(await confirm({ title: `Remove the section “${section.title || `Section ${index + 1}`}”?`, body: "Its fields aren't deleted: they move into the neighbouring section.", action: "Remove section" }))) return;
                const target = index === 0 ? 1 : index - 1;
                onLayout(
                  layout
                    .map((s, i) => (i === target ? { ...s, fields: target < index ? [...s.fields, ...layout[index].fields] : [...layout[index].fields, ...s.fields] } : s))
                    .filter((_, i) => i !== index),
                );
              }}
              className={consoleButton.icon}
            >
              <Trash2 aria-hidden="true" />
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

function SortableField({ id, disabled, children }: { id: string; disabled?: boolean; children: (handle: ReactNode) => ReactNode }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id, disabled });
  const handle = (
    <button
      type="button"
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      aria-label="Drag to move this field"
      className="inline-flex size-7 shrink-0 cursor-grab touch-none items-center justify-center rounded-md text-(--color-ink-500) outline-none hover:bg-canvas hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 active:cursor-grabbing"
    >
      <GripVertical className="size-4" aria-hidden="true" />
    </button>
  );
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Translate.toString(transform), transition }} className={cn(isDragging && "opacity-30")}>
      {children(handle)}
    </div>
  );
}

function FieldRow({ entry, handle, selected, onSelect }: { entry: BoardItem; handle: ReactNode; selected: boolean; onSelect: () => void }) {
  return (
    <div className={cn("flex items-center gap-1.5 rounded-xl border px-1.5 py-1.5 transition-colors", selected ? "border-primary bg-(--color-gold-100)" : "border-transparent hover:bg-surface")}>
      {handle ?? <span className="w-7" />}
      <button type="button" onClick={onSelect} aria-pressed={selected} className="flex min-w-0 flex-1 flex-col py-0.5 text-left">
        <span className="truncate text-sm font-medium">{entry.title || "Untitled"}</span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">{entry.meta}</span>
      </button>
      {entry.required ? (
        <span className="rounded-full bg-ember/10 px-2.5 py-0.5 text-xs font-semibold text-ember">Required</span>
      ) : (
        <span className="px-2 text-xs text-muted-foreground">Optional</span>
      )}
    </div>
  );
}
