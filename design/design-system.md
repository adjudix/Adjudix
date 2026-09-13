# Adjudix — Design System

Companion to `color-system.md` and `typography.md`. Covers layout, spacing, elevation, and the core reusable visual primitives (buttons, inputs, cards, tables) that every component in `components.md` is built from.

## Spacing scale

An 8px base unit (with a 4px half-step for tight UI contexts), consistent across margin/padding/gap:

```
--space-1:  0.25rem  (4px)   — icon-to-label gaps, tight inline spacing
--space-2:  0.5rem   (8px)   — form-field internal padding, small gaps
--space-3:  0.75rem  (12px)
--space-4:  1rem     (16px)  — default component padding
--space-6:  1.5rem   (24px)  — card padding, gap between related elements
--space-8:  2rem     (32px)  — gap between distinct components
--space-12: 3rem     (48px)  — section-internal spacing
--space-16: 4rem     (64px)  — spacing between major page sections
--space-24: 6rem     (96px)  — hero vertical padding, large section breaks
```

Rule of thumb (per the brief's "professional whitespace" requirement, and directly reacting to ICA India's dense, low-whitespace failure mode observed in research): **default to one spacing step larger than feels necessary**, especially between major sections. Institutional/editorial credibility reads through generous whitespace (SIAC, CIArb) far more than through information density (ICA India, ICCA's below-the-fold content).

## Grid & containers

```
--container-sm:   640px   (narrow content — forms, single-column legal text)
--container-md:   768px   (article/blog reading width, ties to the 65-75ch measure)
--container-lg:   1024px  (standard page content)
--container-xl:   1280px  (wide layouts — directories, dashboards, card grids)
--container-full: 100%    (full-bleed hero/photo bands only)
```

- 12-column grid at `--container-xl` and above, collapsing to 6 columns at tablet (`768px`), 4 columns (effectively stacked) below `480px`.
- Side gutter: minimum 24px on mobile, 32px on tablet, 64px+ on desktop — never let content touch the viewport edge except intentional full-bleed photo/hero bands.
- Long-form/legal-document pages (Code of Procedure, Moral Code, Privacy Policy) constrain to `--container-md` for the reading column, with an optional sticky `--space` sidebar for the anchor-link table of contents (following MCIA's proven Rules-page pattern) at `--container-lg` total width.

## Border radius

```
--radius-sm: 4px   — form inputs, small tags/badges
--radius-md: 8px   — cards, buttons (default)
--radius-lg: 16px  — large feature cards, modals
--radius-full: 999px — pill buttons (CTA pattern, matching SIAC/CIArb/Sama's rounded-pill CTA convention observed across research), avatar/photo crops
```

Kept deliberately restrained (no radius above 16px on rectangular containers) — the brief explicitly warns against "excessive glassmorphism" and template-feeling softness; sharper-edged cards paired with pill-shaped buttons mirrors SIAC's actual executed balance (mostly square cards, rounded CTA buttons only).

## Elevation / shadow system

```
--shadow-none:  none                                          — flat cards on tinted backgrounds
--shadow-sm:    0 1px 2px rgba(15,31,61,0.06)                  — resting card on white
--shadow-md:    0 4px 12px rgba(15,31,61,0.10)                 — hover state, dropdown menus
--shadow-lg:    0 12px 32px rgba(15,31,61,0.14)                — modals, popovers
--shadow-focus: 0 0 0 3px rgba(61,101,158,0.45)                 — focus ring (navy-500-based), see Accessibility below
```

Shadows are tinted navy (not pure black) at low opacity — a small but real detail that keeps elevation feeling native to the brand rather than a generic browser-default gray shadow.

## Button system

| Variant | Use | Style |
|---|---|---|
| Primary | Main CTA per section ("File a Dispute," "Apply Now") | `radius-full`, navy-800 fill, white text, `shadow-sm` resting → `shadow-md` hover |
| Secondary | Supporting action alongside a primary | `radius-full`, navy-800 outline (2px), navy-800 text, transparent fill |
| Ghost | Tertiary/inline action, low visual weight | No border/fill, navy-800 text, underline on hover |
| Destructive | Rare — withdraw application, delete draft | `radius-full`, `error-600` fill, white text |
| Accent (rare) | At most one per page — emphasized urgent action | `radius-full`, brand-crimson-500 fill, white text — reserved per color-system rules for genuinely urgent actions (e.g. "File Emergency Arbitration") |

- Minimum tap target 44×44px (mobile accessibility).
- Icon-plus-arrow trailing glyph on primary CTAs is an acceptable, research-validated pattern (seen at SIAC) — a small animated arrow shift on hover, respecting `prefers-reduced-motion`.
- Loading state: label replaced by a spinner matching button text color, button width preserved (no layout shift).
- Disabled state: `ink-300` background, `ink-500` text, no shadow, `cursor: not-allowed`.

## Input system

- Text inputs/selects: `radius-sm`, 1px `ink-300` border at rest, `navy-500` border + `shadow-focus` ring on focus, `error-600` border + adjacent inline error text on validation failure.
- Label always visible above the field (never placeholder-as-label — an accessibility and usability anti-pattern, especially relevant for the multi-intent forms which have many fields).
- Helper/error text below the field, `text-sm`, `ink-500` (helper) or `error-600` (error) with an icon, not color alone (per typography.md's "never convey meaning by color alone" rule).
- File-upload fields (membership/panel applications) show a drag-and-drop zone plus a browse button, accepted-format and max-size text always visible before the user attempts an upload.
- Multi-step forms (Template T5 from `pages.md`) show a persistent step-indicator (e.g., "Step 2 of 4: Specialization") and allow backward navigation without losing entered data.

## Card system

- Base card: white background, `radius-md`, `shadow-sm`, `space-6` internal padding.
- Card families needed (per `pages.md`/`components.md`): content card (Knowledge Centre/Events — image + eyebrow tag + title + date), profile card (Panel/Members/Leadership — photo + name + role + credentials), service/pillar card (icon + title + short description + link), stat card (large number + label), comparison card (used in tier/mechanism comparison tables).
- Hover state (where the whole card is a link): `shadow-md`, subtle `translateY(-2px)`, respecting reduced-motion.

## Table system

Needed for: fee schedules, membership-tier comparisons, panel/member directory results, Code of Procedure rule indices.
- Zebra-striping optional (prefer relying on adequate row height + a bottom-border-only style for a cleaner, less "spreadsheet" look, matching SIAC's Panel-of-Arbitrators results table).
- Sticky header row on scroll for long tables (rule indices, panel directories).
- Mobile: convert to a stacked card-per-row layout below `768px` rather than horizontal-scrolling a dense table — horizontal scroll is acceptable only for genuinely wide data (fee-schedule matrices with many columns), and must sit in its own `overflow-x: auto` container per the responsive-design requirement, never scrolling the whole page.

## Forms — legal/application-specific patterns

- Every application form (membership, panel, training enrollment) ends in a clear confirmation state: on-screen success message + confirmation email, with a reference/tracking number displayed and copyable.
- Consent checkboxes (Terms & Conditions, Privacy Policy acceptance) are never pre-checked, always link out to the actual document, and are required (not optional) before submission — a compliance requirement given the Grievance Redressal / DPDP Act considerations flagged in `pages.md` (A14).

## Legal-document / publication layout (Code of Procedure, Moral Code, Privacy Policy, Knowledge Centre articles)

- Constrained reading column (`--container-md`), serif body text is NOT used for these at length — despite the display-serif heading choice, dense legal-procedure body text should stay in the UI sans at `--text-base`/`1.6` line-height for maximum legibility over long documents (serif is reserved for headings/titles only, per typography.md).
- Sticky anchor-linked table of contents in the sidebar at `--container-lg` and above, collapsing to a "Jump to section" dropdown below that width (mirroring MCIA's Rules-page pattern, adapted responsively since MCIA's own site did not appear to have a strong mobile treatment for this).
- Version/effective-date always shown at the top of every governance document, with a link to prior versions (per the versioning requirement in `domain_research.md` Section 4) — a small persistent "Version History" component reused across Code of Procedure, Moral Code, and the Procedure Handbooks.

## Dark mode strategy

- Full light/dark support required (per the brief's frontend-quality phase).
- Token-swap approach: every semantic color role (background, text, border, accent) is a CSS custom property re-pointed under `prefers-color-scheme: dark` and a `[data-theme="dark"]` override for explicit user choice, per standard practice — exact dark-mode hex values to be finalized alongside the `better-colors` skill pass flagged in `color-system.md`.
- Photography (hero images, leadership/panel photos) should not be dimmed/filtered in dark mode in a way that misrepresents real people's photos — apply dark-mode treatment to UI chrome (backgrounds, cards, text) but keep photographic content true-to-color, with only a subtle contrast-protecting scrim behind any text overlaid on a photo.
- The glossy 3D logo (see `color-system.md`'s note) will need a dark-mode-safe variant regardless of whether it gets flattened — a navy-on-navy logo lockup disappears on a dark background, so at minimum a white/gold outline variant is needed for dark-mode headers.

## What "no AI slop" means operationally for this system

Concrete, checkable rules the component/build phases must follow, translating the brief's Phase 8 mandate into enforceable specifics:
1. No unexplained decorative gradients on buttons/cards/backgrounds beyond the tinted-shadow system defined above.
2. No glassmorphism (frosted-blur panels) anywhere — not listed as a component anywhere in this system, and should not be introduced ad hoc during build.
3. No generic three-column "feature grid with an icon, a bold word, and a sentence" repeated more than once per page without a genuine layout variation (the brief's "no repetitive section stacking" rule) — vary card density, add real data/photography, or change the grid pattern between sections.
4. Every icon must be from one consistent icon set (Lucide, per the brief's mandatory frontend-skills list) at one consistent stroke weight — no mixing icon styles (a concrete failure mode observed and flagged in `research/competitors/ica-india.md`).
5. Stock photography, where unavoidable pre-launch (Leadership bios, Panel profiles not yet populated), must be flagged as temporary placeholder content, not shipped as permanent — real photography of real people is a stated requirement (`pages.md` A4, A10).
