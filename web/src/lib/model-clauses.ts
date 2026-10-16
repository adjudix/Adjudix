// The Institute's model dispute resolution clauses, word for word as the
// client supplied them (Oct 2026). Each paragraph keeps its number; `lead` is
// the paragraph's bold run-in heading, where it has one.

export interface ClauseParagraph {
  number: string;
  lead?: string;
  text: string;
}

export interface ClauseVariant {
  /** e.g. "1.1" */
  number: string;
  title: string;
  paragraphs: ClauseParagraph[];
}

export interface ModelClause {
  number: string;
  slug: string;
  title: string;
  /** One line on when to use it, shown above the clause. */
  useWhen: string;
  variants: ClauseVariant[];
}

const SCOPE =
  "Any dispute, controversy, or claim arising out of or relating to this agreement (including its formation, breach, termination, or invalidity)";
const ADMINISTERED = "administered by the Adjudix Dispute Resolution Institute (www.adjudixADR.com)";
const CODE = "under the latest edition of the Adjudix Code of ADR Procedure";

const MED_ARB_COURT_BAR: Omit<ClauseParagraph, "number"> = {
  lead: "Bar to Court Jurisdiction & Section 8 Application:",
  text: "Recourse to any court of law is barred. If any party initiates court proceedings in violation of this agreement, the responding party shall be entitled to seek an immediate referral to arbitration pursuant to Section 8 of the Arbitration and Conciliation Act, 1996, and the court shall refer the parties to arbitration under this clause.",
};

const seat = (forum: string, decider: string) =>
  `The ${forum} shall be [Insert City], the Language shall be English, and the Venue may be Online or Offline by mutual agreement or, failing agreement, at the ${decider}'s discretion.`;

export const MODEL_CLAUSES: ModelClause[] = [
  {
    number: "1",
    slug: "hybrid-med-arb",
    title: "Hybrid Med-Arb Clauses",
    useWhen: "Mediation first; if it fails, a binding arbitral award — choose whether the same neutral carries on.",
    variants: [
      {
        number: "1.1",
        title: "Option A: Same Neutral (Mediator transitions to Arbitrator)",
        paragraphs: [
          { number: "1.1.1", text: `${SCOPE} shall be resolved exclusively through the Hybrid Med-Arb process ${ADMINISTERED} ${CODE}.` },
          { number: "1.1.2", ...MED_ARB_COURT_BAR },
          {
            number: "1.1.3",
            text: "The same neutral appointed as Mediator shall, upon failure of mediation, act as the sole Arbitrator to render a binding award under Chapter XI of the Code.",
          },
          { number: "1.1.4", text: seat("Seat of the procedure", "neutral") },
        ],
      },
      {
        number: "1.2",
        title: "Option B: Separate Neutrals (Mediator and Arbitrator are different persons)",
        paragraphs: [
          { number: "1.2.1", text: `${SCOPE} shall be resolved exclusively through the Hybrid Med-Arb process ${ADMINISTERED} ${CODE}.` },
          { number: "1.2.2", ...MED_ARB_COURT_BAR },
          {
            number: "1.2.3",
            text: "The Mediator shall not serve as Arbitrator. If mediation fails, the Institute shall appoint a separate neutral as Arbitrator to render a binding award under Chapter XI of the Code.",
          },
          { number: "1.2.4", text: seat("Seat of the procedure", "neutral") },
        ],
      },
    ],
  },
  {
    number: "2",
    slug: "arbitration",
    title: "Arbitration Clause",
    useWhen: "A final, binding award, with the courts kept out save for enforcement.",
    variants: [
      {
        number: "2",
        title: "Arbitration Clause",
        paragraphs: [
          { number: "2.1", text: `${SCOPE} shall be resolved exclusively through Arbitration ${ADMINISTERED} ${CODE}.` },
          {
            number: "2.2",
            lead: "Bar to Court Jurisdiction & Section 8 Application:",
            text: "Recourse to any court of law is barred, save for enforcement of the arbitral award. In the event any suit or legal action is instituted before a judicial authority regarding a matter covered by this agreement, the non-defaulting party may apply under Section 8 of the Arbitration and Conciliation Act, 1996, to mandate the referral of the dispute to arbitration under the Adjudix Code.",
          },
          { number: "2.3", text: seat("Seat of Arbitration", "Arbitrator") },
        ],
      },
    ],
  },
  {
    number: "3",
    slug: "mediation",
    title: "Mediation Clause",
    useWhen: "A mandatory attempt at a mediated settlement before anyone goes to court.",
    variants: [
      {
        number: "3",
        title: "Mediation Clause",
        paragraphs: [
          { number: "3.1", text: `${SCOPE} shall be submitted to Mediation ${ADMINISTERED} ${CODE}.` },
          {
            number: "3.2",
            lead: "Mandatory Prerequisite:",
            text: "The parties expressly agree that initiation and participation in mediation under the Adjudix Code shall be a mandatory condition precedent to commencing any litigation or court proceeding. It shall be the strict duty of the parties to exhaust the mediation process prior to filing any suit or action in a court of law.",
          },
          { number: "3.3", text: seat("Seat of Mediation", "Mediator") },
        ],
      },
    ],
  },
  {
    number: "4",
    slug: "conciliation",
    title: "Conciliation Clause",
    useWhen: "A conciliator who proposes settlement terms, tried in good faith before litigation.",
    variants: [
      {
        number: "4",
        title: "Conciliation Clause",
        paragraphs: [
          { number: "4.1", text: `${SCOPE} shall be submitted to Conciliation ${ADMINISTERED} ${CODE}.` },
          {
            number: "4.2",
            lead: "Mandatory Prerequisite:",
            text: "The parties expressly agree that initiation and participation in conciliation under the Adjudix Code shall be a mandatory condition precedent to commencing any litigation or court proceeding. It shall be the strict duty of the parties to exhaust the conciliation process in good faith prior to seeking recourse before any judicial authority.",
          },
          { number: "4.3", text: seat("Seat of Conciliation", "Conciliator") },
        ],
      },
    ],
  },
  {
    number: "5",
    slug: "lok-adalat",
    title: "Adjudix Lok Adalat Clause",
    useWhen: "A one-day, confidential-proposal settlement attempt before any court proceeding.",
    variants: [
      {
        number: "5",
        title: "Adjudix Lok Adalat Clause",
        paragraphs: [
          {
            number: "5.1",
            text: `${SCOPE} shall be submitted to the Adjudix Lok Adalat ${ADMINISTERED} under Chapter X-A of the Adjudix Code of ADR Procedure.`,
          },
          {
            number: "5.2",
            lead: "Mandatory Prerequisite:",
            text: "The parties expressly agree that recourse to the Adjudix Lok Adalat framework shall be a mandatory condition precedent to commencing any litigation or court proceeding. It shall be the strict duty of the parties to first attempt resolution through the Adjudix Lok Adalat prior to filing any court proceeding.",
          },
          { number: "5.3", text: seat("Seat of the procedure", "neutral") },
        ],
      },
    ],
  },
  {
    number: "6",
    slug: "emergency-arbitration",
    title: "Emergency Arbitration Clause",
    useWhen: "Urgent interim relief from an Emergency Arbitrator before the tribunal is constituted.",
    variants: [
      {
        number: "6",
        title: "Emergency Arbitration Clause",
        paragraphs: [
          {
            number: "6.1",
            text: `Any dispute, controversy, or claim arising out of or relating to this agreement shall be resolved through Arbitration ${ADMINISTERED} ${CODE}.`,
          },
          {
            number: "6.2",
            lead: "Emergency Relief & Section 8 Mandate:",
            text: "Prior to the constitution of the main Arbitral Tribunal, any party seeking urgent interim or emergency relief must apply for Emergency Arbitration under Chapter VII of the Adjudix Code, to the exclusion of court proceedings. Any court action initiated for interim or full relief shall be subject to reference to arbitration under Section 8 of the Arbitration and Conciliation Act, 1996.",
          },
          { number: "6.3", text: seat("Seat", "Emergency Arbitrator") },
        ],
      },
    ],
  },
];

/** A clause variant as plain text, ready to paste into a contract. */
export function clauseText(variant: ClauseVariant) {
  return variant.paragraphs
    .map((p) => `${p.number}. ${p.lead ? `${p.lead} ` : ""}${p.text}`)
    .join("\n\n");
}
