// The database connection for command-line scripts. (src/db is server-only,
// so scripts open their own, with the same rules for which database.)
import { mkdirSync } from "node:fs";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../../src/db/schema";

export function scriptDatabaseUrl() {
  return process.env.TURSO_DATABASE_URL?.trim() || "file:.data/adjudix.db";
}

export function connect() {
  const url = scriptDatabaseUrl();
  if (url.startsWith("file:")) mkdirSync(".data", { recursive: true });
  const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN?.trim() || undefined });
  return { client, db: drizzle(client, { schema }), url };
}
