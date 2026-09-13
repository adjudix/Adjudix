"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "up" (default) fades in while rising; "none" only fades. */
  direction?: "up" | "none";
}

export function Reveal({ children, className = "", delay = 0, direction = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // Environments without IntersectionObserver (older browsers, test/SSR
      // runners) get the content immediately rather than permanently hidden.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const hiddenState = direction === "up" ? "opacity-0 translate-y-6" : "opacity-0";

  return (
    <div
      ref={ref}
      // motion-reduce: forces the visible end-state via CSS regardless of JS
      // visibility, so a reduced-motion viewer never waits on the observer.
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        visible ? "opacity-100 translate-y-0" : hiddenState
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
