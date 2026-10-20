"use client";

import { cn } from "@/lib/utils";

/** An on/off switch: a real button with aria-pressed, not a styled div. */
export function Switch({
  checked,
  onChange,
  label,
  description,
  disabled,
  className,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "group flex items-center gap-3 rounded-xl text-left font-body text-sm text-foreground outline-none focus-visible:ring-4 focus-visible:ring-ring/25 disabled:opacity-50",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-200",
          checked ? "bg-(--color-success-600)" : "bg-(--color-ink-300)",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-4 rounded-full bg-canvas shadow-[0_1px_2px_rgb(0_0_0/0.2)] transition-[left] duration-200",
            checked ? "left-4.5" : "left-0.5",
          )}
        />
      </span>
      <span className="min-w-0">
        <span className="block font-medium">{label}</span>
        {description && <span className="block text-xs text-muted-foreground">{description}</span>}
      </span>
    </button>
  );
}
