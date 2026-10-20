import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Announcement } from "@/lib/site-settings";
import { cn } from "@/lib/utils";

// A one-line notice above the header, switched on in Site settings.
export function AnnouncementBar({ announcement }: { announcement: Announcement }) {
  if (!announcement.enabled || !announcement.text.trim()) return null;
  const tone = {
    gold: "bg-primary text-primary-foreground",
    navy: "bg-hero text-text-on-hero",
    ember: "bg-ember text-ember-foreground",
  }[announcement.tone];
  return (
    <div role="region" aria-label="Announcement" className={cn("px-6 py-2 text-center font-body text-sm", tone)}>
      <span className="font-medium">{announcement.text}</span>
      {announcement.href && announcement.linkLabel && (
        <Link href={announcement.href} className="ml-2 inline-flex items-center gap-1 font-semibold underline underline-offset-4">
          {announcement.linkLabel}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
