import type { Metadata } from "next";
import { AuthShell } from "@/components/console/auth-shell";
import { requireUser } from "@/lib/console/auth";
import { PasswordForm } from "../forms";

export const metadata: Metadata = { title: "Change password" };

export default async function PasswordPage() {
  const user = await requireUser({ setup: true });
  return (
    <AuthShell
      title={user.mustChangePassword ? "Choose your password" : "Change password"}
      description={
        user.mustChangePassword
          ? "You signed in with a generated password. Replace it with one only you know before you continue."
          : "You'll stay signed in here; other devices are signed out."
      }
    >
      <PasswordForm />
    </AuthShell>
  );
}
