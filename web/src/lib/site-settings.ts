import { option, type FieldSpec } from "@/lib/content/schema";

// Site-wide settings: the header and footer menus, the announcement bar,
// the consultation pop-up, the intro reel, contact mailboxes and the
// translation menu. Edited in the console under Site settings; these are the
// defaults until the first publish. (Kept out of the client components that
// draw them, so the server can read the values.)

export interface NavLink {
  label: string;
  href: string;
  // Membership tiers carry a star rating (client brief: stars, not "Tier 01").
  stars?: number;
  // Rendered indented beneath the previous link (Competitions under Events).
  nested?: boolean;
  // Bold + ember, for links the client asked to stand out.
  highlight?: boolean;
}

export interface NavSection {
  label: string;
  links: NavLink[];
}

export interface NavGroup {
  label: string;
  href?: string;
  children?: NavLink[];
  // Grouped, labeled columns for a mega-menu-style dropdown — used where a
  // flat list would bury an important distinction (Dispute Resolution's
  // types vs. its mechanisms/services) in one long list.
  sections?: NavSection[];
}

// Main (large) row. Structure follows the client's Oct 2026 markup: Events
// moved under Knowledge, Our Professional Panel and Implementation promoted
// to top level.
export const NAV_GROUPS: NavGroup[] = [
  { label: "About", href: "/about" },
  {
    label: "Dispute Resolution",
    href: "/dispute-resolution",
    sections: [
      {
        label: "By Type",
        links: [
          { label: "Domestic Dispute Resolution", href: "/dispute-resolution/domestic" },
          { label: "International Dispute Resolution", href: "/dispute-resolution/international", highlight: true },
          { label: "Online Dispute Resolution", href: "/odr" },
          { label: "Offline Dispute Resolution", href: "/dispute-resolution/offline" },
          { label: "Hybrid Dispute Resolution", href: "/dispute-resolution/hybrid", highlight: true },
          { label: "Emergency Arbitration", href: "/dispute-resolution/emergency", highlight: true },
          { label: "Practice Areas", href: "/dispute-resolution/practice-areas", highlight: true },
        ],
      },
      {
        label: "Mechanisms & Services",
        links: [
          { label: "Hybrid ADR Mechanism", href: "/dispute-resolution/hybrid", highlight: true },
          { label: "Arbitration", href: "/dispute-resolution/arbitration" },
          { label: "Mediation", href: "/dispute-resolution/mediation" },
          { label: "Conciliation", href: "/dispute-resolution/conciliation" },
          { label: "Adjudix Lok Adalat", href: "/dispute-resolution/lok-adalat", highlight: true },
          { label: "Emergency Arbitration", href: "/dispute-resolution/emergency", highlight: true },
          { label: "Corporate Dispute Resolution", href: "/dispute-resolution/corporate", highlight: true },
        ],
      },
    ],
  },
  {
    label: "Training & Certification Courses",
    href: "/training",
    children: [
      { label: "Professional Courses", href: "/training/courses" },
      { label: "Student Courses", href: "/training/courses#student-courses" },
      { label: "Faculty", href: "/training/faculty" },
      { label: "Upcoming Courses", href: "/training/calendar" },
    ],
  },
  {
    label: "Memberships",
    href: "/membership",
    children: [
      { label: "Compare Tiers", href: "/membership" },
      { label: "Fellow", href: "/membership/fellow", stars: 5 },
      { label: "Associate", href: "/membership/associated", stars: 4 },
      { label: "Affiliate", href: "/membership/affiliated", stars: 3 },
      { label: "Student", href: "/membership/student", stars: 2 },
      { label: "Special Honorary (beyond stars)", href: "/membership/honorary" },
      { label: "Our Esteemed Members", href: "/membership/directory", highlight: true },
      { label: "Register of Members", href: "/membership/register" },
    ],
  },
  {
    label: "Knowledge",
    href: "/knowledge",
    children: [
      { label: "Blogs & Articles", href: "/knowledge/blog" },
      { label: "Research & Publications", href: "/knowledge/research" },
      { label: "Events", href: "/events" },
      { label: "Competitions", href: "/knowledge/competitions", nested: true },
    ],
  },
  { label: "Our Professional Panel", href: "/panel" },
  { label: "Implementation of ADR Orders", href: "/implementation" },
];

// Second (small) row, left side: services and programmes the client added.
export const SECONDARY_LINKS: NavLink[] = [
  { label: "Contract & Clause Drafting", href: "/dispute-resolution/clause-drafting" },
  { label: "Rules & Fees Calculator", href: "/dispute-resolution/fees" },
  { label: "Model Clauses", href: "/dispute-resolution/model-clauses" },
  { label: "Apprenticeship & Internships", href: "/training/apprenticeships" },
  { label: "Our Esteemed Partners", href: "/partners" },
];

// Columns follow the client's Oct 2026 footer markup. The Institute column is
// organised around their Who / What / Why / How / Where framing.
export const FOOTER_GROUPS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Dispute Resolution",
    links: [
      { label: "ADR Mechanisms", href: "/dispute-resolution" },
      { label: "Emergency Arbitration", href: "/dispute-resolution/emergency" },
      { label: "Practice Areas", href: "/dispute-resolution/practice-areas" },
      { label: "Rules & Governance", href: "/dispute-resolution/rules" },
      { label: "Corporate Services", href: "/dispute-resolution/corporate" },
      { label: "Implementation", href: "/implementation" },
    ],
  },
  {
    title: "ODR Platform",
    links: [
      { label: "How It Works", href: "/odr" },
      { label: "File a Dispute", href: "/odr/file" },
      { label: "Respond to a Dispute", href: "/odr/respond" },
      { label: "Portal Login", href: "/odr/portal" },
    ],
  },
  {
    title: "Training Institute",
    links: [
      { label: "Professional Courses", href: "/training/courses" },
      { label: "Student Courses", href: "/training/courses#student-courses" },
      { label: "Apprenticeships & Internships", href: "/training/apprenticeships" },
    ],
  },
  {
    title: "Institute",
    links: [
      { label: "Who We Are", href: "/about/our-story" },
      { label: "What We Do", href: "/dispute-resolution" },
      { label: "Why Us", href: "/about" },
      { label: "Our Professional Panel", href: "/panel" },
      { label: "Online & Offline", href: "/dispute-resolution/offline" },
      { label: "Our Partners", href: "/partners" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

// Mail IDs by purpose, as confirmed by the client (domain adjudixADR.com).
export const MAILBOXES: { team: string; purpose: string; email: string }[] = [
  { team: "Queries", purpose: "For general queries and contact", email: "query@adjudixADR.com" },
  { team: "Secretariat", purpose: "Only for communication on a new or pending case", email: "secretariat@adjudixADR.com" },
  { team: "HR", purpose: "For relationship building", email: "hr@adjudixADR.com" },
  { team: "Customer Support", purpose: "For any help or support", email: "support@adjudixADR.com" },
  { team: "Director", purpose: "Only in an emergency", email: "director@adjudixADR.com" },
];

// Languages in the translation menu (Google's translation proxy).
export const LANGUAGES: { code: string; label: string }[] = [
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "fr", label: "Français (French)" },
  { code: "de", label: "Deutsch (German)" },
  { code: "es", label: "Español (Spanish)" },
  { code: "pt", label: "Português (Portuguese)" },
  { code: "ru", label: "Русский (Russian)" },
  { code: "ar", label: "العربية (Arabic)" },
  { code: "zh-CN", label: "中文 (Chinese)" },
  { code: "ja", label: "日本語 (Japanese)" },
];

export interface Announcement {
  enabled: boolean;
  text: string;
  linkLabel: string;
  href: string;
  tone: "gold" | "navy" | "ember";
}

export interface ConsultationOffer {
  enabled: boolean;
  eyebrow: string;
  title: string;
  wasPrice: string;
  price: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
  /** Seconds after the intro before the pop-up appears. */
  delaySeconds: number;
}

export interface SiteSettings {
  announcement: Announcement;
  navGroups: NavGroup[];
  secondaryLinks: NavLink[];
  footerGroups: typeof FOOTER_GROUPS;
  copyright: string;
  mailboxes: typeof MAILBOXES;
  consultation: ConsultationOffer;
  introReel: boolean;
  languages: typeof LANGUAGES;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  announcement: { enabled: false, text: "", linkLabel: "", href: "", tone: "gold" },
  navGroups: NAV_GROUPS,
  secondaryLinks: SECONDARY_LINKS,
  footerGroups: FOOTER_GROUPS,
  copyright: "Adjudix Dispute Resolution Institute. All rights reserved.",
  mailboxes: MAILBOXES,
  consultation: {
    enabled: true,
    eyebrow: "Limited offer",
    title: "Your first professional consultation is free",
    wasPrice: "₹4,999/-",
    price: "₹0/-",
    body: "Avail your free consultation with our professional panel — on any dispute, implementation, or drafting matter, etc.",
    buttonLabel: "Avail Free Consultation",
    buttonHref: "/apply/consultation",
    delaySeconds: 60,
  },
  introReel: true,
  languages: LANGUAGES,
};

const navLink: FieldSpec[] = [
  { key: "label", label: "Label", type: "text", required: true, half: true },
  { key: "href", label: "Link", type: "url", required: true, half: true },
  { key: "stars", label: "Stars", type: "number", nullable: true, nullLabel: "none", half: true },
  { key: "highlight", label: "Highlight in gold", type: "boolean", half: true },
  { key: "nested", label: "Indent under the link above", type: "boolean", half: true },
];

export const SETTINGS_FIELDS: FieldSpec[] = [
  {
    key: "announcement",
    label: "Announcement bar",
    type: "object",
    fields: [
      { key: "enabled", label: "Show the announcement bar above the header", type: "boolean" },
      { key: "text", label: "Message", type: "text", placeholder: "e.g. Registration for the Annual ADR Conclave opens on 1 December" },
      { key: "linkLabel", label: "Link text", type: "text", half: true },
      { key: "href", label: "Link", type: "url", half: true },
      { key: "tone", label: "Colour", type: "select", half: true, options: [option("gold", "Gold"), option("navy", "Navy"), option("ember", "Urgent (red)")] },
    ],
  },
  {
    key: "navGroups",
    label: "Main menu",
    type: "list",
    singular: "menu item",
    titleKey: "label",
    help: "Each item is a link, a dropdown of links, or a dropdown of titled columns.",
    of: [
      { key: "label", label: "Label", type: "text", required: true, half: true },
      { key: "href", label: "Link", type: "url", half: true },
      { key: "children", label: "Dropdown links", type: "list", singular: "link", titleKey: "label", of: navLink },
      {
        key: "sections",
        label: "Dropdown columns",
        type: "list",
        singular: "column",
        titleKey: "label",
        of: [
          { key: "label", label: "Column title", type: "text" },
          { key: "links", label: "Links", type: "list", singular: "link", titleKey: "label", of: navLink },
        ],
      },
    ],
  },
  { key: "secondaryLinks", label: "Second menu row", type: "list", singular: "link", titleKey: "label", of: navLink },
  {
    key: "footerGroups",
    label: "Footer columns",
    type: "list",
    singular: "column",
    titleKey: "title",
    of: [
      { key: "title", label: "Title", type: "text", required: true },
      {
        key: "links",
        label: "Links",
        type: "list",
        singular: "link",
        titleKey: "label",
        of: [
          { key: "label", label: "Label", type: "text", required: true, half: true },
          { key: "href", label: "Link", type: "url", required: true, half: true },
        ],
      },
    ],
  },
  { key: "copyright", label: "Copyright line", type: "text", help: "Shown after “© <year>”." },
  {
    key: "mailboxes",
    label: "Contact mailboxes (Contact page)",
    type: "list",
    singular: "mailbox",
    titleKey: "team",
    of: [
      { key: "team", label: "Team", type: "text", required: true, half: true },
      { key: "email", label: "Email", type: "text", required: true, half: true },
      { key: "purpose", label: "What it's for", type: "text" },
    ],
  },
  {
    key: "consultation",
    label: "Free consultation pop-up",
    type: "object",
    fields: [
      { key: "enabled", label: "Show the pop-up (once per visit)", type: "boolean" },
      { key: "delaySeconds", label: "Seconds after the intro", type: "number", half: true, min: 5 },
      { key: "eyebrow", label: "Small heading", type: "text", half: true },
      { key: "title", label: "Title", type: "text" },
      { key: "wasPrice", label: "Struck-through price", type: "text", half: true },
      { key: "price", label: "Price", type: "text", half: true },
      { key: "body", label: "Message", type: "textarea", rows: 3 },
      { key: "buttonLabel", label: "Button text", type: "text", half: true },
      { key: "buttonHref", label: "Button link", type: "url", half: true },
    ],
  },
  { key: "introReel", label: "Play the logo intro on the home page", type: "boolean" },
  {
    key: "languages",
    label: "Translation menu",
    type: "list",
    singular: "language",
    titleKey: "label",
    of: [
      { key: "code", label: "Language code", type: "text", half: true, help: "As Google Translate uses it: hi, fr, zh-CN…" },
      { key: "label", label: "Shown as", type: "text", half: true },
    ],
  },
];
