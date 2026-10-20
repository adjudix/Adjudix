import "server-only";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

// Turso in production (TURSO_DATABASE_URL + TURSO_AUTH_TOKEN). Locally,
// leave TURSO_DATABASE_URL unset and a SQLite file under .data/ is used.
// Without a database the public site still works: it falls back to the
// content written in code (see lib/content/store).

export const LOCAL_DATABASE_URL = "file:.data/adjudix.db";

export function databaseUrl() {
  return process.env.TURSO_DATABASE_URL?.trim() || (process.env.NODE_ENV === "production" ? "" : LOCAL_DATABASE_URL);
}

export function databaseConfigured() {
  return Boolean(databaseUrl());
}

function connect() {
  const url = databaseUrl();
  if (!url) throw new Error("No database configured — set TURSO_DATABASE_URL.");
  return drizzle(createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN?.trim() || undefined }), { schema });
}

type Database = ReturnType<typeof connect>;
const globalForDb = globalThis as unknown as { adjudixDb?: Database };

/** The shared connection, opened on first use. */
export function db(): Database {
  globalForDb.adjudixDb ??= connect();
  return globalForDb.adjudixDb;
}

export { schema };
