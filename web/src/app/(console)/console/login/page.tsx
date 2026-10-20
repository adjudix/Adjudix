import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/console/auth-shell";
import { Notice } from "@/components/console/ui";
import { databaseConfigured } from "@/db";
import { currentSession } from "@/lib/console/auth";
import { consoleHref } from "@/lib/console/paths";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ locked?: string }> }) {
  if (!databaseConfigured()) {
    return (
      <AuthShell title="Sign in" description="The console needs its database.">
        <Notice tone="warning">Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN for this deployment, then redeploy.</Notice>
      </AuthShell>
    );
  }
  const session = await currentSession();
  if (session?.stage === "active") redirect(consoleHref("/"));
  const { locked } = await searchParams;
  return (
    <AuthShell title="Sign in" description="Accounts are issued by a super admin. There is no sign-up.">
      <LoginForm notice={locked ? "Too many wrong codes. The account is locked for 15 minutes." : undefined} />
    </AuthShell>
  );
}
