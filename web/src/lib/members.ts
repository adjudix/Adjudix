// Panel arbitrators and members, from the client's "Panel Arbitrators and
// list of members" sheet (Oct 2026). Names and credentials only — no
// photographs are published (see IDENTITY_NOTE). Shared by Our Professional
// Panel and Our Esteemed Members.

export type MembershipTier = "honorary" | "fellow" | "associate" | "affiliate" | "student";
export type Profession = "lawyers" | "ca-cs" | "engineers" | "students";

export interface Member {
  name: string;
  credentials: string;
  tier: MembershipTier;
  profession: Profession;
  // Sits on Our Professional Panel as an arbitrator.
  panel?: boolean;
}

export const TIERS: Record<MembershipTier, { label: string; postNominal: string; stars: number | "beyond" }> = {
  honorary: { label: "Honorary Member", postNominal: "HADR-i", stars: "beyond" },
  fellow: { label: "Fellow Member", postNominal: "FADR-i", stars: 5 },
  associate: { label: "Associate Member", postNominal: "AADR-i", stars: 4 },
  affiliate: { label: "Affiliate Member", postNominal: "AfADR-i", stars: 3 },
  student: { label: "Student Member", postNominal: "SADR-i", stars: 2 },
};

export const PROFESSIONS: { id: Profession; numeral: string; title: string; description: string }[] = [
  { id: "lawyers", numeral: "I", title: "Lawyers", description: "Advocates of the Supreme Court and High Courts, government and corporate counsel." },
  { id: "ca-cs", numeral: "II", title: "CA / CS", description: "Chartered accountants and company secretaries for financial, accounts, and corporate disputes." },
  { id: "engineers", numeral: "III", title: "Engineers", description: "Civil and IT engineers for construction, technology, and technical disputes." },
];

export const IDENTITY_NOTE = {
  title: "Known by merit, not by face.",
  body: "We deliberately do not publish photographs of our arbitrators. Keeping their identities discreet protects the independence of every proceeding — no approach, no pressure, no interference — so that each award rests on the merits alone.",
};

export const MEMBERS: Member[] = [
  { name: "Mr. Bhavesh Tiwari", credentials: "B.B.A. LL.B. (Hons.); LL.M. (Constitutional Law); Diploma in Psychology; Certification in Arbitration", tier: "honorary", profession: "lawyers", panel: true },
  { name: "Mr. Brijesh Tiwari", credentials: "M.A., LL.B.", tier: "honorary", profession: "lawyers", panel: true },
  { name: "Mr. Rajwardhan Gawde", credentials: "Government Advocate, State of M.P.", tier: "honorary", profession: "lawyers", panel: true },
  { name: "Mr. Shantanu Sharma", credentials: "Advocate on Record, Supreme Court", tier: "honorary", profession: "lawyers", panel: true },
  { name: "Mrs. Nishtha Tiwari", credentials: "Corporate Lawyer", tier: "honorary", profession: "lawyers", panel: true },
  { name: "Mrs. Deeksha Gaur", credentials: "Supreme Court Advocate", tier: "fellow", profession: "lawyers", panel: true },
  { name: "Mr. Pankaj Giri Goswami", credentials: "High Court Advocate", tier: "fellow", profession: "lawyers", panel: true },
  { name: "Mr. Narayan Tiwari", credentials: "High Court Advocate", tier: "fellow", profession: "lawyers", panel: true },
  { name: "Mr. Kunjan Mittal", credentials: "High Court Advocate", tier: "fellow", profession: "lawyers", panel: true },
  { name: "Mr. Ankit Sharma", credentials: "Chartered Accountant", tier: "honorary", profession: "ca-cs", panel: true },
  { name: "Mr. Kushagra Goyal", credentials: "Chartered Accountant", tier: "honorary", profession: "ca-cs", panel: true },
  { name: "Mr. Naman Maheshwari", credentials: "Civil Engineer", tier: "honorary", profession: "engineers", panel: true },
  { name: "Mr. Aditya Bagdi", credentials: "I.T. Engineer", tier: "honorary", profession: "engineers", panel: true },
  { name: "Mr. Abhishek Bhandari", credentials: "I.T. Engineer", tier: "honorary", profession: "engineers", panel: true },
  { name: "Mr. Saransh Tiwari", credentials: "I.T. Engineer", tier: "honorary", profession: "engineers", panel: true },
  { name: "Ms. Kavita Sharma", credentials: "High Court Advocate", tier: "associate", profession: "lawyers" },
  { name: "Mr. Abhishek Mantri", credentials: "High Court Advocate", tier: "associate", profession: "lawyers" },
  { name: "Mr. Aditya Bharti", credentials: "High Court Advocate", tier: "associate", profession: "lawyers" },
  { name: "Mr. Sonu Sharma", credentials: "High Court Advocate", tier: "associate", profession: "lawyers" },
  { name: "Mr. Sai Sharma", credentials: "Law Student", tier: "student", profession: "students" },
];

// Directory order follows the client's sheet: Honorary first, then by stars.
export const TIER_ORDER: MembershipTier[] = ["honorary", "fellow", "associate", "affiliate", "student"];
