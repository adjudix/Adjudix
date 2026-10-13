"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

type Phase = "hidden" | "appear" | "waiting" | "handoff" | "done";

/** Fired on window (and marked on <html>) once the intro is out of the way. */
export const INTRO_DONE_EVENT = "adjudix:intro-done";

// The reel is 5.375s. The fallback fires a little after that in case the
// video's "ended" event never arrives (autoplay blocked, load failure) —
// normally the scroll prompt is triggered by playback actually finishing,
// not by this guess.
const REEL_DURATION_MS = 5375;
const FALLBACK_MS = REEL_DURATION_MS + 400;

/**
 * One-time intro: the client's own animated logo reel plays centered, full
 * length, then holds on its last frame with a prompt to scroll. The
 * visitor's first scroll (or swipe, key press, or tap on the prompt) hands
 * the logo off to its real position in the header top bar —
 * moved and scaled uniformly (never stretched to fit the header lockup's
 * different aspect ratio) while fading out. Runs once per full page load —
 * Next's App Router keeps the root layout mounted across client-side
 * navigations, so this never re-plays on an internal link click, only on a
 * hard load/refresh.
 *
 * Only when that load starts on the home page: on any other page the intro
 * would hide the content a visitor (often arriving from search) came for.
 */
export function PageLoader() {
  // The first path only — the root layout stays mounted, so a later client-side
  // navigation to "/" doesn't start the intro.
  const [onHome] = useState(usePathname() === "/");

  useEffect(() => {
    if (onHome) return;
    // No intro: let what waits for it (the consultation pop-up) start now.
    document.documentElement.dataset.introDone = "true";
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));
  }, [onHome]);

  return onHome ? <IntroReel /> : null;
}

function IntroReel() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const logoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handoffFiredRef = useRef(false);
  const reelEndedRef = useRef(false);
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
      window.setTimeout(endReel, FALLBACK_MS),
    ];

    return () => timers.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "done") return;
    document.documentElement.dataset.introDone = "true";
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));
  }, [phase]);

  // While the intro is up the page underneath must not scroll; once the reel
  // has ended, the visitor's first scroll gesture is what moves the logo up.
  useEffect(() => {
    if (phase === "done") return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [phase === "done"]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (phase !== "waiting") return;
    const go = () => triggerHandoffRef.current();
    let touchY: number | null = null;

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) go();
    };
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "End", "Enter"].includes(event.key)) {
        event.preventDefault();
        go();
      }
    };
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY;
      // A finger moving up the screen is a scroll down the page.
      if (touchY !== null && y !== undefined && touchY - y > 24) go();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [phase]);

  // Fires once, whichever comes first: the reel finishing or the fallback.
  function endReel() {
    if (reelEndedRef.current) return;
    reelEndedRef.current = true;
    setPhase((current) => (current === "handoff" || current === "done" ? current : "waiting"));
  }

  if (phase === "done") return null;

  const isHidden = phase === "hidden";
  const inHandoff = phase === "handoff";
  const waiting = phase === "waiting";

  return (
    <div
      data-intro=""
      className={`fixed inset-0 z-[100] flex touch-none items-center justify-center overflow-hidden bg-canvas transition-opacity duration-1000 ${
        inHandoff ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div
        ref={logoRef}
        aria-hidden="true"
        className={`relative transition-all duration-1200 ease-in-out ${
          isHidden ? "scale-95 opacity-0" : inHandoff ? "opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <video
          // A callback ref fires the moment the node is attached — earlier
          // than any effect — so `.muted` is true before Safari evaluates
          // whether autoplay is allowed. The `muted` attribute below alone
          // isn't reliably enough for Safari's autoplay gate, which checks
          // the live DOM property rather than the reflected attribute; but
          // don't also call `.play()` here — that was tried and made things
          // worse; mutating `.muted` on a video with an autoplay attempt
          // already in flight makes Safari reset the resource internally,
          // which aborts that in-flight attempt and rejects its promise
          // with a harmless AbortError, not a real autoplay failure.
          ref={(el) => {
            videoRef.current = el;
            if (el) el.muted = true;
          }}
          src="/video/logo-loop.mp4"
          poster="/images/logo-full.webp"
          width={1376}
          height={768}
          className="h-60 w-auto md:h-80"
          autoPlay
          muted
          playsInline
          onEnded={endReel}
          onError={(e) => console.error("[PageLoader] video failed to load", e.currentTarget.error)}
        />
        {/* The reel's last frame is still mid-sway; its first frame is the
            logo at rest. Fade that frame in over the end so the intro holds
            on the original logo while it waits for the visitor. */}
        <Image
          src="/images/logo-loader-rest.webp"
          alt=""
          width={1376}
          height={768}
          // Drawn at the reel's size (h-60 / md:h-80), not full resolution.
          sizes="(min-width: 768px) 573px, 430px"
          loading="eager"
          className={`absolute inset-0 h-full w-full transition-opacity duration-500 ease-out ${
            waiting || inHandoff ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Appears once the reel has finished; the page waits for the visitor. */}
      <button
        type="button"
        onClick={() => triggerHandoffRef.current()}
        tabIndex={waiting ? 0 : -1}
        aria-hidden={!waiting}
        className={`absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 rounded-full px-5 py-3 text-muted-foreground transition-all duration-700 ease-out hover:text-primary-ink focus-visible:outline-2 focus-visible:outline-primary md:bottom-14 ${
          waiting ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <span className="font-mono text-[0.7rem] font-semibold tracking-[0.3em] uppercase">Scroll to explore</span>
        <span className="flex h-9 w-6 justify-center rounded-full border-2 border-current pt-1.5" aria-hidden="true">
          <span className="h-2 w-1 animate-bounce rounded-full bg-current" />
        </span>
        <ChevronDown className="size-4 animate-bounce text-primary-ink" aria-hidden="true" />
      </button>
    </div>
  );
}
