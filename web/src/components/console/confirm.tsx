"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { Dialog } from "@/components/console/dialog";
import { consoleButton } from "@/components/console/ui";

// One "Are you sure?" dialog for the whole console. Anything that removes
// something asks first:
//   const confirm = useConfirm();
//   if (await confirm({ title: "Delete this field?", action: "Delete field" })) …

export interface ConfirmOptions {
  title: string;
  body?: ReactNode;
  /** The button that goes ahead, e.g. "Delete field". */
  action?: string;
}

type Ask = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<Ask>(async () => window.confirm("Are you sure?"));

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolver = useRef<((answer: boolean) => void) | null>(null);

  const ask = useCallback<Ask>(
    (next) =>
      new Promise((resolve) => {
        resolver.current?.(false);
        resolver.current = resolve;
        setOptions(next);
      }),
    [],
  );

  const answer = (value: boolean) => {
    resolver.current?.(value);
    resolver.current = null;
    setOptions(null);
  };

  return (
    <ConfirmContext.Provider value={ask}>
      {children}
      <Dialog
        open={options !== null}
        onOpenChange={(open) => !open && answer(false)}
        title={options?.title ?? ""}
        footer={
          <>
            <button type="button" autoFocus onClick={() => answer(false)} className={consoleButton.secondary}>
              Cancel
            </button>
            <button type="button" onClick={() => answer(true)} className={consoleButton.danger}>
              {options?.action ?? "Delete"}
            </button>
          </>
        }
      >
        <div className="text-sm leading-relaxed text-muted-foreground">
          {options?.body ?? "This can't be undone once you save or publish. Until then, Undo brings it back."}
        </div>
      </Dialog>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmContext);
}
