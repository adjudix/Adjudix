"use client";

import { useRef, useState, type DragEvent, type ReactNode } from "react";
import {
  AlertCircle,
  Briefcase,
  Building2,
  Check,
  FileText,
  Globe,
  GraduationCap,
  MapPin,
  Monitor,
  Phone,
  Shuffle,
  Upload,
  User,
  Users,
  Video,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Options that read faster with a pictogram beside them. Matched on the
// option's own wording, so the form definitions stay plain data.
const OPTION_ICONS: Record<string, LucideIcon> = {
  Online: Monitor,
  Remote: Monitor,
  "In person": MapPin,
  "In office": Building2,
  Hybrid: Shuffle,
  Either: Shuffle,
  "Phone call": Phone,
  "Video call": Video,
  Individual: User,
  Team: Users,
  Student: GraduationCap,
  Professional: Briefcase,
  "Practising professional": Briefcase,
  "Organisation / team": Building2,
  Other: Globe,
};

export function optionIcon(option: string): LucideIcon | undefined {
  return OPTION_ICONS[option];
}

export const inputClass =
  "h-12 w-full rounded-lg border border-border bg-canvas px-4 font-body text-[0.95rem] text-foreground shadow-[inset_0_1px_2px_rgb(15_31_61/0.05)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground/75 hover:border-secondary-border/50 focus-visible:border-secondary-border focus-visible:ring-4 focus-visible:ring-ring/20 aria-invalid:border-ember aria-invalid:ring-ember/15";

export function FieldLabel({
  htmlFor,
  required,
  optionalHint,
  children,
  as: Tag = "label",
}: {
  htmlFor?: string;
  required?: boolean;
  optionalHint?: boolean;
  children: ReactNode;
  as?: "label" | "legend" | "span";
}) {
  return (
    <Tag
      {...(Tag === "label" ? { htmlFor } : {})}
      className="mb-2 flex items-baseline gap-1.5 font-body text-sm font-medium text-foreground"
    >
      <span>{children}</span>
      {required && (
        <span className="text-ember" aria-hidden="true">
          *
        </span>
      )}
      {optionalHint && <span className="font-normal text-muted-foreground">Optional</span>}
    </Tag>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 font-body text-[0.8rem] text-ember empty:hidden">
      {message && (
        <>
          <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden="true" />
          <span>{message}</span>
        </>
      )}
    </p>
  );
}

export function FieldHint({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 text-left font-body text-xs text-muted-foreground">
      {children}
    </p>
  );
}

interface ChoiceProps {
  id: string;
  name: string;
  options: string[];
  value?: string;
  invalid?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
}

/** Short option sets as a row of pills — one tap, no dropdown. */
export function ChoicePills({ id, name, options, value, invalid, describedBy, onChange }: ChoiceProps) {
  return (
    <div
      role="radiogroup"
      aria-labelledby={`${id}-legend`}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      className="flex flex-wrap gap-2"
    >
      {options.map((option, index) => {
        const Icon = optionIcon(option);
        return (
          <label
            key={option}
            className={cn(
              "group relative inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border bg-canvas px-4 py-2 font-body text-sm font-medium text-foreground transition-[background-color,border-color,color,box-shadow] duration-150 select-none",
              "hover:border-secondary-border/60 has-checked:border-secondary-text has-checked:bg-secondary-text has-checked:text-canvas",
              "has-focus-visible:ring-4 has-focus-visible:ring-ring/25",
              invalid ? "border-ember/60" : "border-border",
            )}
          >
            <input
              type="radio"
              id={index === 0 ? id : undefined}
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {Icon && <Icon className="size-4 opacity-70 group-has-checked:opacity-100" aria-hidden="true" />}
            {option}
            <Check
              className="-mr-1 size-0 opacity-0 transition-all duration-150 group-has-checked:size-3.5 group-has-checked:opacity-100"
              aria-hidden="true"
            />
          </label>
        );
      })}
    </div>
  );
}

/** Longer options as selectable cards, each with a radio mark. */
export function ChoiceCards({
  id,
  name,
  options,
  value,
  invalid,
  describedBy,
  onChange,
  large,
}: ChoiceProps & { large?: boolean }) {
  return (
    <div
      role="radiogroup"
      aria-labelledby={`${id}-legend`}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      className={cn("grid gap-2.5", large && options.length % 3 === 0 ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2")}
    >
      {options.map((option, index) => {
        // Pictograms only when every option has one, so the cards match.
        const Icon = options.every(optionIcon) ? optionIcon(option) : undefined;
        return (
          <label
            key={option}
            className={cn(
              "group relative flex cursor-pointer rounded-xl border bg-canvas font-body text-foreground transition-[background-color,border-color,box-shadow] duration-150 select-none",
              "hover:border-secondary-border/60 has-checked:border-primary-ink has-checked:bg-primary/8 has-checked:shadow-[0_8px_20px_-14px_rgb(138_99_18/0.7)]",
              "has-focus-visible:ring-4 has-focus-visible:ring-ring/25",
              large && Icon ? "min-h-24 flex-col justify-between gap-3 p-4" : large ? "min-h-16 items-center gap-3 px-4 py-3.5" : "min-h-14 items-center gap-3 px-4 py-3",
              invalid ? "border-ember/60" : "border-border",
            )}
          >
            <input
              type="radio"
              id={index === 0 ? id : undefined}
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {large && Icon ? (
              <>
                <span className="flex items-start justify-between">
                  <Icon className="size-5 text-secondary-text group-has-checked:text-primary-ink" aria-hidden="true" />
                  <RadioMark />
                </span>
                <span className="text-[0.95rem] leading-snug font-semibold">{option}</span>
              </>
            ) : large ? (
              <>
                <RadioMark />
                <span className="text-[0.95rem] leading-snug font-semibold">{option}</span>
              </>
            ) : (
              <>
                <RadioMark />
                {Icon && <Icon className="size-4 text-muted-foreground" aria-hidden="true" />}
                <span className="text-sm leading-snug font-medium">{option}</span>
              </>
            )}
          </label>
        );
      })}
    </div>
  );
}

function RadioMark() {
  return (
    <span
      aria-hidden="true"
      className="flex size-[1.125rem] shrink-0 items-center justify-center rounded-full border-[1.5px] border-muted-foreground/50 transition-colors group-has-checked:border-primary-ink group-has-checked:bg-primary-ink"
    >
      <span className="size-1.5 scale-0 rounded-full bg-canvas transition-transform duration-150 group-has-checked:scale-100" />
    </span>
  );
}

/** Long lists (practice areas, professions) in the site's own dropdown. */
export function ChoiceSelect({
  id,
  name,
  options,
  groups,
  value,
  invalid,
  describedBy,
  onChange,
}: Omit<ChoiceProps, "options"> & { options?: string[]; groups?: { label: string; options: string[] }[] }) {
  return (
    <Select name={name} value={value ?? null} onValueChange={(next: string | null) => onChange(next ?? "")}>
      <SelectTrigger
        id={id}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        className="h-12 rounded-lg shadow-[inset_0_1px_2px_rgb(15_31_61/0.05)] focus-visible:ring-4 focus-visible:ring-ring/20 aria-invalid:border-ember"
      >
        <SelectValue placeholder="Choose one" />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
        {groups?.map((group) => (
          <SelectGroup key={group.label}>
            <SelectGroupLabel>{group.label}</SelectGroupLabel>
            {group.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

const ACCEPT = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Drag-and-drop upload over a real file input, so the files submit with the form. */
export function FileDrop({
  id,
  name,
  error,
  describedBy,
  onFilesChange,
}: {
  id: string;
  name: string;
  error?: string;
  describedBy?: string;
  onFilesChange?: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [over, setOver] = useState(false);

  function commit(next: File[]) {
    const input = inputRef.current;
    if (input) {
      const transfer = new DataTransfer();
      next.forEach((file) => transfer.items.add(file));
      input.files = transfer.files;
    }
    setFiles(next);
    onFilesChange?.(next);
  }

  function add(incoming: FileList | null) {
    if (!incoming) return;
    const allowed = Array.from(incoming).filter((file) =>
      ACCEPT.some((ext) => file.name.toLowerCase().endsWith(ext)),
    );
    const known = new Set(files.map((file) => `${file.name}:${file.size}`));
    commit([...files, ...allowed.filter((file) => !known.has(`${file.name}:${file.size}`))]);
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setOver(false);
    add(event.dataTransfer.files);
  }

  const total = files.reduce((sum, file) => sum + file.size, 0);

  return (
    <div>
      <label
        htmlFor={id}
        onDragOver={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center gap-2 rounded-xl border-[1.5px] border-dashed px-6 py-7 text-center transition-[background-color,border-color] duration-150",
          "has-focus-visible:ring-4 has-focus-visible:ring-ring/25",
          over ? "border-primary-ink bg-primary/10" : "border-border bg-canvas hover:border-secondary-border/60 hover:bg-surface",
          error && "border-ember/70",
        )}
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-surface text-secondary-text ring-1 ring-border">
          <Upload className="size-[1.1rem]" aria-hidden="true" />
        </span>
        <span className="font-body text-sm text-foreground">
          <span className="font-semibold text-primary-ink underline decoration-primary-ink/40 underline-offset-4">
            Choose files
          </span>{" "}
          or drag them here
        </span>
        <span className="font-body text-xs text-muted-foreground">PDF, Word, JPG or PNG · up to 10 MB in total</span>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          multiple
          accept={ACCEPT.join(",")}
          aria-describedby={describedBy}
          onChange={(event) => {
            // Re-adding keeps earlier picks: merge, then hand back the full set.
            const picked = event.target.files;
            const previous = files;
            if (!picked) return;
            const merged = [...previous];
            for (const file of Array.from(picked)) {
              if (!merged.some((f) => f.name === file.name && f.size === file.size)) merged.push(file);
            }
            commit(merged);
          }}
          className="sr-only"
        />
      </label>
      {files.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.size}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-canvas py-2 pr-2 pl-3 font-body text-sm"
            >
              <FileText className="size-4 shrink-0 text-secondary-text" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate text-foreground">{file.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{formatBytes(file.size)}</span>
              <button
                type="button"
                onClick={() => commit(files.filter((_, i) => i !== index))}
                aria-label={`Remove ${file.name}`}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-surface hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}
          <li className={cn("text-right font-body text-xs tabular-nums", total > MAX_ATTACHMENT_BYTES ? "text-ember" : "text-muted-foreground")}>
            {formatBytes(total)} of 10 MB
          </li>
        </ul>
      )}
    </div>
  );
}
