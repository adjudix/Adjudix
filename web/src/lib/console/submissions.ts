import "server-only";
import { and, desc, eq, gte, like, or, type SQL } from "drizzle-orm";
import { db, schema } from "@/db";

// The Submissions inbox's filters, shared by the list and the CSV export
// so an export always contains exactly what the list showed.

export interface SubmissionFilters {
  status?: string;
  form?: string;
  q?: string;
  days?: string;
  mine?: string;
}

export function readFilters(params: Record<string, string | string[] | undefined>): SubmissionFilters {
  const one = (key: string) => {
    const value = params[key];
    return (Array.isArray(value) ? value[0] : value)?.slice(0, 120);
  };
  return { status: one("status"), form: one("form"), q: one("q"), days: one("days"), mine: one("mine") };
}

export function whereFor(filters: SubmissionFilters, userId: string): SQL | undefined {
  const conditions: SQL[] = [];
  const status = filters.status ?? "new";
  if (status === "new" || status === "in_progress" || status === "closed") conditions.push(eq(schema.submissions.status, status));
  if (filters.form) conditions.push(eq(schema.submissions.formKey, filters.form));
  const days = Number(filters.days);
  if (Number.isFinite(days) && days > 0) conditions.push(gte(schema.submissions.createdAt, new Date(Date.now() - days * 86_400_000)));
  if (filters.mine === "1") conditions.push(eq(schema.submissions.assignedTo, userId));
  const q = filters.q?.trim();
  if (q) {
    const pattern = `%${q.replace(/[%_]/g, "")}%`;
    conditions.push(
      or(like(schema.submissions.name, pattern), like(schema.submissions.email, pattern), like(schema.submissions.reference, pattern), like(schema.submissions.phone, pattern))!,
    );
  }
  return conditions.length ? and(...conditions) : undefined;
}

export function listSubmissions(filters: SubmissionFilters, userId: string, limit = 60) {
  return db().query.submissions.findMany({
    where: whereFor(filters, userId),
    orderBy: [desc(schema.submissions.urgent), desc(schema.submissions.createdAt)],
    limit,
  });
}
