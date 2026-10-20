import { desc } from "drizzle-orm";
import { db, schema } from "@/db";
import { currentSession } from "@/lib/console/auth";
import { audit } from "@/lib/console/audit";
import { can } from "@/lib/console/permissions";
import { readFilters, whereFor } from "@/lib/console/submissions";

// Submissions as a CSV, with the same filters as the inbox. Every form's own
// questions get a column of their own, labelled as the form asked them.

const cell = (value: unknown) => {
  const text = String(value ?? "");
  // A leading = + - @ would run as a formula in Excel; prefix it so it reads as text.
  const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  return /[",\n\r]/.test(safe) ? `"${safe.replaceAll('"', '""')}"` : safe;
};

export async function GET(request: Request) {
  const session = await currentSession();
  if (!session || session.stage !== "active" || !can(session.user, "submissions")) {
    return new Response("Not found", { status: 404 });
  }
  const params = Object.fromEntries(new URL(request.url).searchParams);
  const filters = readFilters(params);
  const rows = await db().query.submissions.findMany({
    where: whereFor(filters, session.user.id),
    orderBy: desc(schema.submissions.createdAt),
    limit: 10_000,
  });

  const questions = new Map<string, string>();
  for (const row of rows) for (const answer of row.answers) if (!questions.has(answer.key)) questions.set(answer.key, answer.label);
  const fixed = ["Reference", "Received", "Form", "Status", "Urgent", "Name", "Email", "Phone", "Organisation", "Documents"];
  const lines = [
    [...fixed, ...questions.values()].map(cell).join(","),
    ...rows.map((row) => {
      const answers = new Map(row.answers.map((answer) => [answer.key, answer.value]));
      return [
        row.reference,
        row.createdAt.toISOString(),
        row.formName,
        row.status.replace("_", " "),
        row.urgent ? "yes" : "",
        row.name,
        row.email,
        row.phone,
        row.organization,
        row.files.map((file) => file.name).join("; "),
        ...[...questions.keys()].map((key) => answers.get(key) ?? ""),
      ]
        .map(cell)
        .join(",");
    }),
  ];
  await audit(session.user, { action: "export", entity: "submission", summary: `exported ${rows.length} submissions to CSV` });
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(`﻿${lines.join("\r\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="adjudix-submissions-${stamp}.csv"`,
      "Cache-Control": "private, no-store",
    },
  });
}
