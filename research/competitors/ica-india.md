# ICA (Indian Council of Arbitration) — Competitor Analysis

Source: https://www.icaindia.co.in/ (fetched Sept 2026 via live browser — WebFetch was blocked with HTTP 403; real Chrome session accessed it fine and screenshots were captured). Pages visited: Home, Membership, Arbitrators, Commercial Arbitration.

## Overview
ICA is India's oldest specialized arbitral body — established 1965 under Government of India/FICCI initiative, based in New Delhi's Federation House, with a network of branches. It is the most directly comparable *domestic-scale, older-generation* Indian institution to Adjudix (as opposed to MCIA, which is newer/more modern in positioning). ICA is administratively thorough (detailed fee schedules, categorized arbitrator rosters, a World Bank-backed Dispute Board service) but visually and technologically dated — this is the clearest "what not to look like" reference in the set, useful precisely because Adjudix wants SIAC/CIArb-level polish, not ICA-level polish, while still learning from its substantive completeness.

## Primary Purpose
Administer domestic, international, and maritime commercial arbitration under its own Rules; maintain a categorized panel of arbitrators; operate a World-Bank-linked Dispute Board service for construction projects; provide multi-tier institutional membership (Foundation, Ordinary, Associate, Individual).

## Navigation Structure
Flat single-level top nav (no dropdowns visible except "About Us"): Home, About Us (▾), Facilities, Arbitrators, Commercial Arbitration, Membership, Events, Gallery, Contact Us.

## Sitemap
```
Home
About Us
  Agreements
  Judgements & Awards
Facilities
  ICA Institute Dispute Board (DB) Service (World Bank project)
    Standard Operating Procedures
    DB Empanelment Document / Form
    Panel List of DB Experts
Arbitrators
  Judges
  Advocates
  Engineers
  Chartered Accountants
  Executives
  Maritime Experts
  Businessmen
  Foreign Nationals
  Women Arbitrators
Commercial Arbitration
  (long-form educational article: drafting contracts, arbitration clauses, advantages of arbitration, institutional vs ad hoc)
Membership
  List of Members
  Form for Enrollment in the Panel of Arbitrator
  New Associate Membership Application Form
  New Foundation and Ordinary Membership Form
  New Individual Membership Form
  Database Updation Form
Events
Gallery
Contact Us
Privacy Policy
```

## Component Inventory
- **Dark hero band with full-bleed photo + centered bold condensed headline + red pill CTA button** — reused near-identically across every interior page (page title changes, background image/treatment stays similar) — a simple, cheap-to-build but consistent "page header" pattern
- **3-up icon-card row** ("New Registration Rate of Fee for Domestic/International/Maritime") — fee-callout cards directly on the homepage, each a scale/gavel/anchor icon + heading + 2 fee tiers in body text — no interactive calculator, just static tiered text
- **Auto-rotating carousel banner** (multi-slide, dot indicators + arrows) used for "Recent Judicial Pronouncement" type announcements — a news/notice carousel, not a hero carousel
- **"Eligible Voters" 4-up card row** — an unusual but real component: governance/election transparency cards with a "Read Now" CTA per membership category (Foundation/Ordinary/Associate/Individual) — shows ICA runs member elections and treats voter-eligibility as public info
- **Office-bearer photo carousel** (paired photo cards, name + title, prev/next arrows) — leadership presented as a slider of individual profile cards (name + role + photo), unlike MCIA's static 24-tile grid
- **Icon-grid category directory** (Arbitrators page: 9 profession-based categories, each icon + label + "Read Now" button) — but each "Read Now" leads to a static PDF list, not a live filterable/searchable directory or individual profile pages
- **Membership application via downloadable PDF forms** (5 separate PDF forms: Foundation/Ordinary, Associate, Individual, Arbitrator-panel enrollment, Database updation) — no online form/web application flow at all

## Homepage Breakdown
1. Dark hero: "Indian Council of Arbitration" headline + one-line mission statement + red "Meet Our Office Bearers" CTA over a blurred courtroom-gavel photo
2. 3-up fee-notice cards (Domestic / International / Maritime registration fees)
3. "ICA Notification On" — rotating carousel of dated notices (currently: 2022 Supreme Court judgment on arbitrator fee caps, applied retroactively into ICA's own rules)
4. "Eligible Voters for Election" — GB Members 2026–2027 — 4-up card row by membership category, each linking to a PDF elector list
5. "ICA Office Bearers" — paired profile-card carousel (President, Sr. VP, etc.) alongside an "About Us" teaser block ("Costly, time-consuming business disputes can take a real bite out of your company's bottom line") + Know More CTA
6. "ICA Institute Dispute Board (DB) Service (A World Bank Project)" — a full dark-band feature section for a specific niche service (construction dispute boards), with 4 sub-resource cards (SOPs / empanelment doc / empanelment form / panel list)
7. "ICA Arbitration Rules" section begins (page continues below fold, not captured further)

Notable: this homepage is unusually **operationally transparent** (election eligibility lists, fee notices, judicial-pronouncement compliance updates published live) compared to every other site studied — a byproduct of being a membership-governed society under the Societies Registration Act, 1860, with actual member elections, rather than a corporate-style institution.

## Training Components
None found. No courses, certification, faculty, or academy anywhere in the nav or homepage. This is a pure case-administration + membership body with zero training/education product — an even bigger gap than MCIA's.

## Membership Components
Four-tier structure: **Foundation, Ordinary, Associate, Individual** — each with its own PDF application form, and (per the "Eligible Voters" section) each tier carries **voting rights in ICA's governance elections**, i.e., membership here is a genuine governance-participation product (member-owned society), not just a professional-development ladder like CIArb's. Subscription fees were last revised 2006, enhanced 2022 (per search results) — pricing not shown inline on-site at all; entirely form/PDF/email-driven.

## Arbitration Components
- Arbitrator panel categorized by **profession**, not by dispute-type/specialization: Judges, Advocates, Engineers, Chartered Accountants, Executives, Maritime Experts, Businessmen, Foreign Nationals, Women Arbitrators (a dedicated diversity-oriented category, notable as its own listed group). This is a different taxonomy than Adjudix's own notes (which categorize panelists more by *dispute type* — debt recovery, property, construction, IP, tenancy, insurance). Worth deciding deliberately: Adjudix should likely combine both axes (profession *and* dispute-specialization) in filters, rather than pick only one.
- Long-form "Commercial Arbitration" educational article (drafting contracts, why include an arbitration clause, ad hoc vs institutional arbitration, ICA's recommended model clause) — functions as an evergreen persuasion/education page, similar in spirit to MCIA's "Why MCIA?" but written as a single long essay rather than bullet/visual sections.
- A specialized **Dispute Board (DB) Service** for construction projects, backed by World Bank SOPs — a genuinely distinct, additional dispute-resolution mechanism beyond arbitration/mediation/conciliation, worth being aware of as a possible future specialized-panel category for Adjudix given its own notes list "Construction Disputes" as a named category.
- Registration fees tiered simply by claim-value threshold and dispute type (domestic ≤2Cr vs >2Cr; international in USD; maritime ≤1Cr vs >1Cr) — a simpler two-band tiering than MCIA/SIAC/CIArb's calculators.

## ODR Components
None. No online filing, no e-signature, no case dashboard, no online payment visible anywhere on the public site.

## Forms
All membership and arbitrator-panel "forms" are static downloadable PDFs (fill and mail/email), not structured web forms: Foundation/Ordinary Membership, Associate Membership, Individual Membership, Arbitrator-Panel Enrollment, Database Updation. Contact is via phone numbers and a generic email, not a contact form.

## Dashboards
None found — no login-gated area for members, arbitrators, or case parties visible anywhere on the public site.

## Design Language
Dated but not incompetent: dark navy/black header bar, a strong red accent for all primary CTAs and icons, condensed bold uppercase sans-serif headlines (e.g. "COMMERCIAL ARBITRATION", "ARBITRATORS"), full-bleed stock-photography hero bands (hands typing, gavel, blurred courtroom) reused across pages, light-gray card backgrounds with heavy drop-shadow-free flat cards, and inconsistent iconography style (some flat black line icons, some filled icons) across the Facilities/Arbitrators grids. Overall reads as a mid-2010s WordPress institutional theme: functional, information-dense, low on whitespace, minimal micro-interaction/motion, no visible dark-mode or responsive refinement beyond basic reflow. Copy has visible typos/OCR-like artifacts (e.g. "cany out," "Inspite," "Institute") suggesting content was migrated from older print/PDF sources without a copy-editing pass — a caution for Adjudix given its own source material is literally handwritten whiteboard notes that will need careful editorial polishing before publishing.

## Strengths
- Genuinely comprehensive, transparent operational content (fee notices, election eligibility, judicial-compliance updates) published proactively and kept current
- Categorizes arbitrators by professional background (useful axis) including an explicit Women Arbitrators category — a visible diversity signal
- Runs a real specialized dispute-resolution product beyond arbitration (World Bank-backed Dispute Boards) with its own supporting documents
- Membership is tied to real governance rights (elections), giving it substantive weight beyond a marketing label
- Consistent (if dated) page-header pattern makes every interior page immediately recognizable as part of the same site

## Weaknesses
- Zero training/certification/education product
- Zero ODR/online-filing/case-dashboard capability
- All membership and panel applications are static PDFs, not web forms — high friction, no online submission or tracking
- Arbitrator "directory" is just profession-grouped static PDF lists, not a searchable/filterable live directory with individual profiles
- Visually dated: inconsistent icon styles, dense unstyled long-form text pages, reused stock photography, uncorrected copy typos
- Fee amounts and membership subscription costs aren't shown inline — require finding/opening a PDF
- No visible content strategy beyond static institutional pages (no blog, no knowledge centre, no publications hub)

## Elements Worth Reusing (for Adjudix)
- Proactive operational transparency: published fee-change notices and election/governance eligibility as a live homepage callout — Adjudix could adopt something equivalent for its own "moral code / code of procedure" version changes (a public changelog banner), matching the handwritten notes' emphasis on keeping old rule versions ("2021, 2020...") visible alongside "2026" current rules
- Dual-axis arbitrator categorization (professional background AND dispute-type specialization) as filterable facets in the "Our Professional Panel" directory, rather than only one axis
- A named specialized dispute-resolution product beyond core arbitration/mediation (like ICA's Dispute Board service) as a template for how Adjudix could eventually spotlight one of its "Specialized Panel" categories (e.g. Construction Disputes) as its own mini-brand/service page with dedicated SOPs and empanelment documents
- Women/diversity-specific panel category as an explicit, visible directory facet

## Elements Worth Improving (things Adjudix should do better)
- Replace every static-PDF "form" with a real structured web form (membership application, arbitrator empanelment, database updates) with validation and confirmation — directly relevant since Adjudix's own notes list "Free membership after verification" and "Apprenticeship/Internship" as flows that need real online intake
- Build an actual searchable/filterable arbitrator directory with individual profile pages (photo, credentials, specialization, case experience) instead of profession-grouped static PDFs
- Establish a consistent, modern visual system from day one (icon library, type scale, spacing system) rather than the mixed icon-styles/ad hoc card treatments seen here — this is precisely the "no AI slop, no dated legal-template look" gap Adjudix's brief is trying to avoid, and ICA India is a concrete cautionary example of the outcome when a legitimate, substantive institution neglects front-end design investment
- Have all published copy edited/proofread carefully — since Adjudix's own source material starts as handwritten notes, invest deliberately in a copy pass before publishing (ICA's typos show what happens when this step is skipped)
- Add a genuine training/certification offering and an ODR/online-filing capability — both are entirely absent here and are explicit, named priorities in Adjudix's own project brief
