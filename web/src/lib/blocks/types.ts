import { option, type FieldSpec } from "@/lib/content/schema";

// Pages as an ordered list of blocks. Each block type pairs a schema (what
// the console edits, and what the server cleans against) with a renderer in
// components/blocks/render. Shared by the server and the console editor, so
// no React here.

export interface Block {
  id: string;
  type: string;
  hidden?: boolean;
  props: Record<string, unknown>;
}

export interface PageDoc {
  title: string;
  description: string;
  /** Keep the page out of search results and the sitemap. */
  noindex?: boolean;
  blocks: Block[];
}

export interface BlockType {
  id: string;
  label: string;
  hint: string;
  group: "Layout" | "Text" | "Lists & tables" | "Actions" | "Data" | "Page templates";
  fields: FieldSpec[];
  /** A short line for the block list, from the block's props. */
  summary?: (props: Record<string, unknown>) => string;
  /** Not offered in the library (only placed by the system). */
  internal?: boolean;
}

const link = (key: string, label: string): FieldSpec => ({
  key,
  label,
  type: "object",
  fields: [
    { key: "label", label: "Button text", type: "text", half: true },
    { key: "href", label: "Link", type: "url", half: true },
  ],
});

const INLINE_HELP = "Write **bold** for emphasis and [link text](/page) for a link.";
const background: FieldSpec = { key: "background", label: "Background", type: "select", half: true, options: [option("canvas", "White"), option("surface", "Soft blue-grey"), option("hero", "Navy")] };
const width: FieldSpec = { key: "width", label: "Width", type: "select", half: true, options: [option("narrow", "Reading width"), option("wide", "Wide")] };
const text = (props: Record<string, unknown>, ...keys: string[]) => keys.map((k) => props[k]).find((v) => typeof v === "string" && v.trim()) as string | undefined;
const count = (props: Record<string, unknown>, key: string, noun: string) => {
  const n = Array.isArray(props[key]) ? (props[key] as unknown[]).length : 0;
  return `${n} ${noun}${n === 1 ? "" : "s"}`;
};

export const BLOCK_TYPES: BlockType[] = [
  {
    id: "pageHeader",
    label: "Page header",
    hint: "Title band with breadcrumbs",
    group: "Layout",
    summary: (p) => text(p, "title") ?? "",
    fields: [
      { key: "eyebrow", label: "Small heading", type: "text", half: true },
      { key: "title", label: "Title", type: "text", required: true, half: true },
      { key: "intro", label: "Introduction", type: "textarea", rows: 3 },
      {
        key: "breadcrumbs",
        label: "Breadcrumbs",
        type: "list",
        singular: "crumb",
        titleKey: "label",
        help: "The trail above the title. Home is added automatically.",
        of: [
          { key: "label", label: "Label", type: "text", half: true },
          { key: "href", label: "Link", type: "url", half: true },
        ],
      },
      { key: "image", label: "Background image", type: "image" },
      { key: "imageAlt", label: "Image description", type: "text" },
    ],
  },
  {
    id: "text",
    label: "Text section",
    hint: "Heading, paragraphs, bullets",
    group: "Text",
    summary: (p) => text(p, "heading", "eyebrow") ?? count(p, "paragraphs", "paragraph"),
    fields: [
      { key: "eyebrow", label: "Small heading", type: "text", half: true },
      { key: "heading", label: "Heading", type: "text", half: true },
      { key: "paragraphs", label: "Paragraphs", type: "strings", multiline: true, singular: "paragraph", help: INLINE_HELP },
      { key: "points", label: "Bullet points", type: "strings", singular: "point" },
      width,
      background,
      { key: "anchor", label: "Anchor", type: "text", half: true, help: "Lets links jump here: /page#anchor. Letters, numbers and dashes." },
    ],
  },
  {
    id: "tiles",
    label: "Tiles",
    hint: "Titled boxes in a grid",
    group: "Lists & tables",
    summary: (p) => text(p, "heading") ?? count(p, "items", "tile"),
    fields: [
      { key: "heading", label: "Heading", type: "text", half: true },
      { key: "intro", label: "Introduction", type: "textarea", rows: 2 },
      {
        key: "items",
        label: "Tiles",
        type: "list",
        singular: "tile",
        titleKey: "title",
        of: [
          { key: "eyebrow", label: "Small heading", type: "text", half: true },
          { key: "title", label: "Title", type: "text", required: true, half: true },
          { key: "body", label: "Text", type: "textarea", rows: 3, help: INLINE_HELP },
          { key: "points", label: "Points", type: "strings", singular: "point" },
          { key: "href", label: "Link (optional)", type: "url", half: true },
          { key: "buttonLabel", label: "Button text", type: "text", half: true, help: "With a link, shows a button instead of making the whole tile a link." },
        ],
      },
      { key: "columns", label: "Columns", type: "select", half: true, options: [option("3", "Three"), option("2", "Two"), option("4", "Four"), option("5", "Five")] },
      background,
    ],
  },
  {
    id: "cardGrid",
    label: "Link cards",
    hint: "Cards that open pages",
    group: "Lists & tables",
    summary: (p) => text(p, "heading") ?? count(p, "items", "card"),
    fields: [
      { key: "heading", label: "Heading", type: "text", half: true },
      { key: "intro", label: "Introduction", type: "textarea", rows: 2 },
      {
        key: "items",
        label: "Cards",
        type: "list",
        singular: "card",
        titleKey: "title",
        of: [
          { key: "title", label: "Title", type: "text", required: true },
          { key: "description", label: "Description", type: "textarea", rows: 2 },
          { key: "href", label: "Opens", type: "url", required: true },
        ],
      },
      { key: "columns", label: "Columns", type: "select", half: true, options: [option("3", "Three"), option("2", "Two")] },
      background,
    ],
  },
  {
    id: "numberedList",
    label: "Numbered steps",
    hint: "01, 02, 03 …",
    group: "Lists & tables",
    summary: (p) => text(p, "heading") ?? count(p, "items", "step"),
    fields: [
      { key: "heading", label: "Heading", type: "text", half: true },
      { key: "intro", label: "Introduction", type: "textarea", rows: 2 },
      {
        key: "items",
        label: "Steps",
        type: "list",
        singular: "step",
        titleKey: "title",
        of: [
          { key: "title", label: "Title", type: "text", required: true },
          { key: "description", label: "Description", type: "textarea", rows: 2 },
          { key: "href", label: "Link (optional)", type: "url" },
        ],
      },
      { key: "columns", label: "Columns", type: "select", half: true, options: [option("3", "Three"), option("2", "Two"), option("4", "Four")] },
      background,
    ],
  },
  {
    id: "comparison",
    label: "Comparison table",
    hint: "Adjudix vs the alternative",
    group: "Lists & tables",
    summary: (p) => text(p, "heading") ?? count(p, "rows", "row"),
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "intro", label: "Introduction", type: "textarea", rows: 2 },
      { key: "adjudixLabel", label: "Our column", type: "text", half: true, placeholder: "Adjudix" },
      { key: "otherLabel", label: "Their column", type: "text", half: true, placeholder: "Ad hoc / litigation" },
      {
        key: "rows",
        label: "Rows",
        type: "list",
        singular: "row",
        titleKey: "criterion",
        of: [
          { key: "criterion", label: "Criterion", type: "text", required: true },
          { key: "adjudix", label: "Adjudix", type: "textarea", rows: 2 },
          { key: "other", label: "The alternative", type: "textarea", rows: 2 },
        ],
      },
      background,
    ],
  },
  {
    id: "table",
    label: "Table",
    hint: "Any rows and columns",
    group: "Lists & tables",
    summary: (p) => text(p, "heading", "caption") ?? count(p, "rows", "row"),
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "intro", label: "Introduction", type: "textarea", rows: 2 },
      { key: "caption", label: "Caption (for screen readers)", type: "text" },
      { key: "columns", label: "Column headings", type: "strings", singular: "column" },
      {
        key: "rows",
        label: "Rows",
        type: "list",
        singular: "row",
        titleKey: "cells",
        of: [{ key: "cells", label: "Cells, left to right", type: "strings", singular: "cell" }],
      },
      background,
    ],
  },
  {
    id: "faq",
    label: "Questions & answers",
    hint: "Expandable FAQ",
    group: "Text",
    summary: (p) => text(p, "heading") ?? count(p, "items", "question"),
    fields: [
      { key: "heading", label: "Heading", type: "text", placeholder: "Frequently asked questions" },
      {
        key: "items",
        label: "Questions",
        type: "list",
        singular: "question",
        titleKey: "question",
        of: [
          { key: "question", label: "Question", type: "text", required: true },
          { key: "answer", label: "Answer", type: "textarea", rows: 3 },
        ],
      },
      background,
    ],
  },
  {
    id: "stats",
    label: "Figures",
    hint: "Big numbers with labels",
    group: "Text",
    summary: (p) => count(p, "items", "figure"),
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      {
        key: "items",
        label: "Figures",
        type: "list",
        singular: "figure",
        titleKey: "value",
        of: [
          { key: "value", label: "Figure", type: "text", required: true, half: true, placeholder: "e.g. 70+" },
          { key: "label", label: "What it counts", type: "text", half: true },
        ],
      },
      background,
    ],
  },
  {
    id: "imageText",
    label: "Image and text",
    hint: "Picture beside a paragraph",
    group: "Layout",
    summary: (p) => text(p, "heading") ?? "",
    fields: [
      { key: "eyebrow", label: "Small heading", type: "text", half: true },
      { key: "heading", label: "Heading", type: "text", half: true },
      { key: "paragraphs", label: "Paragraphs", type: "strings", multiline: true, singular: "paragraph", help: INLINE_HELP },
      { key: "image", label: "Image", type: "image", required: true },
      { key: "imageAlt", label: "Image description", type: "text" },
      { key: "imageSide", label: "Image on the", type: "select", half: true, options: [option("right", "Right"), option("left", "Left")] },
      link("button", "Button"),
      background,
    ],
  },
  {
    id: "cta",
    label: "Call to action",
    hint: "Navy band with buttons",
    group: "Actions",
    summary: (p) => text(p, "title") ?? "",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", rows: 2 },
      link("primary", "Main button"),
      link("secondary", "Second button"),
    ],
  },
  {
    id: "buttons",
    label: "Buttons",
    hint: "A row of buttons",
    group: "Actions",
    summary: (p) => count(p, "items", "button"),
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      {
        key: "items",
        label: "Buttons",
        type: "list",
        singular: "button",
        titleKey: "label",
        of: [
          { key: "label", label: "Text", type: "text", required: true, half: true },
          { key: "href", label: "Link", type: "url", required: true, half: true },
          { key: "style", label: "Style", type: "select", half: true, options: [option("secondary", "Outline"), option("primary", "Gold"), option("ember", "Urgent (red)")] },
        ],
      },
      { key: "align", label: "Line up", type: "select", half: true, options: [option("start", "Left"), option("center", "Centre")] },
      background,
    ],
  },
  {
    id: "form",
    label: "Form",
    hint: "Any form, on the page",
    group: "Actions",
    summary: (p) => text(p, "form") ?? "",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "intro", label: "Introduction", type: "textarea", rows: 2 },
      { key: "form", label: "Form", type: "text", required: true, help: "The form's address in Forms, e.g. membership or enquiry." },
    ],
  },
  {
    id: "collection",
    label: "Collection list",
    hint: "Members, courses, articles …",
    group: "Data",
    summary: (p) => text(p, "heading", "source") ?? "",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "intro", label: "Introduction", type: "textarea", rows: 2 },
      {
        key: "source",
        label: "Show",
        type: "select",
        options: [
          option("panel", "Professional Panel members"),
          option("members", "All members"),
          option("trainingTracks", "Training tracks"),
          option("studentCourses", "Student courses"),
          option("competitions", "Competitions"),
          option("articles", "Articles"),
          option("codeEditions", "Code editions"),
        ],
      },
      { key: "limit", label: "At most", type: "number", nullable: true, nullLabel: "all", half: true, min: 1 },
      background,
      { key: "anchor", label: "Anchor", type: "text", half: true, help: "Lets links jump here: /page#anchor. Letters, numbers and dashes." },
    ],
  },
  {
    id: "widget",
    label: "Built-in feature",
    hint: "Calculator, explainer, finder…",
    group: "Data",
    summary: (p) => WIDGETS.find((w) => w.value === p.widget)?.label ?? "",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "intro", label: "Introduction", type: "textarea", rows: 2 },
      { key: "widget", label: "Feature", type: "select", options: [] as { value: string; label: string }[] },
      background,
    ],
  },
  {
    id: "spacer",
    label: "Spacer",
    hint: "Extra room between blocks",
    group: "Layout",
    fields: [{ key: "size", label: "Height", type: "select", options: [option("md", "Medium"), option("sm", "Small"), option("lg", "Large")] }],
  },
  // ── Page templates: one block lays out a whole page, as the site's pattern pages do.
  {
    id: "mechanism",
    label: "ADR mechanism page",
    hint: "Legal basis, steps, FAQ",
    group: "Page templates",
    summary: (p) => text(p, "title") ?? "",
    fields: [
      { key: "eyebrow", label: "Small heading", type: "text", half: true },
      { key: "title", label: "Title", type: "text", required: true, half: true },
      { key: "intro", label: "Introduction", type: "textarea", rows: 3 },
      { key: "legalBasisTitle", label: "Legal basis heading", type: "text", placeholder: "Legal basis" },
      { key: "legalBasis", label: "Legal basis", type: "textarea", rows: 4 },
      { key: "howItWorks", label: "How it works", type: "list", singular: "step", titleKey: "title", of: [{ key: "title", label: "Title", type: "text" }, { key: "description", label: "Description", type: "textarea", rows: 2 }] },
      { key: "faqs", label: "Questions", type: "list", singular: "question", titleKey: "question", of: [{ key: "question", label: "Question", type: "text" }, { key: "answer", label: "Answer", type: "textarea", rows: 3 }] },
      { key: "filingLabel", label: "Filing button text", type: "text", half: true },
      { key: "filingHref", label: "Filing button link", type: "url", half: true },
      { key: "panelHref", label: "Panel link", type: "url", half: true },
      { key: "extraSection", label: "Original extra section", type: "text", help: "Kept from the original page. Clear it to remove that section." },
    ],
  },
  {
    id: "course",
    label: "Course page",
    hint: "Fee, who it's for, curriculum",
    group: "Page templates",
    summary: (p) => text(p, "title") ?? "",
    fields: [
      { key: "slug", label: "Training track", type: "text", required: true, help: "The track's slug in Collections › Training tracks; its fee is shown." },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "intro", label: "Introduction", type: "textarea", rows: 3 },
      { key: "who", label: "Who it's for", type: "strings", singular: "point" },
      { key: "curriculum", label: "Curriculum", type: "list", singular: "module", titleKey: "title", of: [{ key: "title", label: "Module", type: "text" }, { key: "body", label: "Description", type: "textarea", rows: 2 }] },
    ],
  },
  {
    id: "practiceArea",
    label: "Practice area page",
    hint: "What qualifies",
    group: "Page templates",
    summary: (p) => text(p, "title") ?? "",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "intro", label: "Introduction", type: "textarea", rows: 3 },
      { key: "qualifies", label: "What qualifies", type: "strings", singular: "point" },
    ],
  },
  {
    id: "membershipTier",
    label: "Membership tier page",
    hint: "Eligibility, benefits, fee",
    group: "Page templates",
    summary: (p) => text(p, "title") ?? "",
    fields: [
      { key: "title", label: "Title", type: "text", required: true, half: true },
      { key: "stars", label: "Stars", type: "text", half: true, help: "1–5, or “beyond” for Honorary." },
      { key: "intro", label: "Introduction", type: "textarea", rows: 3 },
      { key: "eligibility", label: "Eligibility", type: "strings", singular: "point" },
      { key: "benefits", label: "Benefits", type: "strings", singular: "benefit" },
      { key: "fee", label: "Fee", type: "text" },
      { key: "applyable", label: "Can be applied for", type: "boolean", half: true },
      { key: "applyLabel", label: "Apply button text", type: "text", half: true },
      { key: "applyHref", label: "Apply link", type: "url" },
    ],
  },
  {
    id: "competition",
    label: "Competition page",
    hint: "Format and registration",
    group: "Page templates",
    summary: (p) => text(p, "title") ?? "",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "intro", label: "Introduction", type: "textarea", rows: 3 },
      { key: "format", label: "Format", type: "strings", singular: "point" },
    ],
  },
  {
    id: "partnerCategory",
    label: "Partner category page",
    hint: "Benefits and status",
    group: "Page templates",
    summary: (p) => text(p, "title") ?? "",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "intro", label: "Introduction", type: "textarea", rows: 3 },
      { key: "benefits", label: "Benefits", type: "strings", singular: "benefit" },
      { key: "status", label: "Status note", type: "object", fields: [{ key: "title", label: "Title", type: "text" }, { key: "body", label: "Text", type: "textarea", rows: 2 }] },
    ],
  },
  {
    id: "code",
    label: "Original section",
    hint: "Kept from the built site",
    group: "Layout",
    internal: true,
    summary: (p) => text(p, "label") ?? "",
    fields: [{ key: "label", label: "Shows", type: "text", help: "This part of the page is built into the site. You can move it, hide it, or add blocks around it." }],
  },
];

export const BLOCK_MAP = new Map(BLOCK_TYPES.map((type) => [type.id, type]));

// Interactive parts of the site that can be placed on any page.
export const WIDGETS = [
  option("codeExplainer", "The two Codes, explained (Rule Book vs Code of Conduct)"),
  option("feeCalculator", "Fee calculator"),
  option("audienceFinder", "“Find what you need” guide"),
  option("portalAccess", "ADR-i Portal sign-in and sign-up"),
  option("mailboxes", "Contact mailboxes"),
];
const widgetField = BLOCK_MAP.get("widget")!.fields.find((f) => f.key === "widget") as { options: { value: string; label: string }[] };
widgetField.options = WIDGETS;

export function newBlockId() {
  return `b${Math.random().toString(36).slice(2, 10)}`;
}
