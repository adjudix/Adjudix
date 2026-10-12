"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { applyHref } from "@/lib/apply-forms";

// Mirrors iccwbo.org's homepage "Find what you are looking for" widget: a
// small card, overlapping the hero, that routes visitors by who they are
// rather than what they want to read. Sized to match ICC's own card (290px
// wide, 24px padding, 52px dropdown), styled with the site's own controls.
// Grouped so every service is one choice away (client markup, Oct 2026:
// "make sure everything is here, including scholarships").
const AUDIENCE_GROUPS = [
  {
    label: "Disputes",
    options: [
      { label: "I have a dispute to resolve", href: "/odr/file" },
      { label: "I've received a dispute notice", href: "/odr/respond" },
      { label: "I need urgent interim relief", href: "/dispute-resolution/emergency" },
      { label: "I'm a corporate client", href: "/dispute-resolution/corporate" },
      { label: "I want my order or award implemented", href: "/implementation" },
      { label: "I want a free consultation", href: applyHref("consultation") },
      { label: "I want to know the fees", href: "/dispute-resolution/fees" },
    ],
  },
  {
    label: "Contracts",
    options: [
      { label: "I want my agreement or clause drafted", href: "/dispute-resolution/clause-drafting" },
      { label: "I need a model arbitration clause", href: "/dispute-resolution/model-clauses" },
    ],
  },
  {
    label: "Students",
    options: [
      { label: "I'm a student looking for a course", href: "/training/courses#student-courses" },
      { label: "I want a scholarship", href: applyHref("scholarship") },
      { label: "I want an internship", href: applyHref("internship") },
      { label: "I want an apprenticeship", href: applyHref("apprenticeship") },
      { label: "I want to take part in a competition", href: "/knowledge/competitions" },
      { label: "I want student membership", href: "/membership/student" },
    ],
  },
  {
    label: "Professionals",
    options: [
      { label: "I want professional training or certification", href: "/training/courses" },
      { label: "I want to join the panel", href: "/panel" },
      { label: "I want to become a member", href: "/membership" },
      { label: "I want to teach or speak", href: applyHref("faculty") },
    ],
  },
  {
    label: "Learn & Connect",
    options: [
      { label: "I want to read the rule book", href: "/dispute-resolution/rules/code-of-procedure/2026" },
      { label: "I'm researching arbitration & ADR", href: "/knowledge" },
      { label: "I'm looking for events", href: "/events" },
      { label: "I want to partner with Adjudix", href: "/partners" },
      { label: "Something else — send us a query", href: applyHref("enquiry") },
    ],
  },
];

const AUDIENCE_OPTIONS = AUDIENCE_GROUPS.flatMap((group) => group.options);

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
          {AUDIENCE_GROUPS.map((group) => (
            <SelectGroup key={group.label}>
              <SelectGroupLabel>{group.label}</SelectGroupLabel>
              {group.options.map((option) => (
                <SelectItem key={option.href} value={option.href}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
