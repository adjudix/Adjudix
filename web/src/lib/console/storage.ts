import "server-only";
import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { del, get, put } from "@vercel/blob";

// Files the console keeps, in two Vercel Blob stores:
// - private (BLOB_READ_WRITE_TOKEN): submission documents, readable only by
//   signed-in console users, through the console;
// - public (MEDIA_READ_WRITE_TOKEN): images and PDFs shown on the site.
// In local development, without the tokens, files go on disk under
// .data/uploads and public/uploads.

const privateToken = () => process.env.BLOB_READ_WRITE_TOKEN?.trim() || undefined;
const publicToken = () => process.env.MEDIA_READ_WRITE_TOKEN?.trim() || undefined;

const local = () => process.env.NODE_ENV !== "production";

/** Submission documents can be kept (in Blob, or on disk locally). */
export function storageAvailable() {
  return Boolean(privateToken()) || local();
}

/** Media uploads can be kept (in Blob, or on disk locally). */
export function mediaStorageAvailable() {
  return Boolean(publicToken()) || local();
}

const safeName = (name: string) =>
  name
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(-120) || "file";

export interface StoredFile {
  /** Where to read it back: a Blob URL, or a local path. */
  url: string;
  pathname: string;
}

/** A submission's document, readable only through the console. */
export async function storePrivate(folder: string, file: File): Promise<StoredFile> {
  const pathname = `${folder}/${randomBytes(6).toString("hex")}-${safeName(file.name)}`;
  const token = privateToken();
  if (token) {
    const blob = await put(pathname, file, { access: "private", token, contentType: file.type || undefined, addRandomSuffix: false });
    return { url: blob.url, pathname: blob.pathname };
  }
  const target = path.join(process.cwd(), ".data", "uploads", pathname);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(await file.arrayBuffer()));
  return { url: `local:${pathname}`, pathname };
}

export async function readPrivate(url: string): Promise<{ body: ReadableStream<Uint8Array> | Buffer; contentType: string } | null> {
  if (url.startsWith("local:")) {
    const relative = url.slice("local:".length);
    const root = path.join(process.cwd(), ".data", "uploads");
    const target = path.join(root, relative);
    if (!target.startsWith(root)) return null;
    try {
      return { body: await readFile(target), contentType: "application/octet-stream" };
    } catch {
      return null;
    }
  }
  const result = await get(url, { access: "private", token: privateToken() });
  if (!result || result.statusCode !== 200) return null;
  return { body: result.stream, contentType: result.blob.contentType };
}

/** A file for the public site (images, PDFs). */
export async function storePublic(file: File): Promise<StoredFile> {
  const pathname = `media/${randomBytes(6).toString("hex")}-${safeName(file.name)}`;
  const token = publicToken();
  if (token) {
    const blob = await put(pathname, file, { access: "public", token, contentType: file.type || undefined, addRandomSuffix: false });
    return { url: blob.url, pathname: blob.pathname };
  }
  const target = path.join(process.cwd(), "public", "uploads", pathname);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(await file.arrayBuffer()));
  return { url: `/uploads/${pathname}`, pathname };
}

/** Removes a media file from wherever it was kept. */
export async function deletePublic(url: string) {
  const token = publicToken();
  if (token && url.startsWith("http")) await del(url, { token });
  else if (url.startsWith("/uploads/")) {
    const { unlink } = await import("node:fs/promises");
    await unlink(path.join(process.cwd(), "public", url)).catch(() => undefined);
  }
}
