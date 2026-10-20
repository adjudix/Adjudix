"use client";

import type { ReactNode } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** A centred console dialog (a bottom sheet on phones). */
export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  wide,
  children,
  footer,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  wide?: boolean;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-(--color-navy-950)/55 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-[2px]" />
        <BaseDialog.Popup
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col overflow-hidden rounded-t-2xl bg-canvas font-body shadow-[0_24px_64px_rgb(10_21_38/0.28)] transition duration-200 ease-out data-ending-style:translate-y-4 data-ending-style:opacity-0 data-starting-style:translate-y-4 data-starting-style:opacity-0",
            "sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:max-h-[88dvh] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:data-ending-style:-translate-y-[48%] sm:data-starting-style:-translate-y-[48%]",
            wide ? "sm:w-[min(52rem,calc(100vw-3rem))]" : "sm:w-[min(32rem,calc(100vw-3rem))]",
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-border px-6 pt-5 pb-4">
            <div className="min-w-0">
              <BaseDialog.Title className="font-heading text-2xl font-medium text-foreground">{title}</BaseDialog.Title>
              {description && <BaseDialog.Description className="mt-1 text-sm text-muted-foreground">{description}</BaseDialog.Description>}
            </div>
            <BaseDialog.Close
              aria-label="Close"
              className="-mr-2 inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-surface hover:text-foreground"
            >
              <XIcon className="size-5" aria-hidden="true" />
            </BaseDialog.Close>
          </div>
          <div className="scrollbar-refined min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>
          {footer && <div className="flex flex-wrap justify-end gap-2 border-t border-border px-6 py-4">{footer}</div>}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
