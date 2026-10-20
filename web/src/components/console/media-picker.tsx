"use client";

import { useRef, useState, type ReactNode } from "react";
import { Dialog } from "@/components/console/dialog";
import { MediaLibrary } from "@/components/console/media-library";
import type { MediaPicker } from "@/components/console/schema-editor";

/** A "Choose…" dialog over the media library, for image and file fields. */
export function useMediaPicker(): { picker: MediaPicker; dialog: ReactNode } {
  const [open, setOpen] = useState<"image" | "any" | null>(null);
  const resolver = useRef<((url: string | null) => void) | null>(null);

  const close = (url: string | null) => {
    resolver.current?.(url);
    resolver.current = null;
    setOpen(null);
  };

  const picker: MediaPicker = {
    pick: (accept) =>
      new Promise((resolve) => {
        resolver.current = resolve;
        setOpen(accept);
      }),
  };

  const dialog = (
    <Dialog open={open !== null} onOpenChange={(next) => !next && close(null)} title="Choose a file" description="Upload a new one or pick from the library." wide>
      {open && <MediaLibrary accept={open} onPick={(row) => close(row.url)} />}
    </Dialog>
  );

  return { picker, dialog };
}
