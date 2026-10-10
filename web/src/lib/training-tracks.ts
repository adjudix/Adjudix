// The six Training Institute tracks and their fees, per the client's Oct 2026
// markup. `mrp` is the struck-through list price shown beside the discounted
// `price`. Shared by the Training, Courses, and Upcoming Courses pages and by
// each course page, so a fee change is made in one place.
export interface TrainingTrack {
  slug: string;
  title: string;
  description: string;
  href: string;
  price: number;
  mrp: number;
}

export const TRAINING_TRACKS: TrainingTrack[] = [
  {
    slug: "adr-overview",
    title: "ADR Overview",
    description: "The full ADR landscape — every mechanism, when to use it, and how outcomes are implemented.",
    href: "/training/courses/adr-overview",
    price: 19_999,
    mrp: 29_999,
  },
  {
    slug: "arbitrator",
    title: "Arbitrator Track",
    description: "Professional and student tracks toward panel-eligible arbitration practice.",
    href: "/training/courses/arbitrator",
    price: 19_999,
    mrp: 29_999,
  },
  {
    slug: "conciliator",
    title: "Conciliator Track",
    description: "Training in active, proposal-led settlement facilitation.",
    href: "/training/courses/conciliator",
    price: 14_999,
    mrp: 24_999,
  },
  {
    slug: "mediator",
    title: "Mediator Track",
    description: "Facilitative technique for guiding parties to their own settlement.",
    href: "/training/courses/mediator",
    price: 14_999,
    mrp: 24_999,
  },
  {
    slug: "contract-drafting",
    title: "Contract Drafting Track",
    description: "Drafting enforceable arbitration and mediation clauses for commercial contracts.",
    href: "/training/courses/contract-drafting",
    price: 19_999,
    mrp: 29_999,
  },
  {
    slug: "hybrid",
    title: "Hybrid ADR Track",
    description: "Running Med-Arb and other hybrid processes from mediation through to a binding award.",
    href: "/training/courses/hybrid",
    price: 19_999,
    mrp: 29_999,
  },
];

export function getTrack(slug: string): TrainingTrack {
  const track = TRAINING_TRACKS.find((t) => t.slug === slug);
  if (!track) throw new Error(`Unknown training track: ${slug}`);
  return track;
}

export function formatRupees(value: number): string {
  return `₹${new Intl.NumberFormat("en-IN").format(value)}/-`;
}
