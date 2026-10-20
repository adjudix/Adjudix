"use client";

import { useState } from "react";

// Stable ids for the rows of a list that has none of its own, so dragging,
// adding and removing never confuse one row's inputs with another's. When
// the list changes length from outside (undo, redo), ids are added or
// dropped at the end to match.

export const newRowId = () => `r${Math.random().toString(36).slice(2, 10)}`;

export function useRowIds(count: number) {
  const [ids, setIds] = useState<string[]>(() => Array.from({ length: count }, newRowId));
  let current = ids;
  if (ids.length !== count) {
    current = ids.slice(0, count);
    while (current.length < count) current.push(newRowId());
    // Adjusting state while rendering, as React allows when guarded like this.
    setIds(current);
  }
  return [current, setIds] as const;
}
