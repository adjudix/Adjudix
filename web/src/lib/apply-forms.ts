// Every action form on the site — apply, enrol, request, register — each
// asking only for what the Secretariat needs to act on that request. They
// open as a modal over the page the visitor is on (see app/@modal), and as a
// standalone page at /apply/<slug> when linked to directly.
import type { FormKind, FormSection, QueryField } from "@/components/patterns/query-form";
import { COMPETITIONS } from "@/lib/competitions";
import { COURSE_OPTIONS } from "@/lib/training-tracks";

export interface ApplyForm {
  slug: string;
  /** Heading of the modal or page. */
  title: string;
  /** One or two sentences under the heading: what happens after submitting. */
  intro: string;
  /** Section shown in the page's breadcrumbs. */
  section: { label: string; href: string };
  fields: QueryField[];
  /** Which layout suits the task (see FormKind). */
  kind: FormKind;
  /** Titled groups of field names, in order. Unlisted fields join the last. */
  sections?: FormSection[];
  tone?: "urgent";
  submitLabel: string;
  successTitle: string;
  successBody: string;
  organization?: "optional" | "required" | "hidden";
  organizationLabel?: string;
  /** "email" when only an email address makes sense (newsletters). */
  contact?: "either" | "email";
  messageLabel?: string;
  messageRequired?: boolean;
  /** Leave out the free-text box entirely. */
  noMessage?: boolean;
  attachmentsLabel?: string;
}

export const PROFESSIONS = [
  "Advocate",
  "Chartered Accountant",
  "Company Secretary",
  "Civil Engineer",
  "IT Engineer",
  "Architect",
  "Interior Designer",
  "Retired Judge / Officer",
  "Other Professional",
];

export const PRACTICE_AREAS = [
  "Debt Recovery & Financial Claims",
  "Property",
  "Contractual",
  "Construction",
  "Intellectual Property",
  "Employer–Employee",
  "Tenancy",
  "Insurance",
  "Partnership",
  "Other / Not sure",
];

const EXPERIENCE = ["Less than 2 years", "2–5 years", "6–10 years", "11–20 years", "More than 20 years"];
const STATUS = ["Student", "Practising professional", "Other"];
const SECTIONS = {
  disputes: { label: "Dispute Resolution", href: "/dispute-resolution" },
  training: { label: "Training Institute", href: "/training" },
  membership: { label: "Membership", href: "/membership" },
  knowledge: { label: "Knowledge Centre", href: "/knowledge" },
  about: { label: "About", href: "/about" },
};

const amount: QueryField = {
  name: "amount",
  label: "Approximate amount involved (optional)",
  placeholder: "e.g. ₹5,00,000",
  half: true,
};
const otherParty: QueryField = { name: "otherParty", label: "Other party (name)", half: true };
const city: QueryField = { name: "location", label: "City", half: true };
const practiceArea = (label = "Nature of the dispute"): QueryField => ({
  name: "practiceArea",
  label,
  type: "select",
  required: true,
  options: PRACTICE_AREAS,
});

// Course, and who the applicant is — shared by enrolment and scholarships.
const courseFields: QueryField[] = [
  { name: "courseLevel", label: "Course type", type: "select", required: true, options: Object.keys(COURSE_OPTIONS), half: true },
  {
    name: "course",
    label: "Course",
    type: "select",
    required: true,
    optionsFrom: { field: "courseLevel", map: COURSE_OPTIONS },
    half: true,
  },
  { name: "status", label: "You are a", type: "select", required: true, options: STATUS, half: true },
  {
    name: "institution",
    label: "College / University",
    required: true,
    showWhen: { field: "status", values: ["Student"] },
    half: true,
  },
  {
    name: "studyYear",
    label: "Course and year of study",
    placeholder: "e.g. B.A. LL.B., 3rd year",
    required: true,
    showWhen: { field: "status", values: ["Student"] },
    half: true,
  },
  {
    name: "profession",
    label: "Profession",
    type: "select",
    required: true,
    options: PROFESSIONS,
    showWhen: { field: "status", values: ["Practising professional"] },
    half: true,
  },
  {
    name: "experience",
    label: "Years of experience",
    type: "select",
    options: EXPERIENCE,
    showWhen: { field: "status", values: ["Practising professional"] },
    half: true,
  },
];

// The general query: every service, grouped, so each query reaches the
// right team. Course and student queries open follow-up fields.
export const QUERY_GROUPS = [
  {
    label: "Disputes",
    options: [
      "File a Dispute",
      "Respond to a Dispute",
      "Emergency Arbitration",
      "Corporate / Commercial Dispute",
      "Implementation of an Order or Award",
      "Free Consultation",
      "Other dispute matter (not listed)",
    ],
  },
  { label: "Drafting", options: ["Contract / Clause Drafting", "Model Clauses", "Other drafting matter (not listed)"] },
  {
    label: "Training & Careers",
    options: ["Course Enrollment", "Scholarship Application", "Certification", "Internship", "Apprenticeship", "Moots & Competitions", "Other training query (not listed)"],
  },
  {
    label: "Join Adjudix",
    options: ["Join as Panelist / Arbitrator / Mediator", "Membership Application", "Faculty / Guest Lecture", "Careers at Adjudix", "Other way to join (not listed)"],
  },
  {
    label: "Other",
    options: ["Partnership Inquiry", "Events & Webinars", "Research & Publications", "Media / Press", "Feedback or Grievance", "General Contact Query", "Anything else (not listed)"],
  },
];

const COURSE_QUERIES = ["Course Enrollment", "Scholarship Application", "Certification"];
const STUDENT_QUERIES = ["Internship", "Apprenticeship", "Moots & Competitions"];
const PROFESSION_QUERIES = ["Join as Panelist / Arbitrator / Mediator", "Faculty / Guest Lecture"];
const DISPUTE_QUERIES = ["File a Dispute", "Respond to a Dispute", "Emergency Arbitration", "Free Consultation"];

export const ENQUIRY_FORM: ApplyForm = {
  slug: "enquiry",
  kind: "enquiry",
  sections: [
    { title: "What is your query about?", fields: ["queryType", "courseLevel", "course", "institution", "studyYear", "profession", "practiceArea"] },
    { title: "Who are we speaking to?", fields: ["name", "organization", "email", "phone", "location"] },
    { title: "Your message", fields: ["message"] },
  ],
  title: "Send us a query",
  intro: "Choose what your query is about and it will be routed to the right team. We usually reply within one working day.",
  section: { label: "Contact", href: "/contact" },
  fields: [
    { name: "queryType", label: "Type of query", type: "select", required: true, optionGroups: QUERY_GROUPS, display: "tiles" },
    {
      name: "courseLevel",
      label: "Course type",
      type: "select",
      required: true,
      options: Object.keys(COURSE_OPTIONS),
      showWhen: { field: "queryType", values: COURSE_QUERIES },
      half: true,
    },
    {
      name: "course",
      label: "Course",
      type: "select",
      required: true,
      optionsFrom: { field: "courseLevel", map: COURSE_OPTIONS },
      showWhen: { field: "queryType", values: COURSE_QUERIES },
      half: true,
    },
    { name: "institution", label: "College / University", required: true, showWhen: { field: "queryType", values: STUDENT_QUERIES }, half: true },
    {
      name: "studyYear",
      label: "Course and year of study",
      placeholder: "e.g. B.A. LL.B., 3rd year",
      showWhen: { field: "queryType", values: STUDENT_QUERIES },
      half: true,
    },
    {
      name: "profession",
      label: "Your profession",
      type: "select",
      required: true,
      options: PROFESSIONS,
      showWhen: { field: "queryType", values: PROFESSION_QUERIES },
    },
    {
      name: "practiceArea",
      label: "Nature of the dispute",
      type: "select",
      options: PRACTICE_AREAS,
      showWhen: { field: "queryType", values: DISPUTE_QUERIES },
    },
    { name: "location", label: "City / Location (optional)" },
  ],
  submitLabel: "Submit Query",
  successTitle: "Query received",
  successBody: "Thank you — your query has been routed to the right team and we'll be in touch shortly.",
};

const FORMS: ApplyForm[] = [
  ENQUIRY_FORM,
  // ── Disputes ────────────────────────────────────────────────────────────
  {
    slug: "consultation",
    kind: "enquiry",
    sections: [
      { title: "Tell us about the matter", fields: ["practiceArea", "role", "amount", "message"] },
      { title: "How should we call you?", fields: ["mode", "slot", "location"] },
      { title: "Who are we speaking to?", fields: ["name", "organization", "email", "phone"] },
    ],
    title: "Book your free consultation",
    intro: "Tell us briefly about the matter and how to reach you. A member of our professional panel will call you back to discuss your options — at no charge.",
    section: SECTIONS.disputes,
    fields: [
      practiceArea("Nature of the matter"),
      {
        name: "role",
        label: "You are",
        type: "select",
        required: true,
        options: ["Raising a claim", "Responding to a claim", "Exploring options before a dispute", "Other / not listed"],
        half: true,
      },
      amount,
      { name: "mode", label: "Preferred consultation", type: "select", required: true, options: ["Phone call", "Video call", "In person"], half: true },
      { name: "slot", label: "Best time to reach you", type: "select", options: ["Morning (9–12)", "Afternoon (12–4)", "Evening (4–7)"], half: true },
      city,
    ],
    messageLabel: "Briefly describe the matter",
    messageRequired: true,
    submitLabel: "Book Free Consultation",
    successTitle: "Consultation requested",
    successBody: "Thank you — a member of our panel will contact you at your preferred time to arrange the consultation.",
  },
  {
    slug: "emergency",
    kind: "filing",
    tone: "urgent",
    sections: [
      { title: "The relief", fields: ["relief", "urgency", "agreement", "message"], description: "What you need, and why it cannot wait." },
      { title: "The parties", fields: ["name", "organization", "otherParty", "amount"] },
      { title: "Contact & documents", fields: ["email", "phone", "attachments"], description: "The Secretariat will contact you here today." },
    ],
    title: "Emergency arbitration application",
    intro: "For interim relief that cannot wait for the tribunal to be constituted. The Secretariat reviews every application on the day it is received.",
    section: SECTIONS.disputes,
    fields: [
      {
        name: "relief",
        label: "Relief sought",
        type: "select",
        required: true,
        options: ["Stay / injunction", "Preservation of assets", "Preservation of evidence", "Security for the amount in dispute", "Other interim measure"],
      },
      { name: "urgency", label: "Relief needed within", type: "select", required: true, options: ["24 hours", "3 days", "A week"], half: true },
      {
        name: "agreement",
        label: "Is there an arbitration agreement?",
        type: "select",
        required: true,
        options: ["Yes", "No", "Not sure"],
        half: true,
      },
      { ...otherParty, required: true },
      amount,
    ],
    organization: "optional",
    messageLabel: "What will happen if relief is not granted urgently?",
    messageRequired: true,
    attachmentsLabel: "Arbitration agreement and supporting documents",
    submitLabel: "Submit Emergency Application",
    successTitle: "Emergency application received",
    successBody: "The Secretariat will review your application today and contact you on the phone number or email you gave.",
  },
  {
    slug: "lok-adalat",
    kind: "filing",
    sections: [
      { title: "The dispute", fields: ["practiceArea", "pending", "court", "otherParty", "amount", "message"] },
      { title: "The sitting", fields: ["mode", "attachments"] },
      { title: "Your details", fields: ["name", "organization", "email", "phone"] },
    ],
    title: "Check Lok Adalat eligibility",
    intro: "Lok Adalat suits disputes the parties are willing to settle. Tell us about yours and we will confirm whether it can be listed for a sitting.",
    section: SECTIONS.disputes,
    fields: [
      practiceArea(),
      { name: "pending", label: "Is it pending before a court?", type: "select", required: true, options: ["No", "Yes"], half: true },
      {
        name: "court",
        label: "Court and case number",
        required: true,
        showWhen: { field: "pending", values: ["Yes"] },
        half: true,
      },
      otherParty,
      amount,
      { name: "mode", label: "Preferred sitting", type: "select", options: ["Online", "In person", "Either"], half: true },
    ],
    messageLabel: "Briefly describe the dispute",
    messageRequired: true,
    attachmentsLabel: "Supporting documents (optional)",
    submitLabel: "Check Eligibility",
    successTitle: "Request received",
    successBody: "Thank you — we will review the details and let you know whether the matter can be listed for a Lok Adalat sitting.",
  },
  {
    slug: "implementation",
    kind: "filing",
    sections: [
      { title: "The order", fields: ["orderType", "forum", "orderDate", "challenge", "attachments"] },
      { title: "Recovery", fields: ["otherParty", "amount", "message"] },
      { title: "Your details", fields: ["name", "organization", "email", "phone"] },
    ],
    title: "Implement an order or award",
    intro: "Share the order you hold and who it is against. We will tell you the route to implementation and what it involves.",
    section: { label: "Implementation", href: "/implementation" },
    fields: [
      {
        name: "orderType",
        label: "What needs to be implemented?",
        type: "select",
        required: true,
        options: ["Arbitral award", "Mediated / conciliated settlement", "Lok Adalat award", "Court decree or order", "Foreign award", "Other order (not listed)"],
      },
      { name: "forum", label: "Passed by (tribunal, court, or institution)", required: true, half: true },
      { name: "orderDate", label: "Date of the order or award", type: "date", half: true },
      { name: "otherParty", label: "Party it is to be implemented against", required: true, half: true },
      { ...amount, label: "Amount to be recovered (if any)" },
      {
        name: "challenge",
        label: "Has it been challenged?",
        type: "select",
        options: ["No", "Yes — challenge pending", "Not sure"],
        half: true,
      },
    ],
    organization: "optional",
    messageLabel: "Anything else we should know (optional)",
    attachmentsLabel: "Copy of the order or award",
    submitLabel: "Submit for Review",
    successTitle: "Received",
    successBody: "Thank you — our implementation team will review the order and contact you with the next steps.",
  },
  {
    slug: "ad-hoc",
    kind: "filing",
    sections: [
      { title: "The appointment", fields: ["neutral", "tribunal", "agreed", "practiceArea"] },
      { title: "The dispute", fields: ["otherParty", "amount", "message", "attachments"] },
      { title: "Your details", fields: ["name", "organization", "email", "phone"] },
    ],
    title: "Request an ad hoc appointment",
    intro: "Where the parties have agreed to Adjudix appointing a neutral outside full institutional administration, tell us who is needed and for what.",
    section: { label: "ODR Platform", href: "/odr" },
    fields: [
      { name: "neutral", label: "Appointment needed", type: "select", required: true, options: ["Arbitrator", "Mediator", "Conciliator", "Other / not sure"], half: true },
      { name: "tribunal", label: "Number of neutrals", type: "select", options: ["Sole", "Three-member panel", "Not decided"], half: true },
      {
        name: "agreed",
        label: "Have all parties agreed to Adjudix appointing?",
        type: "select",
        required: true,
        options: ["Yes", "Not yet", "Not sure"],
      },
      { ...practiceArea(), half: true },
      otherParty,
      amount,
    ],
    organization: "optional",
    messageLabel: "Anything the appointment should account for (expertise, language, seat)",
    attachmentsLabel: "Arbitration agreement or clause",
    submitLabel: "Request Appointment",
    successTitle: "Request received",
    successBody: "Thank you — the Secretariat will confirm the parties' agreement and propose a neutral.",
  },
  {
    slug: "corporate",
    kind: "application",
    sections: [
      { title: "Your company", fields: ["organization", "name", "designation", "email", "phone"] },
      { title: "The matter", fields: ["issue", "service", "amount", "message"] },
    ],
    title: "Corporate dispute resolution",
    intro: "For companies with a live dispute, or wanting a standing arrangement for resolving them. Our corporate desk will respond within one working day.",
    section: SECTIONS.disputes,
    organization: "required",
    organizationLabel: "Company",
    fields: [
      { name: "designation", label: "Your designation", required: true, half: true },
      {
        name: "issue",
        label: "Nature of the matter",
        type: "select",
        required: true,
        options: ["Shareholder / board dispute", "Commercial contract", "Vendor or supplier", "Employment", "Joint venture / partnership", "Other"],
        half: true,
      },
      {
        name: "service",
        label: "Looking for",
        type: "select",
        required: true,
        options: ["Resolve an existing dispute", "A dispute-management retainer", "Drafting or review of ADR clauses", "Training for our team", "Other / not listed"],
        half: true,
      },
      amount,
    ],
    messageLabel: "Brief summary",
    submitLabel: "Contact Corporate Desk",
    successTitle: "Received",
    successBody: "Thank you — our corporate desk will contact you within one working day.",
  },
  {
    slug: "drafting",
    kind: "application",
    sections: [
      { title: "What you need", fields: ["service", "contractType", "mechanism", "deadline", "message", "attachments"] },
      { title: "Your details", fields: ["name", "organization", "email", "phone"] },
    ],
    title: "Contract & clause drafting",
    intro: "Tell us what you need drafted or reviewed. We will reply with the scope, timeline, and fee before any work begins.",
    section: SECTIONS.disputes,
    organization: "optional",
    fields: [
      {
        name: "service",
        label: "What do you need?",
        type: "select",
        required: true,
        options: ["Draft a new contract", "Review an existing contract", "An ADR clause only", "Guidance on a model clause", "Other / not listed"],
      },
      {
        name: "contractType",
        label: "Type of contract",
        type: "select",
        required: true,
        options: ["Commercial / supply", "Services", "Employment", "Lease / tenancy", "Construction", "IP licence", "Partnership / shareholder", "Other"],
        half: true,
      },
      {
        name: "mechanism",
        label: "Preferred dispute mechanism",
        type: "select",
        options: ["Arbitration", "Mediation", "Med-Arb", "Not sure — advise me"],
        half: true,
      },
      { name: "deadline", label: "Needed by (optional)", type: "date", half: true },
    ],
    messageLabel: "Briefly describe the transaction",
    messageRequired: true,
    attachmentsLabel: "Existing draft or contract (optional)",
    submitLabel: "Request a Quote",
    successTitle: "Request received",
    successBody: "Thank you — we will send you the scope, timeline, and fee shortly.",
  },

  // ── Training ────────────────────────────────────────────────────────────
  {
    slug: "course",
    kind: "registration",
    sections: [
      { title: "Choose your course", fields: ["courseLevel", "course", "mode"] },
      { title: "About you", fields: ["name", "email", "phone", "status", "institution", "studyYear", "profession", "experience", "location", "message"] },
    ],
    title: "Enrol in a course",
    intro: "Choose your course and tell us a little about yourself. The Training Institute will send you the next cohort's dates, format, and fee.",
    section: SECTIONS.training,
    organization: "hidden",
    fields: [
      ...courseFields,
      { name: "mode", label: "Preferred mode", type: "select", options: ["Online", "In person", "Hybrid"], half: true },
      city,
    ],
    messageLabel: "Anything you'd like us to know (optional)",
    submitLabel: "Apply to Enrol",
    successTitle: "Application received",
    successBody: "Thank you — the Training Institute will email you the next available dates and how to confirm your seat.",
  },
  {
    slug: "scholarship",
    kind: "application",
    sections: [
      { title: "Your course", fields: ["courseLevel", "course"] },
      { title: "About you", fields: ["name", "email", "phone", "status", "institution", "studyYear", "profession", "experience", "location"] },
      { title: "Your application", fields: ["income", "message", "attachments"] },
    ],
    title: "Apply for a scholarship",
    intro: "Scholarships cover part or all of the course fee and are awarded on merit and need. Applications are reviewed before each cohort begins.",
    section: SECTIONS.training,
    organization: "hidden",
    fields: [
      ...courseFields,
      {
        name: "income",
        label: "Annual family income",
        type: "select",
        required: true,
        options: ["Up to ₹3 lakh", "₹3–6 lakh", "₹6–10 lakh", "Above ₹10 lakh", "Prefer not to say"],
        half: true,
      },
      city,
    ],
    messageLabel: "Why are you applying for a scholarship?",
    messageRequired: true,
    attachmentsLabel: "Supporting documents (ID, marksheet, income proof)",
    submitLabel: "Apply for Scholarship",
    successTitle: "Scholarship application received",
    successBody: "Thank you — the scholarship committee will review your application and write to you before the cohort begins.",
  },
  {
    slug: "internship",
    kind: "application",
    sections: [
      { title: "About you", fields: ["name", "email", "phone", "institution", "studyYear"] },
      { title: "The internship", fields: ["duration", "start", "workMode", "interest", "message"] },
      { title: "Documents", fields: ["attachments"] },
    ],
    title: "Apply for an internship",
    intro: "Internships are open to law and allied students: research, case preparation, drafting, and observing proceedings alongside the Secretariat and panel.",
    section: SECTIONS.training,
    organization: "hidden",
    fields: [
      { name: "institution", label: "College / University", required: true, half: true },
      { name: "studyYear", label: "Course and year of study", placeholder: "e.g. B.A. LL.B., 3rd year", required: true, half: true },
      { name: "duration", label: "Duration", type: "select", required: true, options: ["4 weeks", "6 weeks", "8 weeks", "3 months"], half: true },
      { name: "start", label: "Preferred start", type: "month", required: true, half: true },
      { name: "workMode", label: "Mode", type: "select", options: ["Remote", "In office", "Hybrid"], half: true },
      {
        name: "interest",
        label: "Area of interest",
        type: "select",
        options: ["Arbitration", "Mediation & conciliation", "Contract drafting", "Research & writing", "ODR / legal technology", "Any"],
        half: true,
      },
    ],
    messageLabel: "Why would you like to intern with Adjudix? (optional)",
    attachmentsLabel: "CV / résumé",
    submitLabel: "Apply for Internship",
    successTitle: "Internship application received",
    successBody: "Thank you — we will review your application and contact you about available positions.",
  },
  {
    slug: "apprenticeship",
    kind: "application",
    sections: [
      { title: "About you", fields: ["name", "email", "phone", "profession", "experience", "location"] },
      { title: "Your practice", fields: ["track", "practiceArea", "availability", "message"] },
      { title: "Documents", fields: ["attachments"] },
    ],
    title: "Apply for an apprenticeship",
    intro: "Apprentices shadow an active panelist on real cases, then practise under supervision before independent panel appointment.",
    section: SECTIONS.training,
    organization: "hidden",
    fields: [
      {
        name: "track",
        label: "Training Institute track completed",
        type: "select",
        required: true,
        options: ["Arbitrator Track", "Conciliator Track", "Mediator Track", "Hybrid ADR Track", "None yet"],
        half: true,
      },
      { name: "profession", label: "Profession", type: "select", required: true, options: PROFESSIONS, half: true },
      { name: "experience", label: "Years of experience", type: "select", required: true, options: EXPERIENCE, half: true },
      { ...practiceArea("Area you want to practise in"), half: true },
      { name: "availability", label: "Availability", type: "select", options: ["Full-time", "Part-time", "Weekends only"], half: true },
      city,
    ],
    messageLabel: "Relevant experience (optional)",
    attachmentsLabel: "CV and certificates",
    submitLabel: "Apply for Apprenticeship",
    successTitle: "Apprenticeship application received",
    successBody: "Thank you — we will review your application and contact you when a placement with a panelist is available.",
  },
  {
    slug: "faculty",
    kind: "application",
    sections: [
      { title: "About you", fields: ["name", "organization", "email", "phone", "profession", "experience"] },
      { title: "What you would teach", fields: ["format", "topics", "message"] },
      { title: "Documents", fields: ["attachments"] },
    ],
    title: "Apply to teach",
    intro: "We invite practitioners to teach Training Institute courses, give guest lectures, and judge or coach moots.",
    section: SECTIONS.training,
    organization: "optional",
    organizationLabel: "Current affiliation (optional)",
    fields: [
      { name: "profession", label: "Profession", type: "select", required: true, options: PROFESSIONS, half: true },
      { name: "experience", label: "Years of experience", type: "select", required: true, options: EXPERIENCE, half: true },
      {
        name: "format",
        label: "Interested in",
        type: "select",
        required: true,
        options: ["Course faculty", "Guest lecture", "Workshop / masterclass", "Moot judge or coach", "Other / not listed"],
        half: true,
      },
      { name: "topics", label: "Topics you can teach", required: true, half: true },
    ],
    messageLabel: "Teaching experience (optional)",
    attachmentsLabel: "CV",
    submitLabel: "Apply to Teach",
    successTitle: "Application received",
    successBody: "Thank you — the Training Institute will be in touch about upcoming opportunities.",
  },

  // ── Joining ─────────────────────────────────────────────────────────────
  {
    slug: "panel",
    kind: "application",
    sections: [
      { title: "About you", fields: ["name", "organization", "email", "phone", "location"] },
      { title: "Your practice", fields: ["profession", "experience", "role", "practiceArea", "registration", "languages"] },
      { title: "Profile & credentials", fields: ["message", "attachments"], description: "Attach a CV, or write a brief profile." },
    ],
    title: "Apply to the Professional Panel",
    intro: "Panelists are appointed as arbitrators, mediators, and conciliators in Adjudix proceedings. Applications are reviewed by the Appointments Committee.",
    section: { label: "Our Professional Panel", href: "/panel" },
    organization: "optional",
    organizationLabel: "Firm / organisation (optional)",
    fields: [
      { name: "profession", label: "Profession", type: "select", required: true, options: PROFESSIONS, half: true },
      { name: "experience", label: "Years of experience", type: "select", required: true, options: EXPERIENCE, half: true },
      {
        name: "role",
        label: "Apply as",
        type: "select",
        required: true,
        options: ["Arbitrator", "Mediator", "Conciliator", "Arbitrator and mediator", "Expert / technical member", "Other / not listed"],
        half: true,
      },
      { ...practiceArea("Main area of expertise"), half: true },
      { name: "registration", label: "Bar / professional registration no. (optional)", half: true },
      { name: "languages", label: "Languages you can conduct proceedings in", placeholder: "e.g. English, Hindi", half: true },
      city,
    ],
    messageLabel: "Brief profile (optional if you attach a CV)",
    attachmentsLabel: "CV and credentials",
    submitLabel: "Apply to the Panel",
    successTitle: "Panel application received",
    successBody: "Thank you — the Appointments Committee will review your application and contact you.",
  },
  {
    slug: "membership",
    kind: "application",
    sections: [
      { title: "Choose your tier", fields: ["tier"] },
      { title: "About you", fields: ["name", "email", "phone", "profession", "experience", "institution", "studyYear", "qualification", "location"] },
      { title: "Anything else", fields: ["message", "attachments"] },
    ],
    title: "Apply for membership",
    intro: "Choose the membership tier you are applying for. Eligibility for each tier is set out on its page.",
    section: SECTIONS.membership,
    organization: "hidden",
    fields: [
      { name: "tier", label: "Membership tier", type: "select", required: true, options: ["Fellow", "Associate", "Affiliate", "Student"], display: "cards-large" },
      {
        name: "profession",
        label: "Profession",
        type: "select",
        required: true,
        options: PROFESSIONS,
        showWhen: { field: "tier", values: ["Fellow", "Associate", "Affiliate"] },
        half: true,
      },
      {
        name: "experience",
        label: "Years of experience",
        type: "select",
        required: true,
        options: EXPERIENCE,
        showWhen: { field: "tier", values: ["Fellow", "Associate", "Affiliate"] },
        half: true,
      },
      {
        name: "institution",
        label: "College / University",
        required: true,
        showWhen: { field: "tier", values: ["Student"] },
        half: true,
      },
      {
        name: "studyYear",
        label: "Course and year of study",
        placeholder: "e.g. B.A. LL.B., 3rd year",
        required: true,
        showWhen: { field: "tier", values: ["Student"] },
        half: true,
      },
      { name: "qualification", label: "Highest qualification", half: true },
      city,
    ],
    messageLabel: "Why would you like to join? (optional)",
    attachmentsLabel: "CV or student ID (optional)",
    submitLabel: "Apply for Membership",
    successTitle: "Membership application received",
    successBody: "Thank you — the Membership Committee will review your application and write to you with the next steps.",
  },
  {
    slug: "partnership",
    kind: "application",
    sections: [
      { title: "Your organisation", fields: ["organization", "name", "designation", "email", "phone", "orgWebsite"] },
      { title: "The partnership", fields: ["partnerType", "message"] },
    ],
    title: "Partner with Adjudix",
    intro: "Corporate, education, and training partnerships. Tell us about your organisation and what you have in mind.",
    section: { label: "Our Partners", href: "/partners" },
    organization: "required",
    organizationLabel: "Organisation",
    fields: [
      { name: "designation", label: "Your designation", required: true, half: true },
      {
        name: "partnerType",
        label: "Partnership type",
        type: "select",
        required: true,
        options: ["Corporate Partner", "Education Partner", "Training Partner", "Other"],
        half: true,
      },
      { name: "orgWebsite", label: "Website (optional)", type: "url", placeholder: "https://", half: true },
    ],
    messageLabel: "What would you like to partner on?",
    messageRequired: true,
    submitLabel: "Send Proposal",
    successTitle: "Proposal received",
    successBody: "Thank you — our partnerships team will be in touch.",
  },
  {
    slug: "careers",
    kind: "application",
    sections: [
      { title: "About you", fields: ["name", "email", "phone", "location"] },
      { title: "The role", fields: ["role", "experience", "message"] },
      { title: "Documents", fields: ["attachments"] },
    ],
    title: "Careers at Adjudix",
    intro: "Tell us the kind of role you're looking for. We keep every application on file and contact you when a matching role opens.",
    section: SECTIONS.about,
    organization: "hidden",
    fields: [
      { name: "role", label: "Role you're interested in", required: true, half: true },
      { name: "experience", label: "Years of experience", type: "select", required: true, options: EXPERIENCE, half: true },
      city,
    ],
    messageLabel: "Cover note (optional)",
    attachmentsLabel: "CV / résumé",
    submitLabel: "Send Application",
    successTitle: "Application received",
    successBody: "Thank you — we will contact you when a matching role opens.",
  },

  // ── Knowledge & events ──────────────────────────────────────────────────
  {
    slug: "competition",
    kind: "registration",
    sections: [
      { title: "Choose your competition", fields: ["competition", "participation", "teamSize"] },
      { title: "About you", fields: ["name", "email", "phone", "institution", "studyYear", "message"] },
    ],
    title: "Register for a competition",
    intro: "Register now and we will send you the dates, rules, and problem for the next edition.",
    section: SECTIONS.knowledge,
    organization: "hidden",
    fields: [
      {
        name: "competition",
        label: "Competition",
        type: "select",
        required: true,
        options: COMPETITIONS.map((competition) => competition.title),
      },
      { name: "participation", label: "Participating as", type: "select", required: true, options: ["Individual", "Team"], half: true },
      {
        name: "teamSize",
        label: "Team size",
        type: "select",
        required: true,
        options: ["2", "3", "4"],
        showWhen: { field: "participation", values: ["Team"] },
        half: true,
      },
      { name: "institution", label: "College / University", required: true, half: true },
      { name: "studyYear", label: "Course and year of study", placeholder: "e.g. B.A. LL.B., 3rd year", half: true },
    ],
    messageLabel: "Questions for the organisers (optional)",
    submitLabel: "Register",
    successTitle: "Registered",
    successBody: "Thank you — we will email you the dates and rules as soon as the next edition is announced.",
  },
  {
    slug: "event",
    kind: "registration",
    sections: [
      { title: "Choose your events", fields: ["event", "attendingAs", "attendees", "mode"] },
      { title: "About you", fields: ["name", "organization", "email", "phone", "location"] },
    ],
    title: "Register for events",
    intro: "Register your interest and we will send you invitations to upcoming events.",
    section: { label: "Events", href: "/events" },
    fields: [
      {
        name: "event",
        label: "Interested in",
        type: "select",
        required: true,
        options: ["Annual flagship conference", "Webinars", "Workshops", "Competitions", "All upcoming events"],
      },
      { name: "attendingAs", label: "Attending as", type: "select", required: true, options: ["Student", "Professional", "Organisation / team"], half: true },
      {
        name: "attendees",
        label: "Number of attendees",
        type: "select",
        options: ["2–5", "6–10", "More than 10"],
        showWhen: { field: "attendingAs", values: ["Organisation / team"] },
        half: true,
      },
      { name: "mode", label: "Preferred format", type: "select", options: ["In person", "Online", "Either"], half: true },
      city,
    ],
    noMessage: true,
    submitLabel: "Register Interest",
    successTitle: "You're on the list",
    successBody: "Thank you — we will send you invitations as upcoming events are announced.",
  },
  {
    slug: "research",
    kind: "application",
    sections: [
      { title: "Your submission", fields: ["submissionType", "title", "coAuthors", "message", "attachments"] },
      { title: "About you", fields: ["name", "organization", "email", "phone"] },
    ],
    title: "Submit your research",
    intro: "Articles, papers, and case comments on arbitration and ADR are reviewed by our editorial board for publication.",
    section: SECTIONS.knowledge,
    organization: "optional",
    organizationLabel: "Affiliation (optional)",
    fields: [
      {
        name: "submissionType",
        label: "Type of submission",
        type: "select",
        required: true,
        options: ["Article", "Research paper", "Case comment", "Book review", "Other / not listed"],
        half: true,
      },
      { name: "coAuthors", label: "Co-authors (optional)", half: true },
      { name: "title", label: "Working title", required: true },
    ],
    messageLabel: "Abstract (up to 250 words)",
    messageRequired: true,
    attachmentsLabel: "Manuscript (PDF or Word)",
    submitLabel: "Submit for Review",
    successTitle: "Submission received",
    successBody: "Thank you — the editorial board will review your submission and write to you with its decision.",
  },
  {
    slug: "subscribe",
    kind: "subscribe",
    title: "Subscribe to updates",
    intro: "New articles, research, events, and course cohorts — sent to your inbox, never more than twice a month.",
    section: SECTIONS.knowledge,
    organization: "hidden",
    contact: "email",
    fields: [
      {
        name: "interest",
        label: "Send me",
        type: "select",
        required: true,
        options: ["Everything", "Articles & research", "Events & competitions", "Courses"],
      },
    ],
    noMessage: true,
    submitLabel: "Subscribe",
    successTitle: "Subscribed",
    successBody: "Thank you — you'll hear from us with the next update.",
  },
];

export const APPLY_FORMS: Record<string, ApplyForm> = Object.fromEntries(FORMS.map((form) => [form.slug, form]));

export function getApplyForm(slug: string): ApplyForm | undefined {
  return APPLY_FORMS[slug];
}

/** Link that opens an action form, optionally with fields already chosen. */
export function applyHref(slug: keyof typeof APPLY_FORMS | string, prefill?: Record<string, string>): string {
  const query = prefill ? new URLSearchParams(prefill).toString() : "";
  return `/apply/${slug}${query ? `?${query}` : ""}`;
}

/**
 * Turns URL parameters into default values, accepting only values a field
 * actually offers, so a link can pre-select a course but not inject text.
 */
export function withPrefill(form: ApplyForm, params: Record<string, string | string[] | undefined>): QueryField[] {
  const one = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
  const chosen: Record<string, string> = {};
  const offered = (field: QueryField) =>
    field.optionsFrom ? (field.optionsFrom.map[chosen[field.optionsFrom.field] ?? ""] ?? []) : (field.options ?? field.optionGroups?.flatMap((g) => g.options) ?? []);
  return form.fields.map((field) => {
    const value = one(params[field.name]);
    if (field.type !== "select" || !value || !offered(field).includes(value)) return field;
    chosen[field.name] = value;
    return { ...field, defaultValue: value };
  });
}
