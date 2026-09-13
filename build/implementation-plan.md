# Adjudix — Implementation Plan & Roadmap

## Status

| Phase | Status | Output |
|---|---|---|
| 1. Research | ✅ Done | `research/competitors/*.md` (7 files), `research/competitor-analysis.md` |
| 2. Requirements extraction | ✅ Done | `project_requirements.md` |
| 3. Domain research | ✅ Done | `domain_research.md` |
| 4. Information architecture | ✅ Done | `planning/sitemap.md` |
| 5. Page inventory | ✅ Done | `planning/pages.md` |
| 6. Component architecture | ✅ Done | `planning/components.md` |
| 6b. User flows | ✅ Done | `planning/user-flows.md` |
| 7. Design system | ✅ Done | `design/design-system.md`, `design/typography.md`, `design/color-system.md` |
| 8-12. Build phases | ⬜ Not started | This document defines the plan |

Everything above this line is planning/documentation. **Nothing has been built yet** — no code, no scaffolded project. What follows is the roadmap for that build, to be executed as separate, focused work sessions (each phase below is realistically its own multi-day/multi-session engagement, not a single sitting).

## Technical & quality standards (apply across every build phase below)

**Stack** (per the brief's mandatory frontend-skills list, cross-checked against current best practice):
- React + Tailwind CSS v4 + shadcn/ui (Radix primitives underneath) + class-variance-authority + clsx for component variants
- React Hook Form + Zod for all forms (the Multi-Intent Branching Form in particular needs Zod's conditional/branching schema validation)
- Zustand for client state that isn't server data (filter-panel state, multi-step form draft state)
- TanStack Query for server-data fetching (Panel Directory results, Knowledge Centre content, case-status data)
- TanStack Table for the Data Table component (6.5) — sorting, and eventually server-side pagination for the Panel Directory
- Motion (Framer Motion) for the animation patterns specified in `components.md` (dropdown/drawer transitions, accordion expand, card hover) — every animation must respect `prefers-reduced-motion`, per design-system.md
- Lucide icons exclusively (design-system.md rule 4 — no mixed icon sets)
- Sonner for toast notifications (component 6.8)
- React Aria patterns for any custom interactive component not covered by shadcn/Radix directly

**Accessibility gate (every phase, not a final QA-only concern):**
- WCAG AA minimum, verified with automated tooling (axe or equivalent) AND manual keyboard-only + screen-reader passes on every new page template before it's considered done
- Every component in `components.md` has explicit accessibility requirements listed — treat those as acceptance criteria, not aspirational notes

**Performance gate:**
- Core Web Vitals targets: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Images lazy-loaded below the fold, served responsively (srcset), hero images optimized (WebP/AVIF with fallback)
- Font loading per `typography.md` (self-hosted/CDN-allowed, `font-display: swap`, real fallback stack)
- Bundle-size budget set per route before build begins (recommend: no single route's JS bundle exceeds ~200KB gzipped before code-splitting kicks in)

**No-AI-slop enforcement:** the 5 concrete rules in `design/design-system.md`'s closing section are binding acceptance criteria for every component/page built, not just guidance.

## Phase 8 — Project Scaffolding & Core Components

**Goal:** stand up the codebase and build every reusable component from `planning/components.md` in isolation (e.g., in Storybook or an equivalent component-development environment) before any real page is assembled.
**Tasks:**
1. Initialize the project (framework choice: Next.js recommended for the mix of static content pages, SEO requirements, and eventual authenticated portal routes — confirm with user before locking in, since this is a real architectural decision not yet made).
2. Set up Tailwind v4 config with every design token from `design/color-system.md` and `design/typography.md` as CSS custom properties / Tailwind theme extensions.
3. Build Section 1 components (Navigation: Mega Menu, Search, Portal Login, Breadcrumb, Footer).
4. Build Section 2 components (Hero, Three-Pillar Card Row, Stat Counter, Comparison Table).
5. Build Section 3-4 components (Filterable Directory, Content Grid, all Card variants).
6. Build Section 5 components (Multi-Intent Branching Form and all field primitives — this is the highest-complexity component in the system given its many branch variants; budget real time here).
7. Build Section 6 components (Button, Accordion, Fee Calculator, Process Diagram, Data Table, Version History, ToC, Toast).
8. Dark-mode token pass and verification across every component.
9. Accessibility audit of the component library before any page uses them.

## Phase 9 — Landing Page & Core Institutional Pages

**Tasks:** Home (A1), About cluster (A2-A4 + Our Story/Annual Reports), Contact Us (A13), Privacy/T&C (A14 — coordinate with legal counsel per `pages.md`'s explicit non-AI-authorship flag). This phase proves out the component library against real content and is the first fully-shippable slice (a credible institutional presence even before deeper modules are built).

## Phase 10 — Dispute Resolution Module

**Tasks:** Dispute Resolution Overview (A5), all 7 Mechanism Detail pages (Template T4), all 9 Specialized Panel pages (Template T1), Rules & Governance cluster (Code of Procedure + both Handbooks + Model Clauses + Fee Calculator — requires the actual Code of Procedure text as a content input from the user/legal team), Our Professional Panel main directory, Corporate Dispute Resolution Services, Contract & Clause Drafting service page.
**Dependency:** the Fee Calculator (6.3) needs a real fee schedule as data input — this is a content/business decision (what does Adjudix actually charge?) that must be resolved before this phase can complete, not a design/engineering blocker.

## Phase 11 — ODR Platform Module (MVP scope)

**Tasks:** ODR Platform hub (A6), File a Dispute flow (Flow 1), Respond to a Dispute flow (Flow 2), Ad Hoc Platform (appointment-only service page, per confirmed decision), Security & Enforceability trust page, Portal Login landing (role-based, SIAC Gateway pattern) with basic auth scaffolding.
**Explicitly deferred to a later phase** (per `sitemap.md`'s confirmed deferred-item and `components.md` Section 7's note): the full Case Status Dashboard, e-signature integration, document OCR/auto-classification, and in-platform video hearings. MVP scope is: structured filing intake + confirmation + basic case-status visibility, not a full Sama-equivalent product on day one. Confirm this phased scope explicitly with the user before Phase 11 begins, since the brief's ambition (matching Sama's feature set) could otherwise cause scope creep here specifically.

## Phase 12 — Training Institute Module

**Tasks:** Training Overview (A7), 4 track pages, Certification & Competence Framework (A8), Faculty directory, Calendar, Apprenticeship & Internship page, enrollment flow (Flow 4).
**Dependency:** requires real course content (at least one genuinely scheduled course, per `pages.md` A7's launch-readiness requirement) before this module can go live — a content/operations dependency, not a technical one.

## Phase 13 — Membership Module

**Tasks:** Membership Overview (A9), 4 Tier Detail pages (Template T2), Our Esteemed Members directory (A10), application flow (Flow 3) including the verification-status workflow (internal Secretariat review queue — needs a lightweight internal tool or at minimum an admin-notification pipeline, scoped during this phase).

## Phase 14 — Knowledge Centre & Events

**Tasks:** Knowledge Centre hub (A11) + content-authoring workflow (CMS choice — headless CMS recommended given the ongoing-content-pipeline requirement flagged in `pages.md` A11), Competition sub-pages, Events hub (A12) + individual event-detail template, Our Partners hub + 3 category pages (Template T3, can launch with "Partnerships coming soon" per the template's stated allowance).

## Phase 15 — CMS Integration & Secretariat Tooling

**Goal:** give Adjudix's own team the ability to manage content, review applications, and administer the panel/membership directories without engineering involvement for routine updates.
**Tasks:** headless CMS wiring for Knowledge Centre/Events/Panel-profile content, an internal application-review queue (membership/panel applications from Phases 11/13), Version History content-management workflow for governance documents.

## Phase 16 — QA

**Tasks:** full cross-browser/cross-device testing, the accessibility and performance gates (above) verified on every shipped page (not just components in isolation), broken-link/dead-CTA audit (every CTA in `pages.md` must resolve to a real, built destination before launch — this is explicitly checked given how many pages cross-link to each other), content review pass (placeholder content identified and either replaced or explicitly flagged as acceptable pre-launch temporary state per the relevant page specs), legal review of all governance/compliance documents.

## Phase 17 — Launch

**Tasks:** DNS/hosting cutover, analytics instrumentation, search-engine submission (sitemap.xml generation from the final built routes, Search Console setup), monitoring/error-tracking setup, and a rollback plan.

## Open decisions that block specific phases (tracked, not resolved here)

- **Framework choice** (Next.js assumed, not yet confirmed) — blocks Phase 8 start
- **Fee schedule** (actual numbers) — blocks Phase 10 completion
- **First real training course content** — blocks Phase 12 launch
- **ODR Platform MVP scope confirmation** — should be explicitly re-confirmed with the user before Phase 11 begins, given the gap between the brief's full ambition and a realistic first-release scope
- **CMS choice** — blocks Phase 15 start

## Recommended immediate next step

Given everything above this point is documentation, the next concrete action is a **brainstorming/spec session for Phase 8** specifically (framework choice, project structure, component-library tooling) — this is exactly the kind of scoped, implementation-adjacent decision the `superpowers:writing-plans` skill is built for, and should happen in its own session once the user has reviewed this full documentation set.
