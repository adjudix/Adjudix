# Competitor Analysis — Synthesis

Master index and cross-cutting synthesis over the 7 detailed analyses in `research/competitors/`. Read the individual files for full depth; this document pulls out the patterns that recur (or notably don't) across the set, to make them actionable for the IA/design phases.

## The 7 sites studied

| Site | File | Role in the set |
|---|---|---|
| MCIA | `competitors/mcia.md` | Closest-scale Indian institutional-arbitration peer; strong rules/fee content, weak training/ODR/membership |
| SIAC | `competitors/siac.md` | Aspirational quality bar — mature across all 3 of Adjudix's pillars simultaneously |
| CIArb | `competitors/ciarb.md` | Best-in-class training/certification/membership-ladder model |
| ICCA | `competitors/icca-institutes.md` | Field-wide NGO, not a case-administering peer; best directory-pattern and serif-authority reference |
| ICA India | `competitors/ica-india.md` | Cautionary example — substantively complete but visually/technically dated; oldest Indian institute |
| NPAC | `competitors/nparbitration.md` | Closest-scale regional peer overall (training+facilities+conference+internship at small scale) |
| Sama | `competitors/sama.md` | Best-in-class ODR product reference; consumer-tech register, not institutional gravitas |

## Cross-cutting pattern matrix

| Capability | Best reference | Worst/absent | Adjudix implication |
|---|---|---|---|
| Fee calculator | SIAC (4 inputs: amount, arbitrators, jurisdiction, procedure) | ICA India (static 2-band text only) | Build SIAC-equivalent depth from day one — see `components.md` 6.3 |
| Panel/arbitrator directory | SIAC (live, filterable, profiled) | ICA India (static PDFs by profession) | Filterable Directory is the highest-leverage component to get right — `components.md` 3.1 |
| Training/certification | CIArb (grade-linked modular ladder) + SIAC (multi-year course archive) | MCIA/ICA India (none of their own) | Hybrid model recommended — see `domain_research.md` Section 9 |
| Membership | CIArb (4-grade ladder, 3 entry routes) | NPAC (vague/discretionary) | Expand Affiliated/Associated into a fuller ladder — decision already made, `project_requirements.md` Section 7 |
| ODR/case platform | Sama (OCR filing, dashboards, transcription, role-based portal) + SIAC Gateway (role-based portal, guides, FAQs) | MCIA/CIArb/ICCA/ICA India/NPAC (none) | Single biggest differentiation opportunity — nearly every "traditional" institution has zero ODR capability |
| Visual/brand identity | SIAC (restrained navy/teal premium), CIArb (bold red, human photography), ICCA (serif authority), NPAC (heritage/founder-story gold) | ICA India (dated, inconsistent icons, uncorrected typos) | Adjudix's own logo (navy/red/gold) sits closest to a SIAC+CIArb blend — see `design/color-system.md` |
| Trust signals | CIArb (stat-led hero: members/branches/jurisdictions), Sama (named case studies with hard numbers, court-upheld award) | MCIA (no stats, no testimonials, no press bar) | Adjudix needs a stat-counter component that gracefully degrades pre-launch — `components.md` 2.3 |
| Contact/intake forms | Sama (multi-intent branching, 7 query types) | ICA India (PDF-only, mail/email submission) | Multi-Intent Branching Form is the second highest-leverage component — `components.md` 5.1 |
| Named niche products | SIAC (Arb-Med-Arb Protocol, RIA Protocol, named Ad Hoc Appointment Service) | Most others (generic panel categories only) | Adjudix's 9 Specialized-Panel dispute types should each get real page-level treatment, not just filter tags — `pages.md` Template T1 |
| Governance/rules versioning | MCIA (2016+2025 both live), SIAC (multiple editions referenced) | — (universal good practice, no bad example) | Version History component required from day one — `components.md` 6.6 |

## What no competitor does that Adjudix's notes uniquely specify

- **Lok Adalat** as a named, first-class mechanism (only Sama offers an equivalent — "Online Lok Adalat" — none of the arbitration-focused institutions do)
- **A single institution spanning all three pillars** (case administration + training/certification + ODR platform) at once — SIAC comes closest but its training is course-archive-style, not grade-linked; nobody combines SIAC's ODR maturity with CIArb's membership-ladder maturity
- **A published "Moral Code of Principles"** as a distinct document from the procedural rules — none of the 7 sites publish an equivalent ethics/values charter as a standalone citable document (closest analogs are CIArb's general professional-conduct expectations, embedded in membership terms rather than a standalone charter)

## Net recommendation carried into the IA/design phases

Position Adjudix explicitly as **"the institution that does all three well, built India-first but internationally credible"** — the sitemap (`planning/sitemap.md`) structurally enforces the three-pillar parallelism this requires, and the component priorities above (Filterable Directory, Fee Calculator, Multi-Intent Form, ODR role-based portal) are where engineering/design effort should concentrate first, since they're the components with the clearest best-in-class reference to match or exceed.
