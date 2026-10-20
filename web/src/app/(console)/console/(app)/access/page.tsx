import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { asc } from "drizzle-orm";
import { PageHead } from "@/components/console/ui";
import { db, schema } from "@/db";
import { requireUser } from "@/lib/console/auth";
import { consoleHref } from "@/lib/console/paths";
import { ACTIONS, MODULES } from "@/lib/console/permissions";
import { AccessManager } from "./access-manager";

export const metadata: Metadata = { title: "Users & roles" };

export default async function AccessPage() {
  const me = await requireUser();
  if (!me.isSuper) redirect(consoleHref("/?denied=1"));

  const [users, roles] = await Promise.all([
    db().query.users.findMany({ orderBy: asc(schema.users.createdAt) }),
    db().query.roles.findMany({ orderBy: asc(schema.roles.name) }),
  ]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-5 py-8 sm:px-8">
      <PageHead
        eyebrow="Super admins only"
        title="Users & roles"
        description="Give each desk a role with exactly the permissions it needs, then create its people. Generated passwords are shown once and must be changed at first sign-in."
      />
      <AccessManager
        meId={me.id}
        modules={Object.entries(MODULES).map(([id, module]) => ({ id, label: module.label, hint: module.hint, actions: [...module.actions] }))}
        actionLabels={ACTIONS}
        roles={roles.map((role) => ({ id: role.id, name: role.name, description: role.description, permissions: role.permissions }))}
        users={users.map((user) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          isSuper: user.isSuper,
          roleId: user.roleId,
          disabled: user.disabled,
          totpEnabled: user.totpEnabled,
          mustChangePassword: user.mustChangePassword,
          locked: Boolean(user.lockedUntil && user.lockedUntil > new Date()),
          lastSeenAt: user.lastSeenAt?.toISOString() ?? null,
        }))}
      />
    </main>
  );
}
