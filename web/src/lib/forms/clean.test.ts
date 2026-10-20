// @vitest-environment node
import { describe, expect, it, vi } from "vitest";

vi.mock("@/db", () => ({ databaseConfigured: () => false, db: () => null, schema: {} }));
const { FORM_DEFAULTS } = await import("@/lib/forms");
const { cleanFormConfig, structureOf } = await import("@/lib/forms/clean");

// "text" is the default type, so leaving it out means the same.
const normal = (value: unknown) => JSON.parse(JSON.stringify(value).replaceAll(',"type":"text"', ""));

describe("cleanFormConfig", () => {
  it("keeps every form that came with the site exactly as it is", () => {
    for (const [slug, form] of Object.entries(FORM_DEFAULTS)) {
      const cleaned = cleanFormConfig(slug, form);
      expect({ slug, fields: normal(cleaned.fields) }).toEqual({ slug, fields: normal(form.fields) });
      expect({ slug, structure: structureOf(cleaned) }).toEqual({ slug, structure: structureOf(form) });
      expect(cleaned.title).toBe(form.title);
    }
  });

  it("refuses duplicate, reserved and malformed field keys", () => {
    const base = FORM_DEFAULTS.subscribe;
    expect(() => cleanFormConfig("x", { ...base, fields: [...base.fields, base.fields[0]] })).toThrow(/unique/);
    expect(() => cleanFormConfig("x", { ...base, fields: [{ name: "email", label: "Email" }] })).toThrow(/reserved/);
    expect(() => cleanFormConfig("x", { ...base, fields: [{ name: "1 bad", label: "Bad" }] })).toThrow(/key/);
  });

  it("drops settings it doesn't know and links outside the site", () => {
    const cleaned = cleanFormConfig("x", { ...FORM_DEFAULTS.subscribe, evil: "<script>", section: { label: "S", href: "javascript:alert(1)" } });
    expect(cleaned).not.toHaveProperty("evil");
    expect(cleaned.section.href).toBe("/");
  });

  it("needs choices for a choice field", () => {
    expect(() => cleanFormConfig("x", { ...FORM_DEFAULTS.subscribe, fields: [{ name: "pick", label: "Pick", type: "select", options: [] }] })).toThrow(/choice/);
  });
});
