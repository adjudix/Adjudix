"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { estimateFees, type FeeSchedule } from "@/lib/fee-schedule";

function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function Toggle<T extends string | number>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="font-body text-sm font-medium text-text">{legend}</legend>
      <div className="mt-2 inline-flex rounded-md border border-border bg-canvas p-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded px-3 py-1.5 font-body text-sm transition-colors",
              value === option.value ? "bg-primary text-primary-foreground" : "text-text-muted hover:text-text",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function FeeCalculator({ schedule }: { schedule: FeeSchedule }) {
  // Digits only in state; shown with Indian digit grouping (10,00,000).
  const [amount, setAmount] = useState("1000000");
  const [arbitrators, setArbitrators] = useState<1 | 3>(1);
  const [fastTrack, setFastTrack] = useState(false);
  const [emergency, setEmergency] = useState(false);
  const numericAmount = Number(amount) || 0;
  const displayAmount = amount ? new Intl.NumberFormat("en-IN").format(numericAmount) : "";
  const fees = useMemo(() => estimateFees(numericAmount, arbitrators, fastTrack, schedule, emergency), [numericAmount, arbitrators, fastTrack, schedule, emergency]);

  const rows = [
    { label: "Filing fee", value: fees.filing },
    {
      label: arbitrators === 1 ? "Arbitral tribunal fee (sole arbitrator)" : `Arbitral tribunal fee (3 × ${formatINR(fees.tribunalPerArbitrator)})`,
      value: fees.tribunal,
    },
    { label: "Administrative fee", value: fees.admin },
    { label: `GST @ ${Math.round(schedule.gstRate * 100)}% (on filing and administrative fees)`, value: fees.gst },
  ];

  return (
    <div className="rounded-lg border border-border bg-surface p-8">
      <label htmlFor="dispute-amount" className="font-body text-sm font-medium text-text">
        Amount in dispute (₹)
      </label>
      <input
        id="dispute-amount"
        type="text"
        inputMode="numeric"
        value={displayAmount}
        onChange={(event) => setAmount(event.target.value.replace(/[^0-9]/g, ""))}
        className="mt-2 w-full rounded-md border border-border bg-canvas px-4 py-2.5 font-body text-text outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        placeholder="e.g. 10,00,000"
      />
      {fees.smallCause && numericAmount > 0 && (
        <p className="mt-2 text-left font-body text-xs text-text-muted">
          Claims below ₹5,00,000 fall under the small cause schedule.
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-6">
        <Toggle
          legend="Arbitral tribunal"
          value={arbitrators}
          onChange={setArbitrators}
          options={[
            { value: 1, label: "Sole arbitrator" },
            { value: 3, label: "Three arbitrators" },
          ]}
        />
        <Toggle
          legend="Arbitration"
          value={emergency ? "emergency" : "regular"}
          onChange={(value) => setEmergency(value === "emergency")}
          options={[
            { value: "regular", label: "Regular" },
            { value: "emergency", label: "Emergency" },
          ]}
        />
        {/* Emergency arbitration is its own process, so it has no fast track. */}
        {!emergency && (
          <Toggle
            legend="Procedure"
            value={fastTrack ? "fast" : "regular"}
            onChange={(value) => setFastTrack(value === "fast")}
            options={[
              { value: "regular", label: "Regular" },
              { value: "fast", label: "Fast track" },
            ]}
          />
        )}
      </div>

      <dl className="mt-6 divide-y divide-border border-t border-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4 py-3">
            <dt className="font-body text-sm text-text-muted">{row.label}</dt>
            <dd className="font-mono text-sm tabular-nums text-text">{formatINR(row.value)}</dd>
          </div>
        ))}
      </dl>
      <div className="flex items-baseline justify-between gap-4 border-t border-border pt-4">
        <span className="font-mono text-xs tracking-widest uppercase text-primary-ink">
          {fees.emergency
            ? `Emergency arbitration · regular fee + ${Math.round(schedule.emergencyUplift * 100)}%`
            : fees.fastTrack
              ? `Fast track · regular fee + ${Math.round(schedule.fastTrackUplift * 100)}%`
              : "Indicative total of the platform"}
        </span>
        <span className="font-mono text-3xl font-semibold tabular-nums text-text">{formatINR(fees.total)}</span>
      </div>
      <p className="mt-4 text-left font-body text-xs text-text-muted">
        Just for example — an estimate under the Adjudix fee schedule below. A sole arbitrator
        receives {Math.round(schedule.soleArbitratorUplift * 100)}% more than each member of a three-member tribunal. Fast track (the
        whole arbitration on priority) is the regular fee plus {Math.round(schedule.fastTrackUplift * 100)}%; emergency arbitration, a
        separate process for urgent interim relief, is the regular fee plus {Math.round(schedule.emergencyUplift * 100)}%. Travel, hearing-room, and other charges are extra. The
        confirmed fee is set when a case is registered.
      </p>
    </div>
  );
}
