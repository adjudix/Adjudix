# Adjudix — Page Inventory

Built on `planning/sitemap.md` (v1, decisions confirmed). Every page in the sitemap is covered below either as a **fully unique page** (own detailed spec) or as an **instance of a shared template** (template documented once, instances listed with their specific variables). This keeps ~78 total pages fully specified without repeating identical structure 9 times over for, e.g., the Specialized Panel pages.

Total page count: **78** (14 unique pages + 5 templates covering 64 templated instances).

---

## PART A — Unique Pages (fully specified)

### A1. Home

**Purpose:** Convert three distinct audiences (a party with a dispute, a professional seeking training/membership/panel work, a corporate/institutional client) into a next action within 10 seconds, while establishing institutional credibility for a brand-new name in the market.
**Audience:** All — first-touch page, must branch quickly.
**Sections (in order):**
1. Top utility bar (optional): phone/email, language, Portal Login
2. Header + primary nav (see sitemap nav spec) + persistent "ODR Platform" CTA button
3. Hero: mission statement + primary CTA split by intent ("File a Dispute" / "Explore Training" / "Become a Member") — audience-first branching inspired by Sama, layered onto the fuller mega-menu underneath
4. Trust strip: stat counters (once real numbers exist — cases handled, panelists, training partners; gracefully hide/replace with qualitative trust markers pre-launch, e.g. "Governed by a published Code of Procedure" / "Founding Panel of Advocates, CAs, Engineers")
5. Three-Pillar overview (Dispute Resolution / ODR Platform / Training Institute) as three equally-weighted cards, each linking deeper — directly executes the domain-research finding that no pillar should visually dominate
6. "Why ADR-i" comparative teaser (Institutional/Hybrid ADR vs Ad Hoc/Litigation) — MCIA-style comparison table, condensed, linking to full About page
7. Specialized Panels teaser (dispute-type icon grid, 9 categories, links to Dispute Resolution section)
8. Membership teaser (tier overview + "Become a Member" CTA)
9. Knowledge Centre teaser (3 latest blog/research items)
10. Events teaser (next 2-3 upcoming events/courses)
11. Partners logo strip (Education / Training / Corporate, once partners exist)
12. Footer
**Components:** Mega-menu, hero with multi-CTA branching, stat-counter row, 3-pillar card row, comparison table (condensed), icon grid, tier-comparison teaser, content-card row (×2: Knowledge Centre, Events), logo strip, footer.
**CTAs:** File a Dispute · Explore Training Institute · Become a Member · Talk to Us (query form)
**Forms:** None directly (all forms live on their destination pages); a newsletter-signup email field may sit in the footer.
**SEO requirements:** Primary keyword targets: "arbitration institute India," "online dispute resolution India," "ADR training certification India." Title tag ≤60 chars naming the institute + core value prop. Meta description summarizing all three pillars. Schema.org `Organization` + `LegalService` structured data.
**Content requirements:** Mission statement (from Moral Code of Principles once drafted), at least one real or placeholder trust signal per pillar, all CTA destination pages must exist before launch (no dead-end CTAs).

### A2. About — Why ADR-i

**Purpose:** Persuade a skeptical, dispute-savvy visitor (likely a lawyer or in-house counsel) that Adjudix is a credible, legitimate choice despite being new — the single most important trust-building page on the site.
**Audience:** Legal professionals, corporate counsel, prospective panelists/members evaluating legitimacy.
**Sections:** Mission/vision statement · founding rationale · comparative table (Adjudix/Institutional ADR vs Ad Hoc vs Litigation, per MCIA's proven pattern) · governance summary (link to Leadership page) · link to Moral Code of Principles (full document) · downloadable "Why ADR-i" brochure (PDF, once written).
**Components:** Long-form editorial layout, comparison table component, download-card component, breadcrumb, sidebar quick-links (About sub-pages).
**CTAs:** Download brochure · Explore Our Panel · Contact Us
**Forms:** None.
**SEO requirements:** Target "why choose institutional arbitration," "ADR-i arbitration institute." Internal links to Dispute Resolution Overview and Rules & Governance.
**Content requirements:** This page cannot launch with placeholder/lorem content — it is the credibility anchor; requires real, carefully-written copy before go-live even if other lower-priority pages ship with interim content.

### A3. About — Moral Code of Principles & Doctrines

**Purpose:** Publish Adjudix's foundational ethics/values charter (explicitly compared to "the Constitution of India" in the source notes) as a standalone, citable, versionable document.
**Audience:** All stakeholders (parties, panelists, members) seeking to understand the institution's ethical commitments; also an SEO/credibility asset.
**Sections:** Preamble · numbered articles/principles · effective date and version history (mirroring the Code of Procedure's versioning approach) · PDF download.
**Components:** Long-form legal-document layout with anchor-linked table of contents (same pattern as MCIA's Rules page), version-history sidebar, PDF download card.
**CTAs:** Download PDF
**Forms:** None.
**SEO requirements:** Target "arbitration institute code of ethics," low-competition but high-trust long-tail terms.
**Content requirements:** Full text must be authored by the user/legal team; this document is foundational and should not be AI-drafted wholesale — treat as a content input Adjudix must supply.

### A4. About — Leadership & Governance

**Purpose:** Show real, named, credentialed people behind the institution — directly addresses the competitor-research finding that MCIA's governance page (photo grid only, no bios) under-delivers on trust, while CIArb's diverse real-photo hero over-delivers on approachable authority.
**Audience:** Legal professionals and corporate clients doing due diligence before engaging.
**Sections:** Secretariat/leadership team (photo + name + role + credentials + short bio, individual profile pattern — not just a name grid) · Council/Advisory Board (if distinct from Secretariat) · governance structure summary (how appointments/rules decisions are made).
**Components:** Profile-card grid (photo, name, role, credentials, link to full bio), org-structure diagram (simple), breadcrumb.
**CTAs:** Contact a team member (routes to Query Form) · Join Our Panel
**Forms:** None directly.
**SEO requirements:** Individual leadership names as page content support personal-brand + institutional search overlap (people search "[Name] arbitrator" and find the institute).
**Content requirements:** Requires real bios and photos before launch — placeholder "team coming soon" is acceptable only as a temporary pre-launch state, not a permanent design.

### A5. Dispute Resolution — Overview

**Purpose:** Explain the full ADR spectrum (per `domain_research.md` Section 1) in plain language and route visitors to the specific mechanism/panel/service they need — the primary hub page for pillar #1.
**Audience:** First-time visitors unfamiliar with ADR terminology, plus returning users navigating to a specific mechanism.
**Sections:** Plain-language spectrum explainer (Negotiation→Conciliation→Mediation→Lok Adalat→Arbitration→Hybrid, visualized) · mechanism card grid (6 cards: Arbitration/Mediation/Conciliation/Lok Adalat/Hybrid/Emergency Arbitration) · Specialized Panels teaser · Rules & Governance teaser · Corporate Dispute Resolution Services teaser.
**Components:** Spectrum diagram/visual explainer, mechanism card grid, teaser card rows (×2).
**CTAs:** File a Dispute (ODR Platform) · View Our Panel · Explore Specialized Panels
**Forms:** None.
**SEO requirements:** Target "types of dispute resolution," "arbitration vs mediation vs conciliation India." This page is a strong pillar-content SEO opportunity (educational search intent).
**Content requirements:** Must be genuinely educational (not just marketing copy) to serve first-time, ADR-unfamiliar visitors — a key differentiator opportunity since none of the competitor sites reviewed offer a plain-language spectrum explainer this clearly.

### A6. ODR Platform — Hub / How It Works

**Purpose:** The flagship product page — explain the filing→resolution journey clearly enough that a first-time, non-lawyer user (individual or MSME) trusts and uses it, directly answering your notes' "ADR-i Portal for Dispute Resolution" + SIAC Gateway reference.
**Audience:** Individuals, MSMEs, and businesses wanting to resolve a dispute online without necessarily knowing arbitration terminology; secondarily, sophisticated corporate users comparing platforms.
**Sections:** Step-by-step process visual (File → Neutral Appointed → Document Exchange/Hearing → Award/Settlement) · role-based entry buttons (File a Dispute / Respond to a Dispute / Ad Hoc Appointment / Portal Login) · security & enforceability trust block (legal basis, data security — Sama's "award upheld in court" pattern once Adjudix has an equivalent citation; until then, cite the governing statutes explicitly: Arbitration and Conciliation Act 1996, Mediation Act 2023) · platform feature highlights (if/when built: e-filing, document exchange, dashboards) · FAQs.
**Components:** Step-diagram component, four-button role-based entry row (mirrors SIAC Gateway exactly), trust/security card block, feature-highlight cards (with real product screenshots once available, per Sama's proof-by-screenshot pattern), FAQ accordion.
**CTAs:** File a Dispute · Respond to a Dispute · Portal Login · Talk to Us
**Forms:** None directly (routes to Filing template, Part B).
**SEO requirements:** Target "file arbitration case online India," "online dispute resolution platform." High commercial intent — invest SEO effort here.
**Content requirements:** Must not overpromise features not yet built (e.g., don't claim OCR/AI evidence review until it exists) — copy should describe the actual MVP scope honestly while still being confidence-inspiring, per the enforceability-trust principle from domain research.

### A7. Training Institute — Overview

**Purpose:** Establish the Training Institute as a serious, credible educational offering (not an afterthought, per the finding that MCIA/ICA India/NPAC under-invest here) and route visitors to the right course track.
**Audience:** Law students, junior/senior advocates, in-house counsel, CAs/CS/engineers wanting a specialization credential, career-changers.
**Sections:** Vision statement (mirroring SIAC Academy's) · track overview cards (Arbitrator [Professional/Student] / Conciliator / Mediator / Contract Drafting) · named curriculum-oversight body (once constituted — mirrors SIAC Academy Audit Panel's credibility pattern) · link to Certification & Competence Framework · link to Calendar · link to Apprenticeship Programme.
**Components:** Track-card grid with a Professional/Student toggle or badge per track, oversight-body profile strip, teaser cards (×3).
**CTAs:** Browse Courses · View Calendar · Apply for Apprenticeship
**Forms:** None directly.
**SEO requirements:** Target "arbitrator certification course India," "mediation training course," "become an arbitrator India."
**Content requirements:** Needs at least one genuinely scheduled course with real logistics (date/venue-or-platform/fee/faculty) before launch — an empty "coming soon" catalogue undermines the credibility goal.

### A8. Training Institute — Certification & Competence Framework

**Purpose:** Publish what each certificate actually attests to (a documented rubric per track/level) — directly addresses the competitor-research finding that CIArb references but never clearly surfaces its Competence Frameworks, an opportunity for a new institute to be more transparent and build trust faster.
**Audience:** Prospective trainees deciding whether to enroll; employers/clients evaluating a certificate-holder's credibility.
**Sections:** Per-track competence rubric (what a certificate-holder is attested to know/do) · certificate sample/preview · how certification connects to Panel eligibility and Membership tiers (per domain research's model-1/model-2 hybrid recommendation).
**Components:** Rubric table/accordion per track, certificate-preview image, cross-link callout boxes (Panel, Membership).
**CTAs:** Enroll in a Course · View Our Panel
**Forms:** None.
**SEO requirements:** Target "arbitration certification meaning," "what does an accredited mediator certificate mean."
**Content requirements:** Framework content must be drafted alongside actual course curricula — do not publish a rubric disconnected from what courses actually teach.

### A9. Membership — Overview / Compare Tiers

**Purpose:** Let a visitor self-select the right membership tier via a clear comparison, avoiding CIArb's friction point (fees hidden behind a PDF) by showing at least indicative benefits/eligibility inline.
**Audience:** Students, early-career professionals, senior practitioners, and corporate/institutional prospects.
**Sections:** Tier comparison table (Affiliated / Associated / Fellow / Corporate — eligibility, benefits, cost if any, entry route) · "which tier is right for me" guided helper (simple decision copy or mini-quiz, addressing CIArb's mega-menu-complexity risk noted in research) · testimonial/showcase link to Our Esteemed Members.
**Components:** Tier-comparison table/card set, decision-helper component, testimonial teaser.
**CTAs:** Apply for Membership (routes to tier-specific application, per Part B template) · Talk to Us
**Forms:** None directly.
**SEO requirements:** Target "arbitration institute membership India," "become an associate arbitrator member."
**Content requirements:** Pricing/fee info (if any) should be shown inline or clearly marked "free after verification" for entry tiers, per your notes — avoid CIArb's PDF-gating friction.

### A10. Membership — Our Esteemed Members

**Purpose:** Public showcase of real members as a social-proof/credibility device (per your notes' "community of connection" framing).
**Audience:** Prospective members and clients evaluating the community's caliber.
**Sections:** Filterable member directory (by tier, specialization, location) · individual member profile pages (photo, credentials, tier, specialization) — reuses the Panel Directory template's filtering pattern (Part B, Template T1) but scoped to Members rather than Panelists.
**Components:** Filterable directory grid, profile-card component.
**CTAs:** Become a Member · View Full Profile
**Forms:** None.
**SEO requirements:** Individual member profiles support long-tail personal-name search overlap, same rationale as Leadership page.
**Content requirements:** Requires explicit member consent/permission before publishing any individual's profile — a data-privacy/process requirement, not just a content one.

### A11. Knowledge Centre — Hub

**Purpose:** Consolidate Blogs, Research & Publications, and Competition outputs into one browsable, filterable content library — avoiding ICCA's lesson that a narrow curated resource beats a sprawling unstructured blog.
**Audience:** Legal professionals, researchers, journalists, and prospective clients/students researching ADR topics.
**Sections:** Filterable content grid (type: Blog / Research / Redacted Award-Summary / Competition Entry; dispute-type tag; date) · featured/pinned content row · search.
**Components:** Filterable card grid, tag-filter component, search bar, pagination.
**CTAs:** Subscribe (newsletter) · Submit an Article (if open to guest contributions)
**Forms:** Newsletter signup (email only).
**SEO requirements:** This is the primary long-tail organic-search engine for the whole site — every individual article/publication should have its own indexable URL, proper heading structure, and internal links back to relevant service pages (e.g., an article about construction arbitration links to the Construction Disputes panel page).
**Content requirements:** Needs a genuine, sustained content pipeline (not a one-time launch batch) to remain credible — flag as an ongoing operational commitment, not just a one-time build task.

### A12. Events — Hub

**Purpose:** Browsable calendar of upcoming and past events/courses/conferences, modeled on SIAC's calendar-app-like event browsing (dated badge cards, Featured/Upcoming toggle, subscribe-to-calendar).
**Audience:** Professionals seeking CPD-style events, prospective students, media/press.
**Sections:** Featured/Upcoming toggle · dated event cards (with ticket pricing where applicable) · Past Events archive · Flagship Conference teaser (name TBD, per sitemap) · "Subscribe to calendar" action.
**Components:** Event card grid with date badges, tab/toggle component, calendar-subscribe action.
**CTAs:** Register/Get Tickets · Subscribe to Calendar
**Forms:** Event registration (routes to a per-event registration form, likely third-party-integrated e.g. a ticketing tool, or a native structured form — decide during component-architecture phase).
**SEO requirements:** Each event should have its own indexable page/URL (supports "arbitration conference India 2026"-type searches) rather than only living inside a single flat calendar view.
**Content requirements:** Needs at least one real scheduled event before launch, same rationale as the Training Institute catalogue.

### A13. Contact Us

**Purpose:** Route every type of visitor intent through one well-designed, branching form — directly modeled on Sama's multi-intent contact form (the strongest reference pattern found in competitor research).
**Audience:** All.
**Sections:** Multi-intent Query Form (see Part B, Template T5) · office/contact details · map (if a physical office exists) · direct phone/email.
**Components:** Branching form, contact-detail block, embedded map (optional).
**CTAs:** Submit Query
**Forms:** The Query Form itself (see Template T5 for field spec).
**SEO requirements:** Standard "contact [institute name]" branded-search coverage; NAP (Name/Address/Phone) consistency for local SEO if a physical office exists.
**Content requirements:** None beyond accurate contact details.

### A14. Legal — Privacy Policy & Terms and Conditions

**Purpose:** Satisfy legal/compliance requirements and directly fulfil the "Privacy Policy & Terms and Conditions cum Grievance Redressal" item from your governance-documents list (Section 4 of `project_requirements.md`).
**Audience:** All; primarily a compliance/legal-reference page, low-traffic by design.
**Sections:** Privacy Policy · Terms & Conditions · Grievance Redressal mechanism (contact/process for complaints) · acceptance/consent language.
**Components:** Long-form legal-document layout, anchor-linked ToC, version/effective-date header.
**CTAs:** None (reference page).
**Forms:** None (grievance redressal likely routes to Contact/Query Form).
**SEO requirements:** Low priority; ensure it's crawlable but not competing for commercial keywords.
**Content requirements:** Must be drafted/reviewed by qualified legal counsel — flag explicitly as a non-AI-authored content requirement, especially given references to India's DPDP Act (data protection) if personal data is collected via the ODR Platform.

---

## PART B — Templated Page Types

### T1. Specialized Panel by Dispute Type

**Template purpose:** Give each of the 9 named dispute categories its own dedicated, SEO-indexable, filterable-panel landing page — rather than one generic panel list, per the domain-research recommendation that dispute-type be the primary filter axis, and per SIAC's precedent of giving named niche protocols their own pages.
**Audience:** A visitor or referring lawyer with a specific dispute type, searching for relevant specialist panelists.
**Sections:** Dispute-type explainer (what qualifies, why arbitration/ADR suits this category) · filtered panelist directory (pre-filtered to this dispute type, cross-filterable by profession/jurisdiction) · relevant model clause(s) if any · relevant Knowledge Centre articles tagged to this category · CTA to file a dispute of this type.
**Components:** Category header/explainer block, filtered directory grid (reuses the core Panel Directory component pre-scoped), tag-filtered content teaser, CTA block.
**CTAs:** File This Type of Dispute · View Full Panel · Talk to a Specialist
**Forms:** None directly (routes to ODR Platform filing flow, pre-tagged with dispute type).
**SEO requirements:** Each page targets a specific long-tail commercial query (e.g., "construction dispute arbitration India," "IP dispute arbitrator panel") — this template is a significant, deliberate SEO surface-area strategy, not just an IA nicety.
**Content requirements:** Each category needs at least a short, genuine explainer (not boilerplate swapped only by keyword) — thin/duplicate content across all 9 pages would hurt SEO rather than help it.
**Instances (9):** Debt Recovery & Financial Claims · Property Disputes · Contractual Disputes · Construction Disputes · Intellectual Property Disputes · Employer–Employee Disputes · Tenancy Disputes · Insurance Claims · Miscellaneous.

### T2. Membership Tier Detail

**Template purpose:** Give each membership tier its own page with tier-specific eligibility, benefits, and application entry, beyond what the Overview/Compare page shows at a glance.
**Audience:** A visitor who has already decided (or is close to deciding) on a specific tier.
**Sections:** Tier description · eligibility criteria · entry route(s) (assessment/course/experience, per CIArb's multi-route pattern where applicable) · benefits list · fee (or "free after verification") · post-nominal/designation if any · Apply CTA.
**Components:** Tier hero/summary block, eligibility checklist, benefits card list, application CTA.
**CTAs:** Apply for [Tier]
**Forms:** Routes to the tier-specific Membership Application form (Template T4 variant).
**SEO requirements:** Each tier page targets its own query intent (e.g., "become a fellow arbitrator India," "corporate arbitration membership").
**Content requirements:** Eligibility criteria must be genuinely defined per tier before launch — do not publish tiers with undefined/placeholder eligibility.
**Instances (4):** Affiliated Membership · Associated Membership · Fellow Membership · Corporate Membership.

### T3. Partner Category

**Template purpose:** Showcase and (where relevant) recruit each category of institutional partner.
**Audience:** Prospective partner organizations; visitors evaluating Adjudix's institutional network as a credibility signal.
**Sections:** Category explainer (what this partnership means/entails) · partner logo grid (once partners exist) · "Become a Partner" CTA/contact route · category-specific benefits (e.g., Education Partners get referral pipeline; Training Partners get co-branded course delivery; Corporate Partners get preferred-rate corporate dispute services).
**Components:** Logo grid, benefits list, CTA block.
**CTAs:** Become a [Category] Partner
**Forms:** Routes to Query Form, pre-tagged with partnership inquiry type.
**SEO requirements:** Lower priority than service pages; supports "[Institute] partners" branded search.
**Content requirements:** Acceptable to launch with "Partnerships coming soon" messaging if no real partners exist yet, as long as the "Become a Partner" CTA is functional.
**Instances (3):** Education Partners · Training Partners · Corporate Partners.

### T4. Dispute Resolution Mechanism Detail

**Template purpose:** Give each named mechanism (beyond the Overview page's summary) its own detailed explanation, process flow, and relevant rules/panel links.
**Audience:** A visitor who has already identified which mechanism (not just "ADR" generally) fits their situation.
**Sections:** Mechanism explainer (legal basis, how it works, typical timeline) · process-flow diagram · relevant rules excerpt/link (Code of Procedure section) · relevant panel link · FAQs specific to this mechanism.
**Components:** Explainer block, process-flow diagram, rules cross-link card, FAQ accordion.
**CTAs:** File a [Mechanism] Case · View Relevant Panel
**Forms:** None directly (routes to ODR Platform filing, pre-tagged).
**SEO requirements:** Targets mechanism-specific queries ("emergency arbitration India," "online mediation process," "Lok Adalat online").
**Content requirements:** The Lok Adalat page specifically needs accurate legal framing (it's a statutory mechanism, not a contractual one — see `domain_research.md` Section 5) to avoid misleading visitors about its nature/finality.
**Instances (6):** Arbitration (Domestic) · Arbitration (International) · Emergency Arbitration · Mediation · Conciliation · Lok Adalat · Hybrid/Arb-Med Model *(7 instances — corrected count)*.

### T5. Structured Multi-Intent Forms

**Template purpose:** One reusable branching-form component definition, instantiated wherever the sitemap calls for a structured intake (not a separate visual template per se, but a shared component spec worth defining once since it appears in multiple places).
**Field spec (base, per Sama's best-practice pattern):** Name · Organization (optional) · Email · Phone · **Type of Query** (dropdown, branches subsequent fields) · Message · City/Location (optional).
**Branch-specific field additions:**
- *General Contact Query* — no additional fields.
- *File a Dispute* — Dispute Type (dropdown, matches the 9 Specialized Panel categories) · Amount in Dispute (for routing to fee estimate) · Respondent details.
- *Respond to a Dispute* — Case/Reference Number (if already issued) · relationship to the named case.
- *Join as Panelist/Arbitrator/Mediator* — Profession (Advocate/CA-CS/Engineer/Other) · Years of Experience · Specialization area(s).
- *Membership Application* — Desired Tier · Entry Route (Assessment/Course/Experience, once defined) · supporting-document upload.
- *Training Enrollment* — Track (Arbitrator-Professional/Arbitrator-Student/Conciliator/Mediator/Contract Drafting) · preferred format (online/in-person, once offered).
- *Partnership Inquiry* — Partner Category (Education/Training/Corporate) · Organization details.
**Components:** Branching multi-step form, file-upload field (for applications), confirmation/success state, email-notification trigger (backend requirement, not a page).
**Instances (used across):** Contact Us · Membership Apply (per tier) · Training Enrollment (per course) · ODR Platform File/Respond entry · Panel/Arbitrator application · Partnership inquiry (×3 partner categories) · Apprenticeship application.

---

## Summary Table

| # | Page group | Count | Template used |
|---|---|---|---|
| 1 | Home | 1 | Unique (A1) |
| 2 | About sub-pages | 5 | Unique (A2–A4 + 2 not detailed above: Our Story, Annual Reports — same editorial-page pattern as A2) |
| 3 | Dispute Resolution Overview | 1 | Unique (A5) |
| 4 | Dispute Resolution Mechanism Details | 7 | Template T4 |
| 5 | Specialized Panel pages | 9 | Template T1 |
| 6 | Rules & Governance sub-pages | 5 | Editorial/legal-document pattern (same as A3) |
| 7 | Our Professional Panel (main directory) | 1 | Core directory component (see `components.md`) |
| 8 | Corporate Dispute Resolution Services | 1 | Service-page pattern (similar to A5 but B2B-toned) |
| 9 | Contract & Clause Drafting | 1 | Service-page pattern |
| 10 | ODR Platform hub | 1 | Unique (A6) |
| 11 | ODR Platform sub-pages (File/Respond/Ad Hoc/Portal Login ×3/Security/Help) | 7 | Mix of unique flow-pages and portal-landing pattern |
| 12 | Training Institute Overview | 1 | Unique (A7) |
| 13 | Training course track pages | 4 | Course-detail pattern (per `nparbitration.md`'s logistics-card model) |
| 14 | Certification & Competence Framework | 1 | Unique (A8) |
| 15 | Faculty / Calendar / Apprenticeship | 3 | Directory/list patterns |
| 16 | Membership Overview | 1 | Unique (A9) |
| 17 | Membership Tier pages | 4 | Template T2 |
| 18 | Our Esteemed Members | 1 | Unique (A10) |
| 19 | Knowledge Centre hub | 1 | Unique (A11) |
| 20 | Competition sub-pages | 4 | Content-listing pattern |
| 21 | Events hub | 1 | Unique (A12) |
| 22 | Individual event/course detail pages | template-driven, count TBD by content volume | Event-detail pattern |
| 23 | Our Partners hub + categories | 4 | Hub + Template T3 |
| 24 | Contact Us | 1 | Unique (A13) |
| 25 | Privacy/T&C | 1 | Unique (A14) |

**Total distinct page *types* fully specified: 25 groups, ~78 individual URLs at launch**, before ongoing content (Knowledge Centre articles, individual event pages) grows the count further over time.
