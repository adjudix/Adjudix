# Adjudix — Key User Flows

The critical end-to-end journeys, walking through the pages/components involved at each step. Built on `sitemap.md`, `pages.md`, and `components.md`.

## Flow 1 — File a Dispute (Claimant)

1. **Entry**: Home hero CTA ("File a Dispute") or ODR Platform hub → "File a Dispute" button.
2. **How It Works** (A6) — process diagram sets expectations before any commitment (File → Neutral Appointed → Exchange/Hearing → Award).
3. **Dispute-type selection** — either arrives pre-scoped (came from a Specialized Panel page, Template T1) or picks from the 9 categories here.
4. **Filing form** (Multi-Intent Form, Template T5, "File a Dispute" branch): claimant details, respondent details, dispute type, amount in dispute, supporting documents (File Upload, 5.3).
5. **Fee estimate shown inline** (Fee Calculator, 6.3) before final submission — no surprise costs at the confirmation step.
6. **Consent & submit**: Terms/Privacy checkbox (never pre-checked, per design-system.md), submit.
7. **Confirmation**: reference number displayed + emailed; explains next steps (respondent notification, expected timeline) and links to "Security & Enforceability" trust content.
8. **Post-filing**: claimant directed to Parties Portal (login) for ongoing case status (Case Status Dashboard, 7.1 — deferred/MVP-scope per roadmap).

**Failure modes to design for:** incomplete dispute-type selection (Miscellaneous category as an escape hatch, per `project_requirements.md` Section 6), abandoned mid-form (draft-recovery per Multi-Intent Form's stated requirement), unclear jurisdiction/amount (inline help text linking to the Overview/mechanism-detail pages).

## Flow 2 — Respond to a Dispute (Respondent)

1. **Entry**: a named party receives a notice (email/physical) referencing a case number and a "Respond to a Dispute" link — NOT the same entry as Flow 1, per the Sama-derived requirement that this be a distinct, first-class path (`research/competitors/sama.md`, `pages.md` A6).
2. **Landing**: ODR Platform → "Respond to a Dispute" — explains what receiving a notice means in plain language (addresses likely anxiety/confusion for a first-time, non-legal respondent).
3. **Verification**: enters case/reference number (+ identity-verification step, exact mechanism TBD at build time — e.g. email/OTP tied to the respondent details the claimant provided).
4. **Response form** (Multi-Intent Form, "Respond to a Dispute" branch): respondent's position, supporting documents, choice of participating/objecting-to-jurisdiction.
5. **Confirmation** + Parties Portal access, same as Flow 1 step 7-8.

## Flow 3 — Become a Member

1. **Entry**: Home teaser, top nav "Membership," or a cross-link from a Panel/Training page.
2. **Compare Tiers** (A9) — decision-helper content routes to the right tier (Affiliated/Associated free-entry vs. Fellow/Corporate).
3. **Tier detail page** (Template T2) — eligibility, entry route (Assessment/Course/Experience, per CIArb-derived multi-route model), benefits.
4. **Application form** (Multi-Intent Form, "Membership Application" branch, multi-step): personal/professional details, desired tier, entry-route selection, supporting documents.
5. **Verification step** (per your notes: "free membership after verification" via video call/CV review) — form submission triggers an internal review queue (Secretariat-side, not user-visible beyond a status indicator).
6. **Status communication**: applicant sees a status (Pending Review → Verification Scheduled → Approved/Not Approved) — Toast/status Tag component (5.6) reused here; approved applicants receive tier-specific onboarding (profile creation for Our Esteemed Members directory, with explicit consent per `pages.md` A10).

**Failure modes to design for:** applicant unsure which tier fits (decision-helper must actually help, not just list tiers), rejected applications need a respectful, clear next-step message (reapply timeline, or route to a lower tier/Apprenticeship instead of a dead end).

## Flow 4 — Enroll in a Training Course

1. **Entry**: Home teaser, top nav "Training Institute," or a Knowledge Centre article's inline CTA.
2. **Overview** (A7) → track selection (Arbitrator-Professional / Arbitrator-Student / Conciliator / Mediator / Contract Drafting).
3. **Course/Calendar detail**: specific course logistics (date, format, faculty, fee) — modeled on NPAC's confirmed logistics-card pattern (`research/competitors/nparbitration.md`).
4. **Certification context**: link to Certification & Competence Framework (A8) so the enrollee understands what the certificate actually attests to before paying.
5. **Enrollment form** (Multi-Intent Form, "Training Enrollment" branch): track, format preference, payment (if fee applies; concession fields for students/juniors, per NPAC's precedent).
6. **Confirmation**: reference number, calendar-invite/add-to-calendar action, pre-course materials link (if any).
7. **Post-course**: certificate issuance flow (out of scope for website IA beyond a "Download Certificate" action in a future learner portal — flagged as MVP+1).

## Flow 5 — Join the Professional Panel (become an arbitrator/mediator/conciliator on Adjudix's roster)

1. **Entry**: Training Institute (post-certification cross-link), Membership pages, or a direct "Join Our Panel" CTA from About/Dispute Resolution pages.
2. **Panel overview**: what sitting on the panel means, how appointment works (per `domain_research.md` Section 7's two-track appointment model), specialization categories (the 9 dispute types).
3. **Application form** (Multi-Intent Form, "Join as Panelist" branch): profession (Advocate/CA-CS/Engineer/Other), years of experience, specialization area(s), supporting credentials (File Upload).
4. **Review & verification** (Secretariat-side, same pattern as Flow 3 step 5).
5. **Approved**: profile created in the Filterable Directory (3.1) with consent, per `pages.md`'s directory content requirement.

## Flow 6 — Corporate Client Seeking Institutional Services

1. **Entry**: Home (audience-first hero branching could add a 4th "For Businesses" path here, per Sama's precedent — flag as a possible homepage enhancement beyond the initial 3-CTA hero) or direct nav to "Corporate Dispute Resolution Services."
2. **Service page**: B2B-toned explainer — bespoke panel access, Corporate Membership cross-sell, model clauses for insertion into commercial contracts.
3. **Contact routing**: Multi-Intent Form ("Business Enquiry" / "Corporate Dispute Resolution" branch) — NOT the same generic form fields as an individual claimant; needs company details, relationship context, and likely routes to a human follow-up rather than a fully self-service flow (matching Sama's "Business Enquiry" branch, which is enquiry-first, not filing-first).
4. **Follow-up**: Secretariat-side relationship management — outside website IA scope beyond the initial enquiry capture.

## Flow 7 — Researching Before Committing (the "just looking" visitor)

Not a conversion flow but the most common real path for a new, unknown institution — worth designing for explicitly:
1. Arrives via search (Knowledge Centre article, or a Specialized-Panel dispute-type page ranking for a long-tail query).
2. Reads the article/page; sees cross-links to relevant service pages (per `pages.md` A11's internal-linking requirement).
3. Visits About/Why ADR-i for credibility-checking (comparison table, leadership bios, Moral Code).
4. Either converts (one of Flows 1-6) or leaves — retargeting/newsletter signup (5.4) is the fallback capture mechanism for this large "not ready yet" segment.

This flow is *why* the About and Knowledge Centre pages carry disproportionate credibility weight relative to their conversion-funnel position, and why `pages.md` A2 flags About as unable to launch with placeholder content.
