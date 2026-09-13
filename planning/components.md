# Adjudix — Component Architecture

Every component referenced across `pages.md`. Built on the primitives defined in `design/design-system.md` and `design/color-system.md`. Organized by category. Each entry: Purpose, Props, Variants, Responsive Behaviour, Accessibility, Animations, States, Dependencies.

---

## 1. Navigation

### 1.1 Mega Menu (primary header navigation)

**Purpose:** Surface the 6-item top nav (About / Dispute Resolution / ODR Platform / Training Institute / Membership / Knowledge Centre / Events / Contact, per `sitemap.md`) with rich dropdowns for the 4 sections that need them, without overwhelming a first-time visitor.
**Props:** `navItems[]` (label, href, children[]), `activeItem`, `portalLoginHref`.
**Variants:** Desktop (hover/click-to-open dropdown panels), Tablet (click-to-open, single-column dropdown), Mobile (full-screen slide-in drawer with accordion-style nested groups).
**Responsive behaviour:** Collapses to a hamburger trigger below `1024px`. Mobile drawer covers full viewport height, traps scroll on the body, closes on route change or outside-tap.
**Accessibility:** Full keyboard operability (Tab/Shift+Tab through top items, Enter/Space to open a dropdown, Arrow keys to move within an open dropdown, Escape to close and return focus to the trigger). `aria-expanded`/`aria-haspopup` on every item with children. Skip-to-content link precedes the nav in tab order.
**Animations:** Dropdown panels fade+slide in over 150ms; mobile drawer slides from the right over 200ms. Both respect `prefers-reduced-motion` (fall back to instant show/hide).
**States:** Default, hovered/open, active-page (underline in navy, per typography's heading-hierarchy discipline), disabled (for any nav item pointing to a not-yet-built page pre-launch — should not exist at actual launch, but the state must be definable during staged rollout).
**Dependencies:** Portal Login button (1.3), Search trigger (1.2).

### 1.2 Search

**Purpose:** Site-wide search covering pages, Knowledge Centre content, and Panel/Member directories — mitigates the "mega-menu complexity" risk flagged in `research/competitors/ciarb.md` and `research/competitors/siac.md`.
**Props:** `placeholder`, `onSearch(query)`, `recentSearches[]` (optional).
**Variants:** Icon-trigger-to-overlay (default, matches SIAC's pattern), inline search bar (used within the Knowledge Centre hub and Panel Directory instead of the overlay).
**Responsive behaviour:** Full-screen overlay on mobile; a centered modal (max 600px) on desktop.
**Accessibility:** Focus moves into the search input on open; results announced via `aria-live="polite"`; Escape closes and returns focus.
**Animations:** Fade+scale-in overlay, 150ms.
**States:** Empty, typing/debounced-loading, results, no-results (with a "Talk to Us" fallback CTA — never a dead end).
**Dependencies:** None (standalone), but results link into every other page type.

### 1.3 Portal Login (role-based entry button)

**Purpose:** Visually distinct, always-available entry point to the ODR Platform's role-based portals — directly modeled on SIAC Gateway's separate-pill-button treatment (`research/competitors/siac.md`).
**Props:** `roles[]` (Parties / Arbitrators-Neutrals / Case Manager), `href` per role or a landing page listing all three.
**Variants:** Header pill-button (collapsed, opens a small role-choice dropdown), full portal-landing page hero (four large buttons, per `pages.md` A6).
**Responsive behaviour:** Header variant stays visible (not hidden inside the hamburger) even on mobile, per its "always available" purpose — may shrink to an icon-only button below `480px` with a text label in a tooltip/aria-label.
**Accessibility:** Clearly labelled (not just an icon) at all viewport sizes above the smallest breakpoint; role-choice dropdown keyboard-operable like the mega menu.
**States:** Default, hover, active/open.
**Dependencies:** None.

### 1.4 Breadcrumb

**Purpose:** Orientation within deep sections (Dispute Resolution → Specialized Panels → Construction Disputes is 3 levels deep).
**Props:** `trail[]` (label, href).
**Variants:** Standard (all levels shown), truncated (mobile — first + ellipsis + current).
**Accessibility:** `<nav aria-label="Breadcrumb">` with an ordered list, current page marked `aria-current="page"`.
**States:** N/A (static).
**Dependencies:** None.

### 1.5 Footer

**Purpose:** Utility navigation (Privacy/T&C, Sitemap, social links), secondary link groups mirroring the mega menu's sections, and a newsletter signup.
**Props:** `linkGroups[]`, `socialLinks[]`, `showNewsletter`.
**Responsive behaviour:** 4-column desktop grid → 2-column tablet → single-column accordion-stacked mobile.
**Accessibility:** Each link group is a labelled `<nav>` region; newsletter form has a proper label (not placeholder-only, per design-system.md input rules).
**Dependencies:** Newsletter Signup Field (5.4).

---

## 2. Hero & Marketing Blocks

### 2.1 Multi-CTA Hero

**Purpose:** Homepage hero branching three audiences at once (File a Dispute / Explore Training / Become a Member), per `pages.md` A1.
**Props:** `headline`, `subhead`, `ctas[]` (max 3, label+href+variant), `backgroundImage` or `backgroundTreatment`.
**Variants:** Full-bleed photographic (homepage), gradient-band-over-photo (secondary pages, matching SIAC's building-photo header pattern), plain-color (utility pages — Contact, Legal).
**Responsive behaviour:** CTAs stack vertically below `640px`; headline uses the fluid `clamp()` scale from typography.md.
**Accessibility:** Background image marked decorative (`alt=""`) when text fully conveys meaning; sufficient contrast scrim between photo and text (contrast-checked per color-system.md, not eyeballed).
**Animations:** Subtle fade-up on initial load only (not on every scroll-into-view, to avoid the "everything animates" AI-slop tell); respects reduced-motion.
**States:** N/A (static per page).
**Dependencies:** Button (6.1).

### 2.2 Three-Pillar Card Row

**Purpose:** Give Dispute Resolution / ODR Platform / Training Institute equal visual weight on the homepage — directly enforces the domain-research finding (Section 11) that no pillar should dominate.
**Props:** `pillars[3]` (icon, title, description, href).
**Variants:** Equal-width 3-card row (desktop/tablet), stacked single-column (mobile).
**Accessibility:** Each card is a single focusable link (not nested interactive elements), full card clickable.
**States:** Default, hover (per Card System's hover state), focus-visible (keyboard).
**Dependencies:** Service/Pillar Card (4.3).

### 2.3 Stat Counter Row

**Purpose:** Trust-signal numbers (per `pages.md` A1, informed by CIArb/SIAC/Sama's stat-led hero patterns).
**Props:** `stats[]` (value, label, suffix e.g. "+"), `animateOnView` (bool).
**Variants:** Numeric-counter (animates count-up once, per Sama's pattern), static (for qualitative pre-launch trust markers per A1's "gracefully hide/replace" requirement — e.g. text badges instead of numbers when real stats don't exist yet).
**Responsive behaviour:** 3-4 across desktop, 2 across tablet, stacked mobile.
**Accessibility:** Final value present in the DOM immediately (not only revealed via animation) so screen readers and no-JS states get the real number; count-up animation is purely decorative and respects reduced-motion (shows final value instantly).
**Dependencies:** None.

### 2.4 Comparison Table (Institutional/Hybrid vs Ad Hoc vs Litigation)

**Purpose:** The MCIA-validated persuasion device (`research/competitors/mcia.md`) — reused for About/Why ADR-i and condensed for the homepage teaser.
**Props:** `criteria[]` (row label, value-per-column), `columns[]` (e.g., Adjudix / Ad Hoc / Litigation).
**Variants:** Full table (About page), condensed 3-row teaser (homepage).
**Responsive behaviour:** Below `768px`, converts to a stacked comparison-card-per-column layout (per design-system.md's table-to-card mobile rule) rather than horizontal scroll, since this table is persuasive/skimmable content, not dense data.
**Accessibility:** Real `<table>` markup with `<th scope="col">`/`<th scope="row">`, not divs styled as a table.
**Dependencies:** None.

---

## 3. Directory & Filtering

### 3.1 Filterable Directory (core pattern — Panel of Professionals, Our Esteemed Members)

**Purpose:** The single most important component gap identified in competitor research (SIAC's real filterable panel directory vs. ICCA's plain table vs. ICA India's static PDFs) — this is Adjudix's chance to match SIAC's best-in-class pattern.
**Props:** `filters[]` (field, type: dropdown/text/multiselect — e.g. Dispute Type, Profession, Jurisdiction, Language, Membership Tier), `results[]`, `resultCardType` (profile-card ref), `defaultFilter` (for pre-scoped instances, e.g. a Specialized Panel page pre-filters to one dispute type per `pages.md` Template T1).
**Variants:** Full directory (unfiltered entry, e.g. main "Our Professional Panel" page), pre-scoped instance (Specialized Panel pages, Membership directory).
**Responsive behaviour:** Filter bar collapses into a "Filters" button opening a bottom-sheet/drawer on mobile, matching common e-commerce filter patterns (a legitimate, non-legal-industry-specific UX borrowing, appropriate since none of the legal-institution competitors solved mobile filtering well).
**Accessibility:** Filter changes announce result-count updates via `aria-live="polite"`; all filter controls keyboard-operable; a visible "Reset filters" action always available (per SIAC's confirmed pattern).
**Animations:** Result-grid re-renders with a brief fade (150ms), not a jarring instant swap or an overlong transition.
**States:** Loading (skeleton cards), populated, empty ("No panelists match — try broadening your filters" with a Reset action, never a bare "no results").
**Dependencies:** Profile Card (4.2), Filter Control (5.5).

### 3.2 Content Grid (Knowledge Centre, Events)

**Purpose:** Browsable, filterable library of blogs/research/competition-output/events, per `pages.md` A11/A12.
**Props:** `items[]`, `filterTags[]` (type, dispute-category, date), `pagination` or `infiniteScroll` (decide per content volume at build time — pagination recommended for SEO-crawlability of individual pages, per A11's SEO requirement).
**Variants:** Standard grid (Knowledge Centre), dated-badge event-card grid (Events, per SIAC's calendar-card pattern), featured/pinned row variant.
**Responsive behaviour:** 3-column desktop → 2-column tablet → 1-column mobile.
**Accessibility:** Each card fully keyboard-navigable as a single link; date/tag metadata not conveyed by color alone.
**Dependencies:** Content Card (4.1), Tag/Filter Control (5.5).

---

## 4. Cards

### 4.1 Content Card

**Purpose:** Blog/research/event listing unit.
**Props:** `image`, `eyebrowTag`, `title`, `excerpt`, `date`, `href`.
**Variants:** Standard, dated-badge (Events — large month/day badge per SIAC's pattern), featured (larger, used for pinned content).
**States:** Default, hover (lift + shadow-md per design-system.md).
**Dependencies:** Tag component (5.6).

### 4.2 Profile Card

**Purpose:** Person representation — Panel members, Leadership, Esteemed Members, Faculty. Directly addresses the research finding that a name-only photo grid (MCIA's Council grid, ICA India's category icons) under-delivers vs. a real profile card (SIAC's directory-with-profile-link pattern).
**Props:** `photo`, `name`, `role/title`, `credentials[]`, `specializationTags[]`, `href` (to full profile page).
**Variants:** Grid-card (compact, used in directory results), detail-page header (expanded, full bio page).
**Responsive behaviour:** Photo scales but never crops awkwardly — fixed aspect-ratio container (`aspect-ratio: 1/1` or `4/5`) with `object-fit: cover`.
**Accessibility:** Photo `alt` text is the person's name at minimum, ideally name+role; credentials/tags are real text (not baked into the image).
**Dependencies:** Tag component (5.6).

### 4.3 Service / Pillar Card

**Purpose:** Icon+title+description+link unit for pillar overviews, mechanism grids, partner-category cards.
**Props:** `icon`, `title`, `description`, `href`.
**Variants:** Standard (equal-weight grid), large-feature (single prominent card, e.g. ODR Platform teaser on Home).
**Dependencies:** Icon set (Lucide, per design-system.md rule 4).

### 4.4 Stat Card

**Purpose:** Single large-number-plus-label unit, used standalone (dashboard summaries) or within the Stat Counter Row.
**Props:** `value`, `label`, `trend` (optional, for dashboard use — up/down indicator).
**Dependencies:** None.

### 4.5 Comparison / Tier Card

**Purpose:** Membership-tier and mechanism comparison display, per `pages.md` A9/T2.
**Props:** `tierName`, `eligibility[]`, `benefits[]`, `fee`, `ctaLabel`, `highlighted` (bool — for a recommended/popular tier).
**Variants:** Grid-card (tier overview page), full detail (tier-specific page per Template T2).
**Dependencies:** Button (6.1).

---

## 5. Forms & Inputs

### 5.1 Multi-Intent Branching Form (Template T5 — the core reusable form)

**Purpose:** The single most-reused form across the site (Contact, Membership Application, Training Enrollment, Panel Application, Partnership Inquiry, ODR Filing/Response) — modeled directly on Sama's best-in-class multi-intent contact form (`research/competitors/sama.md`).
**Props:** `baseFields[]`, `intentOptions[]`, `branchFieldMap` (intent → additional fields, per the field spec in `pages.md` Template T5), `onSubmit`.
**Variants:** Single-step (short forms — general Contact), multi-step wizard (long forms — Membership Application, Training Enrollment) with a persistent step indicator.
**Responsive behaviour:** Full-width single-column fields on mobile; two-column field layout permissible on desktop for short fields (Name/Phone side-by-side) only.
**Accessibility:** Every field has a visible `<label>`; error summary announced at the top of the form on failed submit (`aria-live="assertive"`, focus moved to the summary); required fields marked with both an asterisk AND `aria-required="true"` (not asterisk alone).
**States:** Empty, partially-filled (with autosave/draft-recovery for multi-step forms — don't lose a user's work on accidental navigation), submitting (disabled submit button + spinner), success (confirmation + reference number, per design-system.md), error (inline field errors + top summary).
**Dependencies:** Text Input, Select, File Upload, Checkbox (5.2–5.4), Button (6.1), Step Indicator (5.7).

### 5.2 Text Input / Select / Textarea

**Purpose:** Base form field primitives.
**Props:** `label`, `name`, `type`, `value`, `error`, `helperText`, `required`.
**Dependencies:** None (base primitive).

### 5.3 File Upload

**Purpose:** Document submission for applications (membership supporting docs, training-enrollment credentials).
**Props:** `acceptedFormats[]`, `maxSizeMb`, `multiple` (bool), `onUpload`.
**States:** Empty/drag-target, drag-hover, uploading (progress), uploaded (with remove action), error (wrong format/too large — specific message, not generic "upload failed").
**Accessibility:** Drag-and-drop zone has an equivalent click-to-browse button (drag-and-drop alone is not keyboard/screen-reader accessible).
**Dependencies:** None.

### 5.4 Newsletter Signup Field

**Purpose:** Lightweight email-capture, used in Footer and Knowledge Centre hub.
**Props:** `placeholder`, `onSubmit`.
**States:** Default, submitting, success (inline confirmation, no page navigation), error (invalid email).
**Dependencies:** None.

### 5.5 Filter Control

**Purpose:** Dropdown/multiselect/text-search controls that drive the Filterable Directory and Content Grid.
**Props:** `type` (dropdown/multiselect/text), `options[]`, `value`, `onChange`.
**Dependencies:** None (base primitive).

### 5.6 Tag / Badge

**Purpose:** Small metadata label — dispute-type tags, membership-tier badges, content-category tags.
**Props:** `label`, `variant` (neutral/gold-premium/status).
**Variants:** Neutral (ink-100 background, ink-700 text — most tags), Premium (gold-100 background, per color-system's ceremonial-accent rule — Fellow/Corporate tier badges only), Status (success/warning/error semantic colors — application status, case status).
**Dependencies:** None.

### 5.7 Step Indicator

**Purpose:** Progress display for multi-step forms.
**Props:** `steps[]` (label), `currentStep`.
**Accessibility:** `aria-current="step"` on the active step; steps announced as "Step 2 of 4."
**Dependencies:** None.

---

## 6. Interactive / Utility

### 6.1 Button

**Purpose:** Primary interactive trigger, per design-system.md's Button System table.
**Props:** `variant` (primary/secondary/ghost/destructive/accent), `size` (sm/md/lg), `icon` (optional, leading or trailing), `href` or `onClick`, `loading` (bool), `disabled` (bool).
**Dependencies:** Icon set.

### 6.2 Accordion (FAQ)

**Purpose:** FAQ display across About, ODR Platform, Training, and mechanism-detail pages — the accordion pattern is validated across nearly every competitor studied (MCIA, CIArb, SIAC all use it).
**Props:** `items[]` (question, answer), `allowMultipleOpen` (bool, default false).
**Accessibility:** Each trigger is a real `<button>` with `aria-expanded`, controls a panel with a matching `id`/`aria-controls`; keyboard Enter/Space toggles.
**Animations:** Height-animated expand/collapse (200ms), respects reduced-motion (instant).
**Dependencies:** None.

### 6.3 Fee Calculator

**Purpose:** Interactive fee estimation, per SIAC's confirmed best-in-class 4-input pattern (`research/competitors/siac.md`) — amount, arbitrator count, party jurisdiction, procedure type.
**Props:** `inputs` (amountInDispute, arbitratorCount: sole/panel, partyJurisdiction: domestic/international, procedureType: standard/streamlined), `feeSchedule` (data source), `onCalculate`.
**Responsive behaviour:** Single-column stacked inputs on mobile; results table below the form, sticky-summary-bar option on long results.
**Accessibility:** Real-time result updates announced via `aria-live="polite"`; currency values use tabular figures (per typography.md).
**States:** Default/empty, calculating (brief loading state if calculation isn't instant), results shown, invalid-input (e.g., negative amount).
**Dependencies:** Text Input, Select (5.2), Table (6.5).

### 6.4 Process/Step Diagram

**Purpose:** Visual explainer for the ODR filing journey (`pages.md` A6) and mechanism-specific process flows (Template T4).
**Props:** `steps[]` (icon, label, description).
**Variants:** Horizontal (desktop), vertical (mobile — stacks per design-system.md responsive rules).
**Accessibility:** Marked up as an ordered list semantically, not just visually sequential divs.
**Dependencies:** Icon set.

### 6.5 Data Table

**Purpose:** Fee schedules, rule indices, directory results in table form — per design-system.md's Table System.
**Props:** `columns[]`, `rows[]`, `stickyHeader` (bool), `sortable` (bool, per-column).
**Responsive behaviour:** Converts to stacked card-per-row below `768px` (dense data) or scrolls horizontally in a contained `overflow-x:auto` wrapper (wide fee matrices only) — decided per-instance, not globally.
**Accessibility:** Real `<table>` markup, sortable columns expose `aria-sort`.
**Dependencies:** None.

### 6.6 Version History / Document Header

**Purpose:** Governance-document versioning display, per design-system.md's legal-document layout requirement — shared across Code of Procedure, Moral Code, Procedure Handbooks.
**Props:** `currentVersion`, `effectiveDate`, `priorVersions[]` (label, href, dates-of-applicability).
**Accessibility:** Prior-versions list is real linked content, not a dropdown-only interaction (so it's crawlable/indexable — SEO and legal-transparency requirement).
**Dependencies:** None.

### 6.7 Anchor-Linked Table of Contents (sticky sidebar)

**Purpose:** In-document navigation for long rule/procedure text, per MCIA's validated pattern.
**Props:** `sections[]` (label, anchorId), `activeSection` (scroll-spy driven).
**Responsive behaviour:** Sticky sidebar at `--container-lg`+; collapses to a "Jump to section" `<select>` dropdown below that width.
**Accessibility:** Scroll-spy active-state is a visual enhancement only — the ToC remains a real, fully navigable link list regardless of JS/scroll state.
**Dependencies:** None.

### 6.8 Toast / Inline Notification

**Purpose:** Non-blocking feedback (form saved, filter applied, session-related notices).
**Props:** `variant` (success/warning/error/info, per color-system.md semantic colors), `message`, `dismissible` (bool), `autoDismissMs` (optional).
**Accessibility:** `role="status"` (info/success) or `role="alert"` (error/warning) as appropriate; never the sole means of conveying a critical error (critical errors also appear inline at the point of failure, e.g. in a form).
**Dependencies:** None.

---

## 7. Portal / Dashboard (post-MVP scope, per `sitemap.md`'s deferred-item note)

### 7.1 Case Status Dashboard

**Purpose:** Party/Arbitrator/Case-Manager view of case progress, per the ODR Platform's confirmed need (modeled on Sama's real dashboard screenshots — charts, "View full report" actions).
**Props:** `caseSummary`, `timeline[]`, `documents[]`, `messages[]`.
**Note:** Full spec deferred to the roadmap's Phase 9 (CMS/Portal integration) per `sitemap.md`'s deferred-items note — flagged here as a known future component so the design system's chart/table/card primitives are built with this future need in mind (e.g., Data Table and Stat Card are reused here, not reinvented).
**Dependencies:** Data Table (6.5), Stat Card (4.4), Toast (6.8).
