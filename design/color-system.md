# Adjudix — Color System

Derived from the approved logo (`ChatGPT Image Sep 10, 2026, 03_05_37 PM.png` / `04_01_00 PM.png`): a navy/red/gold palette built around a scales-of-justice mark. This document converts that logo's colors into a usable, accessible web color system — a logo palette and a UI color system are not the same thing, and the gap between them is exactly what this file resolves.

## A note on the source logo

The logo is a glossy, heavily-beveled 3D render (chrome-style highlights, drop shadows, gradient-filled letterforms). That treatment is appropriate for a one-off mark but **cannot be used as-is in the website UI** — it won't sit believably next to flat modern components, won't scale down to a 16px favicon or mobile nav-bar legibly, and reads as an AI-generated stock icon at small sizes (the ornate scale illustration in particular loses all detail below ~48px). Recommendation, to be executed by a designer before build: commission or produce a **flattened, single-weight, 2-color line-art version** of the same scale+"I" mark for header/favicon use, reserving the full glossy render for large-format print/ceremonial use (certificates, letterhead) only. The color system below is built to support both.

## Brand colors (extracted from the logo)

| Token | Approx. hex | Role in logo |
|---|---|---|
| `brand-navy` | `#152A4E` | Dominant field color — scale arms, wordmark, app-icon background |
| `brand-red` | `#C41230` | The "I" stem, the "D" in "ADR," the top orb |
| `brand-gold` | `#C9962B` | Scale trim, scale pans, bevel highlights, tagline rule |

These three are correct as **brand identity colors** (logo, letterhead, print) but need real engineering before becoming a UI system, for two reasons:
1. **Red-as-brand-color collides with red-as-error-state.** Every UI needs a red for destructive actions/validation errors. If brand-red and error-red are the same hue, a "Submit Query" button and a "Your session failed" banner become visually indistinguishable in importance. **Resolution: brand-red is reserved for identity/accent use only (logo lockup, small highlight details, a rare high-emphasis CTA); a separate, distinct error-red is defined below for actual error/destructive UI states.**
2. **Gold-as-metallic-gradient doesn't have a flat equivalent yet.** The logo's gold is a chrome gradient (light highlight → mid gold → dark shadow). UI gold needs to be one flat, accessible value (plus tints/shades), used sparingly as a premium accent (e.g., Fellow/Corporate membership badges, certificate seals) — not as a background or button-fill color at any scale, where it fails contrast checks against both white and navy.

## Primary palette (light mode)

```
--color-navy-950: #0A1526   (near-black navy, dark-mode surfaces / deepest text)
--color-navy-900: #0F1F3D   (footer background, dark hero overlays)
--color-navy-800: #152A4E   (brand-navy — primary buttons, header background, links)
--color-navy-700: #1D3A66
--color-navy-600: #2A4D82
--color-navy-500: #3D659E   (secondary accents, active nav underline)
--color-navy-100: #E4EAF3   (light tinted backgrounds, selected-row states)
--color-navy-50:  #F4F7FB   (page background tint, card backgrounds on white)

--color-gold-700: #8A6A1D   (text-on-light gold accents, needs AA contrast check)
--color-gold-600: #A87F22
--color-gold-500: #C9962B   (brand-gold — badges, dividers, premium-tier accents)
--color-gold-100: #F5E9CE   (subtle highlight backgrounds, e.g. Fellow-tier card wash)

--color-crimson-700: #8F0E24  (reserved brand-red, dark variant — hover state on rare red CTA)
--color-crimson-600: #A81029
--color-crimson-500: #C41230  (brand-red — identity accents ONLY, not error states)
```

## Semantic / functional colors (deliberately distinct from brand-red)

```
--color-success-600: #1E7A45   (award issued, application approved, case resolved)
--color-success-100: #E3F5EA

--color-warning-600: #B4740A   (pending review, deadline approaching)
--color-warning-100: #FBEEDA

--color-error-600:   #D0342C   (validation errors, destructive actions — visually distinct
                                 hue-angle from brand-crimson-500 to avoid identity confusion;
                                 slightly more orange-leaning red than the brand crimson)
--color-error-100:   #FBE4E2

--color-info-600:    #205A9E   (falls inside the navy family deliberately — informational
                                 banners read as "on-brand," not as a foreign blue)
--color-info-100:    #E6EEF8
```

**Contrast-check requirement before implementation:** `--color-error-600` and `--color-crimson-500` must be run through a perceptual color-difference check (not just eyeballed) to confirm they read as clearly different hues side-by-side, not just "two shades of red" — recommend nudging error toward orange-red (as drafted above) if a side-by-side swatch test shows them converging. Use the `better-colors` skill's OKLCH tooling to verify and refine this pairing before locking the token file.

## Neutrals

```
--color-ink-900: #131722   (primary body text)
--color-ink-700: #3A4152   (secondary text)
--color-ink-500: #6B7280   (muted/placeholder text)
--color-ink-300: #C5CAD3   (borders, dividers)
--color-ink-100: #EDEFF3   (subtle backgrounds)
--color-white:   #FFFFFF
```

## Usage rules

- **Navy is the dominant field color** (headers, footers, primary buttons, links) — following the SIAC/ICCA precedent of navy-as-authority rather than MCIA's charcoal or CIArb's saturated red-as-dominant. This was the directional lean already favored in research (Section: Visual direction) and the logo's own navy-dominant composition confirms it as the right primary.
- **Red is an accent, never a field color.** Acceptable uses: a thin rule/underline, a small badge, a rare single high-emphasis CTA per page (e.g., "File an Emergency Arbitration" — urgency-appropriate), icon accents. Unacceptable uses: full-bleed backgrounds, large card fills, body-text links (reserve link color for navy).
- **Gold is a premium/ceremonial accent**, used at low frequency: Fellow/Corporate membership tier badges, certificate/seal imagery, a divider rule under major headings (echoing the logo's tagline rule), hover-state underline on premium content. Never as body text on white (fails contrast) or as a button fill at default state (only as a subtle tinted background, `--color-gold-100`, with navy or ink text on top).
- **Dark mode**: swap navy-800 role to navy-950/900 as the page background, invert text to near-white, keep gold and the (distinct) error-red roles unchanged in hue but re-tuned for contrast against dark backgrounds — full dark-mode token table to be produced during implementation, following the `better-colors` skill's light/dark pairing method.

## Accessibility targets

- Body text (ink-900 on white or navy-50): must meet WCAG AA (4.5:1) — confirmed safe at drafted values.
- Navy-800 button with white text: must meet AA (4.5:1) for the button label — confirmed safe (navy-800 is dark enough).
- Gold-500 as text on white: **fails AA** at normal text size — gold must never carry body copy; large-text/decorative use only, or pair with navy-900 background (gold-500 on navy-900 passes AA for large text, still needs verification for small text).
- Crimson-500 (brand) and error-600 as text on white: both need individual contrast verification before final lock — do not assume "it's dark enough" without checking, since both sit in a mid-saturation red range that can undershoot 4.5:1 depending on exact final hex.

## Next step

Before this becomes implementation-ready: run every listed hex value through the `better-colors` skill's OKLCH conversion + contrast-check workflow to (a) confirm the error-red vs brand-red distinction actually reads as intended, (b) produce exact dark-mode counterparts, and (c) generate any missing intermediate steps (e.g., navy-400/300/200 for lighter UI chrome not yet defined above).
