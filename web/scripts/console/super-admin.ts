// Creates (or resets) a super admin — the only way one can exist. Prints a
// generated password once; the account must change it and set up two-step
// verification on first sign-in.
//
//   npm run console:super -- you@adjudixadr.com "Your Name"
//   npm run console:super -- you@adjudixadr.com --reset
//
// Uses TURSO_DATABASE_URL / TURSO_AUTH_TOKEN when set, else the local file.
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { generatePassword, hashPassword } from "../../src/lib/console/passwords";
import { users } from "../../src/db/schema";
import { connect } from "./connect";

const MAX_SUPER_ADMINS = 2;

async function main() {
  const args = process.argv.slice(2);
  const reset = args.includes("--reset");
  const [email, name = ""] = args.filter((arg) => !arg.startsWith("--"));
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error('Usage: npm run console:super -- <email> ["Full name"] [--reset]');
    process.exit(1);
  }

  const { db, client, url } = connect();
  const normalized = email.trim().toLowerCase();
  const existing = await db.query.users.findFirst({ where: eq(users.email, normalized) });
  const password = generatePassword();
  const passwordHash = await hashPassword(password);

  if (existing) {
    if (!reset) {
      console.error(`${normalized} already exists. Add --reset to issue a new password.`);
      process.exit(1);
    }
    await db
      .update(users)
      .set({ passwordHash, isSuper: true, mustChangePassword: true, disabled: false, failedAttempts: 0, lockedUntil: null })
      .where(eq(users.id, existing.id));
  } else {
    const supers = await db.query.users.findMany({ where: eq(users.isSuper, true) });
    if (supers.length >= MAX_SUPER_ADMINS) {
      console.error(`There are already ${MAX_SUPER_ADMINS} super admins: ${supers.map((u) => u.email).join(", ")}.`);
      process.exit(1);
    }
    await db.insert(users).values({ id: randomUUID(), email: normalized, name, passwordHash, isSuper: true });
  }
  client.close();

  console.log(`\nSuper admin ${existing ? "reset" : "created"} in ${url.startsWith("file:") ? url : "Turso"}`);
  console.log(`  Email:    ${normalized}`);
  console.log(`  Password: ${password}`);
  console.log("\nShown once. Change it at first sign-in, then set up two-step verification.\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
