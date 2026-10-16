import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "cn";
import { Check, ChevronDown } from "lucide-react";

function Select<Value, Multiple extends boolean | undefined = false>(
  props: SelectPrimitive.Root.Props<Value, Multiple>
) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "group flex h-[52px] w-full items-center justify-between gap-2 rounded-md border border-border bg-canvas px-4 text-left font-body text-[0.95rem] text-text outline-none transition-colors hover:border-secondary-border focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:border-ring data-[placeholder]:text-text-muted",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <ChevronDown
          className="size-4 shrink-0 text-text-muted transition-transform duration-200 group-data-popup-open:rotate-180"
          aria-hidden="true"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectContent({
  className,
  children,
  sideOffset = 8,
  align = "start",
  alignItemWithTrigger = false,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Positioner> &
  Pick<React.ComponentProps<typeof SelectPrimitive.Popup>, "children">) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        sideOffset={sideOffset}
        align={align}
        alignItemWithTrigger={alignItemWithTrigger}
        className="z-50 w-(--anchor-width)"
        {...props}
      >
        <SelectPrimitive.Popup
          className={cn(
            "scrollbar-refined max-h-[min(22rem,var(--available-height))] w-full origin-(--transform-origin) overflow-auto rounded-md border border-border bg-popover p-1.5 text-popover-foreground shadow-lg outline-none transition-[opacity,transform] duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
            className
          )}
        >
          {children}
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-[calc(var(--radius-md)-2px)] py-2.5 pr-3 pl-8 font-body text-sm text-text outline-none select-none data-highlighted:bg-surface data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2.5 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-3.5 text-primary-ink" aria-hidden="true" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectGroup(props: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group {...props} />;
}

function SelectGroupLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.GroupLabel>) {
  return (
    <SelectPrimitive.GroupLabel
      className={cn(
        "px-2.5 pt-3 pb-1 font-mono text-[0.68rem] font-semibold tracking-widest text-primary-ink uppercase",
        className
      )}
      {...props}
    />
  );
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectGroupLabel };
