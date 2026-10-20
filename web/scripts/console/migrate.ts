// Applies pending migrations from drizzle/. Runs before every build (see
// package.json), so a deploy with TURSO_DATABASE_URL set brings its
// database up to date first; a build without one skips it.
import { migrate } from "drizzle-orm/libsql/migrator";
import { connect } from "./connect";

async function main() {
  if (process.env.VERCEL && !process.env.TURSO_DATABASE_URL) {
    console.log("[db] TURSO_DATABASE_URL is not set; skipping migrations.");
    return;
  }
  const { db, client, url } = connect();
  await migrate(db, { migrationsFolder: "drizzle" });
  client.close();
  console.log(`[db] migrations applied to ${url.startsWith("file:") ? url : "Turso"}`);
}

main().catch((error) => {
  console.error("[db] migration failed", error);
  process.exit(1);
});
