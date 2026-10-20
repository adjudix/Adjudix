import type { ApplyForm } from "@/lib/apply-forms";

// A form as the console stores it: everything QueryForm needs, plus whether
// it is taking entries and which mailbox receives them.
export interface FormConfig extends ApplyForm {
  enabled: boolean;
  /** Shown in place of the form while it is closed. */
  closedTitle: string;
  closedBody: string;
  inbox: "query" | "secretariat";
}

export const CLOSED_DEFAULTS = {
  closedTitle: "This form isn't taking entries right now",
  closedBody: "Please check back soon, or write to query@adjudixADR.com and we'll help you directly.",
};
