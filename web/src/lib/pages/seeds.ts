import type { Block } from "@/lib/blocks/types";

// Pages converted by hand from code into blocks: what the page editor starts
// from the first time someone opens them, word for word as the built page.
// (Pages built from one of the site's page templates convert themselves;
// see seedPage in lib/pages.)

type Seed = () => Omit<Block, "id">[];
type Link = { label: string; href: string };
type Crumb = { label: string; href?: string };

const header = (title: string, intro: string, eyebrow = "", image = "", imageAlt = "", breadcrumbs: Crumb[] = []) => ({
  type: "pageHeader",
  props: { eyebrow, title, intro, breadcrumbs: breadcrumbs.map((c) => ({ label: c.label, href: c.href ?? "" })), image, imageAlt },
});
const text = (heading: string, paragraphs: string[], options: { eyebrow?: string; points?: string[]; width?: "narrow" | "wide"; background?: string } = {}) => ({
  type: "text",
  props: { eyebrow: options.eyebrow ?? "", heading, paragraphs, points: options.points ?? [], width: options.width ?? "narrow", background: options.background ?? "canvas", anchor: "" },
});
const tiles = (heading: string, items: { title: string; body?: string; href?: string }[], options: { intro?: string; columns?: string; background?: string } = {}) => ({
  type: "tiles",
  props: { heading, intro: options.intro ?? "", items: items.map((i) => ({ eyebrow: "", title: i.title, body: i.body ?? "", points: [], href: i.href ?? "", buttonLabel: "" })), columns: options.columns ?? "3", background: options.background ?? "canvas" },
});
const cards = (heading: string, items: { title: string; description?: string; href: string }[], options: { intro?: string; columns?: "2" | "3"; background?: string } = {}) => ({
  type: "cardGrid",
  props: { heading, intro: options.intro ?? "", items: items.map((i) => ({ title: i.title, description: i.description ?? "", href: i.href })), columns: options.columns ?? "3", background: options.background ?? "canvas" },
});
const table = (heading: string, columns: string[], rows: string[][], options: { intro?: string; caption?: string; background?: string } = {}) => ({
  type: "table",
  props: { heading, intro: options.intro ?? "", caption: options.caption ?? heading, columns, rows: rows.map((cells) => ({ cells })), background: options.background ?? "canvas" },
});
const comparison = (heading: string, intro: string, rows: { criterion: string; adjudix: string; other: string }[]) => ({
  type: "comparison",
  props: { heading, intro, adjudixLabel: "", otherLabel: "", rows, background: "surface" },
});
const collection = (source: string, heading: string, intro = "", background = "canvas") => ({
  type: "collection",
  props: { heading, intro, source, limit: null, background, anchor: "" },
});
const steps = (heading: string, items: { title: string; description: string; href?: string }[], options: { intro?: string; columns?: string; background?: string } = {}) => ({
  type: "numberedList",
  props: { heading, intro: options.intro ?? "", items: items.map((i) => ({ title: i.title, description: i.description, href: i.href ?? "" })), columns: options.columns ?? "3", background: options.background ?? "canvas" },
});
const imageText = (heading: string, paragraphs: string[], image: string, imageAlt: string, options: { eyebrow?: string; side?: "left" | "right"; button?: Link; background?: string } = {}) => ({
  type: "imageText",
  props: { eyebrow: options.eyebrow ?? "", heading, paragraphs, image, imageAlt, imageSide: options.side ?? "right", button: options.button ?? { label: "", href: "" }, background: options.background ?? "canvas" },
});
const faq = (heading: string, items: { question: string; answer: string }[], background = "canvas") => ({
  type: "faq",
  props: { heading, items, background },
});
const buttons = (items: (Link & { style?: string })[], heading = "") => ({
  type: "buttons",
  props: { heading, items: items.map((b) => ({ label: b.label, href: b.href, style: b.style ?? "secondary" })), align: "start", background: "canvas" },
});
const cta = (title: string, primary: Link, secondary?: Link, description = "") => ({
  type: "cta",
  props: { title, description, primary, secondary: secondary ?? { label: "", href: "" } },
});

export const HAND_SEEDS: Record<string, Seed> = {
  "/about": () => [
    header(
      "Why ADR-i",
      "Adjudix exists because the choice of forum shouldn't be an afterthought. Institutional alternative dispute resolution replaces an uncertain, case-by-case negotiation over process with the published, predictable Adjudix Code of ADR Procedure, 2026 — known to both sides before a dispute ever arises. Our unique, hybrid approach covers both the resolution of a dispute and its implementation, globally.",
      "About Adjudix",
    ),
    text("Our founding rationale", [
      "Most disputes in India are resolved one of two ways: through the courts, on a timeline and under rules designed for every kind of case rather than any one kind, or through ad hoc arbitration or mediation, where the parties negotiate procedure from a blank page every time a disagreement arises. Adjudix was founded to offer a third option: a standing institution with the Adjudix Code of ADR Procedure, 2026, a panel of vetted specialists organized by dispute type, and a Training Institute that gives the next generation of arbitrators, conciliators, and mediators a defined path into the profession.",
      "That combination — resolution, training, and membership, under one roof — is deliberate. An institution that only convenes panels has no pipeline of new practitioners; one that only trains has nowhere for graduates to practice. Adjudix treats dispute resolution, education, and professional standing as one continuous system rather than three separate businesses.",
    ]),
    tiles("What sets Adjudix apart", [
      { title: "Hybrid model of dispute resolution", body: "Our flagship: mediation first, converting to a binding award only if it's needed." },
      { title: "Global implementation", body: "Awards, settlements, and orders carried through to implementation, in India and worldwide." },
      { title: "Corporate resolution", body: "Standing dispute resolution for businesses, without disrupting the relationship." },
      { title: "Emergency arbitration", body: "Urgent interim relief before a full tribunal is constituted." },
      { title: "Contract & clause drafting", body: "Contracts and arbitration clauses drafted to hold up when a dispute arises." },
      { title: "Trainings", body: "Six certification tracks for professionals and students." },
    ]),
    comparison("Institutional ADR vs. ad hoc or litigation", "The difference isn't philosophical — it shows up in exactly how a dispute gets decided.", [
      {
        criterion: "Choosing the decision-maker",
        adjudix: "Parties nominate from our Professional Panel, matched to the practice area of the dispute; the institute appoints if they can't agree",
        other: "No structured process, appointment can stall indefinitely",
      },
      { criterion: "Procedure", adjudix: "The Adjudix Code of ADR Procedure, 2026 governs every case, known in advance", other: "Procedure is negotiated case-by-case, or set by court rules never designed for the dispute" },
      { criterion: "Timeline", adjudix: "Bound by the Adjudix Code of ADR Procedure, with an Emergency Arbitrator route for urgent relief", other: "No fixed procedural timeline" },
      { criterion: "Confidentiality", adjudix: "Proceedings and outcomes are confidential by default", other: "Court proceedings are a matter of public record" },
      { criterion: "Enforceability", adjudix: "Awards enforceable under the Arbitration and Conciliation Act, 1996", other: "Depends entirely on how the matter was resolved" },
    ]),
    text("Governance", [
      "Adjudix is governed by a Secretariat and Advisory Council responsible for maintaining the Adjudix Code of ADR Procedure, empanelling and reviewing arbitrators, conciliators, and mediators, and overseeing the Training Institute's curriculum. The full governance structure is set out on the [Leadership & Governance](/about/leadership) page. Adjudix's founding ethical commitments are set out in full in the [Moral Code of Principles & Doctrines](/about/moral-code), and each year's work is summarised in our [Annual Reports](/about/annual-reports).",
    ]),
    cta("See who sits on our panel", { label: "View Our Panel", href: "/panel" }, { label: "Contact Us", href: "/apply/enquiry" }, "Every arbitrator, conciliator, and mediator is vetted before appointment."),
  ],

  "/membership": () => [
    header(
      "Five Kinds of Membership",
      "A professional register, not a mailing list. Every tier carries defined eligibility, so membership means something when a client checks it.",
      "Membership",
      "/images/membership-roundtable.jpg",
      "Professionals in discussion around a conference roundtable",
    ),
    table(
      "",
      ["Membership", "Eligibility", "Entry"],
      [
        ["[Fellow](/membership/fellow) ★★★★★", "Senior practitioners with a sustained record of panel appointments", "By nomination or application, reviewed by the Advisory Council"],
        ["[Associate](/membership/associated) ★★★★", "Completed a Training Institute track, or equivalent experience", "Free, after completion of a Training Programme under Adjudix"],
        ["[Affiliate](/membership/affiliated) ★★★", "Open to early-career professionals", "Free, after completing an Apprenticeship or Internship"],
        ["[Student](/membership/student) ★★", "Students of law, CA/CS, commerce, or engineering", "Free for students"],
        ["[Special Honorary](/membership/honorary) · Beyond stars", "Conferred for exceptional contribution to ADR", "Cannot be claimed — it is earned"],
      ],
      { caption: "Membership tiers compared" },
    ),
    text(
      "Not sure which tier fits?",
      [
        "If you're a student, start with [Student](/membership/student) membership — it's free. Early-career professionals who have completed an Apprenticeship or Internship qualify for [Affiliate](/membership/affiliated). If you've completed a Training Programme, you likely qualify for [Associate](/membership/associated). Senior practitioners with an established record should look at [Fellow](/membership/fellow).",
      ],
      { background: "surface" },
    ),
    cta("See who's already a member", { label: "Our Esteemed Members", href: "/membership/directory" }, { label: "Apply for Membership", href: "/apply/membership" }),
  ],

  "/dispute-resolution": () => [
    header(
      "One institute, the full ADR spectrum",
      "From a facilitated conversation to a binding arbitral award, Adjudix administers every point on the alternative dispute resolution spectrum under the Adjudix Code of ADR Procedure, 2026.",
      "Dispute Resolution",
      "/images/columns-detail.jpg",
      "A classical colonnade",
    ),
    tiles(
      "The spectrum, plainly explained",
      [
        { title: "Negotiation", body: "The parties resolve the matter directly, with no third party involved." },
        { title: "Conciliation", body: "A neutral conciliator actively proposes terms of settlement to both sides." },
        { title: "Mediation", body: "A neutral mediator facilitates dialogue; the parties themselves reach the outcome." },
        { title: "Lok Adalat", body: "A statutory forum for compromise settlement, with the force of a civil court decree." },
        { title: "Arbitration", body: "A neutral arbitrator hears the case and issues a binding, enforceable award." },
      ],
      { intro: "Each mechanism trades off control and formality differently. Moving left to right, the parties give up more control over the outcome in exchange for a more decisive result.", columns: "5" },
    ),
    tiles("", [
      { title: "Emergency Arbitration", body: "Urgent interim relief from an emergency arbitrator, before a full tribunal is constituted." },
      { title: "Corporate ADR", body: "Standing dispute resolution for businesses, preserving the commercial relationship." },
      { title: "Hybrid process of Med-Arb", body: "Mediation first, converting to binding arbitration if a settlement isn't reached." },
    ]),
    cards(
      "Choose a mechanism",
      [
        { title: "Hybrid ADR Mechanism", description: "Our flagship: mediation first, with an automatic fallback to binding arbitration if it doesn't settle.", href: "/dispute-resolution/hybrid" },
        { title: "Arbitration", description: "Domestic and international, decided by a neutral arbitrator under the Adjudix Code of ADR Procedure.", href: "/dispute-resolution/arbitration" },
        { title: "Mediation", description: "A facilitated dialogue toward a settlement both sides actually agree to.", href: "/dispute-resolution/mediation" },
        { title: "Conciliation", description: "A more active neutral proposes settlement terms for the parties to accept or refine.", href: "/dispute-resolution/conciliation" },
        { title: "Lok Adalat", description: "A statutory compromise forum for eligible matters, with decree-equivalent force.", href: "/dispute-resolution/lok-adalat" },
        { title: "Emergency Arbitration", description: "Urgent interim relief before a full tribunal is even constituted.", href: "/dispute-resolution/emergency" },
        { title: "Corporate ADR", description: "Standing panel access, clause drafting, and a relationship team for businesses.", href: "/dispute-resolution/corporate" },
        { title: "Implementation of ADR Orders", description: "Awards, settlements, and orders carried through to implementation, in India and globally.", href: "/implementation" },
      ],
      { background: "surface" },
    ),
    text(
      "",
      ["Every mechanism is available for [domestic](/dispute-resolution/domestic) and [international](/dispute-resolution/international) disputes, conducted [online](/odr), [in person](/dispute-resolution/offline), or as a hybrid of both."],
      { background: "surface", width: "wide" },
    ),
    tiles(
      "",
      [
        { title: "Practice Areas", body: "Ten subject-matter streams, each heard by neutrals with the right professional background. **Browse Practice Areas →**", href: "/dispute-resolution/practice-areas" },
        { title: "Corporate Dispute Resolution", body: "Bespoke panel access and ready-to-insert arbitration clauses for commercial contracts. **Corporate Dispute Resolution Services →**", href: "/dispute-resolution/corporate" },
      ],
      { columns: "2" },
    ),
    cta("Ready to start?", { label: "File a Dispute", href: "/odr/file" }, { label: "Free Consultation", href: "/apply/consultation" }, "File a dispute online, or speak with our team about which mechanism fits your case."),
  ],

  "/training": () => [
    header(
      "A serious credential, not an afterthought",
      "Six professional and student tracks — ADR Overview, Arbitration, Mediation, Conciliation, Contract Drafting, and Hybrid ADR — each tied to a published Competence Framework — so a certificate actually means something to a client checking it.",
      "Training Institute",
      "/images/training-workshop.jpg",
      "A presenter addressing a seated professional workshop group",
    ),
    text("From first course to panel appointment", [
      "Training at Adjudix isn't a standalone certificate mill — it's connected directly to panel eligibility and membership standing. What you learn in a track is what a client is actually trusting when they see your credential. Every track is taught by our [faculty](/training/faculty) of practising arbitrators, mediators, and conciliators.",
    ]),
    collection("trainingTracks", "Course tracks", "", "surface"),
    cta("Explore the full picture", { label: "Certification Framework", href: "/training/certification" }, { label: "Upcoming Courses", href: "/training/calendar" }, "See what each certificate attests to, meet our faculty, or see upcoming courses."),
  ],

  "/knowledge": () => [
    header(
      "One place for everything Adjudix publishes",
      "Blogs, research, and competition output, filterable and searchable — a narrow, curated library rather than a sprawling, unstructured blog.",
      "Knowledge Centre",
      "/images/hero-law-library.jpg",
      "A grand institutional reading room",
    ),
    cards("", [
      { title: "Blogs & Articles", description: "Plain-language explainers on ADR mechanisms, procedure, and practice.", href: "/knowledge/blog" },
      { title: "Research & Publications", description: "Longer-form research on institutional ADR in India and internationally.", href: "/knowledge/research" },
      { title: "Competitions", description: "Mock arbitration, mock conciliation, and writing competitions for students and early-career professionals.", href: "/knowledge/competitions" },
    ]),
    cta("Want new publications in your inbox?", { label: "Subscribe", href: "/apply/subscribe" }, { label: "Browse Competitions", href: "/knowledge/competitions" }, "Subscribe to be notified as we publish."),
  ],

  "/partners": () => [
    header(
      "Institutional Partnerships",
      "Adjudix's network of education, training, and corporate partners — each category structured around a different kind of ongoing relationship.",
      "Our Partners",
      "/images/handshake-resolution.jpg",
      "Close-up handshake between two professionals",
    ),
    cards("", [
      { title: "Education Partners", description: "Law schools and universities referring students into our Training Institute.", href: "/partners/education" },
      { title: "Training Partners", description: "Organizations co-delivering courses alongside the Training Institute.", href: "/partners/training" },
      { title: "Corporate Partners", description: "Businesses with a preferred-rate relationship for dispute resolution services. Kept confidential.", href: "/partners/corporate" },
    ]),
    cta("Interested in partnering with Adjudix?", { label: "Become a Partner", href: "/apply/partnership" }),
  ],

  "/events": () => [
    header(
      "Upcoming & Past Events",
      "CPD-style events, courses, and Adjudix's flagship annual conference, browsable by date.",
      "Events",
      "/images/boardroom-collaboration.jpg",
      "A panel presenting a case analysis to a seated group around a conference table",
    ),
    collection("competitions", "Competitions", "Mock proceedings and writing competitions for students and early-career professionals, judged by practicing panelists."),
    text(
      "Our flagship conference",
      ["Adjudix's annual flagship conference brings together arbitrators, mediators, counsel, and corporate users of ADR. Apply now and we'll notify you of every upcoming event and edition."],
      { background: "surface" },
    ),
    cta("Apply now to be notified", { label: "Register Interest", href: "/apply/event" }, { label: "Browse Training Courses", href: "/training/courses" }),
  ],

  "/about/our-story": () => [
    header(
      "Our Story",
      "Adjudix Dispute Resolution Institute was founded on a simple observation: the parties to a dispute rarely disagree about wanting it resolved fairly and quickly — they disagree about how. Institutional ADR removes that second disagreement before it starts — and Adjudix carries the matter through to implementation of the order or award, backed by a Training Institute that builds the profession.",
      "About Adjudix",
      "",
      "",
      [{ label: "About", href: "/about" }, { label: "Our Story" }],
    ),
    text("Vision", [
      "To be the dispute resolution institute that businesses, professionals, and individuals around the world turn to first — not as a fallback when litigation feels too slow, but as the deliberate, first choice for resolving a disagreement under a fair, published procedure.",
    ]),
    text("Mission", [
      "Adjudix administers arbitration, mediation, conciliation, Lok Adalat, emergency arbitration, hybrid Med-Arb, and corporate ADR, online and offline, under the Adjudix Code of ADR Procedure; secures the implementation of orders and awards globally; trains the next generation of arbitrators, conciliators, and mediators through a structured Training Institute; and maintains a professional membership register that means something because it is earned, not simply purchased.",
    ]),
    cta("Read our founding principles", { label: "Read the Moral Code", href: "/about/moral-code" }, { label: "Meet Our Leadership", href: "/about/leadership" }, "The Moral Code of Principles & Doctrines sets out the ethical commitments behind every case we administer."),
  ],

  "/about/leadership": () => [
    header(
      "Leadership & Governance",
      "Adjudix is governed by a Secretariat and an Advisory Council, responsible for the Adjudix Code of ADR Procedure, panel empanelment, and the Training Institute's curriculum.",
      "About Adjudix",
      "",
      "",
      [{ label: "About", href: "/about" }, { label: "Leadership & Governance" }],
    ),
    tiles("Governance structure", [
      { title: "Secretariat", body: "Manages day-to-day case administration, panel appointments, and the ODR Platform." },
      { title: "Advisory Council", body: "Reviews and approves the Adjudix Code of ADR Procedure, and oversees panel empanelment standards." },
      { title: "Training Oversight Body", body: "Sets and audits the Competence Framework behind every Training Institute certification." },
    ]),
    text("Leadership enquiries", [
      "The Secretariat and Advisory Council respond to governance and leadership enquiries directly. Write to the Secretariat for credentials or an introduction.",
    ], { background: "surface" }),
    cta("Have a governance question?", { label: "Contact Us", href: "/apply/enquiry" }, { label: "Read Our Moral Code", href: "/about/moral-code" }, "Reach the Secretariat directly through our contact form."),
  ],

  "/about/annual-reports": () => [
    header(
      "Annual Reports",
      "Adjudix usually publishes an annual report covering caseload, panel growth, and Training Institute outcomes.",
      "About Adjudix",
      "",
      "",
      [{ label: "About", href: "/about" }, { label: "Annual Reports" }],
    ),
    cta("Request our annual report", { label: "Contact Us", href: "/apply/enquiry" }, { label: "Knowledge Centre", href: "/knowledge" }, "Annual reports are shared on request through the Secretariat."),
  ],

  "/training/faculty": () => [
    header(
      "Faculty",
      "Adjudix's course faculty is drawn from practicing arbitrators, conciliators, mediators, and subject-matter specialists across our practice areas.",
      "Training Institute",
      "",
      "",
      [{ label: "Training Institute", href: "/training" }, { label: "Faculty" }],
    ),
    cta("Interested in teaching a module?", { label: "Apply to Teach", href: "/apply/faculty" }, { label: "Browse Courses", href: "/training/courses" }, "Practicing arbitrators, conciliators, and mediators can apply to join our faculty."),
  ],

  "/knowledge/research": () => [
    header(
      "Research & Publications",
      "Longer-form research on institutional ADR in India and internationally, including redacted award and case summaries, in the interest of transparency.",
      "Knowledge Centre",
      "",
      "",
      [{ label: "Knowledge Centre", href: "/knowledge" }, { label: "Research & Publications" }],
    ),
    text("Submit your research", [
      "We accept research papers, case commentaries, and articles on ADR for publication. Submissions are reviewed by the Secretariat, and case details are always anonymized to protect party confidentiality.",
    ], { background: "surface" }),
    cta("Interested in contributing research?", { label: "Submit Now", href: "/apply/research" }, { label: "Blogs & Articles", href: "/knowledge/blog" }),
  ],

  "/dispute-resolution/clause-drafting": () => [
    header(
      "Contract & Arbitration Clause Drafting",
      "A dispute resolution clause written after a disagreement starts is a negotiation. Written before, it's a formality. We draft clauses that hold up when they're actually needed.",
      "Dispute Resolution",
      "",
      "",
      [{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: "Clause Drafting" }],
    ),
    steps("", [
      { title: "Share your contract", description: "Send us the commercial contract or template you want to protect." },
      { title: "Clause drafted", description: "Our team drafts arbitration, mediation, or emergency-relief clause language suited to the deal." },
      { title: "Review & insert", description: "You review the language with your own counsel, then insert it directly into the agreement." },
    ]),
    cta("Get your contract reviewed", { label: "Request a Quote", href: "/apply/drafting" }, { label: "See Model Clauses", href: "/dispute-resolution/model-clauses" }, "Start with our free model clauses, or request tailored language for a specific agreement."),
  ],

  "/dispute-resolution/corporate": () => [
    header(
      "Corporate Dispute Resolution Services",
      "Built for how businesses actually decide: disputes resolved through a standing relationship with Adjudix, without disrupting the underlying commercial relationship with your counterparty.",
      "For businesses",
      "",
      "",
      [{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: "Corporate Services" }],
    ),
    imageText(
      "A standing relationship, not a one-off filing",
      [
        "Corporate clients rarely have just one dispute. Adjudix's corporate service sets up a standing relationship: pre-agreed clause language for your contracts, a relationship team that already understands your business, and priority routing to the right practice area for whatever category of dispute arises.",
      ],
      "/images/boardroom-collaboration.jpg",
      "A panel presenting a case analysis to a seated group around a conference table",
    ),
    steps(
      "What's included",
      [
        { title: "Bespoke panel access", description: "A relationship team matches each dispute to the right practice area and neutral, every time." },
        { title: "Ready-to-insert clauses", description: "Arbitration and mediation clauses drafted for your standard commercial contracts." },
        { title: "Dedicated relationship team", description: "One point of contact across every matter, not a new intake process each time." },
      ],
      { background: "surface" },
    ),
    cta("Set up a corporate relationship", { label: "Talk to Us", href: "/apply/corporate" }, { label: "Clause Drafting", href: "/dispute-resolution/clause-drafting" }, "Talk to our team about clause language, panel access, and pricing for your business."),
  ],

  "/dispute-resolution/practice-areas": () => [
    header(
      "Practice Areas",
      "The ten subject-matter streams in which Adjudix resolves disputes. Each matter is heard by neutrals from our Professional Panel with the right background for it — because a construction claim and an IP dispute need genuinely different expertise, not the same generalist roster.",
      "Dispute Resolution",
      "/images/legal-review.jpg",
      "Two people reviewing and signing paperwork",
      [{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: "Practice Areas" }],
    ),
    cards("", [
      { title: "Debt Recovery & Financial Claims", description: "Unpaid invoices, loan defaults, and disputed accounts.", href: "/dispute-resolution/practice-areas/debt-recovery" },
      { title: "Property Disputes", description: "Title, possession, and co-ownership disagreements.", href: "/dispute-resolution/practice-areas/property" },
      { title: "Contractual Disputes", description: "Breach, interpretation, and performance disagreements.", href: "/dispute-resolution/practice-areas/contractual" },
      { title: "Construction Disputes", description: "Delay, defect, and payment claims on projects.", href: "/dispute-resolution/practice-areas/construction" },
      { title: "Intellectual Property Disputes", description: "Licensing, infringement, and ownership disputes.", href: "/dispute-resolution/practice-areas/intellectual-property" },
      { title: "Employer–Employee Disputes", description: "Severance, non-compete, and workplace grievances.", href: "/dispute-resolution/practice-areas/employment" },
      { title: "Tenancy Disputes", description: "Rent, deposit, and possession disagreements.", href: "/dispute-resolution/practice-areas/tenancy" },
      { title: "Insurance Claims", description: "Repudiation, valuation, and coverage disputes.", href: "/dispute-resolution/practice-areas/insurance" },
      { title: "Partnership Disputes", description: "Profit-sharing, management, exit, and dissolution disputes between partners.", href: "/dispute-resolution/practice-areas/partnership" },
      { title: "Not Listed Otherwise", description: "Any other civil or commercial disagreement suited to ADR.", href: "/dispute-resolution/practice-areas/miscellaneous" },
    ]),
    cta("Not sure which category fits?", { label: "Book a Free Consultation", href: "/apply/consultation" }, { label: "File a Dispute", href: "/odr/file" }, "Tell us about your dispute and we'll route it to the right practice area."),
  ],

  "/knowledge/competitions": () => [
    header(
      "Competitions",
      "For students and early-career professionals to test and showcase ADR skills — mock proceedings and writing competitions, judged by practicing panelists.",
      "Knowledge Centre",
      "",
      "",
      [{ label: "Knowledge Centre", href: "/knowledge" }, { label: "Events", href: "/events" }, { label: "Competitions" }],
    ),
    collection("competitions", ""),
    cta("Want to be notified of the next competition?", { label: "Register Interest", href: "/apply/competition" }, { label: "Knowledge Centre", href: "/knowledge" }),
  ],

  "/odr/ad-hoc": () => [
    header(
      "Ad Hoc Platform",
      "An appointment-only service: Adjudix appoints a qualified arbitrator or neutral for a case the parties are otherwise running themselves, without requiring the full institutional process.",
      "ODR Platform",
      "",
      "",
      [{ label: "ODR Platform", href: "/odr" }, { label: "Ad Hoc Platform" }],
    ),
    steps("", [
      { title: "Tell us your case", description: "Describe the dispute you and the other party are already resolving yourselves." },
      { title: "We appoint a neutral", description: "Adjudix appoints an arbitrator or neutral from our Professional Panel for the relevant practice area." },
      { title: "You run the process", description: "The appointed neutral joins your existing process rather than starting a new one." },
    ]),
    cta("Need a neutral appointed?", { label: "Request an Appointment", href: "/apply/ad-hoc" }, { label: "View Our Panel", href: "/panel" }, "Tell us about your case and the kind of appointment you need."),
  ],

  "/odr": () => [
    header(
      "File, respond, or resolve — entirely online",
      "The ADR-i Portal takes a dispute from filing to a binding award or signed settlement, without either side needing to set foot in a courtroom.",
      "ODR Platform",
      "/images/odr-video-hearing.jpg",
      "A person joining an online hearing by video call",
    ),
    buttons([
      { label: "File a Dispute", href: "/odr/file" },
      { label: "Respond to a Dispute", href: "/odr/respond" },
      { label: "Ad Hoc Appointment", href: "/odr/ad-hoc" },
      { label: "Portal Login", href: "/odr/portal" },
    ]),
    steps(
      "How it works",
      [
        { title: "File", description: "Submit your case online with claimant, respondent, and dispute details." },
        { title: "Neutral appointed", description: "Adjudix appoints an arbitrator, mediator, or conciliator from its Professional Panel, matched to the practice area of the dispute." },
        { title: "Hearing", description: "Document exchange and hearings proceed under the Adjudix Code of ADR Procedure's timelines." },
        { title: "Award / settlement", description: "A binding award or signed settlement agreement closes the case." },
      ],
      { columns: "4", background: "surface" },
    ),
    text("Built on a real legal basis", [
      "Every case filed through the platform is administered under the Arbitration and Conciliation Act, 1996, or the Mediation Act, 2023, depending on the mechanism chosen — not a private process with no statutory footing. See [Security & Enforceability](/odr/security) for the full legal and data-security basis.",
    ]),
    faq("Frequently Asked Questions", [
      { question: "Do I need a lawyer to use the ODR Platform?", answer: "No. The platform is built for individuals and businesses to file directly, though you're welcome to have counsel represent you at any stage." },
      { question: "Is an online hearing legally equivalent to an in-person one?", answer: "Yes. Hearings conducted through the ODR Platform follow the same Adjudix Code of ADR Procedure as in-person hearings, and the resulting award or settlement has the same legal effect." },
      { question: "What happens to my documents and data?", answer: "Case documents are held securely and are confidential to the parties and appointed neutral. See our Security & Enforceability page for details." },
    ]),
    cta("Ready to begin?", { label: "File a Dispute", href: "/odr/file" }, { label: "Get Help", href: "/odr/help" }),
  ],

  "/odr/help": () => [
    header("Help & FAQs", "Answers to the most common questions about filing, responding, and using the ODR Platform.", "ODR Platform", "", "", [{ label: "ODR Platform", href: "/odr" }, { label: "Help" }]),
    faq("", [
      { question: "How do I file a dispute?", answer: "Use the File a Dispute form to submit your claim, dispute type, and respondent details. You'll receive a case reference number once it's reviewed." },
      { question: "I've been named in a case — what do I do?", answer: "Use the Respond to a Dispute page with your case reference number to confirm your participation and access the case file." },
      { question: "How much will my case cost?", answer: "Use the Rules & Fees Calculator for an indicative administrative fee before you file." },
      { question: "What if I just need an arbitrator appointed for a process I'm already running?", answer: "That's the Ad Hoc Platform — an appointment-only service, without the full filing process." },
      { question: "Who do I contact if I have a technical problem?", answer: "Reach our Secretariat through the Contact Us page and describe the issue; we'll follow up directly." },
    ]),
    cta("Still need help?", { label: "Contact Us", href: "/apply/enquiry" }, { label: "Back to ODR Platform", href: "/odr" }),
  ],

  "/odr/security": () => [
    header(
      "Security & Enforceability",
      "A dispute resolved online is only worth something if the outcome actually holds up. Here's the legal and data-security basis behind every case filed through the ODR Platform.",
      "ODR Platform",
      "",
      "",
      [{ label: "ODR Platform", href: "/odr" }, { label: "Security & Enforceability" }],
    ),
    tiles(
      "",
      [
        { title: "Statutory basis", body: "Arbitration proceedings are governed by the Arbitration and Conciliation Act, 1996; mediation and conciliation by the Mediation Act, 2023 and Part III of the 1996 Act respectively." },
        { title: "Enforceability", body: "Arbitral awards are enforceable as a decree of a civil court. Settlement agreements from mediation and conciliation carry equivalent enforceable status once executed." },
        { title: "Confidentiality", body: "Case documents and hearing content are confidential to the parties and the appointed neutral, disclosed only where the parties agree or the law requires it." },
        { title: "Data handling", body: "Personal and case data submitted through the ODR Platform is used only for administering your case, consistent with applicable data protection law." },
      ],
      { columns: "2" },
    ),
    cta("Questions about how your case is handled?", { label: "Contact Us", href: "/apply/enquiry" }, { label: "Read Our Privacy Policy", href: "/privacy" }),
  ],

  "/training/calendar": () => [
    header(
      "Upcoming Courses",
      "Course cohorts across every Training Institute track, with format and faculty confirmed before you enroll.",
      "Training Institute",
      "",
      "",
      [{ label: "Training Institute", href: "/training" }, { label: "Upcoming Courses" }],
    ),
    text("Courses run in rolling cohorts", [
      "Each track opens new cohorts through the year. Apply for a track and the Training Institute will share the next available dates with you.",
    ], { background: "surface", width: "wide" }),
    collection("trainingTracks", ""),
    cta("Apply for a course", { label: "Apply Now", href: "/apply/course?courseLevel=Professional+Course" }, { label: "Browse Courses", href: "/training/courses" }),
  ],

  "/training/apprenticeships": () => [
    header(
      "Apprenticeship & Internship Programme",
      "Classroom training only goes so far. Internships give students hands-on exposure to ADR practice; the Apprenticeship Programme places Training Institute graduates alongside experienced panelists on real cases, under supervision, before independent appointment.",
      "Training Institute",
      "",
      "",
      [{ label: "Training Institute", href: "/training" }, { label: "Apprenticeship & Internships" }],
    ),
    {
      type: "tiles",
      props: {
        heading: "",
        intro: "",
        columns: "2",
        background: "canvas",
        items: [
          {
            eyebrow: "For students",
            title: "Internships",
            body: "For law, commerce, and engineering students. Interns work with the Secretariat and the panel on research, case preparation, drafting, and observing proceedings.",
            points: ["4 weeks to 3 months", "Remote, in office, or hybrid", "Certificate on completion"],
            href: "/apply/internship",
            buttonLabel: "Apply for an Internship",
          },
          {
            eyebrow: "For graduates & professionals",
            title: "Apprenticeships",
            body: "Apprentices shadow an active panelist on real cases, then practise under supervision as the route to independent panel appointment.",
            points: ["Open to graduates of any Training Institute track", "Full-time, part-time, or weekends", "Leads to panel appointment"],
            href: "/apply/apprenticeship",
            buttonLabel: "Apply for an Apprenticeship",
          },
        ],
      },
    },
    steps("The apprenticeship path", [
      { title: "Complete a track (optional)", description: "Finishing the Arbitrator, Conciliator, or Mediator track relevant to your interest helps, but isn't required." },
      { title: "Apply for placement", description: "Apply for an apprenticeship placement shadowing an active panelist on real cases." },
      { title: "Supervised practice", description: "Work under supervision before independent panel appointment." },
    ]),
    cta("Ready to apply?", { label: "Apply for an Internship", href: "/apply/internship" }, { label: "Apply for an Apprenticeship", href: "/apply/apprenticeship" }, "Students apply for an internship; graduates and professionals for an apprenticeship."),
  ],

  "/training/certification": () => [
    header(
      "Certification & Competence Framework",
      "What each Adjudix certificate actually attests to — published plainly, so a client evaluating a certificate-holder knows exactly what they're trusting.",
      "Training Institute",
      "",
      "",
      [{ label: "Training Institute", href: "/training" }, { label: "Certification" }],
    ),
    tiles(
      "",
      [
        { title: "ADR Overview", body: "A working understanding of every ADR mechanism and how outcomes are implemented. Eligible for all." },
        { title: "Arbitrator", body: "Competence to conduct a hearing and issue a reasoned, enforceable award under the Adjudix Code of ADR Procedure." },
        { title: "Conciliator", body: "Competence to actively propose and help finalize settlement terms both parties accept." },
        { title: "Mediator", body: "Competence to facilitate a settlement the parties reach themselves, without proposing terms." },
        { title: "Contract Drafting", body: "Competence to draft enforceable dispute resolution clauses for commercial contracts." },
        { title: "Hybrid ADR", body: "Competence to run a hybrid process from mediation through to a binding award, keeping each phase's confidentiality intact." },
      ],
      { columns: "2" },
    ),
    text(
      "How certification connects to the panel and membership",
      [
        "Completing a track is the entry route into [Professional Panel](/panel) eligibility and [Associate membership](/membership). Certification alone doesn't guarantee panel appointment — panelists are also vetted for experience and conduct — but it is the defined starting point.",
      ],
      { background: "surface" },
    ),
    cta("Ready to enroll?", { label: "Browse Courses", href: "/training/courses" }, { label: "View Our Panel", href: "/panel" }),
  ],

  "/training/courses": () => [
    header(
      "Courses",
      "Six professional tracks, each tied to a published Competence Framework and a path into panel eligibility, and student courses for those starting out in ADR.",
      "Training Institute",
      "",
      "",
      [{ label: "Training Institute", href: "/training" }, { label: "Courses" }],
    ),
    collection("trainingTracks", "Professional Courses"),
    {
      type: "collection",
      props: {
        heading: "Student Courses",
        intro: "For students of law, commerce, and engineering who want to build a career in ADR. Student members receive student pricing, and scholarships are available on every course. Each course's token fee is refunded in full when you complete the course and pass its test.",
        source: "studentCourses",
        limit: null,
        background: "surface",
        anchor: "student-courses",
      },
    },
    text(
      "",
      ["Every professional track above is also offered as a student course — the same Competence Framework, taught for those building toward the profession. Looking for hands-on experience? [Apprenticeships & internships](/training/apprenticeships)."],
      { background: "surface", width: "wide" },
    ),
    cta("Not sure which track fits?", { label: "Enrol in a Course", href: "/apply/course" }, { label: "Certification Framework", href: "/training/certification" }),
  ],

  "/privacy": () => [
    header("Privacy Policy", "How Adjudix collects, uses, and protects your personal and case data. Effective from the institute's founding; version 1.0.", "Legal"),
    text("What we collect", ["Name, contact details, and case-related documents you submit through the ODR Platform or Contact Us form. We do not collect more than is needed to administer your case or query."]),
    text("How we use it", ["Solely to administer your case, process your application, or respond to your query — never sold to third parties, and never used for unrelated marketing without your consent."]),
    text("Confidentiality of case data", ["Case documents and hearing content are confidential to the parties and the appointed neutral, consistent with the confidentiality principle in our Moral Code of Principles."]),
    text("Your rights", ["You may request access to, correction of, or deletion of your personal data, subject to our obligation to retain case records as required by law."]),
    text("Data protection law", ["Adjudix processes personal data in a manner consistent with India's Digital Personal Data Protection Act, 2023."]),
  ],

  "/terms": () => [
    header("Terms & Conditions", "The terms governing use of this website and Adjudix's dispute resolution services. Effective from the institute's founding; version 1.0.", "Legal"),
    text("Acceptance of terms", ["By using the ODR Platform or engaging Adjudix as an administering institution, you agree to these terms and to the Adjudix Code of ADR Procedure, 2026."]),
    text("Scope of services", [
      "Adjudix administers arbitration, mediation, conciliation, emergency arbitration, hybrid (Med-Arb) and corporate ADR, and access to Lok Adalat, online and offline; supports the implementation of orders and awards; drafts contracts and dispute resolution clauses; and operates a Training Institute and membership programme, as described throughout this site.",
    ]),
    text("Fees", ["Administrative fees are indicative until a case is filed, at which point a final fee is confirmed in writing before proceedings begin."]),
    text("Limitation of liability", ["Adjudix administers proceedings but does not guarantee any particular outcome. Awards and settlement agreements are the product of the appointed neutral's independent judgment or the parties' own agreement."]),
    text(
      "Grievance Redressal",
      [
        "If you believe Adjudix, a panelist, or the ODR Platform has fallen short of the standards set out in our Moral Code of Principles or the Adjudix Code of ADR Procedure, submit a grievance through our [grievance form](/apply/enquiry?queryType=Feedback+or+Grievance), describing the matter in detail. The Secretariat reviews every grievance and responds directly.",
      ],
      { background: "surface" },
    ),
  ],

  "/dispute-resolution/rules": () => [
    header(
      "Rules & Governance",
      "Every document that defines how a case at Adjudix is actually run — kept versioned and publicly accessible, the same way we'd want the other side's institute to behave.",
      "Dispute Resolution",
      "",
      "",
      [{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: "Rules & Governance" }],
    ),
    { type: "widget", props: { heading: "", intro: "", widget: "codeExplainer", background: "canvas" } },
    cards("", [
      { title: "Adjudix Code of ADR Procedure — the Rule Book", description: "The single governing procedure for every case Adjudix administers, in its 2018, 2021, and 2026 editions.", href: "/dispute-resolution/rules/code-of-procedure" },
      { title: "Moral Code of Principles & Doctrines — the Code of Conduct", description: "The ethical principles binding every neutral; they form the Preamble of the Rule Book.", href: "/about/moral-code" },
      { title: "Online Procedure Handbook", description: "Step-by-step guidance for parties and panelists using the ODR Platform.", href: "/dispute-resolution/rules/online-handbook" },
      { title: "Offline Procedure Handbook", description: "Guidance for in-person hearings and paper-based filings.", href: "/dispute-resolution/rules/offline-handbook" },
      { title: "Model Clauses", description: "Ready-to-insert arbitration, mediation, and emergency-relief clause language.", href: "/dispute-resolution/model-clauses" },
      { title: "Rules & Fees Calculator", description: "An indicative estimate of the administrative fee for your case.", href: "/dispute-resolution/fees" },
    ], { columns: "2" }),
    cta("Questions about a specific rule?", { label: "Contact Us", href: "/apply/enquiry" }, { label: "About Adjudix", href: "/about" }),
  ],

  "/dispute-resolution/rules/online-handbook": () => [
    header(
      "Online Procedure Handbook",
      "Step-by-step guidance for parties, panelists, and case managers using the ODR Platform — everything the Adjudix Code of ADR Procedure requires, translated into the platform's actual screens and workflow.",
      "Rules & Governance",
      "",
      "",
      [{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: "Rules & Governance", href: "/dispute-resolution/rules" }, { label: "Online Handbook" }],
    ),
    steps("", [
      { title: "Create an account", description: "Register on the ODR Platform as a party, then verify your identity." },
      { title: "File or respond", description: "Submit a new case, or respond to a case you've been named in, with a reference number." },
      { title: "Track your case", description: "Follow every filing, hearing date, and order from your case dashboard." },
    ]),
    cta("Ready to use the platform?", { label: "Go to the ODR Platform", href: "/odr" }, { label: "Get Help", href: "/odr/help" }),
  ],

  "/dispute-resolution/rules/offline-handbook": () => [
    header(
      "Offline Procedure Handbook",
      "Not every party wants to file online. This handbook covers the same Adjudix Code of ADR Procedure, applied to paper-based filings and in-person hearings.",
      "Rules & Governance",
      "",
      "",
      [{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: "Rules & Governance", href: "/dispute-resolution/rules" }, { label: "Offline Handbook" }],
    ),
    steps("", [
      { title: "Written notice", description: "File a paper notice of arbitration or request for mediation with the Secretariat." },
      { title: "In-person hearings", description: "Hearings are scheduled at a mutually convenient venue, under the same Adjudix Code of ADR Procedure timelines." },
      { title: "Physical award delivery", description: "Signed awards and settlement agreements are delivered to each party in physical form." },
    ]),
    cta("Prefer to file in person?", { label: "Contact Us", href: "/apply/enquiry" }, { label: "Adjudix Code of ADR Procedure", href: "/dispute-resolution/rules/code-of-procedure" }, "Contact the Secretariat directly to begin an offline filing."),
  ],
};

// Pages kept as one "Original section" because their content already lives
// elsewhere in the console: what that block's note tells the editor.
export const ORIGINAL_NOTES: Record<string, string> = {
  "/": "The home page, with its intro, finder and cards. Its menus and pop-up are in Site settings.",
  "/contact": "The contact page. Its mailboxes are in Site settings, its form in Forms › Send us a query.",
  "/dispute-resolution/fees": "The fee tables and calculator. Every rate is in Collections › Fee schedule.",
  "/panel": "The Professional Panel by profession. People are in Collections › Members & panel.",
  "/membership/directory": "Members by tier. People are in Collections › Members & panel.",
  "/membership/register": "The Register of Members. People are in Collections › Members & panel.",
  "/dispute-resolution/model-clauses": "The model clauses. Their wording is in Collections › Model clauses.",
  "/about/moral-code": "The Moral Code. Its principles are in Collections › Moral Code.",
  "/dispute-resolution/rules/code-of-procedure": "The Code editions. They are in Collections › Code editions.",
  "/knowledge/blog": "The list of articles. They are in Collections › Articles.",
  "/odr/file": "The filing page. Its form is in Forms › New dispute filing.",
  "/odr/respond": "The response page. Its form is in Forms › Response to a dispute.",
};
