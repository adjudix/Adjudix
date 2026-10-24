import { editableMetadata, editablePage } from "@/lib/pages/editable";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { getFeeSchedule } from "@/lib/content/data";
import {
  estimateFees,
  formatSlab,
} from "@/lib/fee-schedule";
import { FeeCalculator } from "./fee-calculator";
import { pageMetadata } from "@/lib/seo";

const metadata = pageMetadata({
  title: "Rules & Fees Calculator",
  description:
    "Estimate the cost of an arbitration under the Adjudix fee schedule — filing, tribunal, and administrative fees — then read the full schedule below.",
  path: "/dispute-resolution/fees",
});

const inr = (n: number) => `₹${new Intl.NumberFormat("en-IN").format(n)}`;

function Table({ caption, head, rows }: { caption: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-left font-body text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-surface">
          <tr>
            {head.map((cell) => (
              <th key={cell} scope="col" className="px-4 py-3 font-medium text-text">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className={j === 0 ? "px-4 py-3 text-text" : "px-4 py-3 font-mono tabular-nums text-text-muted"}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Block({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-text">{title}</h3>
      {note && <p className="mt-1 font-body text-sm text-text-muted">{note}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

async function FeesPage() {
  const schedule = await getFeeSchedule();
  const { adminSlabs: ADMIN_SLABS, bandedFees: BANDED_FEES, paymentSchedule: PAYMENT_SCHEDULE, registration: REGISTRATION, smallCause: SMALL_CAUSE, terms: TERMS, tribunalSlabs: TRIBUNAL_SLABS } = schedule;
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Rules & Governance"
        title="Rules & Fees Calculator"
        breadcrumbs={[{ label: "Dispute Resolution", href: "/dispute-resolution" }, { label: "Fees Calculator" }]}
        intro="Estimate the cost of an arbitration under the Adjudix fee schedule — filing, tribunal, and administrative fees — then read the full schedule below."
      />

      <section className="mx-auto max-w-2xl px-6 py-16">
        <FeeCalculator schedule={schedule} />
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-12">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-text">Adjudix Arbitration Fee Schedule</h2>
            <p className="mt-2 font-body text-text-muted">
              Domestic arbitration, for claims of ₹5,00,000 and above, and small cause arbitration
              for claims below ₹5,00,000.
            </p>
          </div>

          <Block title="Registration charges">
            <Table
              caption="Registration charges"
              head={["Item", "Claims of ₹5,00,000 and above", "Small cause"]}
              rows={REGISTRATION.regular.map((row, i) => [row.item, inr(row.fee), inr(REGISTRATION.smallCause[i].fee)])}
            />
          </Block>

          <Block
            title="Arbitral tribunal fee (per arbitrator)"
            note={`A sole arbitrator receives an additional ${Math.round(schedule.soleArbitratorUplift * 100)}%. Fast-track arbitration costs the whole fee plus ${Math.round(schedule.fastTrackUplift * 100)}%. “Per lakh” means per lakh or part thereof.`}
          >
            <Table
              caption="Arbitral tribunal fee"
              head={["Amount in dispute", "Fee per arbitrator"]}
              rows={[
                ...SMALL_CAUSE.map((band) => [band.label, inr(band.tribunal)]),
                ...TRIBUNAL_SLABS.map((slab) => {
                  const { range, fee } = formatSlab(slab);
                  return [range, fee];
                }),
              ]}
            />
          </Block>

          <Block title="Administrative fee">
            <Table
              caption="Administrative fee"
              head={["Amount in dispute", "Administrative fee"]}
              rows={[
                ...SMALL_CAUSE.map((band) => [band.label, inr(band.admin)]),
                ...ADMIN_SLABS.map((slab) => {
                  const { range, fee } = formatSlab(slab);
                  return [range, fee];
                }),
              ]}
            />
          </Block>

          <Block
            title="Emergency arbitration"
            note={`Emergency arbitration costs the whole fee of a regular arbitration for the same claim — filing, tribunal, and administrative fees, with GST — plus ${Math.round(schedule.emergencyUplift * 100)}%. Choose “Emergency” in the calculator above to see the figure for your claim.`}
          >
            <Table
              caption="Emergency arbitration fees"
              head={["Claim", "Regular arbitration (sole arbitrator)", `Emergency arbitration (+${Math.round(schedule.emergencyUplift * 100)}%)`]}
              rows={[300_000, 1_000_000, 5_000_000, 20_000_000].map((claim) => {
                const regular = estimateFees(claim, 1, false, schedule);
                const emergency = estimateFees(claim, 1, false, schedule, true);
                return [inr(claim), inr(regular.total), inr(emergency.total)];
              })}
            />
          </Block>

          <Block title="Additional fees">
            <Table
              caption="Additional fees"
              head={["Item", ...BANDED_FEES.bands, "Small cause"]}
              rows={BANDED_FEES.rows.map((row) => [row.item, ...row.fees.map(inr), inr(row.smallCause)])}
            />
          </Block>

          <Block title="Payment schedule (tribunal and administrative fees)">
            <ul className="divide-y divide-border rounded-lg border border-border bg-canvas">
              {PAYMENT_SCHEDULE.map((step) => (
                <li key={step.when} className="flex gap-6 px-4 py-3 font-body text-sm">
                  <span className="w-16 shrink-0 font-mono font-semibold text-text">{step.share}</span>
                  <span className="text-text-muted">{step.when}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Terms">
            <ul className="list-disc space-y-2 pl-5 font-body text-sm text-text-muted">
              {TERMS.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
          </Block>
        </div>
      </section>

      <CtaBand
        title="Ready to file?"
        description="Start your case through the ODR Platform, with a confirmed fee before you submit."
        primary={{ label: "File a Dispute", href: "/odr/file" }}
        secondary={{ label: "Adjudix Code of ADR Procedure", href: "/dispute-resolution/rules/code-of-procedure" }}
      />
    </main>
  );
}

// The console can replace this page with blocks (see lib/pages/editable).
export const generateMetadata = editableMetadata("/dispute-resolution/fees", metadata);
export default editablePage("/dispute-resolution/fees", FeesPage, metadata);
