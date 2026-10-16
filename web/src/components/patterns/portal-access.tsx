"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldLabel, inputClass } from "@/components/forms/controls";
import { cn } from "@/lib/utils";

type Mode = "login" | "signup";
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "error"; message: string } | { kind: "sent" };

// Keep in step with ROLES in app/api/portal/route.ts.
const PORTAL_ROLES = ["Party to a case", "Arbitrator / Neutral", "Case Manager / Secretariat"];

// A fresh random captcha from the server, re-drawn after every attempt.
function useCaptcha() {
  const [captcha, setCaptcha] = useState<{ image: string; token: string } | null>(null);
  const refresh = useCallback(async () => {
    setCaptcha(null);
    try {
      const response = await fetch("/api/captcha", { cache: "no-store" });
      setCaptcha(await response.json());
    } catch {
      // Leave it blank; the visitor can press refresh.
    }
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetching the first captcha on mount
    refresh();
  }, [refresh]);
  return { captcha, refresh };
}

export function PortalAccess() {
  const [mode, setMode] = useState<Mode>("login");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const { captcha, refresh } = useCaptcha();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!captcha) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/portal", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, action: mode, captchaToken: captcha.token }),
      });
      if (response.ok) {
        setStatus({ kind: "sent" });
        form.reset();
      } else {
        const { error } = await response.json().catch(() => ({ error: "Something went wrong. Please try again." }));
        setStatus({ kind: "error", message: error });
      }
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach the server. Please check your connection and try again." });
    }
    // Every captcha is single-attempt from the visitor's point of view.
    refresh();
    const answer = form.elements.namedItem("captcha");
    if (answer instanceof HTMLInputElement) answer.value = "";
  }

  const switchTo = (next: Mode) => {
    setMode(next);
    setStatus({ kind: "idle" });
  };

  return (
    <div className="rounded-lg border border-border bg-canvas shadow-sm">
      <div role="tablist" aria-label="Portal access" className="grid grid-cols-2 border-b border-border">
        {(["login", "signup"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={mode === tab}
            onClick={() => switchTo(tab)}
            className={cn(
              "px-4 py-4 font-body text-sm font-semibold transition-colors",
              mode === tab ? "border-b-2 border-primary text-text" : "text-text-muted hover:text-text",
            )}
          >
            {tab === "login" ? "Log in" : "Sign up"}
          </button>
        ))}
      </div>

      {status.kind === "sent" && mode === "signup" ? (
        <div className="p-6 md:p-8" role="status">
          <p className="font-heading text-xl font-semibold text-text">Sign-up received</p>
          <p className="mt-2 font-body text-sm text-text-muted">
            The Secretariat will verify your details and email you once your portal account is
            active, with a link to set your password.
          </p>
        </div>
      ) : (
        <form key={mode} onSubmit={submit} className="flex flex-col gap-5 p-6 md:p-8">
          {mode === "signup" && (
            <>
              <div>
                <FieldLabel htmlFor="portal-role" required>
                  Signing up as
                </FieldLabel>
                <select id="portal-role" name="role" required className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  {PORTAL_ROLES.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel htmlFor="portal-name" required>
                  Full name
                </FieldLabel>
                <input id="portal-name" name="name" required autoComplete="name" className={inputClass} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="portal-email" required>
                    Email
                  </FieldLabel>
                  <input id="portal-email" name="email" type="email" required autoComplete="email" className={inputClass} />
                </div>
                <div>
                  <FieldLabel htmlFor="portal-phone" optionalHint>
                    Phone
                  </FieldLabel>
                  <input id="portal-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
                </div>
              </div>
            </>
          )}

          <div>
            <FieldLabel htmlFor="portal-user" required>
              {mode === "login" ? "User ID" : "Choose a user ID"}
            </FieldLabel>
            <input
              id="portal-user"
              name="userId"
              required
              autoComplete="username"
              minLength={mode === "signup" ? 4 : undefined}
              maxLength={32}
              pattern={mode === "signup" ? "[A-Za-z0-9._\\-]{4,32}" : undefined}
              className={inputClass}
            />
          </div>

          {mode === "login" ? (
            <div>
              <FieldLabel htmlFor="portal-password" required>
                Password
              </FieldLabel>
              <input
                id="portal-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className={inputClass}
              />
            </div>
          ) : (
            <div>
              <FieldLabel htmlFor="portal-case" optionalHint>
                Case number, if you have one
              </FieldLabel>
              <input id="portal-case" name="caseNumber" className={inputClass} />
            </div>
          )}

          <div>
            <FieldLabel htmlFor="portal-captcha" required>
              Type the characters you see
            </FieldLabel>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-14 w-[170px] items-center justify-center overflow-hidden rounded-md border border-border bg-surface">
                {captcha ? (
                  // eslint-disable-next-line @next/next/no-img-element -- a one-off data: URL, nothing for next/image to optimise
                  <img src={captcha.image} alt="Captcha: type the characters shown" width={170} height={56} />
                ) : (
                  <span className="font-body text-xs text-text-muted">Loading…</span>
                )}
              </div>
              <button
                type="button"
                onClick={refresh}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 font-body text-xs font-medium text-primary-ink hover:bg-surface"
              >
                <RefreshCw className="size-3.5" aria-hidden="true" />
                New captcha
              </button>
            </div>
            <input
              id="portal-captcha"
              name="captcha"
              required
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={5}
              className={cn(inputClass, "mt-3 max-w-[170px] font-mono uppercase tracking-[0.3em]")}
            />
          </div>

          {status.kind === "error" && (
            <p role="alert" className="rounded-md bg-ember/10 px-4 py-3 font-body text-sm text-ember">
              {status.message}
            </p>
          )}

          <Button type="submit" size="lg" loading={status.kind === "sending"} disabled={!captcha}>
            {mode === "login" ? "Log in" : "Sign up"}
          </Button>
          {mode === "signup" && (
            <p className="font-body text-xs text-text-muted">
              No password is set at sign-up. Once the Secretariat verifies you, you&apos;ll receive an
              email to set it.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
