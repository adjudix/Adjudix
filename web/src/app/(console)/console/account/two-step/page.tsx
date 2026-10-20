import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import QRCode from "qrcode";
import { AuthShell } from "@/components/console/auth-shell";
import { requireUser, totpFor } from "@/lib/console/auth";
import { consoleHref } from "@/lib/console/paths";
import { beginTwoStep } from "../actions";
import { TwoStepConfirmForm, TwoStepDisableForm } from "../forms";

export const metadata: Metadata = { title: "Two-step verification" };

export default async function TwoStepPage() {
  const user = await requireUser({ setup: true });
  if (user.mustChangePassword) redirect(consoleHref("/account/password"));

  if (user.totpEnabled) {
    return (
      <AuthShell title="Two-step verification is on" description="Each sign-in asks for a code from your authenticator app.">
        {user.isSuper ? (
          <p className="text-sm text-muted-foreground">Super admins must keep it on.</p>
        ) : (
          <TwoStepDisableForm />
        )}
      </AuthShell>
    );
  }

  const secret = (await beginTwoStep())!;
  const uri = totpFor(user.email, secret).toString();
  const qr = await QRCode.toDataURL(uri, { margin: 1, width: 360, color: { dark: "#0F1F3D", light: "#FFFFFF" } });

  return (
    <AuthShell
      title="Set up two-step verification"
      description={
        user.isSuper
          ? "Required for super admins. Scan the code with Google Authenticator, Microsoft Authenticator, 1Password or similar."
          : "Scan the code with Google Authenticator, Microsoft Authenticator, 1Password or similar."
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3 rounded-xl bg-surface p-5">
          <Image src={qr} alt="QR code for your authenticator app" width={180} height={180} unoptimized className="rounded-lg" />
          <details className="w-full text-center text-xs text-muted-foreground">
            <summary className="cursor-pointer">Can&apos;t scan? Enter the key instead</summary>
            <code className="mt-2 block font-mono text-sm tracking-wider break-all text-foreground">{secret.match(/.{1,4}/g)?.join(" ")}</code>
          </details>
        </div>
        <TwoStepConfirmForm />
      </div>
    </AuthShell>
  );
}
