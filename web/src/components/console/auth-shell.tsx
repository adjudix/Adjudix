import type { ReactNode } from "react";
import Image from "next/image";
import { LockKeyhole, ShieldCheck } from "lucide-react";

/** Sign-in and account set-up screens: the navy statement beside the form. */
export function AuthShell({ title, description, children }: { title: string; description: ReactNode; children: ReactNode }) {
  return (
    <main className="flex min-h-dvh flex-1 flex-wrap">
      <section className="flex min-w-0 flex-[1_1_26rem] flex-col justify-between gap-12 bg-(--color-navy-900) px-8 py-10 text-text-on-hero sm:px-14 sm:py-14">
        <div className="flex items-center gap-3">
          <Image src="/images/logo-icon.png" alt="" width={40} height={40} className="size-10 rounded-lg bg-canvas object-contain p-1" />
          <span className="font-heading text-xl font-semibold">Adjudix Console</span>
        </div>
        <div className="max-w-lg">
          <h1 className="font-heading text-4xl leading-[1.08] font-medium tracking-tight sm:text-5xl">
            Every page, form and record of the Institute, in one place.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-text-on-hero-muted">
            Drafts stay private until they are published. Every change is recorded against the person who made it.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-text-on-hero-muted">
          <li className="flex items-center gap-2">
            <LockKeyhole className="size-4 text-primary" aria-hidden="true" />
            Private address, not linked from the site
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
            Two-step verification
          </li>
        </ul>
      </section>
      <section className="flex min-w-0 flex-[1_1_26rem] items-center justify-center bg-surface px-5 py-12">
        <div className="w-full max-w-[25rem] rounded-[1.25rem] border border-border bg-canvas p-7 shadow-[0_12px_32px_rgb(15_31_61/0.08)] sm:p-9">
          <h2 className="font-heading text-3xl font-medium text-foreground">{title}</h2>
          <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</div>
          <div className="mt-7">{children}</div>
        </div>
      </section>
    </main>
  );
}
