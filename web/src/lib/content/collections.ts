import { ARTICLES } from "@/lib/articles";
import { CODE_EDITIONS } from "@/lib/code-editions";
import { CODE_TEXTS } from "@/lib/code";
import { COMPETITIONS } from "@/lib/competitions";
import * as FEES from "@/lib/fee-schedule";
import { MEMBERS, PROFESSIONS as MEMBER_PROFESSIONS, TIERS } from "@/lib/members";
import { MODEL_CLAUSES } from "@/lib/model-clauses";
import MORAL_PRINCIPLES from "@/lib/moral-principles.json";
import { STUDENT_COURSE_FEE, STUDENT_COURSES, TRAINING_TRACKS } from "@/lib/training-tracks";
import { option, type FieldSpec } from "@/lib/content/schema";

// The site's structured data, editable in the console under Collections.
// Each collection is one document (type "collection") holding either a list
// of items or a single record; `defaults` is today's content from code, used
// until the first publish. The fields are fixed here because the site's
// components expect them; admins edit, add, remove, reorder and hide items.

export interface CollectionDef {
  key: string;
  label: string;
  description: string;
  kind: "list" | "record";
  fields: FieldSpec[];
  /** List items: the field shown as each row's title, and its subtitle. */
  titleKey?: string;
  subtitleKey?: string;
  singular?: string;
  /** Shown above the editor. */
  note?: string;
  defaults: () => unknown;
}

const slab: FieldSpec[] = [
  { key: "from", label: "From (₹)", type: "number", half: true },
  { key: "to", label: "To (₹)", type: "number", nullable: true, nullLabel: "and above", half: true },
  { key: "base", label: "Fee at start (₹)", type: "number", half: true },
  { key: "perLakh", label: "Added per lakh (₹)", type: "number", half: true },
  { key: "ceiling", label: "Ceiling (₹)", type: "number", nullable: true, nullLabel: "none", half: true },
];
const feeItems: FieldSpec[] = [
  { key: "item", label: "Item", type: "text", required: true },
  { key: "fee", label: "Fee (₹)", type: "number", half: true },
];
// JSON has no Infinity; the open-ended last slab is stored as null.
const slabsToJson = (slabs: FEES.Slab[]) =>
  slabs.map((s) => ({ ...s, to: s.to === Infinity ? null : s.to, ceiling: s.ceiling ?? null }));

const flowStep: FieldSpec[] = [
  { key: "title", label: "Step", type: "text", required: true },
  { key: "detail", label: "Detail", type: "textarea", rows: 2 },
  {
    key: "branches",
    label: "Branches",
    type: "list",
    singular: "branch",
    titleKey: "title",
    of: [
      { key: "title", label: "Outcome", type: "text" },
      { key: "detail", label: "Detail", type: "textarea", rows: 2 },
    ],
  },
];

const codeSection: FieldSpec[] = [
  { key: "no", label: "Number", type: "text", half: true },
  { key: "since", label: "First appeared in", type: "number", half: true },
  { key: "title", label: "Title", type: "text", required: true },
  { key: "body", label: "Paragraphs", type: "strings", multiline: true, singular: "paragraph" },
  {
    key: "definitions",
    label: "Definitions",
    type: "list",
    singular: "definition",
    titleKey: "term",
    of: [
      { key: "term", label: "Term", type: "text" },
      { key: "text", label: "Meaning", type: "textarea", rows: 2 },
    ],
  },
];

export const COLLECTIONS: CollectionDef[] = [
  {
    key: "members",
    label: "Members & panel",
    description: "The Register of Members, the Professional Panel, and the members directory.",
    kind: "list",
    singular: "member",
    titleKey: "name",
    subtitleKey: "credentials",
    note: "Membership codes (H-001/26 and so on) are numbered within each tier in the order of this list, unless you type a code for a member yourself.",
    fields: [
      { key: "name", label: "Name", type: "text", required: true, placeholder: "Mr. / Mrs. / Ms. …" },
      { key: "credentials", label: "Credentials", type: "text", required: true },
      { key: "tier", label: "Tier", type: "select", half: true, options: Object.entries(TIERS).map(([value, tier]) => option(value, tier.label)) },
      {
        key: "profession",
        label: "Profession",
        type: "select",
        half: true,
        options: [...MEMBER_PROFESSIONS.map((p) => option(p.id, p.title)), option("students", "Students")],
      },
      {
        key: "code",
        label: "Membership code",
        type: "text",
        half: true,
        placeholder: "Automatic",
        maxLength: 40,
        help: "Leave empty to number automatically (e.g. H-004/26). Type a code to use it instead.",
      },
      { key: "panel", label: "Sits on the Professional Panel", type: "boolean" },
    ],
    defaults: () => MEMBERS.map((member) => ({ ...member, code: member.code ?? "", panel: Boolean(member.panel) })),
  },
  {
    key: "training-tracks",
    label: "Training tracks",
    description: "The six professional tracks and their fees, on the Training, Courses and course pages.",
    kind: "list",
    singular: "track",
    titleKey: "title",
    subtitleKey: "description",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", required: true, half: true, help: "Matches the course page's address." },
      { key: "href", label: "Course page", type: "url", half: true },
      { key: "description", label: "Description", type: "textarea", rows: 2 },
      { key: "price", label: "Price (₹)", type: "number", half: true },
      { key: "mrp", label: "List price, struck through (₹)", type: "number", half: true },
    ],
    defaults: () => TRAINING_TRACKS,
  },
  {
    key: "student-courses",
    label: "Student courses",
    description: "Courses for students of law, commerce and engineering, with their token fee.",
    kind: "record",
    fields: [
      { key: "fee", label: "Token fee per course (₹)", type: "number", help: "Refunded in full once the student passes." },
      {
        key: "courses",
        label: "Courses",
        type: "list",
        singular: "course",
        titleKey: "title",
        of: [
          { key: "title", label: "Title", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true },
          { key: "description", label: "Description", type: "textarea", rows: 3 },
        ],
      },
    ],
    defaults: () => ({ fee: STUDENT_COURSE_FEE, courses: STUDENT_COURSES }),
  },
  {
    key: "competitions",
    label: "Competitions",
    description: "The competitions listed on Knowledge › Competitions and on Events.",
    kind: "list",
    singular: "competition",
    titleKey: "title",
    subtitleKey: "description",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", rows: 2 },
      { key: "href", label: "Page", type: "url" },
    ],
    defaults: () => COMPETITIONS,
  },
  {
    key: "articles",
    label: "Articles",
    description: "Knowledge Centre articles at /knowledge/blog.",
    kind: "list",
    singular: "article",
    titleKey: "title",
    subtitleKey: "category",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", required: true, half: true, help: "The article's address: /knowledge/blog/<slug>." },
      { key: "category", label: "Category", type: "text", half: true },
      { key: "summary", label: "Summary", type: "textarea", rows: 3, required: true },
      {
        key: "sections",
        label: "Sections",
        type: "list",
        singular: "section",
        titleKey: "heading",
        of: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "paragraphs", label: "Paragraphs", type: "strings", multiline: true, singular: "paragraph" },
          { key: "points", label: "Bullet points", type: "strings", singular: "point" },
          { key: "flow", label: "Flow chart", type: "list", singular: "step", titleKey: "title", of: flowStep },
        ],
      },
    ],
    defaults: () => ARTICLES,
  },
  {
    key: "model-clauses",
    label: "Model clauses",
    description: "The Institute's model dispute resolution clauses, word for word.",
    kind: "list",
    singular: "clause",
    titleKey: "title",
    subtitleKey: "useWhen",
    fields: [
      { key: "number", label: "Number", type: "text", half: true },
      { key: "slug", label: "Slug", type: "text", half: true, required: true },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "useWhen", label: "When to use it", type: "textarea", rows: 2 },
      {
        key: "variants",
        label: "Variants",
        type: "list",
        singular: "variant",
        titleKey: "title",
        of: [
          { key: "number", label: "Number", type: "text", half: true },
          { key: "title", label: "Title", type: "text", half: true },
          {
            key: "paragraphs",
            label: "Paragraphs",
            type: "list",
            singular: "paragraph",
            titleKey: "number",
            of: [
              { key: "number", label: "Number", type: "text", half: true },
              { key: "lead", label: "Bold run-in heading", type: "text", half: true },
              { key: "text", label: "Text", type: "textarea", rows: 4 },
            ],
          },
        ],
      },
    ],
    defaults: () => MODEL_CLAUSES,
  },
  {
    key: "fee-schedule",
    label: "Fee schedule",
    description: "Every rate on the Fees page; the fee calculator reads the same figures.",
    kind: "record",
    fields: [
      { key: "smallCauseLimit", label: "Small cause limit (₹)", type: "number", help: "Claims below this use the small cause fees." },
      { key: "tribunalSlabs", label: "Arbitral tribunal fee slabs", type: "list", singular: "slab", titleKey: "from", of: slab },
      { key: "adminSlabs", label: "Administrative fee slabs", type: "list", singular: "slab", titleKey: "from", of: slab },
      {
        key: "smallCause",
        label: "Small cause bands",
        type: "list",
        singular: "band",
        titleKey: "label",
        of: [
          { key: "label", label: "Label", type: "text" },
          { key: "to", label: "Up to (₹)", type: "number", half: true },
          { key: "tribunal", label: "Tribunal fee (₹)", type: "number", half: true },
          { key: "admin", label: "Administrative fee (₹)", type: "number", half: true },
        ],
      },
      {
        key: "registration",
        label: "Registration charges",
        type: "object",
        fields: [
          { key: "regular", label: "Regular", type: "list", singular: "charge", titleKey: "item", of: feeItems },
          { key: "smallCause", label: "Small cause", type: "list", singular: "charge", titleKey: "item", of: feeItems },
        ],
      },
      {
        key: "bandedFees",
        label: "Fees by claim band",
        type: "object",
        fields: [
          { key: "bands", label: "Bands", type: "strings", singular: "band" },
          {
            key: "rows",
            label: "Rows",
            type: "list",
            singular: "row",
            titleKey: "item",
            of: [
              { key: "item", label: "Item", type: "text" },
              { key: "fees", label: "Fee in each band (₹)", type: "numbers", singular: "fee" },
              { key: "smallCause", label: "Small cause (₹)", type: "number" },
            ],
          },
        ],
      },
      { key: "soleArbitratorUplift", label: "Sole arbitrator uplift", type: "number", step: 0.01, half: true, help: "0.2 = 20% more." },
      { key: "fastTrackUplift", label: "Fast track uplift", type: "number", step: 0.01, half: true, help: "On the whole regular fee. 0.15 = 15% more." },
      { key: "emergencyUplift", label: "Emergency arbitration uplift", type: "number", step: 0.01, half: true, help: "On the whole regular fee. 0.15 = 15% more." },
      { key: "gstRate", label: "GST rate", type: "number", step: 0.01, half: true, help: "0.18 = 18%." },
      {
        key: "paymentSchedule",
        label: "Payment schedule",
        type: "list",
        singular: "instalment",
        titleKey: "share",
        of: [
          { key: "share", label: "Share", type: "text", half: true },
          { key: "when", label: "When", type: "textarea", rows: 2 },
        ],
      },
      { key: "terms", label: "Terms", type: "strings", multiline: true, singular: "term" },
    ],
    defaults: () => ({
      smallCauseLimit: FEES.SMALL_CAUSE_LIMIT,
      tribunalSlabs: slabsToJson(FEES.TRIBUNAL_SLABS),
      adminSlabs: slabsToJson(FEES.ADMIN_SLABS),
      smallCause: FEES.SMALL_CAUSE,
      registration: FEES.REGISTRATION,
      bandedFees: FEES.BANDED_FEES,
      soleArbitratorUplift: FEES.SOLE_ARBITRATOR_UPLIFT,
      fastTrackUplift: FEES.FAST_TRACK_UPLIFT,
      emergencyUplift: FEES.EMERGENCY_UPLIFT,
      gstRate: FEES.GST_RATE,
      paymentSchedule: FEES.PAYMENT_SCHEDULE,
      terms: FEES.TERMS,
    }),
  },
  {
    key: "code-editions",
    label: "Code editions",
    description: "The editions of the Code of ADR Procedure, their summaries and PDFs.",
    kind: "list",
    singular: "edition",
    titleKey: "edition",
    subtitleKey: "year",
    fields: [
      { key: "year", label: "Year", type: "text", required: true, half: true },
      { key: "edition", label: "Edition", type: "text", half: true },
      { key: "current", label: "Current edition", type: "boolean" },
      { key: "summary", label: "Summary", type: "textarea", rows: 2 },
      { key: "additions", label: "What it added", type: "strings", singular: "addition" },
      { key: "sections", label: "Sections", type: "number", half: true },
      { key: "pages", label: "Pages", type: "number", half: true },
      { key: "principles", label: "Moral principles", type: "number", half: true },
      { key: "pdf", label: "PDF", type: "url", half: true, help: "Upload a new PDF in Media and paste its address." },
    ],
    defaults: () => CODE_EDITIONS.map((edition) => ({ ...edition, current: Boolean(edition.current) })),
  },
  {
    key: "code-texts",
    label: "Code of Procedure text",
    description: "The full text of each edition, read on the site section by section.",
    kind: "list",
    singular: "edition",
    titleKey: "title",
    note: "This text is also printed in the edition's PDF. After changing it, upload a matching PDF in Media and update the edition's PDF address.",
    fields: [
      { key: "year", label: "Year", type: "number", half: true },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "note", label: "Note", type: "textarea", rows: 2 },
      { key: "intro", label: "Preamble", type: "strings", multiline: true, singular: "recital" },
      {
        key: "principles",
        label: "Moral principles",
        type: "list",
        singular: "principle",
        titleKey: "title",
        of: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Text", type: "textarea", rows: 4 },
        ],
      },
      { key: "close", label: "Closing of the preamble", type: "textarea", rows: 2 },
      {
        key: "parts",
        label: "Parts",
        type: "list",
        singular: "part",
        titleKey: "title",
        of: [
          { key: "no", label: "Number", type: "text", half: true },
          { key: "title", label: "Title", type: "text", half: true },
          {
            key: "chapters",
            label: "Chapters",
            type: "list",
            singular: "chapter",
            titleKey: "title",
            of: [
              { key: "no", label: "Number", type: "text", half: true },
              { key: "since", label: "First appeared in", type: "number", half: true },
              { key: "title", label: "Title", type: "text" },
              { key: "sections", label: "Sections", type: "list", singular: "section", titleKey: "title", of: codeSection },
            ],
          },
        ],
      },
      { key: "closingNote", label: "Closing note", type: "textarea", rows: 2 },
    ],
    defaults: () => CODE_TEXTS,
  },
  {
    key: "moral-principles",
    label: "Moral Code",
    description: "The Moral Principles on About › Moral Code.",
    kind: "record",
    fields: [
      { key: "edition", label: "Edition", type: "number" },
      {
        key: "principles",
        label: "Principles",
        type: "list",
        singular: "principle",
        titleKey: "title",
        of: [
          { key: "title", label: "Title", type: "text", required: true },
          { key: "body", label: "Text", type: "textarea", rows: 4 },
        ],
      },
    ],
    defaults: () => MORAL_PRINCIPLES,
  },
];

export function getCollectionDef(key: string) {
  return COLLECTIONS.find((collection) => collection.key === key);
}
