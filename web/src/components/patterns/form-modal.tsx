"use client";

import { useRouter } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

/**
 * An action form opened over the page the visitor was on. Closing it (the X,
 * Escape, the backdrop, or the browser's Back button) returns them to that
 * page exactly where they were.
 */
export function FormModal({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Dialog.Root defaultOpen onOpenChange={(open) => !open && router.back()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-hero/60 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-sm" />
        <Dialog.Popup className="fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col overflow-hidden rounded-t-2xl bg-canvas shadow-2xl transition duration-200 ease-out data-ending-style:translate-y-6 data-ending-style:opacity-0 data-starting-style:translate-y-6 data-starting-style:opacity-0 sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:max-h-[88dvh] sm:w-[min(44rem,calc(100vw-3rem))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:data-ending-style:-translate-y-[48%] sm:data-starting-style:-translate-y-[48%]">
          <div className="flex items-start justify-between gap-4 border-b border-border px-6 pt-6 pb-4 sm:px-8">
            <div>
              <Dialog.Title className="text-left font-heading text-xl font-semibold text-foreground sm:text-2xl">
                {title}
              </Dialog.Title>
              <Dialog.Description className="mt-1.5 max-w-xl text-left font-body text-sm text-muted-foreground hyphens-none">
                {intro}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="-mt-1 -mr-2 inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-surface hover:text-foreground"
            >
              <XIcon className="size-5" aria-hidden="true" />
            </Dialog.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">{children}</div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
