# Adjudix — Information Architecture / Sitemap (Draft v1)

Synthesized from `project_requirements.md` (your handwritten notes), `domain_research.md`, and all 7 files in `research/competitors/`. This is a **draft for review**, not final — flag anything that should move, merge, split, or be cut.

## Design rationale (read before the tree)

1. **Three pillars stay visually parallel, not nested inside each other.** Domain research (Section 11) found that no institution studied does Arbitration + Training + ODR at a mature level simultaneously, and that when one pillar dominates (MCIA, ICA India), the others read as an afterthought. So **Dispute Resolution, Training Institute, and Membership are three separate top-level nav items**, not one buried under "Services."
2. **Dispute-type is the primary filter axis for panels/specialization**, profession is secondary — per your own notes' "Specialized Panel for specific disputes" taxonomy (Section 6 of `project_requirements.md`), reinforced by SIAC's named-protocol pattern.
3. **A dedicated ODR Platform hub, modeled on SIAC Gateway's role-based portal** (E-Filing / Parties / Arbitrators-Neutrals / Help) rather than one generic "login" — this directly answers your notes' "ADR-i Portal for Dispute Resolution" + "SIAC Gateway" annotation.
4. **Membership ladder**: per your decision, Affiliated/Associated stay as entry/community tiers, with Fellow and Corporate added above — Corporate membership deliberately overlaps with (but is distinct from) the new Corporate Dispute Resolution Services page: membership is an ongoing relationship/benefits tier, the service page is a transactional "hire us for your company's disputes" offering.
5. **Knowledge Centre consolidates Blogs, Articles, Research & Publications, and Competitions' output** (award-writing/blog-writing competition entries) into one browsable, filterable content hub — per ICCA's "narrow, curated" lesson and Sama's "publish redacted awards" trust pattern — rather than scattering content across separate unconnected pages.
6. **Governance/procedure documents (Moral Code, Code of Procedure, Handbooks) get their own "Rules & Governance" section**, versioned by year, rather than being buried inside "About" — matching MCIA/SIAC's practice of keeping multiple rule-years live and directly serving your notes' emphasis on this.
7. **Legal/FAQ/Contact stay utility-tier** (footer + a slim top-level "Contact" item), not competing with the main service pillars for attention.

## The Sitemap

```
Home

About Us  ["Why ADR-i" — per notes, referencing MCIA's About structure]
  Why ADR-i (mission, comparative "Institutional/Hybrid ADR vs Ad Hoc or Litigation" table)
  Our Story / Vision & Mission
  Moral Code of Principles & Doctrines  [Adjudix's "Constitution" — governance charter]
  Leadership & Governance (Secretariat / Council / Advisory Board)
  Annual Reports  [once available]
  FAQs

Dispute Resolution  [core service pillar #1 — your notes' "Our Dispute Resolution Mechanisms"]
  Overview (the ADR spectrum explained: Arbitration / Mediation / Conciliation / Lok Adalat / Hybrid)
  Arbitration
    Domestic Arbitration
    International Arbitration
    Emergency Arbitration
  Mediation
  Conciliation
  Lok Adalat
  Hybrid / Arb-Med Model
  Specialized Panels by Dispute Type
    Debt Recovery & Financial Claims
    Property Disputes
    Contractual Disputes
    Construction Disputes
    Intellectual Property Disputes
    Employer–Employee Disputes
    Tenancy Disputes
    Insurance Claims
    Miscellaneous
  Corporate Dispute Resolution Services  [5th core service — B2B-focused entry point]
  Rules & Governance
    Code of Procedure (current year + version archive, e.g. 2026, with 2021–2025 kept accessible)
    Online Procedure Handbook
    Offline Procedure Handbook
    Model Clauses
    Rules & Fees Calculator
  Our Professional Panel  [filterable directory: dispute-type + profession (Advocate/CA-CS/Civil Engineer) + jurisdiction]
  Contract & Arbitration Clause Drafting  [service page]

ODR Platform  [core service pillar #2 — "ADR-i Portal" / SIAC Gateway-style hub]
  How It Works (filing → neutral appointment → hearing/exchange → award, explained for a first-time visitor)
  File a Dispute (Claimant/Applicant entry)
  Respond to a Dispute  [the "I've been named in a case" entry point — see sama.md]
  Ad Hoc Platform  [appointment-only service — Adjudix appoints an arbitrator/neutral for a case the parties otherwise run themselves, per SIAC's "Ad Hoc Appointment Services" model]
  Portal Login (role-based landing, mirroring SIAC Gateway):
    Parties Portal
    Arbitrators / Neutrals Portal
    Case Manager / Secretariat Portal (internal)
  Security & Enforceability  [trust page: legal basis, data security — see sama.md's "Award Upheld in Court" pattern]
  Help / FAQs (Gateway-specific)

Training Institute  [core service pillar #3]
  Overview
  Courses
    Arbitrator Track (Professional / Student — "soft schedule")
    Conciliator Track
    Mediator Track
    Contract Drafting Track
  Certification & Competence Framework  [what each certificate actually attests to]
  Faculty
  Calendar / Upcoming Courses
  Apprenticeship & Internship Programme
  Training Partners  [see Our Partners below — cross-linked, not duplicated]

Membership  [core service pillar #4]
  Overview / Compare Tiers
  Affiliated Membership  (entry tier, free after verification)
  Associated Membership  (entry tier, free after verification)
  Fellow Membership  (senior/credentialed tier)
  Corporate Membership  (institutional/business tier — relationship, not a single case)
  Our Esteemed Members  (public directory/showcase, permission-based)
  Apply for Membership  (single structured application flow, route-dependent per tier)

Knowledge Centre  [consolidates Blogs & Articles + Research & Publications + Competition outputs]
  Blogs & Articles
  Research & Publications
  Redacted Awards / Case Summaries  [once available — transparency content, see sama.md]
  Competitions
    Mock Arbitration
    Mock Conciliation
    Arbitral Award Writing
    Arbitral Blog/Article Writing

Events
  Upcoming Events
  Past Events
  Flagship Conference  [Adjudix's equivalent of India ADR Week / SIAC Annual Lecture / NPAC's Annual Conference — name TBD]

Our Partners
  Education Partners
  Training Partners
  Corporate Partners

Contact Us
  Query Form  (multi-intent branching form, per sama.md's best-practice pattern)
  Office/Contact Details

Footer-only (utility, not top nav):
  Privacy Policy & Terms and Conditions
  FAQs (global; section-specific FAQs also live inline where relevant)
  Sitemap
  Social links
```

## Top-level nav (what actually appears in the header)

Given the tree above has 10 first-level sections plus Contact, that's too many for a single flat nav row (CIArb's 7-item mega-menu was already flagged as borderline-heavy). Proposed top nav, grouping some sections under shared dropdowns:

```
[Logo]   About   Dispute Resolution ▾   ODR Platform   Training Institute ▾   Membership ▾   Knowledge Centre ▾   Events   Contact        [Portal Login]  [Search]
```

- **Dispute Resolution ▾** dropdown carries: Arbitration / Mediation / Conciliation / Lok Adalat / Specialized Panels / Rules & Fees Calculator / Model Clauses / Our Professional Panel / Corporate Dispute Resolution Services
- **ODR Platform** is a standalone nav item (not a dropdown) — mirrors SIAC's visually distinct "SIAC Gateway" pill button treatment, since this is the primary product/CTA, not just content
- **Training Institute ▾** carries: Courses / Certification / Faculty / Calendar / Apprenticeships
- **Membership ▾** carries: tier pages + Apply + Our Esteemed Members
- **Knowledge Centre ▾** carries: Blogs / Research / Competitions
- **Portal Login** sits apart (top-right, button-styled) — the role-based entry point, always visible, separate from content nav (matches SIAC's "SIAC Gateway" pill + CIArb's "Login/Register" utility-bar pattern)
- **Our Partners, Merchandise, Rules & Governance sub-pages, Apprenticeship page** are reachable via their parent dropdowns and the footer, not the top row directly

## Decisions (confirmed with user, Sept 2026)

1. **Merchandise** — dropped from the IA entirely for now. Not in the sitemap; can be reintroduced later (e.g. as a footer link) once there's a concrete plan for what's being sold.
2. **"Our Partners" third category** — resolved as **Corporate Partners** (pairs with the new Corporate Dispute Resolution Services page). Sitemap updated above.
3. **"Ad Hoc Platform" scope** — resolved as an **appointment-only service**: Adjudix appoints an arbitrator/neutral for a case the parties are otherwise running themselves (SIAC's "Ad Hoc Appointment Services" model). Sitemap updated above.

## Deferred items (default assumption noted, revisit later — not blocking)

4. **Flagship event name** — every comparable institution has one named recurring flagship event (MCIA: India ADR Week; SIAC: Annual Lecture; NPAC: Annual International Conference). No name exists yet in the source notes — carried in the sitemap as a placeholder ("Flagship Conference — name TBD") to be resolved during a branding pass, not blocking IA/page-inventory work.
5. **Case Manager/Secretariat Portal** — kept in the IA as an internal, staff-only portal entry point alongside Parties/Arbitrators portals, on the assumption it's in scope conceptually now but built later (per the roadmap's Phase 9: CMS Integration) rather than at initial launch. Flag if this assumption is wrong.

Next step is Phase 5: a full page-by-page inventory (purpose, audience, sections, components, CTAs, forms, SEO/content requirements for every page in this tree).
