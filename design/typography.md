# Adjudix — Typography

## Direction

The approved logo's wordmark ("ADJUDIX DISPUTE RESOLUTION INSTITUTE") is set in a classic serif small-caps style, with the tagline ("DIALOGUE • DISPUTE • RESOLUTION • A BETTER TOMORROW") in a widely-tracked sans-serif caps. This is a real, usable signal for the type system — it points toward the same "authority through classical/editorial type" register ICCA uses (see `research/competitors/icca-institutes.md`: ICCA is the only competitor site using a genuine serif display face, and it reads as the most scholarly/authoritative of the set), rather than the purely geometric-sans approach of SIAC or MCIA.

**Recommended pairing: a serif for display/headings, a humanist sans for UI/body text.** This gives Adjudix a distinct typographic identity in the competitor set (nobody studied pairs serif-display with sans-UI; ICCA uses serif throughout, everyone else uses sans throughout) while keeping day-to-day reading (body copy, forms, tables, dashboards) in a highly legible, screen-optimized sans-serif rather than trying to run an entire dense arbitration-rules document in serif display type.

## Font choices

- **Display/Heading serif**: **Newsreader** — a literary, high-contrast transitional serif (variable weight + optical size), chosen over Source Serif 4 after real-site review: Source Serif 4's humanist warmth read as soft/friendly at display weight, not the mature, institutional register a dispute-resolution institute needs. Newsreader's higher contrast and traditional proportions read closer to a legal-document serif (Caslon/Times register) while staying a genuinely web-native, well-maintained variable font. Avoid anything that reads as "generic Times/Georgia default" — the serif needs enough personality to justify the choice (a slight but confident presence, similar to how ICCA's serif reads as deliberate, not just "we forgot to pick a font").
- **UI/Body sans**: a clean, high-legibility humanist sans built for interfaces — e.g. **Inter**, **Public Sans**, or **IBM Plex Sans** (Plex Sans in particular pairs nicely with a serif and has a slightly more "institutional" character than Inter's now-ubiquitous SaaS-default feel — worth avoiding Inter specifically *because* it's become the default "AI-generated startup" font, which cuts against the brief's explicit "no AI slop / no template" requirement).
- **Monospace** (for case reference numbers, rule/article numbering, code-like identifiers): **IBM Plex Mono** or **JetBrains Mono** — tabular figures required.

All three should be self-hosted or loaded via Google Fonts (`fonts.googleapis.com`, per the allowed CDN list) with `font-display: swap` and a real fallback stack (serif → Georgia/Times New Roman/serif; sans → -apple-system/Segoe UI/sans-serif) so the page never blocks on font load and never regresses to an unstyled flash on slow connections — both real requirements from the brief's performance/accessibility phase.

## Type scale

A modular scale (ratio ~1.25, "major third") anchored at a 16px base, expressed in `rem`:

```
--text-xs:    0.75rem   (12px)  — captions, footnotes, table meta
--text-sm:    0.875rem  (14px)  — secondary UI text, form helper text
--text-base:  1rem      (16px)  — body copy default
--text-lg:    1.125rem  (18px)  — lead paragraphs, emphasized body
--text-xl:    1.375rem  (22px)  — H4 / card titles
--text-2xl:   1.75rem   (28px)  — H3 / section titles
--text-3xl:   2.25rem   (36px)  — H2 / page titles
--text-4xl:   2.75rem   (44px)  — H1 / hero headline (mobile)
--text-5xl:   3.5rem    (56px)  — H1 / hero headline (desktop)
```

Headings (H1–H3) use the **display serif**; H4 and below, plus all body/UI text, use the **UI sans**. This creates a clear, consistent hierarchy signal: "if it's serif, it's a heading; if it's sans, it's content or interface."

## Line height & measure

- Body copy: `line-height: 1.6`, max measure **65–75 characters** per line (long-form pages — About, Knowledge Centre articles, Code of Procedure — must constrain content width; don't let legal/procedural text run full-bleed on wide viewports, which is a legibility failure common to dense legal sites like ICA India's).
- Headings: `line-height: 1.15–1.25`, tighter as size increases.
- UI text (buttons, labels, table cells): `line-height: 1.4`.

## Heading hierarchy discipline

- Exactly one H1 per page.
- H2 for major sections, H3 for subsections, H4 for card/component-level titles — never skip a level for visual-size reasons (use type-scale overrides on the correct semantic level instead of jumping from H2 to H4 to get a smaller visual size).
- The Code of Procedure / Rules documents (long, numbered, anchor-linked) need a distinct heading pattern: numbered-rule headings (e.g., "Rule 14 — Emergency Arbitrator") should visually read as a distinct "legal heading" style (perhaps small-caps serif, numbered in gold per the color system's ceremonial-accent rule) separate from ordinary content H2/H3s, so a reader can tell "this is a rule" from "this is a marketing section" at a glance even mid-scroll.

## Numerals & special features

- **Tabular figures** (`font-variant-numeric: tabular-nums`) required anywhere numbers align in a column or update dynamically: fee-calculator outputs, stat counters, dashboard tables, event date badges.
- **Old-style figures** acceptable in long-form serif body text (e.g., "founded in 1965" reading more naturally with old-style numerals) but never in tabular/data contexts.
- Small-caps (real OpenType small-caps, not faux CSS `text-transform: uppercase` on regular letterforms) for the wordmark treatment and for rule/article numbering labels, matching the logo's small-caps wordmark styling.

## Responsive behavior

- Fluid type scaling via `clamp()` between the mobile and desktop endpoints given above for H1/H2 (e.g., `clamp(2.75rem, 5vw + 1rem, 3.5rem)`), rather than a hard breakpoint jump.
- Never drop body text below 16px (`--text-base`) on mobile — avoids the iOS auto-zoom-on-input-focus problem for any adjacent form fields, and preserves legibility for a likely older/more conservative professional-legal audience.

## Accessibility

- Minimum body contrast per the color system's AA targets.
- Never convey meaning by weight/italics alone (e.g., don't rely on "bold red text" as the only signal of a required form field — pair with an icon/text label too).
- Respect `prefers-reduced-motion` for any animated text reveals; no auto-scrolling marquee-style text anywhere (accessibility and simple good taste).
