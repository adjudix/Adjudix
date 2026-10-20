import { defineConfig } from "drizzle-kit";

// `npm run db:generate` writes a migration to drizzle/ after a change to
// src/db/schema.ts; `npm run db:migrate` applies pending ones.
export default defineConfig({
  dialect: "turso",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || "file:.data/adjudix.db",
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});
