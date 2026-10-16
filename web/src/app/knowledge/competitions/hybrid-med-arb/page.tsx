import { CompetitionPage } from "@/components/patterns/competition-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hybrid Med-Arb Competition",
  description:
    "A simulated Hybrid Med-Arb on a set fact pattern: a mediation round first and, where it does not settle, an arbitration round that ends in an award.",
  path: "/knowledge/competitions/hybrid-med-arb",
});

export default function Page() {
  return (
    <CompetitionPage
      title="Hybrid Med-Arb"
      intro="A simulated Hybrid Med-Arb on a set fact pattern: a mediation round first and, where it does not settle, an arbitration round that ends in an award — the process the Adjudix Code sets out in Chapter XI."
      format={[
        "Round one: participants mediate a shared fact pattern toward settlement",
        "Round two: unsettled issues move to arbitration, argued before the same neutral (or a separate one, as the clause provides)",
        "Judged by practising mediators and arbitrators from Adjudix's panel",
        "Open to law students, CAs, CS, and early-career professionals",
      ]}
    />
  );
}
