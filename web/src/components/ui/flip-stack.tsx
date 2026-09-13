"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface FlipCard {
  title: string;
  description: string;
  /** Omit for a solid brand-card face instead of a photo. */
  image?: string;
  alt?: string;
  /** Small label shown on a card-mode face, e.g. a tier or step name. */
  eyebrow?: string;
}

export interface FlipStackProps {
  cards: FlipCard[];
  /** Tailwind height classes for the stack; keep in sync with the paired text panel. */
  heightClassName?: string;
}

export function FlipStack({ cards, heightClassName = "h-[420px] md:h-[480px]" }: FlipStackProps) {
  const [active, setActive] = useState(0);
  const canPrev = active > 0;
  const canNext = active < cards.length - 1;

  function goNext() {
    setActive((a) => Math.min(cards.length - 1, a + 1));
  }
  function goPrev() {
    setActive((a) => Math.max(0, a - 1));
  }

  function handleFaceClick(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickedLeftHalf = event.clientX - rect.left < rect.width / 2;
    if (clickedLeftHalf) goPrev();
    else goNext();
  }

  return (
    <div className="flex flex-col">
      <div className={`relative ${heightClassName}`} style={{ perspective: "2000px" }}>
        {cards.map((card, i) => {
          const flipped = i < active;
          const depth = Math.max(0, i - active);
          return (
            <div
              key={card.title}
              className="absolute inset-0 transition-transform duration-700 ease-in-out"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
                transform: flipped
                  ? "rotateY(-180deg)"
                  : `translate(${depth * 7}px, ${depth * 7}px) rotateY(0deg)`,
                zIndex: flipped ? i : cards.length - depth,
              }}
            >
              {/* Front face */}
              <div
                role="button"
                tabIndex={0}
                aria-label={i === active ? `${card.title}, showing ${active + 1} of ${cards.length}` : undefined}
                onClick={i === active ? handleFaceClick : undefined}
                onKeyDown={(e) => {
                  if (i !== active) return;
                  if (e.key === "ArrowRight") goNext();
                  if (e.key === "ArrowLeft") goPrev();
                }}
                className={`absolute inset-0 overflow-hidden rounded-lg shadow-xl [backface-visibility:hidden] ${
                  i === active ? "cursor-pointer" : ""
                }`}
              >
                {card.image ? (
                  <>
                    <Image
                      src={card.image}
                      alt={card.alt ?? ""}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-hero/90 via-hero/10 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="font-heading text-xl font-semibold text-white">{card.title}</h3>
                      <p className="mt-1 text-sm text-white/80">{card.description}</p>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full flex-col justify-between bg-hero p-8 text-text-on-hero">
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-sm font-semibold tracking-wide">Adjudix</span>
                      {card.eyebrow && (
                        <span className="font-mono text-xs tracking-widest uppercase text-primary">
                          {card.eyebrow}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-heading text-3xl font-semibold text-balance">{card.title}</h3>
                      <p className="mt-3 max-w-sm font-body text-sm text-text-on-hero-muted">
                        {card.description}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-text-on-hero-muted">
                      {String(i + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>
              {/* Back face — shown once a card has been turned past */}
              <div
                className="absolute inset-0 rounded-lg border border-border bg-surface [backface-visibility:hidden]"
                style={{ transform: "rotateY(180deg)" }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1.5" role="tablist" aria-label="Card position">
          {cards.map((card, i) => (
            <button
              key={card.title}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to ${card.title}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-primary" : "w-1.5 bg-border hover:bg-text-muted"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            aria-label="Previous"
            className="flex size-9 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canNext}
            aria-label="Next"
            className="flex size-9 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
