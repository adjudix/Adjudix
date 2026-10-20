import { randomInt } from "node:crypto";
import { hash, verify } from "@node-rs/argon2";

// Passwords are hashed with Argon2id. Generated passwords avoid characters
// that are easy to misread (0/O, 1/l/I) and come in groups of four.

const ALPHABET = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generatePassword(groups = 4) {
  return Array.from({ length: groups }, () =>
    Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join(""),
  ).join("-");
}

export function hashPassword(password: string) {
  return hash(password, { memoryCost: 19456, timeCost: 2, parallelism: 1 });
}

export async function verifyPassword(passwordHash: string, password: string) {
  try {
    return await verify(passwordHash, password);
  } catch {
    return false;
  }
}

/** Why a new password isn't acceptable, or undefined if it is. */
export function passwordProblem(password: string, email?: string) {
  if (password.length < 12) return "Use at least 12 characters.";
  if (password.length > 200) return "Use at most 200 characters.";
  if (email && password.toLowerCase().includes(email.split("@")[0].toLowerCase())) {
    return "Don't include your email name in the password.";
  }
  if (new Set(password).size < 6) return "Use a less repetitive password.";
  return undefined;
}
