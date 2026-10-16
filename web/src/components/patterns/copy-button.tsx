"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Copies `text` to the clipboard, confirming in place for a moment. */
export function CopyButton({ text, label = "Copy clause" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context, denied permission): the text is
      // still on the page to select by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-canvas px-3 py-1.5 font-body text-xs font-medium text-text hover:border-primary hover:text-primary-ink"
    >
      {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
