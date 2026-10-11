// The three editions of the Adjudix Code of ADR Procedure. Each edition
// builds on the one before it; the PDFs and the counts below come from
// web/scripts/adjudix-code/build.py — rebuild and update together.

export interface CodeEdition {
  year: string;
  edition: string;
  current?: boolean;
  summary: string;
  /** What this edition added to the one before it. */
  additions: string[];
  sections: number;
  pages: number;
  principles: number;
  pdf: string;
}

export const CODE_EDITIONS: CodeEdition[] = [
  {
    year: "2018",
    edition: "First Edition",
    summary:
      "The founding rule book: one procedure for arbitration, mediation, and conciliation administered by the Institute.",
    additions: [
      "Arbitration, mediation, and conciliation procedures",
      "Pleadings, case management, and evidence",
      "Corporate ADR, costs, and enforcement",
      "Preamble of 7 Moral Principles",
    ],
    sections: 54,
    pages: 19,
    principles: 7,
    pdf: "/code/adjudix-code-of-adr-procedure-2018.pdf",
  },
  {
    year: "2021",
    edition: "Second Edition",
    summary: "Builds on 2018 by bringing every proceeding online through the Adjudix E-Portal.",
    additions: [
      "Online Dispute Resolution chapter",
      "E-filing, digital service, and e-signatures",
      "Virtual hearings and secure digital records",
      "Updated for the 2019 and 2021 amendments to the Act",
    ],
    sections: 59,
    pages: 20,
    principles: 8,
    pdf: "/code/adjudix-code-of-adr-procedure-2021.pdf",
  },
  {
    year: "2026",
    edition: "Third Edition",
    current: true,
    summary:
      "Builds on 2021 to cover every mechanism the Institute offers, online, offline, and hybrid.",
    additions: [
      "Emergency Arbitration",
      "Hybrid Med-Arb Protocol",
      "Adjudix Lok Adalat",
      "Global implementation of awards and settlements",
      "Mediation Act, 2023 and Bharatiya Sakshya Adhiniyam, 2023",
    ],
    sections: 71,
    pages: 28,
    principles: 13,
    pdf: "/code/adjudix-code-of-adr-procedure-2026.pdf",
  },
];
