// Knowledge Centre articles (client brief, Oct 2026: "as many articles as
// possible" on our services, USPs, and business model, 1–2 pages each).
// Rendered by /knowledge/blog and /knowledge/blog/[slug].

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  points?: string[];
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  summary: string;
  sections: ArticleSection[];
}

export const ARTICLES: Article[] = [
  {
    slug: "basics-of-arbitration",
    title: "The Basics of Arbitration: How It Works and When to Choose It",
    category: "Arbitration",
    summary:
      "What arbitration is, how a case moves from notice to award, and why businesses and individuals choose it over a court suit.",
    sections: [
      {
        paragraphs: [
          "Arbitration is a private process in which the parties to a dispute agree to have it decided by one or more neutral persons — the arbitrators — instead of a court. The decision, called an award, is final and binding, and the law treats it with much the same force as a court decree. In India, arbitration is governed by the Arbitration and Conciliation Act, 1996, which is modelled on the UNCITRAL Model Law used across the world.",
          "Unlike mediation or conciliation, where a neutral helps the parties reach their own settlement, an arbitrator decides. That is what makes arbitration the natural choice when the parties need a definite outcome rather than a negotiated one.",
        ],
      },
      {
        heading: "It starts with an agreement",
        paragraphs: [
          "Arbitration is consensual. There must be an arbitration agreement in writing — usually a clause in the main contract, but it can also be a separate agreement signed after a dispute has arisen, or even an exchange of letters or emails that records the parties' consent. Once a valid agreement exists, a court before which a suit is filed on the same matter must, on a timely application, refer the parties to arbitration.",
        ],
      },
      {
        heading: "How a case moves",
        paragraphs: ["A typical institutional arbitration at Adjudix runs through these stages:"],
        points: [
          "Notice of arbitration — the claimant notifies the other side and files the request with the Secretariat.",
          "Constitution of the tribunal — a sole arbitrator or a three-member tribunal is appointed from the Adjudix Professional Panel, after each arbitrator discloses any circumstance that could affect their independence.",
          "Pleadings — the statement of claim, the statement of defence, and any counter-claim, with supporting documents.",
          "Case management — the tribunal fixes a timetable, decides how evidence will be taken, and settles whether hearings are online, offline, or both.",
          "Hearings and arguments — witnesses and experts are examined where needed; many document-heavy cases are decided largely on the papers.",
          "The award — a written, reasoned, signed decision, which the parties may then implement or, if necessary, enforce.",
        ],
      },
      {
        heading: "Why parties choose arbitration",
        paragraphs: [
          "Speed and predictability come first. The Act requires a domestic award to be made within twelve months of the completion of pleadings, extendable by six months by consent, and a fast-track procedure allows an award within six months on written submissions.",
          "Expertise is the second reason. The parties can have a construction dispute heard by an engineer, an accounts dispute by a chartered accountant, and a shareholder dispute by a corporate lawyer. Confidentiality is the third: proceedings are private, and the award need not become public. Finally, an award is easier to carry across borders than a court judgment, because India and more than 170 other countries are party to the New York Convention on the recognition and enforcement of foreign arbitral awards.",
        ],
      },
      {
        heading: "When arbitration may not be right",
        paragraphs: [
          "Some matters cannot be arbitrated — criminal offences, matrimonial status, guardianship, insolvency itself, and certain rights that the law reserves for courts or tribunals. And where the parties' relationship matters more than a ruling, mediation or a hybrid process may serve them better. A short consultation at the outset usually makes the right path clear.",
        ],
      },
      {
        heading: "The Adjudix approach",
        paragraphs: [
          "Every Adjudix arbitration is administered under the Adjudix Code of ADR Procedure, 2026, with a published fee schedule, a panel organised by profession, and a choice of online, offline, or hybrid hearings. And because an award is only worth what it recovers, Adjudix also supports the implementation of awards — in India and globally.",
        ],
      },
    ],
  },
  {
    slug: "arbitration-act-key-sections",
    title: "The Sections of the Arbitration Act That Matter Most — and How They Work in Practice",
    category: "Arbitration",
    summary:
      "A practical walk through the provisions of the Arbitration and Conciliation Act, 1996 that decide most real disputes.",
    sections: [
      {
        paragraphs: [
          "The Arbitration and Conciliation Act, 1996 has more than eighty sections, but a handful of them decide the course of almost every case. Knowing what they say — and how they play out — helps a party make better decisions from the first day of a dispute.",
        ],
      },
      {
        heading: "Section 7 — the arbitration agreement",
        paragraphs: [
          "Everything begins here. The agreement must be in writing, but writing is read broadly: a signed clause, an exchange of letters, emails, or other electronic communication, or pleadings in which one side asserts and the other does not deny it. In practice, the most common problem is not the absence of an agreement but a badly drafted one — an unclear seat, an unworkable appointment mechanism, or a clause that mixes arbitration with courts. That is why clause drafting deserves attention before a dispute arises.",
        ],
      },
      {
        heading: "Section 8 — reference by a court",
        paragraphs: [
          "If one party files a suit despite an arbitration agreement, the other can apply to the court to refer the matter to arbitration. The application must be made no later than the first statement on the substance of the dispute. Miss that window and the right to arbitrate may be lost — a practical reason to involve advisers early.",
        ],
      },
      {
        heading: "Sections 9 and 17 — interim protection",
        paragraphs: [
          "Section 9 lets a party approach a court for interim measures — preserving assets, securing the amount in dispute, appointing a receiver, or an injunction — before, during, or after the arbitration. Section 17 gives the arbitral tribunal the same range of powers, and its orders are enforceable as if they were orders of the court. Once a tribunal is in place, courts generally expect parties to seek interim relief from the tribunal first. Before the tribunal exists, an emergency arbitrator can fill the gap.",
        ],
      },
      {
        heading: "Sections 11 and 12 — appointment and independence",
        paragraphs: [
          "Section 11 governs how arbitrators are appointed and allows a court to step in when the agreed mechanism fails. Section 12 requires every prospective arbitrator to disclose, in writing, any circumstance likely to give rise to justifiable doubts about their independence or impartiality. Certain relationships listed in the Seventh Schedule make a person ineligible altogether, unless the parties expressly waive this in writing after the dispute has arisen. An institution with a vetted panel and a disclosure protocol takes most of this risk out of the process.",
        ],
      },
      {
        heading: "Section 16 — the tribunal decides its own jurisdiction",
        paragraphs: [
          "The tribunal can rule on objections to its own jurisdiction, including objections about the existence or validity of the arbitration agreement. The arbitration clause is treated as independent of the main contract, so a claim that the contract is void does not automatically defeat the clause. Jurisdictional objections must be raised no later than the statement of defence.",
        ],
      },
      {
        heading: "Sections 29A and 29B — time limits and fast track",
        paragraphs: [
          "For domestic arbitrations, the award must be made within twelve months of the completion of pleadings, extendable by six months by consent; any further extension requires the court. Section 29B offers a fast-track procedure, decided largely on written submissions, with the award due within six months. These limits are a real advantage over ordinary litigation — and they reward parties who come prepared.",
        ],
      },
      {
        heading: "Section 30 — settlement within arbitration",
        paragraphs: [
          "A tribunal may encourage settlement and, with the parties' agreement, use mediation, conciliation, or other procedures at any time. A settlement reached this way can be recorded as an arbitral award on agreed terms, with the same status and effect as any other award. Section 30 is the statutory footing for hybrid processes such as Med-Arb.",
        ],
      },
      {
        heading: "Sections 34 and 36 — challenge and enforcement",
        paragraphs: [
          "An award can be challenged under Section 34 only on limited grounds — incapacity, an invalid agreement, lack of proper notice, matters beyond the reference, an improperly constituted tribunal, conflict with the public policy of India, and, for domestic awards, patent illegality on the face of the award. The application must be made within three months of receiving the award, extendable by thirty days for sufficient cause.",
          "Once that period has expired, or a challenge has been refused, Section 36 makes the award enforceable as if it were a decree of a court. Importantly, filing a challenge does not automatically stay enforcement; the court must grant a stay, usually on conditions such as a deposit of the amount awarded.",
        ],
      },
      {
        heading: "Part II — foreign awards",
        paragraphs: [
          "Awards made in countries that India recognises under the New York Convention can be enforced in India under Part II of the Act, subject to narrow refusal grounds. The same Convention lets an Indian-seated award be enforced abroad — the foundation of global implementation.",
        ],
      },
    ],
  },
  {
    slug: "hybrid-adr-med-arb",
    title: "The Hybrid ADR Process (Med-Arb): Settlement First, Certainty Always",
    category: "Hybrid ADR",
    summary:
      "How Med-Arb combines the flexibility of mediation with the finality of arbitration — and why it is the Adjudix flagship service.",
    sections: [
      {
        paragraphs: [
          "Most disputes end in a settlement. The trouble is that parties often walk into a process that cannot produce one — or into a mediation that, if it fails, leaves them starting again in court. The hybrid model of dispute resolution solves both problems. It begins with mediation and, if settlement is not reached, converts into arbitration that ends in a binding award. Settlement is attempted first; a final outcome is assured either way.",
        ],
      },
      {
        heading: "How Med-Arb works at Adjudix",
        paragraphs: [],
        points: [
          "Agreement — the parties opt into the hybrid procedure in their contract or after the dispute arises.",
          "Mediation phase — a mediator from the Adjudix panel works with the parties, jointly and in private sessions, to find terms both can accept.",
          "Settlement — if the parties settle, the terms are recorded as a consent award, with the same status and effect as an arbitral award.",
          "Conversion — if mediation does not succeed within the agreed period, the matter moves to the arbitration phase under the Adjudix Code of ADR Procedure.",
          "Award — the tribunal decides the outstanding issues and makes a final, enforceable award.",
        ],
      },
      {
        heading: "The confidentiality question",
        paragraphs: [
          "The hard part of any hybrid process is what happens to information shared in mediation. A party that speaks candidly to a mediator in private session should not find those words used against it by the same person acting as arbitrator. The Adjudix protocol deals with this directly: by default, a different neutral conducts the arbitration phase, and what is said in mediation stays out of the arbitral record. Parties who want the same neutral throughout must give informed, written consent, with clear rules about what may and may not be relied on.",
        ],
      },
      {
        heading: "Why the law supports it",
        paragraphs: [
          "Section 30 of the Arbitration and Conciliation Act, 1996 expressly allows an arbitral tribunal to use mediation, conciliation, or other procedures to encourage settlement, and to record a settlement as an award on agreed terms. A hybrid procedure therefore sits squarely within the existing law; it does not depend on any novel interpretation.",
        ],
      },
      {
        heading: "When Med-Arb works best",
        points: [
          "Long-term commercial relationships — supply, distribution, joint ventures — where preserving goodwill matters.",
          "Construction and infrastructure contracts with many small, technical disputes.",
          "Family-owned businesses and shareholder disagreements, where a settlement saves the business.",
          "Any dispute where one party fears that mediation is only a delaying tactic.",
        ],
        paragraphs: [],
      },
      {
        heading: "Choosing the neutrals",
        paragraphs: [
          "The success of a hybrid process depends heavily on who conducts each phase. A good mediator is patient, curious, and skilled at helping parties see their real interests; a good arbitrator is rigorous, decisive, and careful about procedure. Some professionals do both well, but the roles are different. At Adjudix, the parties may choose the mediator and the arbitrator separately from the Professional Panel, or ask the Secretariat to propose names suited to the subject matter — an engineer for a construction dispute, a chartered accountant for an accounts dispute.",
          "The time allowed for the mediation phase is agreed at the outset, typically between two and six weeks. A fixed window keeps everyone focused: the parties know that if they do not settle, a binding decision will follow, which is often the strongest incentive to settle of all.",
        ],
      },
      {
        heading: "What it costs",
        paragraphs: [
          "Because many hybrid matters settle in the mediation phase, the overall cost is frequently lower than a full arbitration. Where the case does convert, the work done in mediation — narrowing the issues, agreeing facts, exchanging documents — usually shortens the arbitration that follows. Fees for each phase are set out in the Adjudix fee schedule, so parties can plan for both outcomes.",
        ],
      },
      {
        heading: "The result",
        paragraphs: [
          "Parties get the cost and relationship benefits of a negotiated outcome without the risk of an inconclusive process. That combination — resolution first, then assured implementation — is why the hybrid model is the lead service at Adjudix.",
        ],
      },
    ],
  },
  {
    slug: "emergency-arbitration",
    title: "Emergency Arbitration: Urgent Relief Before the Tribunal Exists",
    category: "Emergency Arbitration",
    summary:
      "When assets may disappear or a contract is about to be breached, emergency arbitration delivers interim relief in days, not months.",
    sections: [
      {
        paragraphs: [
          "Constituting an arbitral tribunal takes time — notices must be served, arbitrators nominated, disclosures made. But some disputes cannot wait. A counterparty may be about to sell the only asset that could satisfy a claim, invoke a bank guarantee, or hand confidential information to a competitor. Emergency arbitration exists for exactly these moments.",
        ],
      },
      {
        heading: "What it is",
        paragraphs: [
          "Under institutional rules, a party can apply for urgent interim relief before the arbitral tribunal is constituted. The institution appoints an emergency arbitrator — usually within a day or two — who hears the parties on an expedited timetable and makes an order. That order binds the parties until the full tribunal is in place, when the tribunal may confirm, modify, or set it aside.",
        ],
      },
      {
        heading: "Is it enforceable in India?",
        paragraphs: [
          "The Arbitration and Conciliation Act, 1996 does not use the words “emergency arbitrator”, but the Supreme Court has settled the position for arbitrations seated in India. In Amazon.com NV Investment Holdings LLC v. Future Retail Ltd. (2021), the Court held that an emergency arbitrator's order under institutional rules the parties had agreed to is an order under Section 17(1) of the Act, enforceable under Section 17(2) as if it were an order of the court.",
          "For arbitrations seated outside India, an emergency order is not directly enforceable as such, and parties typically approach an Indian court under Section 9 for equivalent relief. Choosing an India-seated, institution-administered arbitration therefore matters when urgent relief is likely.",
        ],
      },
      {
        heading: "The Adjudix procedure",
        points: [
          "Application — filed with the Secretariat, setting out the relief sought, the urgency, and the facts, with the emergency arbitrator fee deposited in full.",
          "Appointment — an emergency arbitrator is appointed from the panel promptly after the application is registered, following written disclosure.",
          "Hearing — the emergency arbitrator fixes a short schedule, usually online, and may hear both sides within days.",
          "Order — a reasoned order granting or refusing relief, binding until the tribunal decides otherwise.",
          "Hand-over — the matter continues before the regular tribunal, which reviews the emergency order.",
        ],
        paragraphs: [],
      },
      {
        heading: "Typical reliefs",
        points: [
          "Restraining the sale, transfer, or encumbrance of assets.",
          "Preserving evidence, documents, or data.",
          "Restraining the invocation of a bank guarantee, where the law permits.",
          "Maintaining the status quo under a contract until the tribunal can decide.",
        ],
        paragraphs: [],
      },
      {
        heading: "What the applicant must show",
        paragraphs: [
          "Emergency relief is exceptional, and an emergency arbitrator will expect the applicant to make out its case clearly. In practice, that usually means showing a prima facie case on the merits, that the balance of convenience favours relief, and that the applicant would suffer harm that cannot adequately be compensated later if relief is refused. The applicant must also explain why the matter cannot wait for the tribunal to be constituted.",
          "Full and frank disclosure is essential. Where an application is heard at very short notice, the applicant must put before the emergency arbitrator the facts that cut against it as well as those that support it. An order obtained by concealment is likely to be set aside, often with costs.",
        ],
      },
      {
        heading: "Emergency arbitration or a court?",
        paragraphs: [
          "A party can still approach a court under Section 9 for interim relief before the arbitration begins. The advantages of emergency arbitration are speed, confidentiality, and a decision-maker with subject-matter expertise. A court may be the better option where relief is needed against a third party who is not bound by the arbitration agreement, or where coercive measures only a court can impose are required. The two routes can complement each other, and the choice should be made on the facts.",
        ],
      },
      {
        heading: "Planning for it",
        paragraphs: [
          "Emergency arbitration is only available if the arbitration agreement or the chosen rules provide for it. A clause that refers disputes to arbitration under the Adjudix Code of ADR Procedure brings in the emergency procedure automatically — one more reason the clause deserves care when the contract is signed.",
        ],
      },
    ],
  },
  {
    slug: "implementing-arbitral-awards",
    title: "From Award to Recovery: How Arbitral Awards Are Implemented in India and Abroad",
    category: "Implementation",
    summary:
      "An award is only as valuable as what it recovers. How awards are enforced, what slows them down, and how Adjudix supports implementation globally.",
    sections: [
      {
        paragraphs: [
          "Winning an award is a milestone, not the finish line. A party that has spent months in arbitration needs the award to turn into money, property, or performance. Many institutions stop at the award. Adjudix treats implementation as part of the service — because for the party who has won, it is the part that matters most.",
        ],
      },
      {
        heading: "Voluntary compliance comes first",
        paragraphs: [
          "Most awards are honoured without a court ever being involved, particularly where the losing party is a business that values its reputation and relationships. A structured demand, a clear computation of the amount due with interest, and a realistic payment plan often achieve more than immediate litigation.",
        ],
      },
      {
        heading: "Enforcing a domestic award",
        paragraphs: [
          "Under Section 36 of the Arbitration and Conciliation Act, 1996, once the three-month period for challenge has expired — or a challenge has been dismissed — the award is enforced in the same manner as a decree of a civil court. Filing a challenge does not automatically stay the award; the court must grant a stay, usually on terms such as depositing the amount awarded.",
          "Enforcement follows the execution procedure of the Code of Civil Procedure: attachment and sale of property, attachment of bank accounts and debts owed to the award-debtor, and other measures the court may order. The Supreme Court has confirmed that an award can be executed directly wherever the assets are located, without first obtaining a transfer from the court that has jurisdiction over the arbitration.",
        ],
      },
      {
        heading: "Enforcing a foreign award in India",
        paragraphs: [
          "Awards made in a country that India recognises under the New York Convention are enforced under Part II of the Act. The court can refuse enforcement only on narrow grounds — such as incapacity, an invalid agreement, lack of proper notice, or conflict with the fundamental policy of Indian law. Once the court is satisfied, the foreign award is deemed a decree and is executed accordingly.",
        ],
      },
      {
        heading: "Enforcing an Indian award abroad",
        paragraphs: [
          "Because more than 170 countries are party to the New York Convention, an award made in India can usually be enforced where the award-debtor's assets actually are. The process follows the local law of that country, typically requiring the original or a certified copy of the award and the arbitration agreement, with certified translations where needed. Local counsel, asset tracing, and coordinated filings across jurisdictions are often the difference between a paper victory and a real one.",
        ],
      },
      {
        heading: "What Adjudix implementation covers",
        points: [
          "Review of the award and the computation of the amount due, including interest and costs.",
          "Structured demand and negotiated compliance where possible.",
          "Identification of assets and the right forum for execution.",
          "Coordination of execution proceedings in India, and of recognition and enforcement abroad through partner counsel.",
          "Implementation of mediated and conciliated settlements, not only arbitral awards.",
        ],
        paragraphs: [],
      },
      {
        heading: "Dispute resolved, and implemented",
        paragraphs: [
          "That is the promise behind the Adjudix tagline: Dispute Resolved & Implemented at your Doorstep. Resolution and implementation are designed together, from the first consultation to the final recovery.",
        ],
      },
    ],
  },
  {
    slug: "corporate-adr",
    title: "Corporate ADR: Resolving Business Disputes Without Breaking the Business",
    category: "Corporate ADR",
    summary:
      "Shareholder deadlocks, vendor disputes, and cross-border claims — how a standing ADR arrangement keeps businesses running while disputes are resolved.",
    sections: [
      {
        paragraphs: [
          "For a business, the cost of a dispute is rarely just the legal fees. It is management time, a stalled project, a frozen supply line, or a partnership that turns hostile. Corporate ADR is about resolving these disputes quickly and privately, in a way the business can plan for — rather than reacting when a dispute has already escalated.",
        ],
      },
      {
        heading: "Where corporate ADR applies",
        points: [
          "Shareholder, board, and promoter disputes, including deadlocks in closely held and family companies.",
          "Vendor, supplier, distributor, and customer disputes under commercial contracts.",
          "Partnership and LLP disputes between partners.",
          "Technology, licensing, and intellectual property disputes.",
          "High-value financial and M&A disputes, including earn-outs and warranty claims.",
          "Cross-border commercial disputes with parties in several jurisdictions.",
        ],
        paragraphs: [],
      },
      {
        heading: "A standing arrangement, not an emergency call",
        paragraphs: [
          "The most effective corporate ADR is set up before it is needed. Adjudix works with companies to put consistent dispute resolution clauses across their contracts, agree escalation steps — negotiation, then mediation, then arbitration — and give in-house teams a single point of contact when something goes wrong. When a dispute arises, the process is already agreed, the panel is already available, and the timetable is already known.",
        ],
      },
      {
        heading: "Choosing the right mechanism",
        paragraphs: [
          "Not every corporate dispute needs an award. A dispute with a long-standing distributor may be best mediated; a deadlock between shareholders may suit a hybrid process; a claim against a defaulting customer may need arbitration and swift implementation. Commercial suits in India also generally require pre-institution mediation under Section 12A of the Commercial Courts Act, 2015, unless urgent interim relief is sought — another reason to have a mediation route ready.",
        ],
      },
      {
        heading: "Confidentiality by design",
        paragraphs: [
          "Corporate disputes often involve price-sensitive information, trade secrets, or matters that a business would rather not see reported. ADR proceedings at Adjudix are confidential, hearings are private, and documents are handled through a secure online platform. Our corporate partnerships are themselves kept confidential.",
        ],
      },
      {
        heading: "How a corporate engagement works",
        paragraphs: [
          "A typical engagement begins with a review of the company's key contracts and the disputes it has faced in recent years. From this, Adjudix recommends a dispute resolution framework: standard clauses for each category of contract, escalation steps with time limits, and the mechanism best suited to each type of dispute. Where the company wishes, these clauses are drafted or redrafted by the Adjudix Contract & Clause Drafting team.",
          "When a dispute arises, the in-house team contacts the Secretariat, which proposes neutrals with the right professional background, confirms the fee under the published schedule, and opens the case on the ODR Platform. Management receives a clear timetable from the first case management conference, so the dispute can be budgeted and planned for like any other business process.",
        ],
      },
      {
        heading: "Cross-border disputes",
        paragraphs: [
          "When the counterparty is abroad, the questions multiply: which law governs the contract, where the arbitration should be seated, in what language it should run, and — most importantly — where an award will need to be enforced. Choosing an arbitration seated in a New York Convention country, under institutional rules, keeps the award portable. Adjudix plans for implementation from the outset, so the forum and the procedure are chosen with the eventual recovery in mind.",
        ],
      },
      {
        heading: "The business case",
        paragraphs: [
          "A predictable process, decided by professionals who understand the industry, within a known time and on a published fee schedule — that is what corporate ADR offers. For a business, it turns disputes from open-ended risks into managed events.",
        ],
      },
    ],
  },
  {
    slug: "drafting-arbitration-clauses",
    title: "Drafting an Arbitration Clause That Works When It Matters",
    category: "Contract Drafting",
    summary:
      "The clause is usually written in minutes and argued over for months. The essentials of a clause that holds up — and the mistakes that cost the most.",
    sections: [
      {
        paragraphs: [
          "Dispute resolution clauses are often the last thing negotiated and the first thing argued over. A well-drafted clause sends the dispute straight to the right forum. A poor one invites a preliminary fight — in court — over where, how, and by whom the dispute should be decided, before the merits are even reached.",
        ],
      },
      {
        heading: "The essentials",
        points: [
          "A clear reference to arbitration — “shall be finally resolved by arbitration”, not “may be referred”.",
          "The rules and the institution — for example, the latest version of the Adjudix Code of ADR Procedure, administered by Adjudix.",
          "The seat — the legal home of the arbitration, which decides which courts supervise it. Name a city, and say it is the seat.",
          "The number of arbitrators — one for most disputes, three for complex or high-value ones.",
          "The language of the proceedings.",
          "The governing law of the contract, especially in cross-border agreements.",
        ],
        paragraphs: [],
      },
      {
        heading: "Common mistakes",
        points: [
          "Naming both courts and arbitration as forums for the same disputes.",
          "Naming a “venue” without saying which place is the seat.",
          "An appointment process that gives one party the sole right to appoint the arbitrator — which courts have held to be invalid.",
          "Referring to an institution or rules that do not exist, or misnaming them.",
          "Pre-arbitration steps with no time limit, which can be used to delay.",
          "Clauses in related contracts that point to different forums.",
        ],
        paragraphs: [],
      },
      {
        heading: "Going further",
        paragraphs: [
          "Good drafting goes beyond the basic clause. A tiered clause can require negotiation and mediation before arbitration, with fixed time limits for each step. A hybrid clause can opt into Med-Arb. The clause can provide for emergency arbitration, fast-track procedure for smaller claims, online hearings, confidentiality obligations, and how costs will be allocated. For groups of related contracts, consistent clauses allow disputes to be consolidated.",
        ],
      },
      {
        heading: "Seat, venue, and governing law",
        paragraphs: [
          "Three different questions are often confused. The seat is the legal home of the arbitration and determines which courts have supervisory jurisdiction, including over any challenge to the award. The venue is simply where hearings physically take place, and it can change from hearing to hearing without affecting the seat. The governing law is the law that applies to the contract itself. A clause that says “venue: Mumbai” without naming a seat leaves room for argument; a clause that says “the seat of arbitration shall be Mumbai” does not.",
          "In cross-border contracts, the law governing the arbitration agreement can also differ from the law governing the main contract. Stating it expressly avoids a preliminary dispute that can take months to resolve.",
        ],
      },
      {
        heading: "Review before signing",
        paragraphs: [
          "A short review of the dispute resolution clause before a contract is signed costs very little compared with the cost of litigating over a defective one. The checklist is simple: Is the reference to arbitration mandatory? Are the rules and institution correctly named? Is the seat clear? Is the appointment procedure fair to both sides? Do related contracts point to the same forum? If any answer is uncertain, the clause should be fixed now, while the parties are still on good terms.",
        ],
      },
      {
        heading: "A model to start from",
        paragraphs: [
          "Adjudix publishes model clauses for arbitration, mediation, and hybrid procedures, each referring disputes to the latest version of the Adjudix Code of ADR Procedure. They are a sound starting point for most contracts. For complex, high-value, or cross-border agreements, the Adjudix Contract & Clause Drafting service tailors the clause — and, where needed, the whole contract — to the transaction.",
        ],
      },
    ],
  },
  {
    slug: "online-and-offline-hearings",
    title: "Online, Offline, or Both: Choosing How Your Hearing Runs",
    category: "Online & Offline",
    summary:
      "Virtual hearings are now routine. When to go online, when to meet in person, and how a hybrid hearing combines the two.",
    sections: [
      {
        paragraphs: [
          "Few changes have reshaped dispute resolution as quickly as the move to online proceedings. What began as a necessity is now a choice — and a good one in many cases. But it is a choice: some disputes are best heard in a room, and many benefit from a mix of both.",
        ],
      },
      {
        heading: "The legal footing",
        paragraphs: [
          "Indian law recognises electronic records, electronic signatures, and contracts formed by electronic means under the Information Technology Act, 2000. The Arbitration and Conciliation Act lets the parties — or, failing agreement, the tribunal — decide the procedure, including where and how hearings are held, and the Mediation Act, 2023 expressly recognises online mediation. An award made after online hearings is as valid as one made after hearings in person.",
        ],
      },
      {
        heading: "When online works best",
        points: [
          "Document-heavy disputes where oral evidence is limited.",
          "Parties, counsel, or witnesses in different cities or countries.",
          "Procedural hearings and case management conferences.",
          "Mediation sessions, especially private sessions with each party.",
          "Small and medium claims, where travel would be a large share of the cost.",
        ],
        paragraphs: [],
      },
      {
        heading: "When to meet in person",
        points: [
          "Cases that turn on the credibility of key witnesses under cross-examination.",
          "Complex technical evidence that benefits from site visits or physical exhibits.",
          "Settlement meetings where the parties' presence in one room changes the dynamic.",
        ],
        paragraphs: [],
      },
      {
        heading: "Hybrid hearings",
        paragraphs: [
          "Many cases combine the two: procedural hearings and most witnesses online, the key witnesses in person, or a tribunal sitting physically with some participants joining remotely. The tribunal sets the format at the first case management conference, after hearing the parties.",
        ],
      },
      {
        heading: "Making online hearings fair",
        paragraphs: [
          "An online hearing must give every party a full opportunity to present its case, just as a physical one does. Good practice includes a test session before the hearing, a protocol on who may be present in each participant's room, rules for sharing documents on screen, and an agreed method for witness examination — including how a witness's documents are controlled while they give evidence. Hearings are recorded or transcribed where the tribunal so directs.",
          "Data security matters too. Case documents should be exchanged through a secure platform, not personal email, and access should be limited to the parties, their counsel, and the tribunal. These safeguards are built into the Adjudix ODR Platform and set out in the Adjudix Code of ADR Procedure.",
        ],
      },
      {
        heading: "Cost and time",
        paragraphs: [
          "Online hearings remove travel, accommodation, and venue costs and make it far easier to find dates that suit everyone — which often brings the final hearing forward by weeks. For small and medium claims, these savings can be a significant share of the total cost of the dispute.",
        ],
      },
      {
        heading: "How Adjudix runs it",
        paragraphs: [
          "The Adjudix ODR Platform handles filing, service of documents, scheduling, and virtual hearings, with secure storage of the case record. Offline proceedings use the same procedure and the same Code. Whichever format the parties choose, the rules, the timelines, and the standards are identical — only the room changes.",
        ],
      },
    ],
  },
  {
    slug: "adjudix-lok-adalat",
    title: "Adjudix Lok Adalat: One Day for Confidential Proposals",
    category: "Hybrid ADR",
    summary:
      "An Adjudix innovation inspired by the spirit of Lok Adalat — a single day, within any ADR proceeding, for confidential settlement proposals to an independent conciliator.",
    sections: [
      {
        paragraphs: [
          "Parties in a dispute often know the number they would accept — but neither will say it first, for fear of looking weak. The result is a standoff that can last for months. The Adjudix Lok Adalat is designed to break that standoff, in a single day.",
        ],
      },
      {
        heading: "The idea",
        paragraphs: [
          "At any point during an ADR proceeding at Adjudix — an arbitration, a mediation, or a hybrid process — the parties may opt for an Adjudix Lok Adalat day. For that single day, a new ADR professional, who has had no role in the proceeding so far, is engaged as a conciliator. Each party submits its settlement proposal to the conciliator in confidence. The conciliator sees both proposals; neither party sees the other's.",
          "Working from what each side has privately put forward, the conciliator looks for the space where the two positions meet, and helps the parties to an out-of-the-box settlement that neither would have proposed in open session.",
        ],
      },
      {
        heading: "Why secrecy matters",
        paragraphs: [
          "Confidentiality is the whole point. Because nothing a party proposes is disclosed to the other side, or to the arbitrator or mediator in the main proceeding, a party can make a realistic offer without weakening its position if the day does not produce a settlement. If it does not, the main proceeding simply continues as before.",
        ],
      },
      {
        heading: "How it relates to the statutory Lok Adalat",
        paragraphs: [
          "Statutory Lok Adalats are organised by the Legal Services Authorities under the Legal Services Authorities Act, 1987, and their awards are deemed decrees of a civil court. The Adjudix Lok Adalat is not a statutory Lok Adalat. It borrows the spirit of the institution — a single sitting, a conciliatory approach, and a focus on settlement — and applies it within a private ADR proceeding. A settlement reached on the day is recorded as a settlement agreement under the conciliation provisions of the Arbitration and Conciliation Act, 1996, or, within an arbitration, as an award on agreed terms, so it carries full legal force.",
        ],
      },
      {
        heading: "How the day runs",
        paragraphs: [
          "The parties agree on a date and the Secretariat appoints the conciliator, who discloses any conflict and signs a confidentiality undertaking. Each party submits a written settlement proposal in a sealed submission before the day begins, with any short note it wishes the conciliator to read. On the day, the conciliator meets each party privately, explores the reasoning behind its proposal, and may meet the parties together when it would help.",
          "Where the proposals overlap — or come close — the conciliator helps the parties settle on terms. Where they are far apart, the conciliator may put forward a proposal of their own, as a conciliator is entitled to do. By the end of the day, the parties either sign a settlement or return to the main proceeding, with nothing disclosed.",
        ],
      },
      {
        heading: "What is protected",
        paragraphs: [
          "Proposals made to the conciliator, the views the conciliator expresses, and any admissions made on the day cannot be relied on in the main proceeding or in any later proceeding. The conciliator cannot act as an arbitrator, representative, or witness in the same dispute. These protections reflect the confidentiality and inadmissibility provisions of the conciliation chapter of the Arbitration and Conciliation Act, 1996.",
        ],
      },
      {
        heading: "When to use it",
        points: [
          "When the parties are close to settlement but neither will move first.",
          "After pleadings, when each side understands the strengths and weaknesses of its case.",
          "Before an expensive phase of the proceeding — such as expert evidence or long hearings.",
        ],
        paragraphs: [],
      },
    ],
  },
  {
    slug: "the-adjudix-model",
    title: "Why Institutional ADR: The Adjudix Model",
    category: "About Adjudix",
    summary:
      "What sets Adjudix apart — resolution and implementation under one roof, the hybrid model, a panel organised by profession, and a published Code and fee schedule.",
    sections: [
      {
        paragraphs: [
          "Parties can resolve disputes ad hoc — appointing arbitrators themselves and managing the process on their own. Ad hoc arbitration works when everything goes smoothly. When it does not, there is no one to appoint a replacement arbitrator, fix a timetable, hold fees, or keep the process on track, and the parties end up in court arguing about procedure. An institution exists to prevent that.",
        ],
      },
      {
        heading: "Resolution and implementation, under one roof",
        paragraphs: [
          "Most institutions end their role with the award. Adjudix does not. Our model treats the dispute as resolved only when the outcome has been implemented — the award paid, the settlement performed, the order complied with — in India or anywhere in the world. That is what “Dispute Resolved & Implemented at your Doorstep” means.",
        ],
      },
      {
        heading: "Every mechanism, matched to the dispute",
        paragraphs: [
          "Adjudix administers arbitration, mediation, conciliation, Lok Adalat-style settlement sittings, emergency arbitration, corporate ADR, and — as our flagship — the hybrid Med-Arb model, which attempts settlement first and assures a binding outcome either way. Proceedings run online, offline, or both.",
        ],
      },
      {
        heading: "A professional panel, organised by profession",
        paragraphs: [
          "Our Professional Panel brings together lawyers, chartered accountants and company secretaries, and engineers of every discipline, so that each dispute is heard by someone who understands its subject matter. Every panelist discloses conflicts before appointment and is bound by the Moral Principles that form the Preamble to the Adjudix Code. We deliberately do not publish photographs of our arbitrators, to protect the independence of every proceeding.",
        ],
      },
      {
        heading: "Published rules, published fees",
        paragraphs: [
          "Every case is governed by the Adjudix Code of ADR Procedure, 2026, and charged under a published fee schedule, so parties know the procedure and the cost before they begin. No party should be negotiating process after a dispute has already started.",
        ],
      },
      {
        heading: "Ad hoc or institutional: the practical difference",
        paragraphs: [
          "In an ad hoc arbitration, the parties must agree on every procedural step themselves, and when they disagree, a court must often step in — to appoint an arbitrator, to replace one who withdraws, or to resolve a dispute about fees. Each trip to court adds months. An institution resolves these questions administratively, under rules the parties agreed to in advance: the Secretariat appoints or replaces arbitrators, holds and accounts for fees, monitors timelines, and scrutinises awards for form before they are issued.",
          "Institutional arbitration also gives the parties a clear record of the procedure followed, which matters if the award is later challenged or needs to be enforced abroad.",
        ],
      },
      {
        heading: "Built to be trusted",
        paragraphs: [
          "Trust in an institution comes from what it does consistently: disclosing conflicts, keeping proceedings confidential, applying the same Code to every party regardless of size, and accounting transparently for fees. Adjudix is built on these commitments, set out in the Moral Principles that open the Adjudix Code of ADR Procedure, and backed by a grievance mechanism for anyone who believes they have not been met.",
        ],
      },
      {
        heading: "Before and after the dispute",
        paragraphs: [
          "Adjudix also works before disputes arise, through contract and arbitration clause drafting, and builds the profession through six certification tracks, apprenticeships and internships, and five kinds of membership. Together, these make Adjudix a complete dispute resolution institution — from the clause, to the resolution, to the recovery.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}

// Rough reading time at ~220 words a minute.
export function readingMinutes(article: Article) {
  const words = article.sections
    .flatMap((s) => [...s.paragraphs, ...(s.points ?? []), s.heading ?? ""])
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
