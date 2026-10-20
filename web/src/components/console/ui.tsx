import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// The console's building blocks, in the site's own tokens: navy structure,
// gold for the one action that matters on a screen, Newsreader headings.

export const consoleInput =
  "h-10 w-full rounded-lg border border-border bg-canvas px-3 font-body text-sm text-foreground outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground/70 hover:border-secondary-border/50 focus-visible:border-secondary-border focus-visible:ring-4 focus-visible:ring-ring/20 aria-invalid:border-ember disabled:bg-surface disabled:text-muted-foreground";

export const consoleTextarea = cn(consoleInput, "h-auto min-h-24 resize-y py-2.5 leading-relaxed");

const buttonBase =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-body text-sm font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-150 outline-none select-none focus-visible:ring-4 focus-visible:ring-ring/30 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

export const consoleButton = {
  primary: cn(buttonBase, "h-10 bg-primary px-5 font-semibold text-primary-foreground shadow-[0_1px_2px_rgb(15_31_61/0.12)] hover:bg-primary-hover"),
  navy: cn(buttonBase, "h-10 bg-secondary-text px-5 text-canvas hover:bg-(--color-navy-700)"),
  secondary: cn(buttonBase, "h-10 border border-border bg-canvas px-4 text-secondary-text hover:border-secondary-border/60 hover:bg-surface"),
  ghost: cn(buttonBase, "h-9 px-3 text-secondary-text hover:bg-surface"),
  danger: cn(buttonBase, "h-10 border border-ember/30 bg-canvas px-4 text-ember hover:bg-ember/8"),
  icon: cn(buttonBase, "size-9 rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground"),
};

export function PageHead({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <p className="mb-1.5 font-body text-xs font-semibold tracking-[0.14em] text-primary-ink uppercase">{eyebrow}</p>}
        <h1 className="font-heading text-3xl font-medium tracking-tight text-balance text-foreground sm:text-[2.1rem]">{title}</h1>
        {description && <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({
  title,
  description,
  actions,
  className,
  bodyClassName,
  children,
}: {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("rounded-2xl border border-border bg-canvas", className)}>
      {(title || actions) && (
        <div className="flex flex-wrap items-start justify-between gap-3 px-5 pt-5">
          <div>
            {title && <h2 className="font-heading text-xl font-medium text-foreground">{title}</h2>}
            {description && <p className="mt-1 font-body text-sm text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

const tones = {
  neutral: "bg-(--color-ink-100) text-(--color-ink-700)",
  gold: "bg-(--color-gold-100) text-(--color-gold-800)",
  green: "bg-(--color-success-100) text-(--color-success-600)",
  blue: "bg-(--color-info-100) text-(--color-info-600)",
  amber: "bg-(--color-warning-100) text-[#7A4E06]",
  ember: "bg-ember text-ember-foreground",
  navy: "bg-secondary-text text-canvas",
};

export type Tone = keyof typeof tones;

export function Badge({ tone = "neutral", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-body text-xs font-semibold whitespace-nowrap", tones[tone], className)}>
      {children}
    </span>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  className,
  children,
}: {
  label: ReactNode;
  htmlFor?: string;
  hint?: ReactNode;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="font-body text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {error ? (
        <p className="font-body text-xs text-ember">{error}</p>
      ) : (
        hint && <p className="font-body text-xs leading-relaxed text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

export function EmptyState({ title, body, action }: { title: string; body?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-(--color-ink-300) px-6 py-14 text-center">
      <p className="font-heading text-xl font-medium text-foreground">{title}</p>
      {body && <p className="max-w-md font-body text-sm text-muted-foreground">{body}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export function Notice({ tone = "neutral", children }: { tone?: "neutral" | "error" | "success" | "warning"; children: ReactNode }) {
  const styles = {
    neutral: "bg-surface text-foreground ring-border",
    error: "bg-ember/6 text-foreground ring-ember/25",
    success: "bg-(--color-success-100) text-foreground ring-(--color-success-600)/25",
    warning: "bg-(--color-warning-100) text-foreground ring-(--color-warning-600)/25",
  };
  return (
    <div role={tone === "error" ? "alert" : "status"} className={cn("rounded-xl px-4 py-3 font-body text-sm leading-relaxed ring-1 ring-inset", styles[tone])}>
      {children}
    </div>
  );
}

/** "3 minutes ago", "yesterday", or a date — for activity and lists. */
export function timeAgo(date: Date | null | undefined) {
  if (!date) return "never";
  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  if (seconds < 45) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function initials(nameOrEmail: string) {
  const words = nameOrEmail.split(/[\s@._-]+/).filter(Boolean);
  return ((words[0]?.[0] ?? "") + (words[1]?.[0] ?? "")).toUpperCase() || "?";
}
