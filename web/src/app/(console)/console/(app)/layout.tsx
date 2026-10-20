import { count, eq } from "drizzle-orm";
import { Sidebar, type NavItem } from "@/components/console/sidebar";
import { initials } from "@/components/console/ui";
import { db, schema } from "@/db";
import { requireUser } from "@/lib/console/auth";
import { can } from "@/lib/console/permissions";
import { COLLECTIONS } from "@/lib/content/collections";
import { signOut } from "../login/actions";

// Every signed-in console screen: the navy sidebar (only the modules this
// user may open) beside the screen itself.
export default async function ConsoleAppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const [{ value: newSubmissions }] = can(user, "submissions")
    ? await db().select({ value: count() }).from(schema.submissions).where(eq(schema.submissions.status, "new"))
    : [{ value: 0 }];

  const main: NavItem[] = [
    { href: "/", label: "Dashboard", icon: "dashboard" },
    ...(can(user, "submissions") ? [{ href: "/submissions", label: "Submissions", icon: "submissions", count: newSubmissions } as const] : []),
    ...(can(user, "forms") ? [{ href: "/forms", label: "Forms", icon: "forms" } as const] : []),
    ...(can(user, "pages") ? [{ href: "/pages", label: "Pages", icon: "pages" } as const] : []),
    ...(can(user, "collections")
      ? [
          {
            href: "/collections",
            label: "Collections",
            icon: "collections",
            children: COLLECTIONS.map((collection) => ({ href: `/collections/${collection.key}`, label: collection.label })),
          } as const,
        ]
      : []),
    ...(can(user, "media") ? [{ href: "/media", label: "Media", icon: "media" } as const] : []),
    ...(can(user, "settings") ? [{ href: "/settings", label: "Site settings", icon: "settings" } as const] : []),
  ];
  const admin: NavItem[] = [
    ...(user.isSuper ? [{ href: "/access", label: "Users & roles", icon: "access" } as const] : []),
    ...(can(user, "audit") ? [{ href: "/audit", label: "Audit log", icon: "audit" } as const] : []),
  ];

  return (
    <div className="flex min-h-dvh flex-1 flex-col lg:flex-row">
      <Sidebar
        main={main}
        admin={admin}
        user={{ label: user.name || user.email, detail: user.roleName, initials: initials(user.name || user.email) }}
        signOut={signOut}
      />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
