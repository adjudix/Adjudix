// Adjudix Arbitration Fee Schedule — structure and rates follow the reference
// schedule the client supplied (Oct 2026). All amounts in rupees. Both the
// Fees page tables and the calculator read from here, so a rate changes in
// one place.

const LAKH = 100_000;

export interface Slab {
  from: number; // claim at which the slab starts
  to: number; // inclusive upper bound (Infinity for the last slab)
  base: number; // fee at `from`
  perLakh: number; // added per lakh, or part thereof, above `from`
  ceiling?: number;
}

// Regular domestic arbitration: claims of ₹5,00,000 and above.
export const SMALL_CAUSE_LIMIT = 5 * LAKH;

export const TRIBUNAL_SLABS: Slab[] = [
  { from: 5 * LAKH, to: 25 * LAKH, base: 30_000, perLakh: 3_000 },
  { from: 25 * LAKH, to: 100 * LAKH, base: 90_000, perLakh: 2_000 },
  { from: 100 * LAKH, to: 1_000 * LAKH, base: 240_000, perLakh: 500 },
  { from: 1_000 * LAKH, to: 2_500 * LAKH, base: 690_000, perLakh: 200 },
  { from: 2_500 * LAKH, to: Infinity, base: 990_000, perLakh: 125, ceiling: 2_000_000 },
];

export const ADMIN_SLABS: Slab[] = [
  { from: 5 * LAKH, to: 25 * LAKH, base: 15_000, perLakh: 1_250 },
  { from: 25 * LAKH, to: 100 * LAKH, base: 40_000, perLakh: 750 },
  { from: 100 * LAKH, to: 1_000 * LAKH, base: 96_250, perLakh: 200 },
  { from: 1_000 * LAKH, to: 2_500 * LAKH, base: 276_250, perLakh: 125 },
  { from: 2_500 * LAKH, to: Infinity, base: 463_750, perLakh: 75, ceiling: 1_000_000 },
];

// Small cause arbitration: claims below ₹5,00,000.
export const SMALL_CAUSE = [
  { to: 3 * LAKH, label: "Up to ₹3,00,000", tribunal: 20_000, admin: 10_000 },
  { to: SMALL_CAUSE_LIMIT, label: "₹3,00,001 – ₹5,00,000", tribunal: 30_000, admin: 15_000 },
];

export const REGISTRATION = {
  regular: [
    { item: "Filing fee — arbitration", fee: 5_000 },
    { item: "Consultation / orientation (if availed)", fee: 2_500 },
    { item: "Application — interpretation, correction, or additional award", fee: 3_500 },
    { item: "Scrutiny of award", fee: 3_500 },
  ],
  smallCause: [
    { item: "Filing fee — arbitration", fee: 2_500 },
    { item: "Consultation / orientation (if availed)", fee: 2_000 },
    { item: "Application — interpretation, correction, or additional award", fee: 2_500 },
    { item: "Scrutiny of award", fee: 2_500 },
  ],
};

// Flat fees by claim band: interpretation/correction/additional award (per
// arbitrator) and scrutiny (per member). Small cause claims use the single
// figures. (Emergency arbitration is priced from the whole fee instead; see
// EMERGENCY_UPLIFT.)
export const BANDED_FEES = {
  bands: ["Up to ₹25,00,000", "₹25,00,001 – ₹1,00,00,000", "Above ₹1,00,00,000"],
  rows: [
    { item: "Interpretation, correction, or additional award (per arbitrator)", fees: [10_000, 25_000, 50_000], smallCause: 5_000 },
    { item: "Scrutiny fee (per member)", fees: [15_000, 25_000, 50_000], smallCause: 7_500 },
  ],
};

export const SOLE_ARBITRATOR_UPLIFT = 0.2;
// Emergency arbitration costs the whole fee of a regular arbitration for the
// same claim — filing, tribunal, administrative fees and GST — plus 15%
// (client, Oct 2026).
export const EMERGENCY_UPLIFT = 0.15;
// Fast track runs the whole arbitration faster, on priority, so it costs the
// whole fee of a regular arbitration plus 15% (client, Oct 2026). Emergency
// arbitration is separate (EMERGENCY_UPLIFT); the two never apply together.
export const FAST_TRACK_UPLIFT = 0.15;
export const GST_RATE = 0.18;

// Four equal instalments, all deposited by the claimant (client, Oct 2026).
// Who finally bears them is the neutral's call in the award (see TERMS).
export const PAYMENT_SCHEDULE = [
  { share: "25%", when: "Deposited by the claimant at the time of filing." },
  { share: "25%", when: "Deposited by the claimant before the stage of evidence." },
  { share: "25%", when: "Deposited by the claimant before final arguments." },
  { share: "25%", when: "Deposited by the claimant before the final order." },
];

export const TERMS = [
  "Registration charges are paid by the party filing the notice or application; the consultation fee, if availed, at the time of the appointment.",
  "In emergency arbitration, the entire fee is deposited by the applicant when filing the application.",
  "The tribunal and administrative fees are fixed on the claim. A counter-claim attracts fees on the same pattern, as if it were an independent claim.",
  "The claimant deposits the fees in the instalments above, subject to the final outcome of the matter. If a deposit is not made, the tribunal may suspend or terminate the proceedings for that claim or counter-claim.",
  "Who finally bears the amount paid as fees is decided at the discretion of the neutral, applying (i) the loser-pays principle — the party that loses the case bears the fees and costs; (ii) the equal-pay principle — the parties bear them equally; (iii) the claimant-pays principle — the claimant bears them; or (iv) the proportionate-pay principle — the parties bear them in the ratio decided by the neutral.",
  "Amounts in a currency other than Indian Rupees are converted at the current official rate of exchange.",
  "The arbitrator's fee carries no GST. All other charges carry GST at 18%.",
  "For disputes that cannot be quantified, Adjudix fixes the fee on the facts of the case.",
  "Arbitrators receive a travelling allowance of ₹1,000 per local sitting. Outstation sittings are paid at actuals, subject to ₹10,000 a day in metropolitan cities and ₹7,500 a day elsewhere (or ₹5,000 a day without vouchers).",
  "International arbitration fees are fixed in US dollars at registration and confirmed to the parties in writing.",
];

/** Every rate in one object — the shape the console's Fee schedule edits. */
export interface FeeSchedule {
  smallCauseLimit: number;
  tribunalSlabs: Slab[];
  adminSlabs: Slab[];
  smallCause: { to: number; label: string; tribunal: number; admin: number }[];
  registration: { regular: { item: string; fee: number }[]; smallCause: { item: string; fee: number }[] };
  bandedFees: { bands: string[]; rows: { item: string; fees: number[]; smallCause: number }[] };
  soleArbitratorUplift: number;
  fastTrackUplift: number;
  emergencyUplift: number;
  gstRate: number;
  paymentSchedule: { share: string; when: string }[];
  terms: string[];
}

export const DEFAULT_FEE_SCHEDULE: FeeSchedule = {
  smallCauseLimit: SMALL_CAUSE_LIMIT,
  tribunalSlabs: TRIBUNAL_SLABS,
  adminSlabs: ADMIN_SLABS,
  smallCause: SMALL_CAUSE,
  registration: REGISTRATION,
  bandedFees: BANDED_FEES,
  soleArbitratorUplift: SOLE_ARBITRATOR_UPLIFT,
  fastTrackUplift: FAST_TRACK_UPLIFT,
  emergencyUplift: EMERGENCY_UPLIFT,
  gstRate: GST_RATE,
  paymentSchedule: PAYMENT_SCHEDULE,
  terms: TERMS,
};

function slabFee(amount: number, slabs: Slab[]) {
  const slab = slabs.find((s) => amount <= s.to) ?? slabs[slabs.length - 1];
  const fee = slab.base + Math.ceil(Math.max(0, amount - slab.from) / LAKH) * slab.perLakh;
  return slab.ceiling ? Math.min(fee, slab.ceiling) : fee;
}

export interface FeeEstimate {
  smallCause: boolean;
  emergency: boolean;
  fastTrack: boolean;
  filing: number;
  tribunalPerArbitrator: number;
  tribunal: number;
  admin: number;
  gst: number;
  total: number;
}

export function estimateFees(
  amount: number,
  arbitrators: 1 | 3,
  fastTrack: boolean,
  schedule: FeeSchedule = DEFAULT_FEE_SCHEDULE,
  emergency = false,
): FeeEstimate {
  const smallCause = amount < schedule.smallCauseLimit;
  let perArbitrator: number;
  let admin: number;
  if (smallCause) {
    const band = schedule.smallCause.find((b) => amount <= b.to) ?? schedule.smallCause[schedule.smallCause.length - 1];
    perArbitrator = band.tribunal;
    admin = band.admin;
  } else {
    perArbitrator = slabFee(amount, schedule.tribunalSlabs);
    admin = slabFee(amount, schedule.adminSlabs);
  }
  if (arbitrators === 1) perArbitrator *= 1 + schedule.soleArbitratorUplift;
  perArbitrator = Math.round(perArbitrator);

  const filing = (smallCause ? schedule.registration.smallCause[0]?.fee : schedule.registration.regular[0]?.fee) ?? 0;
  const gst = Math.round((filing + admin) * schedule.gstRate);
  // Emergency and fast track each raise every part of the regular fee;
  // emergency is its own process, so it takes precedence over fast track.
  const uplift = emergency ? (schedule.emergencyUplift ?? EMERGENCY_UPLIFT) : fastTrack ? (schedule.fastTrackUplift ?? FAST_TRACK_UPLIFT) : 0;
  const up = (value: number) => Math.round(value * (1 + uplift));
  const parts = { filing: up(filing), tribunalPerArbitrator: up(perArbitrator), tribunal: up(perArbitrator) * arbitrators, admin: up(admin), gst: up(gst) };
  return {
    smallCause,
    emergency,
    fastTrack: fastTrack && !emergency,
    ...parts,
    total: parts.filing + parts.tribunal + parts.admin + parts.gst,
  };
}

export function formatSlab(slab: Slab) {
  const inr = (n: number) => new Intl.NumberFormat("en-IN").format(n);
  const range = slab.to === Infinity ? `Above ₹${inr(slab.from)}` : `₹${inr(slab.from)} – ₹${inr(slab.to)}`;
  const fee = `₹${inr(slab.base)} + ₹${inr(slab.perLakh)} per lakh above ₹${inr(slab.from)}${slab.ceiling ? `, up to ₹${inr(slab.ceiling)}` : ""}`;
  return { range, fee };
}
