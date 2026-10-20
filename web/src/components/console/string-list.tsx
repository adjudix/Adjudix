"use client";

import { Plus, X } from "lucide-react";
import { SortableList } from "@/components/console/sortable";
import { consoleInput, consoleTextarea } from "@/components/console/ui";
import { newRowId, useRowIds } from "@/components/console/use-row-ids";
import { cn } from "@/lib/utils";

/**
 * An editable, reorderable list of short texts — a field's choices, a
 * list of bullet points, paragraphs. Each row keeps its own id so dragging
 * and typing never lose track of which row is which.
 */
export function StringList({
  value,
  onChange,
  singular = "item",
  multiline,
  label,
  placeholder,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  singular?: string;
  multiline?: boolean;
  label: string;
  placeholder?: string;
}) {
  const [ids, setIds] = useRowIds(value.length);

  const update = (next: string[], nextIds = ids) => {
    setIds(nextIds);
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <SortableList
        items={value.map((text, index) => ({ text, id: ids[index] }))}
        ids={ids}
        onReorder={(next) => update(next.map((row) => row.text), next.map((row) => row.id))}
        className="flex flex-col gap-1.5"
        renderItem={(row, index, handle) => (
          <div className="flex items-start gap-1.5">
            <span className="pt-1.5">{handle}</span>
            {multiline ? (
              <textarea
                aria-label={`${label}, ${singular} ${index + 1}`}
                value={row.text}
                rows={3}
                onChange={(event) => update(value.map((text, i) => (i === index ? event.target.value : text)))}
                className={cn(consoleTextarea, "min-h-20")}
              />
            ) : (
              <input
                aria-label={`${label}, ${singular} ${index + 1}`}
                value={row.text}
                placeholder={placeholder}
                onChange={(event) => update(value.map((text, i) => (i === index ? event.target.value : text)))}
                className={cn(consoleInput, "h-9")}
              />
            )}
            <button
              type="button"
              aria-label={`Remove ${singular} ${index + 1}`}
              onClick={() => update(value.filter((_, i) => i !== index), ids.filter((_, i) => i !== index))}
              className="mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-md text-(--color-ink-500) hover:bg-ember/8 hover:text-ember"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      />
      <button
        type="button"
        onClick={() => update([...value, ""], [...ids, newRowId()])}
        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-dashed border-(--color-ink-300) text-sm font-medium text-primary-ink hover:border-primary hover:bg-(--color-gold-100)/50"
      >
        <Plus className="size-4" aria-hidden="true" /> Add {singular}
      </button>
    </div>
  );
}
