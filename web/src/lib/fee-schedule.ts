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
    { item: "Application — emergency arbitrator", fee: 2_500 },
    { item: "Application — interpretation, correction, or additional award", fee: 3_500 },
    { item: "Scrutiny of award", fee: 3_500 },
  ],
  smallCause: [
    { item: "Filing fee — arbitration", fee: 2_500 },
    { item: "Consultation / orientation (if availed)", fee: 2_000 },
    { item: "Application — emergency arbitrator", fee: 1_750 },
    { item: "Application — interpretation, correction, or additional award", fee: 2_500 },
    { item: "Scrutiny of award", fee: 2_500 },
  ],
};

// Flat fees by claim band: interpretation/correction/additional award (per
// arbitrator), scrutiny (per member), emergency arbitrator, and emergency
// administrative fee. Small cause claims use the single figures.
export const BANDED_FEES = {
  bands: ["Up to ₹25,00,000", "₹25,00,001 – ₹1,00,00,000", "Above ₹1,00,00,000"],
  rows: [
    { item: "Interpretation, correction, or additional award (per arbitrator)", fees: [10_000, 25_000, 50_000], smallCause: 5_000 },
    { item: "Scrutiny fee (per member)", fees: [15_000, 25_000, 50_000], smallCause: 7_500 },
    { item: "Emergency arbitrator fee", fees: [15_000, 25_000, 50_000], smallCause: 7_500 },
    { item: "Emergency arbitration administrative fee", fees: [5_000, 7_500, 15_000], smallCause: 2_500 },
  ],
};

export const SOLE_ARBITRATOR_UPLIFT = 0.2;
export const FAST_TRACK_FACTOR = 0.8;
export const GST_RATE = 0.18;

export const PAYMENT_SCHEDULE = [
  { share: "25%", when: "Deposited by the claimant when filing the statement of claim." },
  { share: "25%", when: "Deposited by the respondent when filing the response or statement of defence." },
  { share: "30%", when: "Deposited by the parties equally within 10 days of the completion of pleadings." },
  { share: "20%", when: "Deposited by the parties equally before the hearing date." },
  { share: "Balance", when: "Deposited by the parties within 10 days after the matter is reserved for award." },
];

export const TERMS = [
  "Registration charges are paid by the party filing the notice or application; the consultation fee, if availed, at the time of the appointment.",
  "In emergency arbitration, the entire fee is deposited by the applicant when filing the application.",
  "The tribunal and administrative fees are fixed on the claim. A counter-claim attracts fees on the same pattern, as if it were an independent claim.",
  "Fees are payable in equal shares by the parties. If the respondent does not deposit its share, the claimant shall deposit it in order to continue the proceedings, subject to the final outcome of the matter. If neither party deposits, the tribunal may suspend or terminate the proceedings for that claim or counter-claim.",
  "In the award, the neutral may apply (i) the loser-pays principle, (ii) the principle of equal or proportional payment, or (iii) the claimant-pays principle, as the neutral deems fit in the nature of the case.",
  "Amounts in a currency other than Indian Rupees are converted at the current official rate of exchange.",
  "The arbitrator's fee carries no GST. All other charges carry GST at 18%.",
  "For disputes that cannot be quantified, Adjudix fixes the fee on the facts of the case.",
  "Arbitrators receive a travelling allowance of ₹1,000 per local sitting. Outstation sittings are paid at actuals, subject to ₹10,000 a day in metropolitan cities and ₹7,500 a day elsewhere (or ₹5,000 a day without vouchers).",
  "International arbitration fees are fixed in US dollars at registration and confirmed to the parties in writing.",
];

function slabFee(amount: number, slabs: Slab[]) {
  const slab = slabs.find((s) => amount <= s.to) ?? slabs[slabs.length - 1];
  const fee = slab.base + Math.ceil(Math.max(0, amount - slab.from) / LAKH) * slab.perLakh;
  return slab.ceiling ? Math.min(fee, slab.ceiling) : fee;
}

export interface FeeEstimate {
  smallCause: boolean;
  filing: number;
  tribunalPerArbitrator: number;
  tribunal: number;
  admin: number;
  gst: number;
  total: number;
}

export function estimateFees(amount: number, arbitrators: 1 | 3, fastTrack: boolean): FeeEstimate {
  const smallCause = amount < SMALL_CAUSE_LIMIT;
  let perArbitrator: number;
  let admin: number;
  if (smallCause) {
    const band = SMALL_CAUSE.find((b) => amount <= b.to) ?? SMALL_CAUSE[SMALL_CAUSE.length - 1];
    perArbitrator = band.tribunal;
    admin = band.admin;
  } else {
    perArbitrator = slabFee(amount, TRIBUNAL_SLABS);
    admin = slabFee(amount, ADMIN_SLABS);
  }
  if (arbitrators === 1) perArbitrator *= 1 + SOLE_ARBITRATOR_UPLIFT;
  if (fastTrack) perArbitrator *= FAST_TRACK_FACTOR;
  perArbitrator = Math.round(perArbitrator);

  const filing = smallCause ? REGISTRATION.smallCause[0].fee : REGISTRATION.regular[0].fee;
  const tribunal = perArbitrator * arbitrators;
  const gst = Math.round((filing + admin) * GST_RATE);
  return { smallCause, filing, tribunalPerArbitrator: perArbitrator, tribunal, admin, gst, total: filing + tribunal + admin + gst };
}

export function formatSlab(slab: Slab) {
  const inr = (n: number) => new Intl.NumberFormat("en-IN").format(n);
  const range = slab.to === Infinity ? `Above ₹${inr(slab.from)}` : `₹${inr(slab.from)} – ₹${inr(slab.to)}`;
  const fee = `₹${inr(slab.base)} + ₹${inr(slab.perLakh)} per lakh above ₹${inr(slab.from)}${slab.ceiling ? `, up to ₹${inr(slab.ceiling)}` : ""}`;
  return { range, fee };
}
