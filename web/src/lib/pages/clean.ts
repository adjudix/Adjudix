import { BLOCK_MAP, newBlockId, type Block, type PageDoc } from "@/lib/blocks/types";
import { cleanRecord } from "@/lib/content/schema";

// Turns what the page editor sends into a valid PageDoc: known block types
// only, each block's props shaped by its schema, and original sections only
// pointing at pages that exist in code.

const ID = /^b[a-z0-9]{1,16}$/;

export function cleanPageDoc(input: unknown, codePaths: readonly string[]): PageDoc {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const seen = new Set<string>();
  const blocks: Block[] = (Array.isArray(raw.blocks) ? raw.blocks : []).slice(0, 200).flatMap((item) => {
    const b = (item ?? {}) as Record<string, unknown>;
    const type = BLOCK_MAP.get(String(b.type));
    if (!type) return [];
    let id = typeof b.id === "string" && ID.test(b.id) ? b.id : newBlockId();
    if (seen.has(id)) id = newBlockId();
    seen.add(id);
    const props: Record<string, unknown> = cleanRecord(type.fields, b.props);
    const source = (b.props as Record<string, unknown> | undefined)?.source;
    if (type.id === "code") {
      if (typeof source !== "string" || !codePaths.includes(source)) return [];
      props.source = source;
    }
    if (type.id === "mechanism" && typeof props.extraSection === "string" && props.extraSection && !codePaths.includes(props.extraSection)) {
      props.extraSection = "";
    }
    return [{ id, type: type.id, ...(b.hidden === true ? { hidden: true } : {}), props }];
  });
  return {
    title: typeof raw.title === "string" ? raw.title.trim().slice(0, 160) : "",
    description: typeof raw.description === "string" ? raw.description.trim().slice(0, 400) : "",
    ...(raw.noindex === true ? { noindex: true } : {}),
    blocks,
  };
}

/** Which blocks there are and in what order: what "Change structure" covers. */
export const pageStructure = (doc: PageDoc) => JSON.stringify(doc.blocks.map((b) => [b.id, b.type]));
