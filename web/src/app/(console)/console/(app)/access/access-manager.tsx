"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, KeyRound, Mail, MoreHorizontal, Plus, ShieldCheck, Trash2, UserPlus } from "lucide-react";
import { Dialog } from "@/components/console/dialog";
import { Badge, consoleButton, consoleInput, Field, Notice, initials, timeAgo } from "@/components/console/ui";
import { cn } from "@/lib/utils";
import {
  createUser,
  deleteRole,
  deleteUser,
  emailSignIn,
  resetPassword,
  saveRole,
  signOutEverywhere,
  updateUser,
} from "./actions";

interface RoleRow {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}
interface UserRow {
  id: string;
  email: string;
  name: string;
  isSuper: boolean;
  roleId: string | null;
  disabled: boolean;
  totpEnabled: boolean;
  mustChangePassword: boolean;
  locked: boolean;
  lastSeenAt: string | null;
}
interface ModuleRow {
  id: string;
  label: string;
  hint: string;
  actions: string[];
}

const NEW_ROLE = "__new";

export function AccessManager({
  meId,
  modules,
  actionLabels,
  roles,
  users,
}: {
  meId: string;
  modules: ModuleRow[];
  actionLabels: Record<string, string>;
  roles: RoleRow[];
  users: UserRow[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string>(roles[0]?.id ?? NEW_ROLE);
  const selected = roles.find((role) => role.id === selectedId);
  const [draft, setDraft] = useState<RoleRow>(() => selected ?? { id: NEW_ROLE, name: "", description: "", permissions: [] });
  const [creating, setCreating] = useState(false);
  const [issued, setIssued] = useState<{ id: string; email: string; password: string; emailed?: boolean } | null>(null);

  const actions = Object.keys(actionLabels);
  const granted = new Set(draft.permissions);
  const total = modules.reduce((sum, module) => sum + module.actions.length, 0);
  const dirty = useMemo(() => {
    if (!selected) return draft.name !== "" || draft.permissions.length > 0;
    return (
      selected.name !== draft.name ||
      selected.description !== draft.description ||
      [...selected.permissions].sort().join() !== [...draft.permissions].sort().join()
    );
  }, [selected, draft]);

  function pickRole(id: string) {
    setError("");
    setSelectedId(id);
    setDraft(roles.find((role) => role.id === id) ?? { id: NEW_ROLE, name: "", description: "", permissions: [] });
  }

  function toggle(permission: string) {
    const next = new Set(granted);
    const [module, action] = permission.split(":");
    if (next.has(permission)) {
      next.delete(permission);
      // Without view, nothing else in the module makes sense.
      if (action === "view") for (const p of [...next]) if (p.startsWith(`${module}:`)) next.delete(p);
    } else {
      next.add(permission);
      next.add(`${module}:view`);
    }
    setDraft({ ...draft, permissions: [...next] });
  }

  function toggleRow(module: ModuleRow) {
    const all = module.actions.map((action) => `${module.id}:${action}`);
    const every = all.every((p) => granted.has(p));
    const next = new Set(granted);
    for (const p of all) {
      if (every) next.delete(p);
      else next.add(p);
    }
    setDraft({ ...draft, permissions: [...next] });
  }

  function run<T>(task: () => Promise<{ ok: true } & T | { ok: false; error: string }>, done?: (result: T) => void) {
    setError("");
    startTransition(async () => {
      const result = await task();
      if (!result.ok) setError(result.error);
      else {
        done?.(result as T);
        router.refresh();
      }
    });
  }

  const roleUsers = (id: string) => users.filter((user) => user.roleId === id && !user.isSuper).length;

  return (
    <div className="flex flex-col gap-6">
      {error && <Notice tone="error">{error}</Notice>}
      {issued && <IssuedCard issued={issued} onEmail={() => run(() => emailSignIn(issued.id, issued.password), () => setIssued({ ...issued, emailed: true }))} onClose={() => setIssued(null)} pending={pending} />}

      <div className="flex flex-wrap items-start gap-5">
        <section aria-label="Roles" className="flex min-w-0 flex-[1_1_15rem] flex-col gap-0.5 rounded-2xl border border-border bg-canvas p-2">
          <div className="flex items-center justify-between px-2.5 pt-2 pb-2">
            <h2 className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">Roles · {roles.length}</h2>
            <button type="button" onClick={() => pickRole(NEW_ROLE)} className={cn(consoleButton.ghost, "h-8 px-2.5 text-primary-ink")}>
              <Plus aria-hidden="true" /> New role
            </button>
          </div>
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => pickRole(role.id)}
              aria-current={role.id === selectedId || undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-left transition-colors",
                role.id === selectedId ? "border-primary bg-(--color-gold-100)" : "hover:bg-surface",
              )}
            >
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-semibold text-foreground">{role.name}</span>
                <span className="text-xs text-muted-foreground">{role.permissions.length} permissions</span>
              </span>
              <span className="text-xs text-muted-foreground tabular-nums">
                {roleUsers(role.id)} {roleUsers(role.id) === 1 ? "user" : "users"}
              </span>
            </button>
          ))}
          {selectedId === NEW_ROLE && (
            <div className="rounded-xl border border-primary bg-(--color-gold-100) px-3 py-3 text-sm font-semibold">New role</div>
          )}
          <p className="m-2 rounded-xl bg-surface p-3 text-xs leading-relaxed text-muted-foreground">
            Super Admin is fixed: two accounts created from the command line, every permission, and the only role that manages users.
          </p>
        </section>

        <section aria-label="Role permissions" className="flex min-w-0 flex-[3_1_34rem] flex-col gap-5 rounded-2xl border border-border bg-canvas p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Role name" htmlFor="role-name">
              <input id="role-name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="e.g. Membership Desk" className={consoleInput} />
            </Field>
            <Field label="What this role is for" htmlFor="role-description">
              <input id="role-description" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="Runs membership applications…" className={consoleInput} />
            </Field>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="font-heading text-xl font-medium">Permissions</h2>
            <span className="text-sm text-muted-foreground">
              <strong className="font-semibold text-foreground tabular-nums">{draft.permissions.length}</strong> of {total}
            </span>
          </div>
          <div className="scrollbar-refined overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[38rem] border-collapse text-sm">
              <thead>
                <tr className="bg-surface">
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold tracking-[0.06em] text-muted-foreground uppercase">Module</th>
                  {actions.map((action) => (
                    <th key={action} scope="col" className="px-2 py-3 text-center text-xs font-semibold text-muted-foreground">
                      {actionLabels[action]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {modules.map((module) => (
                  <tr key={module.id} className="border-t border-border">
                    <th scope="row" className="px-4 py-2.5 text-left font-medium">
                      <button type="button" onClick={() => toggleRow(module)} className="text-left hover:text-primary-ink" title="Toggle the whole row">
                        {module.label}
                      </button>
                      <span className="block text-xs font-normal text-muted-foreground">{module.hint}</span>
                    </th>
                    {actions.map((action) => {
                      const permission = `${module.id}:${action}`;
                      if (!module.actions.includes(action)) {
                        return <td key={action} className="px-2 text-center text-(--color-ink-300)" aria-label="Not applicable">–</td>;
                      }
                      const on = granted.has(permission);
                      return (
                        <td key={action} className="px-2 py-2 text-center">
                          <button
                            type="button"
                            role="checkbox"
                            aria-checked={on}
                            aria-label={`${actionLabels[action]}: ${module.label}`}
                            onClick={() => toggle(permission)}
                            className={cn(
                              "inline-flex size-7 items-center justify-center rounded-lg transition-colors outline-none focus-visible:ring-4 focus-visible:ring-ring/30",
                              on ? "bg-primary text-primary-foreground" : "border-[1.5px] border-(--color-ink-300) bg-canvas hover:border-secondary-border",
                            )}
                          >
                            {on && <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            <strong className="font-medium text-foreground">Change structure</strong> covers adding and removing form fields, page blocks and collection items.{" "}
            <strong className="font-medium text-foreground">Publish</strong> makes drafts visible on the site; without it a role can only prepare drafts.
          </p>
          <div className="flex flex-wrap justify-between gap-2">
            {selected ? (
              <button type="button" disabled={pending} onClick={() => run(() => deleteRole(selected.id), () => pickRole(roles.find((r) => r.id !== selected.id)?.id ?? NEW_ROLE))} className={consoleButton.danger}>
                <Trash2 aria-hidden="true" /> Delete role
              </button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <button type="button" disabled={!dirty || pending} onClick={() => pickRole(selectedId)} className={consoleButton.secondary}>
                Discard
              </button>
              <button
                type="button"
                disabled={!dirty || pending}
                onClick={() =>
                  run(
                    () => saveRole({ id: selected?.id, name: draft.name, description: draft.description, permissions: draft.permissions }),
                    (result: { id: string }) => setSelectedId(result.id),
                  )
                }
                className={consoleButton.navy}
              >
                {selected ? "Save role" : "Create role"}
              </button>
            </div>
          </div>
        </section>
      </div>

      <section aria-label="Admin users" className="rounded-2xl border border-border bg-canvas">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5">
          <h2 className="font-heading text-xl font-medium">Admin users · {users.length}</h2>
          <button type="button" onClick={() => setCreating(true)} disabled={!roles.length} className={consoleButton.primary} title={roles.length ? undefined : "Create a role first"}>
            <UserPlus aria-hidden="true" /> Create admin user
          </button>
        </div>
        <ul className="mt-3 divide-y divide-border">
          {users.map((user) => (
            <UserItem key={user.id} user={user} me={user.id === meId} roles={roles} pending={pending} run={run} onIssued={(password) => setIssued({ id: user.id, email: user.email, password })} />
          ))}
        </ul>
      </section>

      <CreateUserDialog
        open={creating}
        onOpenChange={setCreating}
        roles={roles}
        pending={pending}
        onCreate={(input) =>
          run(
            () => createUser(input),
            (result: { password: string; id: string }) => {
              setCreating(false);
              setIssued({ id: result.id, email: input.email.trim().toLowerCase(), password: result.password });
            },
          )
        }
      />
    </div>
  );
}

function UserItem({
  user,
  me,
  roles,
  pending,
  run,
  onIssued,
}: {
  user: UserRow;
  me: boolean;
  roles: RoleRow[];
  pending: boolean;
  run: <T>(task: () => Promise<({ ok: true } & T) | { ok: false; error: string }>, done?: (result: T) => void) => void;
  onIssued: (password: string) => void;
}) {
  const [menu, setMenu] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--color-navy-100) text-xs font-semibold text-secondary-text">
        {initials(user.name || user.email)}
      </span>
      <span className="flex min-w-0 flex-[1_1_14rem] flex-col">
        <span className="truncate text-sm font-medium">
          {user.name ? `${user.name} · ` : ""}
          <span className={user.name ? "text-muted-foreground" : ""}>{user.email}</span>
          {me && <span className="text-muted-foreground"> (you)</span>}
        </span>
        <span className="text-xs text-muted-foreground">
          {user.lastSeenAt ? `Seen ${timeAgo(new Date(user.lastSeenAt))}` : "Never signed in"}
        </span>
      </span>
      {user.isSuper ? (
        <Badge tone="navy">Super Admin</Badge>
      ) : (
        <select
          aria-label={`Role for ${user.email}`}
          value={user.roleId ?? ""}
          disabled={pending}
          onChange={(event) => run(() => updateUser(user.id, { roleId: event.target.value }))}
          className={cn(consoleInput, "h-9 w-auto min-w-40")}
        >
          {!user.roleId && <option value="">No role</option>}
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      )}
      <span className="flex flex-wrap gap-1.5">
        {user.disabled && <Badge tone="neutral">Disabled</Badge>}
        {user.locked && <Badge tone="amber">Locked</Badge>}
        {user.mustChangePassword && !user.disabled && <Badge tone="amber">Awaiting first sign-in</Badge>}
        {user.totpEnabled && (
          <Badge tone="green">
            <ShieldCheck className="size-3" aria-hidden="true" /> 2-step
          </Badge>
        )}
      </span>
      {!user.isSuper && (
        <div className="relative">
          <button type="button" aria-label={`Actions for ${user.email}`} aria-expanded={menu} onClick={() => setMenu(!menu)} className={consoleButton.icon}>
            <MoreHorizontal aria-hidden="true" />
          </button>
          {menu && (
            <div role="menu" className="absolute top-10 right-0 z-20 flex w-60 flex-col rounded-xl border border-border bg-canvas p-1.5 shadow-[0_12px_32px_rgb(15_31_61/0.14)]" onMouseLeave={() => setMenu(false)}>
              <MenuButton onClick={() => { setMenu(false); run(() => resetPassword(user.id), (r: { password: string }) => onIssued(r.password)); }}>
                <KeyRound aria-hidden="true" /> Issue a new password
              </MenuButton>
              <MenuButton onClick={() => { setMenu(false); run(() => signOutEverywhere(user.id)); }}>Sign out of every device</MenuButton>
              <MenuButton onClick={() => { setMenu(false); run(() => updateUser(user.id, { disabled: !user.disabled })); }}>
                {user.disabled ? "Re-enable account" : "Disable account"}
              </MenuButton>
              <MenuButton danger onClick={() => { setMenu(false); setConfirmDelete(true); }}>
                <Trash2 aria-hidden="true" /> Delete user
              </MenuButton>
            </div>
          )}
        </div>
      )}
      <Dialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete this user?"
        description={`${user.email} loses access straight away. Their changes stay in the audit log.`}
        footer={
          <>
            <button type="button" onClick={() => setConfirmDelete(false)} className={consoleButton.secondary}>Cancel</button>
            <button type="button" onClick={() => { setConfirmDelete(false); run(() => deleteUser(user.id)); }} className={consoleButton.danger}>Delete user</button>
          </>
        }
      >
        <p className="text-sm text-muted-foreground">To keep their history but stop sign-in, disable the account instead.</p>
      </Dialog>
    </li>
  );
}

function MenuButton({ danger, onClick, children }: { danger?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm [&_svg]:size-4", danger ? "text-ember hover:bg-ember/8" : "hover:bg-surface")}
    >
      {children}
    </button>
  );
}

function CreateUserDialog({
  open,
  onOpenChange,
  roles,
  pending,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roles: RoleRow[];
  pending: boolean;
  onCreate: (input: { email: string; name: string; roleId: string }) => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [roleId, setRoleId] = useState(roles[0]?.id ?? "");
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create admin user"
      description="A password is generated and shown once. They choose their own at first sign-in."
      footer={
        <>
          <button type="button" onClick={() => onOpenChange(false)} className={consoleButton.secondary}>Cancel</button>
          <button type="button" disabled={pending || !email} onClick={() => onCreate({ email, name, roleId })} className={consoleButton.primary}>
            Create user
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Field label="Email" htmlFor="new-email">
          <input id="new-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="desk@adjudixadr.com" className={consoleInput} />
        </Field>
        <Field label="Name (optional)" htmlFor="new-name">
          <input id="new-name" value={name} onChange={(e) => setName(e.target.value)} className={consoleInput} />
        </Field>
        <Field label="Role" htmlFor="new-role">
          <select id="new-role" value={roleId} onChange={(e) => setRoleId(e.target.value)} className={consoleInput}>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name} — {role.permissions.length} permissions
              </option>
            ))}
          </select>
        </Field>
      </div>
    </Dialog>
  );
}

function IssuedCard({
  issued,
  onEmail,
  onClose,
  pending,
}: {
  issued: { email: string; password: string; emailed?: boolean };
  onEmail: () => void;
  onClose: () => void;
  pending: boolean;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <section aria-live="polite" className="flex flex-col gap-4 rounded-2xl bg-(--color-navy-900) p-6 text-text-on-hero">
      <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">Sign-in details · shown once</p>
      <h2 className="font-heading text-2xl font-medium">{issued.email}</h2>
      <p className="max-w-xl text-sm leading-relaxed text-text-on-hero-muted">
        Copy this password or email it now — it can&apos;t be shown again. They&apos;ll be asked to choose their own when they sign in.
      </p>
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-(--color-navy-600) bg-(--color-navy-950) px-4 py-3">
        <code className="flex-1 font-mono text-lg tracking-[0.06em] break-all">{issued.password}</code>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(issued.password);
            setCopied(true);
          }}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-(--color-navy-500) px-3 text-sm hover:bg-white/8"
        >
          {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" disabled={pending || issued.emailed} onClick={onEmail} className={consoleButton.primary}>
          <Mail aria-hidden="true" /> {issued.emailed ? "Emailed" : "Email the sign-in details"}
        </button>
        <button type="button" onClick={onClose} className="inline-flex h-10 items-center rounded-full border border-(--color-navy-500) px-5 text-sm hover:bg-white/8">
          Done
        </button>
      </div>
    </section>
  );
}
