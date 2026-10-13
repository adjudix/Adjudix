import { TIERS, type Member } from "@/lib/members";

// Monogram from the name, honorific dropped ("Mr. Bhavesh Tiwari" -> "BT").
function initials(name: string) {
  const parts = name.replace(/^(Mr|Mrs|Ms|Dr)\.\s+/, "").split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

function TierMark({ stars }: { stars: number | "beyond" }) {
  if (stars === "beyond") {
    return <span className="text-primary-hover">Beyond stars</span>;
  }
  return (
    <span className="tracking-tight text-primary-hover" aria-label={`${stars} stars`}>
      {"★".repeat(stars)}
    </span>
  );
}

// No photographs by design — a monogram stands in (see IDENTITY_NOTE).
export function MemberCard({ member, role }: { member: Member; role?: string }) {
  const tier = TIERS[member.tier];
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-surface p-6">
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-canvas font-heading text-base font-semibold text-primary-ink"
        >
          {initials(member.name)}
        </span>
        <div className="min-w-0">
          <h3 className="font-heading text-lg leading-snug font-semibold text-text">{member.name}</h3>
          <p className="mt-0.5 font-mono text-xs tracking-wider text-primary-ink">{tier.postNominal}</p>
        </div>
      </div>
      <p className="mt-4 mb-5 text-left font-body text-sm text-text-muted">{member.credentials}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 font-body text-xs text-text-muted">
        <span>{role ?? tier.label}</span>
        <TierMark stars={tier.stars} />
      </div>
    </article>
  );
}

// The "why no photos" statement, shared by the panel and members pages.
export function IdentityNote({ title, body }: { title: string; body: string }) {
  return (
    <aside className="rounded-lg border-l-4 border-primary bg-surface px-6 py-5">
      <p className="font-heading text-xl font-semibold text-text">{title}</p>
      <p className="mt-2 font-body text-sm text-text-muted">{body}</p>
    </aside>
  );
}
