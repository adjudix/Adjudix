"use server";

import { authorize, Forbidden } from "@/lib/console/auth";
import { SETTINGS_TYPE } from "@/lib/content/data";
import { discardDraft, publishDoc, restoreVersion, saveDraft } from "@/lib/content/drafts";
import { cleanRecord } from "@/lib/content/schema";
import { SETTINGS_FIELDS } from "@/lib/site-settings";

export type Result = { ok: true } | { ok: false; error: string };
const LABEL = "the site settings";

async function guard(run: () => Promise<Result>): Promise<Result> {
  try {
    return await run();
  } catch (cause) {
    if (cause instanceof Forbidden) return { ok: false, error: cause.message };
    console.error("[settings]", cause);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export async function saveSettingsDraft(input: unknown) {
  return guard(async () => {
    const user = await authorize("settings", "edit");
    await saveDraft(user, SETTINGS_TYPE, "site", cleanRecord(SETTINGS_FIELDS, input), LABEL);
    return { ok: true };
  });
}

export async function publishSettings(input?: unknown) {
  return guard(async () => {
    const user = await authorize("settings", "publish");
    if (input !== undefined) await saveDraft(user, SETTINGS_TYPE, "site", cleanRecord(SETTINGS_FIELDS, input), LABEL);
    await publishDoc(user, SETTINGS_TYPE, "site", LABEL);
    return { ok: true };
  });
}

export async function discardSettingsDraft() {
  return guard(async () => {
    const user = await authorize("settings", "edit");
    await discardDraft(user, SETTINGS_TYPE, "site", LABEL);
    return { ok: true };
  });
}

export async function restoreSettingsVersion(versionId: number) {
  return guard(async () => {
    const user = await authorize("settings", "edit");
    await restoreVersion(user, SETTINGS_TYPE, "site", versionId, LABEL);
    return { ok: true };
  });
}
