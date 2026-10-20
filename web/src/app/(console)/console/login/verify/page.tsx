import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/console/auth-shell";
import { currentSession } from "@/lib/console/auth";
import { consoleHref } from "@/lib/console/paths";
import { VerifyForm } from "../login-form";

export const metadata: Metadata = { title: "Two-step verification" };

export default async function VerifyPage() {
  const session = await currentSession();
  if (!session) redirect(consoleHref("/login"));
  if (session.stage === "active") redirect(consoleHref("/"));
  return (
    <AuthShell title="Two-step verification" description={<>Signing in as <strong className="font-medium text-foreground">{session.user.email}</strong>.</>}>
      <VerifyForm />
    </AuthShell>
  );
}
