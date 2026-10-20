// @vitest-environment node
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { BLOCK_MAP, BLOCK_TYPES } from "@/lib/blocks/types";
import { cleanValue } from "@/lib/content/schema";
import { cleanPageDoc } from "@/lib/pages/clean";
import { HAND_SEEDS } from "@/lib/pages/seeds";

describe("page blocks", () => {
  it("keeps every hand-converted page exactly as written", () => {
    for (const [route, seed] of Object.entries(HAND_SEEDS)) {
      const blocks = seed().map((block, i) => ({ ...block, id: `b${i}x` }));
      const cleaned = cleanPageDoc({ title: route, description: "", blocks }, [route]);
      expect({ route, count: cleaned.blocks.length }).toEqual({ route, count: blocks.length });
      cleaned.blocks.forEach((block, i) => {
        expect({ route, type: block.type, props: block.props }).toEqual({ route, type: blocks[i].type, props: blocks[i].props });
      });
    }
  });

  it("drops unknown blocks and original sections that point nowhere", () => {
    const doc = cleanPageDoc(
      {
        title: "T",
        blocks: [
          { id: "b1", type: "nope", props: {} },
          { id: "b2", type: "code", props: { source: "/not-a-page" } },
          { id: "b3", type: "code", props: { source: "/about" } },
        ],
      },
      ["/about"],
    );
    expect(doc.blocks.map((b) => b.id)).toEqual(["b3"]);
  });

  it("refuses unsafe links in any block", () => {
    const cta = BLOCK_MAP.get("cta")!;
    const primary = cta.fields.find((f) => f.key === "primary")!;
    expect(cleanValue(primary, { label: "x", href: "javascript:alert(1)" })).toEqual({ label: "x", href: "" });
  });

  it("gives every block type a unique id and at least one field", () => {
    expect(new Set(BLOCK_TYPES.map((t) => t.id)).size).toBe(BLOCK_TYPES.length);
    for (const type of BLOCK_TYPES) expect({ type: type.id, fields: type.fields.length > 0 }).toEqual({ type: type.id, fields: true });
  });
});

describe("page index", () => {
  it("lists every editable page (run `node scripts/pages/index-pages.mjs` if this fails)", async () => {
    const { listPages, loadersSource } = await import("../../../scripts/pages/index-pages.mjs");
    const editable = (listPages() as { file: string }[]).filter((page) => readFileSync(page.file, "utf8").includes("editablePage("));
    const current = readFileSync(path.join(process.cwd(), "src/lib/pages/loaders.ts"), "utf8");
    expect(current).toBe(loadersSource(editable));
  });
});
