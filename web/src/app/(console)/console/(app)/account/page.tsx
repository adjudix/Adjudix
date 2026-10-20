import type { Metadata } from "next";
import { KeyRound, ShieldCheck } from "lucide-react";
import { ConsoleLink } from "@/components/console/base";
import { Badge, PageHead, Panel, consoleButton } from "@/components/console/ui";
import { requireUser } from "@/lib/console/auth";

export const metadata: Metadata = { title: "Your account" };

export default async function AccountPage() {
  const user = await requireUser();
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-7 px-5 py-8 sm:px-8">
      <PageHead eyebrow={user.roleName} title="Your account" description={user.email} />
      <Panel title="Password" description="Changing it signs you out on your other devices." actions={<KeyRound className="size-5 text-muted-foreground" aria-hidden="true" />}>
        <ConsoleLink href="/account/password" className={consoleButton.secondary}>
          Change password
        </ConsoleLink>
      </Panel>
      <Panel
        title="Two-step verification"
        description="A code from an authenticator app at every sign-in."
        actions={user.totpEnabled ? <Badge tone="green"><ShieldCheck className="size-3" aria-hidden="true" /> On</Badge> : <Badge tone="amber">Off</Badge>}
      >
        <ConsoleLink href="/account/two-step" className={consoleButton.secondary}>
          {user.totpEnabled ? "Manage" : "Turn on two-step verification"}
        </ConsoleLink>
      </Panel>
    </main>
  );
}
