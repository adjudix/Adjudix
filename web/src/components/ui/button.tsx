import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Primary CTA — gold, per the locked "Navy, Gold & Ember" theme.
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        // Supporting action alongside a primary — navy outline, no fill.
        secondary:
          "border-secondary-border text-secondary-text bg-transparent hover:bg-surface",
        // Same role as secondary, for use on the dark hero/navy surface — the
        // light hover fill above is invisible against text-on-hero, so this
        // variant owns its own hover treatment instead of being overridden
        // per-instance.
        secondaryInverse:
          "border-border-on-hero text-text-on-hero bg-transparent hover:bg-white/10",
        // Tertiary/inline action, lowest visual weight.
        ghost:
          "text-secondary-text bg-transparent underline-offset-4 hover:underline rounded-lg",
        // Real destructive actions (withdraw application, delete draft).
        destructive: "bg-destructive text-white hover:opacity-90",
        // The brand's signature reserved-urgency CTA ("Emergency Arbitration").
        // Same color as destructive by design — see design/color-system.md —
        // kept as its own variant name so the intent in code matches the intent
        // on the page, even though the visual treatment is identical today.
        ember: "bg-ember text-ember-foreground hover:bg-ember-hover",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 px-4 text-[0.95rem] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends Omit<ButtonPrimitive.Props, "className">,
    VariantProps<typeof buttonVariants> {
  className?: string
  loading?: boolean
}

function Button({
  className,
  variant = "primary",
  size = "default",
  loading = false,
  disabled,
  children,
  render,
  nativeButton,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      render={render}
      // Base UI needs to know when it's rendering a non-<button> element (e.g.
      // a Next.js Link via `render`) so it doesn't apply native-button-only
      // behavior to it. Default to false whenever `render` swaps the element,
      // but let a caller override explicitly if the rendered element really
      // is a native button.
      nativeButton={nativeButton ?? !render}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span
            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          {children}
        </span>
      ) : (
        children
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
