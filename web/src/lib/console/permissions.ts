// What a console role can be allowed to do: a module × action grid. Super
// admins hold every permission, plus managing users and roles, which no role
// can be given. Shared by the server (checks) and the roles editor (labels).

export const ACTIONS = {
  view: "View",
  edit: "Edit content",
  structure: "Change structure",
  publish: "Publish",
  delete: "Delete",
} as const;

export type Action = keyof typeof ACTIONS;

export const MODULES = {
  submissions: { label: "Submissions", hint: "Entries from every form", actions: ["view", "edit", "delete"] },
  forms: { label: "Forms", hint: "Fields, choices, open or closed", actions: ["view", "edit", "structure", "publish"] },
  pages: { label: "Pages", hint: "Blocks, SEO, new pages", actions: ["view", "edit", "structure", "publish", "delete"] },
  collections: {
    label: "Collections",
    hint: "Members, fees, articles, courses, clauses",
    actions: ["view", "edit", "structure", "publish"],
  },
  media: { label: "Media", hint: "Uploaded images and files", actions: ["view", "edit", "delete"] },
  settings: { label: "Site settings", hint: "Contacts, menus, banner", actions: ["view", "edit", "publish"] },
  audit: { label: "Audit log", hint: "Who changed what", actions: ["view"] },
} as const satisfies Record<string, { label: string; hint: string; actions: Action[] }>;

export type Module = keyof typeof MODULES;
export type Permission = `${Module}:${Action}`;

export const ALL_PERMISSIONS = (Object.keys(MODULES) as Module[]).flatMap((module) =>
  (MODULES[module].actions as readonly Action[]).map((action) => `${module}:${action}` as Permission),
);

export interface Grants {
  isSuper: boolean;
  permissions: readonly string[];
}

export function can(user: Grants | null | undefined, module: Module, action: Action = "view") {
  if (!user) return false;
  return user.isSuper || user.permissions.includes(`${module}:${action}`);
}

/** Keeps only permissions that exist, so a stale role can't grant anything new. */
export function cleanPermissions(input: unknown): Permission[] {
  if (!Array.isArray(input)) return [];
  const valid = new Set<string>(ALL_PERMISSIONS);
  const chosen = new Set(input.filter((value): value is Permission => typeof value === "string" && valid.has(value)));
  // Any other action implies view.
  for (const permission of [...chosen]) chosen.add(`${permission.split(":")[0]}:view` as Permission);
  return ALL_PERMISSIONS.filter((permission) => chosen.has(permission));
}
