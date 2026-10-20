"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Undo and redo for an editor's whole state. Changes arriving in quick
// succession (typing a label) are kept as one step, so Undo takes back the
// word, not the last letter. Ctrl/⌘+Z undoes, Ctrl/⌘+Shift+Z or Ctrl+Y redoes.

const GROUP_MS = 700;
const LIMIT = 200;

export function useHistory<T>(initial: T) {
  const [state, setState] = useState({ past: [] as T[], present: initial, future: [] as T[] });
  const lastChange = useRef(0);
  const groupKey = useRef<string | null>(null);

  /** Records a change. Calls with the same `group` close together merge into one step. */
  const set = useCallback((next: T | ((current: T) => T), group?: string) => {
    setState((current) => {
      const value = typeof next === "function" ? (next as (c: T) => T)(current.present) : next;
      if (Object.is(value, current.present)) return current;
      const now = Date.now();
      const merge = group !== undefined && group === groupKey.current && now - lastChange.current < GROUP_MS;
      lastChange.current = now;
      groupKey.current = group ?? null;
      if (merge) return { ...current, present: value, future: [] };
      return { past: [...current.past, current.present].slice(-LIMIT), present: value, future: [] };
    });
  }, []);

  const undo = useCallback(() => {
    groupKey.current = null;
    setState((current) =>
      current.past.length
        ? { past: current.past.slice(0, -1), present: current.past[current.past.length - 1], future: [current.present, ...current.future] }
        : current,
    );
  }, []);

  const redo = useCallback(() => {
    groupKey.current = null;
    setState((current) =>
      current.future.length
        ? { past: [...current.past, current.present], present: current.future[0], future: current.future.slice(1) }
        : current,
    );
  }, []);

  return { value: state.present, set, undo, redo, canUndo: state.past.length > 0, canRedo: state.future.length > 0 };
}

/** Binds the undo/redo shortcuts while `enabled`. */
export function useUndoShortcuts(undo: () => void, redo: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.altKey) return;
      const key = event.key.toLowerCase();
      if (key === "z") {
        event.preventDefault();
        if (event.shiftKey) redo();
        else undo();
      } else if (key === "y" && !event.metaKey) {
        event.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo, enabled]);
}
