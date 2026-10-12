"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { INTRO_DONE_EVENT } from "@/components/layout/page-loader";

// Client brief (Oct 2026): pop-up offering the first professional
// consultation free (₹4,999 struck to ₹0), with a countdown timer.
// Shown once per browser session, about a minute after the intro loader has
// finished — the intro now waits for the visitor to scroll, so the delay
// counts from its end rather than from page load.
const SHOW_AFTER_INTRO_MS = 60_000;
const SEEN_KEY = "adjudix-consultation-popup-seen";

// The offer window ends at midnight after an irregular 3–5 day cycle, so the
// deadline isn't an obvious daily reset. Cycle lengths come from a fixed
// sequence, so every visitor (and every reload) sees the same deadline.
const CYCLE_EPOCH = new Date(2026, 0, 1).getTime();
const CYCLE_DAYS = [4, 3, 5, 4, 5, 3, 4];
const DAY_MS = 86_400_000;

function offerDeadline(now: number) {
  let end = CYCLE_EPOCH;
  for (let i = 0; end <= now; i++) {
    const next = new Date(end);
    next.setDate(next.getDate() + CYCLE_DAYS[i % CYCLE_DAYS.length]);
    end = next.getTime();
  }
  return end;
}

function secondsLeft() {
  const now = Date.now();
  return Math.max(0, Math.floor((offerDeadline(now) - now) / 1000));
}

function formatCountdown(total: number) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const days = Math.floor(total / (DAY_MS / 1000));
  const rest = total % (DAY_MS / 1000);
  const clock = `${pad(Math.floor(rest / 3600))}:${pad(Math.floor((rest % 3600) / 60))}:${pad(rest % 60)}`;
  return days > 0 ? `${days}d ${clock}` : clock;
}

export function ConsultationPopup() {
  const [open, setOpen] = useState(false);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return;
    let timer: number | undefined;
    const schedule = () => {
      timer = window.setTimeout(() => {
        sessionStorage.setItem(SEEN_KEY, "1");
        setRemaining(secondsLeft());
        setOpen(true);
      }, SHOW_AFTER_INTRO_MS);
    };
    if (document.documentElement.dataset.introDone) schedule();
    else window.addEventListener(INTRO_DONE_EVENT, schedule, { once: true });
    return () => {
      window.removeEventListener(INTRO_DONE_EVENT, schedule);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const tick = window.setInterval(() => setRemaining(secondsLeft()), 1000);
    return () => window.clearInterval(tick);
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-canvas p-8 text-center shadow-xl transition duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          <Dialog.Close
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-md text-text-muted hover:bg-surface hover:text-text"
          >
            <XIcon className="size-4" aria-hidden="true" />
          </Dialog.Close>

          <p className="text-xs font-semibold uppercase tracking-wide text-ember">
            Limited offer
          </p>
          <Dialog.Title className="mt-2 font-heading text-2xl font-semibold text-text">
            Your first professional consultation is free
          </Dialog.Title>
          <p className="mt-4 font-heading text-3xl font-semibold text-text">
            <span className="mr-3 text-xl text-text-muted line-through">₹4,999/-</span>
            ₹0/-
          </p>
          <Dialog.Description className="mt-3 text-center font-body text-sm text-text-muted">
            Avail your free consultation with our professional panel — on any dispute,
            implementation, or drafting matter.
          </Dialog.Description>

          <div className="mt-6 rounded-md bg-surface px-4 py-3">
            <p className="text-center text-xs text-text-muted">Offer ends in</p>
            <p
              className="mt-1 font-mono text-2xl font-semibold tabular-nums text-text"
              aria-live="off"
            >
              {formatCountdown(remaining)}
            </p>
          </div>

          <LinkButton
            href="/contact"
            size="lg"
            className="mt-6 w-full"
            onClick={() => setOpen(false)}
          >
            Avail Free Consultation
          </LinkButton>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
