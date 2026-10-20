import { sql } from "drizzle-orm";
import { index, integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

// The console's tables, in Turso (libSQL). Content lives in `documents`:
// one row per editable thing (a form, a page, a collection, the site
// settings), holding a draft and the published copy as JSON.

const now = sql`(unixepoch() * 1000)`;
const timestamp = (name: string) => integer(name, { mode: "timestamp_ms" });

export const roles = sqliteTable("roles", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull().default(""),
  // "module:action" strings, e.g. "forms:edit" (see lib/console/permissions).
  permissions: text("permissions", { mode: "json" }).$type<string[]>().notNull().default(sql`'[]'`),
  createdAt: timestamp("created_at").notNull().default(now),
});

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull().default(""),
  passwordHash: text("password_hash").notNull(),
  // Super admins are created from the command line only, never in the console.
  isSuper: integer("is_super", { mode: "boolean" }).notNull().default(false),
  roleId: text("role_id").references(() => roles.id, { onDelete: "set null" }),
  mustChangePassword: integer("must_change_password", { mode: "boolean" }).notNull().default(true),
  totpSecret: text("totp_secret"),
  totpEnabled: integer("totp_enabled", { mode: "boolean" }).notNull().default(false),
  disabled: integer("disabled", { mode: "boolean" }).notNull().default(false),
  failedAttempts: integer("failed_attempts").notNull().default(0),
  lockedUntil: timestamp("locked_until"),
  lastSeenAt: timestamp("last_seen_at"),
  createdAt: timestamp("created_at").notNull().default(now),
});

export const sessions = sqliteTable(
  "sessions",
  {
    // SHA-256 of the cookie's token; the token itself is never stored.
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    // "pending" until the second factor is checked.
    stage: text("stage", { enum: ["pending", "active"] }).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    ip: text("ip"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").notNull().default(now),
  },
  (table) => [index("sessions_user").on(table.userId)],
);

// Failed sign-ins per IP address, in fixed windows.
export const throttle = sqliteTable("throttle", {
  key: text("key").primaryKey(),
  count: integer("count").notNull(),
  windowStart: timestamp("window_start").notNull(),
});

export const documents = sqliteTable(
  "documents",
  {
    type: text("type").notNull(),
    key: text("key").notNull(),
    draft: text("draft", { mode: "json" }),
    published: text("published", { mode: "json" }),
    draftUpdatedAt: timestamp("draft_updated_at"),
    draftUpdatedBy: text("draft_updated_by"),
    publishedAt: timestamp("published_at"),
    publishedBy: text("published_by"),
  },
  (table) => [primaryKey({ columns: [table.type, table.key] })],
);

// Every published copy, newest last, for history and rollback.
export const versions = sqliteTable(
  "versions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    type: text("type").notNull(),
    key: text("key").notNull(),
    data: text("data", { mode: "json" }).notNull(),
    publishedAt: timestamp("published_at").notNull().default(now),
    publishedBy: text("published_by"),
  },
  (table) => [index("versions_doc").on(table.type, table.key)],
);

export const submissions = sqliteTable(
  "submissions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    reference: text("reference").notNull().unique(),
    formKey: text("form_key").notNull(),
    formName: text("form_name").notNull(),
    status: text("status", { enum: ["new", "in_progress", "closed"] }).notNull().default("new"),
    urgent: integer("urgent", { mode: "boolean" }).notNull().default(false),
    assignedTo: text("assigned_to").references(() => users.id, { onDelete: "set null" }),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    organization: text("organization"),
    answers: text("answers", { mode: "json" }).$type<{ key: string; label: string; value: string }[]>().notNull(),
    files: text("files", { mode: "json" }).$type<{ name: string; size: number; url?: string }[]>().notNull(),
    site: text("site"),
    emailed: integer("emailed", { mode: "boolean" }).notNull().default(false),
    createdAt: timestamp("created_at").notNull().default(now),
    updatedAt: timestamp("updated_at").notNull().default(now),
  },
  (table) => [index("submissions_form").on(table.formKey), index("submissions_status").on(table.status, table.createdAt)],
);

export const submissionNotes = sqliteTable("submission_notes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  submissionId: integer("submission_id")
    .notNull()
    .references(() => submissions.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").notNull().default(now),
});

export const media = sqliteTable("media", {
  id: text("id").primaryKey(),
  url: text("url").notNull(),
  pathname: text("pathname").notNull(),
  filename: text("filename").notNull(),
  contentType: text("content_type").notNull(),
  size: integer("size").notNull(),
  alt: text("alt").notNull().default(""),
  uploadedBy: text("uploaded_by"),
  createdAt: timestamp("created_at").notNull().default(now),
});

export const auditLog = sqliteTable(
  "audit_log",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id"),
    userEmail: text("user_email"),
    action: text("action").notNull(),
    entity: text("entity").notNull(),
    entityKey: text("entity_key"),
    summary: text("summary").notNull(),
    createdAt: timestamp("created_at").notNull().default(now),
  },
  (table) => [index("audit_created").on(table.createdAt)],
);

export type User = typeof users.$inferSelect;
export type Role = typeof roles.$inferSelect;
export type Submission = typeof submissions.$inferSelect;
export type MediaItem = typeof media.$inferSelect;
