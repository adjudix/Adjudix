"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface FlipCard {
  title: string;
  description: string;
  /** Omit for a solid brand-card face instead of a photo. */
  image?: string;
  alt?: string;
  /** Small label shown on a card-mode face, e.g. a tier or step name. */
  eyebrow?: string;
  /** Optional supporting points shown below the description. */
  points?: string[];
}

export interface FlipStackProps {
  /** Static content for the left page of the spread. */
  panel: ReactNode;
  cards: FlipCard[];
  /** Tailwind aspect-ratio class applied to both pages of the spread. */
  aspectClassName?: string;
}

function CardFace({ card }: { card: FlipCard }) {
  if (card.image) {
    return (
      <div className="flex h-full flex-col">
        <div className="relative flex-1">
          <Image
            src={card.image}
            alt={card.alt ?? ""}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="bg-hero p-6 text-text-on-hero md:p-8">
          <h3 className="font-heading text-xl font-semibold md:text-2xl">{card.title}</h3>
          <p className="mt-2 font-body text-sm text-text-on-hero-muted">{card.description}</p>
          {card.points && (
            <ul className="mt-4 flex flex-col gap-2">
              {card.points.map((point) => (
                <li key={point} className="flex gap-2 font-body text-sm text-text-on-hero-muted">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col bg-hero p-8 text-text-on-hero md:p-10">
      <div className="flex items-center justify-between">
        <span className="font-heading text-sm font-semibold tracking-wide">Adjudix</span>
        {card.eyebrow && (
          <span className="font-mono text-xs tracking-widest uppercase text-primary">
            {card.eyebrow}
          </span>
        )}
      </div>
      <h3 className="mt-8 font-heading text-3xl font-semibold text-balance md:text-4xl">
        {card.title}
      </h3>
      <p className="mt-3 max-w-sm font-body text-sm text-text-on-hero-muted">{card.description}</p>
      {card.points && (
        <ul className="mt-6 flex flex-col gap-3">
          {card.points.map((point) => (
            <li key={point} className="flex gap-2.5 font-body text-sm text-text-on-hero-muted">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto flex items-center justify-between border-t border-border-on-hero pt-6">
        <span className="font-mono text-xs text-text-on-hero-muted">Adjudix Dispute Resolution Institute</span>
      </div>
    </div>
  );
}

/** The reverse of a turned page — a muted, darkened echo of its own face, not a blank box. */
function CardBack({ card }: { card: FlipCard }) {
  return (
    <div className="relative h-full overflow-hidden bg-hero">
      {card.image && (
        <Image
          src={card.image}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover opacity-25 grayscale"
        />
      )}
      <div className="absolute inset-0 bg-hero/80" aria-hidden="true" />
      <div className="absolute inset-0 flex flex-col justify-between p-8 text-text-on-hero">
        <span className="font-heading text-sm font-semibold tracking-wide">Adjudix</span>
        <span className="font-heading text-4xl font-semibold text-text-on-hero-muted/40">
          &sect;
        </span>
      </div>
    </div>
  );
}

export function FlipStack({ panel, cards, aspectClassName = "aspect-[4/5] md:aspect-[7/10]" }: FlipStackProps) {
  const [active, setActive] = useState(0);
  const canPrev = active > 0;
  const canNext = active < cards.length - 1;

  function goNext() {
    setActive((a) => Math.min(cards.length - 1, a + 1));
  }
  function goPrev() {
    setActive((a) => Math.max(0, a - 1));
  }

  return (
    <div className="flex flex-col">
      <div className="grid gap-0 md:grid-cols-2" style={{ perspective: "2000px" }}>
        {/* Left page — static, sits behind any turned page that swings over it */}
        <div className={`relative z-0 ${aspectClassName}`}>{panel}</div>

        {/* Right page area — hosts the stack; flipped pages are allowed to
            visually spill onto the left page since nothing here clips overflow */}
        <div className={`relative ${aspectClassName}`}>
          {cards.map((card, i) => {
            const flipped = i < active;
            const isFront = i === active;
            const isTopOfFlippedPile = flipped && i === active - 1;
            const waitingOffset = 6;

            return (
              <div
                key={card.title}
                className="absolute inset-0 transition-transform duration-700 ease-in-out"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "left center",
                  transform: flipped
                    ? "rotateY(-180deg)"
                    : isFront
                      ? "translate(0px, 0px)"
                      : `translate(${waitingOffset}px, ${waitingOffset}px)`,
                  zIndex: flipped ? 20 + i : isFront ? 40 : 30 - i,
                }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={isFront ? `${card.title}, showing ${active + 1} of ${cards.length}` : undefined}
                  onClick={isFront ? goNext : undefined}
                  onKeyDown={(e) => {
                    if (!isFront) return;
                    if (e.key === "ArrowRight") goNext();
                    if (e.key === "ArrowLeft") goPrev();
                  }}
                  className={`absolute inset-0 overflow-hidden rounded-r-lg shadow-xl [backface-visibility:hidden] ${
                    isFront ? "cursor-pointer" : ""
                  }`}
                >
                  <CardFace card={card} />
                </div>
                <div
                  role={isTopOfFlippedPile ? "button" : undefined}
                  tabIndex={isTopOfFlippedPile ? 0 : undefined}
                  aria-label={isTopOfFlippedPile ? `Back to ${cards[i].title}` : undefined}
                  onClick={isTopOfFlippedPile ? goPrev : undefined}
                  onKeyDown={
                    isTopOfFlippedPile
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") goPrev();
                        }
                      : undefined
                  }
                  className={`absolute inset-0 overflow-hidden rounded-l-lg shadow-xl [backface-visibility:hidden] ${
                    isTopOfFlippedPile ? "cursor-pointer" : ""
                  }`}
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <CardBack card={card} />
                </div>
              </div>
            );
          })}
        </div>
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
