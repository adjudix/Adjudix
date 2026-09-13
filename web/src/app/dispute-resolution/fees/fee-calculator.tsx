"use client";

import { useMemo, useState } from "react";

const SLABS = [
  { upTo: 1_000_000, rate: 0.03, label: "Up to ₹10,00,000" },
  { upTo: 5_000_000, rate: 0.02, label: "₹10,00,001 – ₹50,00,000" },
  { upTo: 20_000_000, rate: 0.0125, label: "₹50,00,001 – ₹2,00,00,000" },
  { upTo: Infinity, rate: 0.0075, label: "Above ₹2,00,00,000" },
];

const MIN_FEE = 15_000;

function estimateFee(amount: number): number {
  if (!Number.isFinite(amount) || amount <= 0) return MIN_FEE;
  let remaining = amount;
  let lower = 0;
  let fee = 0;
  for (const slab of SLABS) {
    const slabAmount = Math.min(remaining, slab.upTo - lower);
    if (slabAmount <= 0) break;
    fee += slabAmount * slab.rate;
    remaining -= slabAmount;
    lower = slab.upTo;
    if (remaining <= 0) break;
  }
  return Math.max(fee, MIN_FEE);
}

function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function FeeCalculator() {
  const [amount, setAmount] = useState("1000000");
  const numericAmount = Number(amount.replace(/,/g, ""));
  const estimate = useMemo(() => estimateFee(numericAmount), [numericAmount]);

  return (
    <div className="rounded-lg border border-border bg-surface p-8">
      <label htmlFor="dispute-amount" className="font-body text-sm font-medium text-text">
        Amount in dispute (₹)
      </label>
      <input
        id="dispute-amount"
        type="text"
        inputMode="numeric"
        value={amount}
        onChange={(event) => setAmount(event.target.value.replace(/[^0-9]/g, ""))}
        className="mt-2 w-full rounded-md border border-border bg-canvas px-4 py-2.5 font-body text-text outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        placeholder="e.g. 1000000"
      />
      <div className="mt-6 flex flex-col gap-1 border-t border-border pt-6">
        <span className="font-mono text-xs tracking-widest uppercase text-primary">
          Indicative administrative fee
        </span>
        <span className="font-mono text-3xl font-semibold text-text">
          {formatINR(estimate)}
        </span>
        <p className="mt-2 font-body text-xs text-text-muted">
          Estimate only, based on a tiered percentage of the amount in dispute (minimum{" "}
          {formatINR(MIN_FEE)}). Arbitrator fees are separate and depend on the panelist
          appointed. A final fee schedule is confirmed when a case is filed.
        </p>
      </div>
    </div>
  );
}
