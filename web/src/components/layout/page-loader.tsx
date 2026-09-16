"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "hidden" | "appear" | "handoff" | "done";

// The reel is 5.875s. The fallback fires a little after that in case the
// video's "ended" event never arrives (autoplay blocked, load failure) —
// normally the handoff is triggered by playback actually finishing, not by
// this guess.
const REEL_DURATION_MS = 5875;
const FALLBACK_MS = REEL_DURATION_MS + 400;

/**
 * One-time intro: the client's own animated logo reel plays centered, full
 * length, then hands off to its real position in the header top bar —
 * moved and scaled uniformly (never stretched to fit the header lockup's
 * different aspect ratio) while fading out. Runs once per full page load —
 * Next's App Router keeps the root layout mounted across client-side
 * navigations, so this never re-plays on an internal link click, only on a
 * hard load/refresh.
 */
export function PageLoader() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const logoRef = useRef<HTMLDivElement>(null);
  const handoffFiredRef = useRef(false);
  const triggerHandoffRef = useRef<() => void>(() => {});
  const postHandoffTimersRef = useRef<number[]>([]);

  // Fires exactly once — whichever comes first, the reel actually finishing
  // or the fallback timer — so the handoff can't fire twice and can't get
  // stuck waiting on an "ended" event that never arrives.
  useEffect(() => {
    triggerHandoffRef.current = () => {
      if (handoffFiredRef.current) return;
      handoffFiredRef.current = true;

      const target =
        document.getElementById("site-logo-target") ??
        document.getElementById("site-logo-target-mobile");
      const logoEl = logoRef.current;
      if (target && logoEl && target.clientWidth > 0) {
        const t = target.getBoundingClientRect();
        const l = logoEl.getBoundingClientRect();
        // Uniform scale only, matched to the target's height — the loader
        // reel and the header lockup are different shapes, so scaling
        // non-uniformly to fill the target's box would stretch/squeeze the
        // artwork. This keeps its real proportions and just lands it at
        // the header logo's spot.
        const scale = t.height / l.height;
        // Land on the center of the target logo's LEFT HALF (not its full
        // center) — the header top bar centers the logo alone, so aiming
        // for its true center puts the handoff at dead-center of the page;
        // this puts it visibly left of that instead.
        const dx = t.left + t.width / 4 - (l.left + l.width / 2);
        const dy = t.top + t.height / 2 - (l.top + l.height / 2);
        // Set the transform directly (not via CSS custom properties) and
        // imperatively rather than through React's style prop — React
        // re-creates the style object every render here, and reconciling
        // that against a value this component set out-of-band was
        // silently dropping the transform (computed style came back as
        // identity despite the inline style text showing the right
        // custom-property values). Setting a concrete value directly on
        // the node sidesteps that entirely.
        logoEl.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      }
      setPhase("handoff");

      // The background overlay and the logo fade out together, starting
      // right now — not one after the other — so the real page underneath
      // shows through the instant the logo is gone, instead of sitting
      // behind another few hundred ms of opaque white.
      postHandoffTimersRef.current = [window.setTimeout(() => setPhase("done"), 1800)];
    };
    return () => {
      postHandoffTimersRef.current.forEach(window.clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // One-time environment check on mount, not a reactive sync — skip the
      // animation entirely rather than force it on a reduced-motion viewer.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      return;
    }

    const timers = [
      window.setTimeout(() => setPhase("appear"), 100),
      window.setTimeout(() => triggerHandoffRef.current(), FALLBACK_MS),
    ];

    return () => timers.forEach(window.clearTimeout);
  }, []);

  if (phase === "done") return null;

  const isHidden = phase === "hidden";
  const inHandoff = phase === "handoff";

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-canvas transition-opacity duration-1000 ${
        inHandoff ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div
        ref={logoRef}
        className={`transition-all duration-1200 ease-in-out ${
          isHidden ? "scale-95 opacity-0" : inHandoff ? "opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <video
          src="/video/logo-loop.mp4"
          poster="/images/logo-full.png"
          width={1376}
          height={768}
          className="h-60 w-auto md:h-80"
          autoPlay
          muted
          playsInline
          onEnded={() => triggerHandoffRef.current()}
        />
      </div>
    </div>
  );
}
