"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mirrors iccwbo.org's homepage "Find what you are looking for" widget: a
// small card, overlapping the hero, that routes visitors by who they are
// rather than what they want to read. Sized to match ICC's own card (290px
// wide, 24px padding, 52px dropdown), styled with the site's own controls.
const AUDIENCE_OPTIONS = [
  { label: "I have a dispute to resolve", href: "/odr/file" },
  { label: "I want to join the panel", href: "/panel" },
  { label: "I'm a corporate client", href: "/dispute-resolution/corporate" },
  { label: "I want training or certification", href: "/training" },
  { label: "I want to become a member", href: "/membership" },
  { label: "I want to get my order implemented", href: "/implementation" },
  { label: "I want my agreement or arbitration clause drafted", href: "/dispute-resolution/clause-drafting" },
  { label: "I'm researching arbitration & ADR", href: "/knowledge" },
];

export function AudienceFinder() {
  const router = useRouter();

  return (
    <div className="w-full rounded-lg border border-border bg-surface p-6 shadow-xl">
      <p className="font-heading text-lg text-text italic">
        Find what you&rsquo;re looking for
      </p>
      <Select
        items={AUDIENCE_OPTIONS.map((option) => ({
          value: option.href,
          label: option.label,
        }))}
        onValueChange={(href: string | null) => {
          if (href) router.push(href);
        }}
      >
        <SelectTrigger aria-label="Find what you're looking for" className="mt-3">
          <SelectValue placeholder="I am a…" />
        </SelectTrigger>
        <SelectContent>
          {AUDIENCE_OPTIONS.map((option) => (
            <SelectItem key={option.href} value={option.href}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
