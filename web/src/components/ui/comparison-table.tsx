import { CheckCircle2, XCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export interface ComparisonRow {
  criterion: string;
  adjudix: string;
  other: string;
}

export interface ComparisonTableProps {
  rows: ComparisonRow[];
  adjudixLabel?: string;
  otherLabel?: string;
}

export function ComparisonTable({
  rows,
  adjudixLabel = "Adjudix",
  otherLabel = "Ad hoc / litigation",
}: ComparisonTableProps) {
  return (
    <Reveal className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 pr-4 font-body text-sm font-semibold text-text-muted">
              Criterion
            </th>
            <th className="py-3 pr-4 font-body text-sm font-semibold text-primary-ink">
              {adjudixLabel}
            </th>
            <th className="py-3 font-body text-sm font-semibold text-text-muted">{otherLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.criterion}
              className="border-b border-border align-top transition-colors hover:bg-surface"
            >
              <td className="py-4 pr-4 font-body text-sm font-medium text-text">
                {row.criterion}
              </td>
              <td className="py-4 pr-4 font-body text-sm text-text">
                <span className="flex gap-2">
                  <CheckCircle2
                    className="size-4 shrink-0 mt-0.5 text-primary-ink"
                    aria-hidden="true"
                  />
                  {row.adjudix}
                </span>
              </td>
              <td className="py-4 font-body text-sm text-text-muted">
                <span className="flex gap-2">
                  <XCircle
                    className="size-4 shrink-0 mt-0.5 text-text-muted"
                    aria-hidden="true"
                  />
                  {row.other}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}
