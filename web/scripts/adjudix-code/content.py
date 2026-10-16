"""Source text for the Adjudix Code of ADR Procedure — 2018, 2021, and 2026
editions — built from the client's index (Oct 2026) and blueprint notes:

  2018  base edition: no Online Dispute Resolution, Hybrid, or Emergency.
  2021  adds Online Dispute Resolution only.
  2026  everything, following the client's index.

Every edition opens with a Preamble of Moral Principles; the 2026 Preamble is
the fullest. Sections are tagged with the editions they appear in and are
renumbered per edition by build.py. A body is a list of sub-sections, or a
dict of edition -> list where the text differs. "{ref:key}" becomes
"Section N" for the section with that key in the edition being built, and
"{year}" / "{prev}" become the edition year and the year it replaces.
"""

ALL = {2018, 2021, 2026}
ODR = {2021, 2026}  # Online Dispute Resolution
NEW = {2026}  # Hybrid, Emergency, Adjudix Lok Adalat, global implementation

EDITION_NOTES = {
    2018: "First edition. Governs arbitration, mediation, conciliation, and corporate ADR administered by Adjudix, conducted in person.",
    2021: "Second edition. Introduces Online Dispute Resolution: the Adjudix E-Portal, electronic filing and service, and virtual hearings.",
    2026: "Third edition. Covers every mechanism — adds Emergency Arbitration, the Hybrid Med-Arb Protocol, Adjudix Lok Adalat, and global implementation of awards and settlements.",
}

# ---------------------------------------------------------------- Preamble

PREAMBLE_INTRO = {
    2018: [
        "Adjudix Dispute Resolution Institute is established to provide parties with a fair, efficient, and dependable alternative to litigation. A procedure is only as trustworthy as the principles that govern it. This Code therefore begins with the Moral Principles that bind the Institute, its Secretariat, and every arbitrator, mediator, and conciliator acting under it.",
        "These principles are not aspirations. They are binding, and every provision of this Code shall be read and applied in accordance with them.",
    ],
    2021: [
        "Adjudix Dispute Resolution Institute exists to provide parties with a fair, efficient, and dependable alternative to litigation. A procedure is only as trustworthy as the principles that govern it. This Code therefore begins with the Moral Principles that bind the Institute, its Secretariat, and every arbitrator, mediator, and conciliator acting under it.",
        "This edition brings dispute resolution online. The move to digital proceedings changes the room in which justice is done, not the standards by which it is done. The principles below apply equally to every proceeding, whether conducted in person or through the Adjudix E-Portal.",
        "These principles are binding, and every provision of this Code shall be read and applied in accordance with them.",
    ],
    2026: [
        "WHEREAS the resolution of disputes by consent, by conciliation, and by the binding decision of a neutral chosen by the parties is an essential complement to the courts, and the confidence of the public in such resolution rests on the integrity of the institutions that administer it;",
        "WHEREAS Adjudix Dispute Resolution Institute has, since the first edition of this Code in 2018 and its second edition in 2021, administered arbitration, mediation, conciliation, and corporate dispute resolution in person and online, and has now extended its services to emergency arbitration, the hybrid model of Mediation-Arbitration, the Adjudix Lok Adalat, and the implementation of awards and settlements in India and throughout the world;",
        "WHEREAS innovation in the means of resolving disputes must never be purchased at the cost of fairness, and every new procedure adopted by the Institute must offer the parties at least the same protection as the procedures it supplements;",
        "AND WHEREAS the Institute considers it necessary to declare, in authoritative and binding terms, the Moral Principles upon which every proceeding under its administration is conducted;",
        "NOW, THEREFORE, the Institute declares the following Moral Principles, which form the foundation of this Code. They bind the Institute, its governing body, its Secretariat and staff, and every arbitrator, emergency arbitrator, mediator, conciliator, expert, and other person acting under this Code. Every provision of this Code shall be interpreted, and every discretion under it exercised, in the manner that best gives effect to these Principles. Where any provision is ambiguous, the interpretation most consistent with these Principles shall prevail.",
    ],
}

PRINCIPLES = {
    2018: [
        ("Independence and Impartiality", "Every neutral shall be, and remain, independent of the parties and impartial between them, and shall disclose any circumstance that may give rise to doubts about either."),
        ("Equality and Fairness", "The parties shall be treated with equality, and each shall be given a full opportunity to present its case."),
        ("Party Autonomy", "The parties' agreement on procedure shall be respected, save where it conflicts with this Code's non-derogable provisions or the law."),
        ("Confidentiality", "Proceedings, documents, and outcomes are confidential, save as the parties agree or the law requires."),
        ("Integrity", "No neutral or member of staff shall accept any gift, favour, or communication that could compromise, or appear to compromise, their integrity."),
        ("Competence and Diligence", "Neutrals shall be appointed for their competence in the subject matter, and shall conduct proceedings with diligence and without unnecessary delay."),
        ("Accountability", "The Institute shall maintain a mechanism for the redress of grievances arising from any breach of these Principles."),
    ],
    2021: [
        ("Independence and Impartiality", "Every neutral shall be, and remain, independent of the parties and impartial between them, and shall disclose any circumstance that may give rise to doubts about either."),
        ("Equality and Fairness", "The parties shall be treated with equality, and each shall be given a full opportunity to present its case, whether the proceeding is conducted in person or online."),
        ("Party Autonomy", "The parties' agreement on procedure shall be respected, save where it conflicts with this Code's non-derogable provisions or the law."),
        ("Confidentiality", "Proceedings, documents, and outcomes are confidential, save as the parties agree or the law requires."),
        ("Integrity", "No neutral or member of staff shall accept any gift, favour, or communication that could compromise, or appear to compromise, their integrity."),
        ("Competence and Diligence", "Neutrals shall be appointed for their competence in the subject matter, and shall conduct proceedings with diligence and without unnecessary delay."),
        ("Digital Trust", "Electronic records shall be kept secure, access to them limited to those entitled, and online proceedings conducted so that no party is disadvantaged by the medium."),
        ("Accountability", "The Institute shall maintain a mechanism for the redress of grievances arising from any breach of these Principles."),
    ],
    2026: [
        ("Independence and Impartiality", "Every neutral shall be, and shall remain throughout the proceeding and after it, independent of the parties and their counsel and impartial between them. A neutral shall disclose in writing, before accepting an appointment and at any time thereafter, every circumstance that may give rise to justifiable doubts as to their independence or impartiality, and shall decline or withdraw from an appointment where such doubts cannot be dispelled. Doubt shall be resolved in favour of disclosure."),
        ("Equality of Parties and Procedural Fairness", "The parties shall be treated with equality, regardless of their size, resources, nationality, or standing. Each party shall have a full and fair opportunity to know the case against it and to present its own. No procedure, however expeditious or innovative, shall be applied in a manner that denies a party this opportunity."),
        ("Party Autonomy", "The parties are the authors of their own process. Their agreement on procedure shall be respected and given effect, save where it conflicts with the non-derogable provisions of this Code or of the law, or with these Principles."),
        ("Confidentiality and Discretion", "Proceedings, submissions, evidence, deliberations, and outcomes are confidential to the parties, save as they agree or the law requires. To protect the independence of every proceeding and to shield neutrals from approach, pressure, or interference, the Institute exercises discretion in publishing the personal particulars and likenesses of its neutrals, and no person shall seek to communicate with a neutral about a pending matter except as this Code permits."),
        ("Integrity and Probity", "No neutral, officer, or member of staff shall solicit or accept any gift, hospitality, favour, or benefit from a party or its representatives, or engage in any private communication with one party concerning a pending matter, save as expressly permitted in mediation and conciliation. Every person acting under this Code shall conduct themselves so as to uphold public confidence in the Institute."),
        ("Competence and Diligence", "Neutrals shall be appointed for their competence in the subject matter of the dispute and the procedure to be followed, and shall devote to each proceeding the time and attention it requires. A neutral who cannot do so shall not accept the appointment."),
        ("Efficiency and Proportionality", "Proceedings shall be conducted without unnecessary delay or expense, with procedures proportionate to the value and complexity of the dispute. Time limits under this Code are commitments to the parties, not formalities."),
        ("Transparency of Rules and Fees", "The procedure applicable to every proceeding, and the fees chargeable for it, are published in advance. No party shall be required to negotiate procedure or cost after a dispute has arisen, and every sum received shall be accounted for."),
        ("Innovation with Integrity", "The Institute embraces new means of resolving disputes — online proceedings, emergency arbitration, the hybrid model of Mediation-Arbitration, and the Adjudix Lok Adalat — because they serve the parties better. Every innovation shall be introduced with safeguards at least equal to those of the procedures it supplements, and the consent of the parties shall be obtained wherever the law or fairness requires it."),
        ("Technology and Data Stewardship", "Electronic records and personal data shall be collected only for the purposes of the proceeding, kept secure, accessed only by those entitled, retained only as long as necessary, and handled in accordance with the law on data protection. No party shall be disadvantaged by the medium in which a proceeding is conducted."),
        ("Finality and Implementation", "A dispute is resolved only when its outcome is implemented. The Institute shall render awards and record settlements in a form capable of enforcement, and shall, where the parties so request, support the implementation of awards, orders, and settlements in India and throughout the world."),
        ("Accessibility", "The Institute shall make its services accessible to parties of every size and means, including through online proceedings, the small cause schedule of fees, and reasonable accommodation for parties and witnesses with disabilities or language needs."),
        ("Accountability", "The Institute is answerable for the conduct of proceedings under its administration. It shall maintain an independent mechanism for the redress of grievances arising from any breach of this Code or these Principles, and shall act on its findings."),
    ],
}

PREAMBLE_CLOSE = {
    2018: "Every neutral shall, on accepting an appointment, confirm in writing that they have read and will abide by these Principles.",
    2021: "Every neutral shall, on accepting an appointment, confirm in writing that they have read and will abide by these Principles.",
    2026: "DECLARATION. Every neutral shall, on accepting an appointment under this Code, subscribe to the following declaration: “I have read the Moral Principles of the Adjudix Code of ADR Procedure, 2026. I am independent of the parties and impartial between them, and I have disclosed every circumstance that the Principles require me to disclose. I will conduct this proceeding fairly, diligently, and in confidence, and I will abide by these Principles throughout it.”",
}

# ---------------------------------------------------------------- Definitions

DEFINITIONS = [
    ("Adjudix” or “the Institute", "means Adjudix Dispute Resolution Institute, acting through its governing body and the Secretariat.", ALL),
    ("Adjudix E-Portal", "means the online platform of the Institute through which proceedings are filed, notices served, records maintained, and virtual hearings conducted.", ODR),
    ("Adjudix Lok Adalat", "means the confidential settlement sitting described in Chapter {chap:lok_adalat}.", NEW),
    ("Act", "means the Arbitration and Conciliation Act, 1996, as amended from time to time.", ALL),
    ("award", {
        2018: "includes an interim award, a partial award, and an award on agreed terms.",
        2021: "includes an interim award, a partial award, and an award on agreed terms.",
        2026: "includes an interim award, a partial award, and an award on agreed terms, but does not include an order of an emergency arbitrator.",
    }, ALL),
    ("Code", "means this Adjudix Code of ADR Procedure, {year}, including its Schedules and the Schedule of Fees.", ALL),
    ("electronic record", "has the meaning assigned to it in the Information Technology Act, 2000.", ALL),
    ("emergency arbitrator", "means an arbitrator appointed under Chapter {chap:emergency}.", NEW),
    ("hybrid hearing", "means a hearing in which some participants attend in person and others by video conference.", ODR),
    ("Med-Arb", "means the hybrid procedure of mediation followed, where settlement is not reached, by arbitration, under Part {part:hybrid}.", NEW),
    ("neutral", {
        2018: "means an arbitrator, mediator, or conciliator appointed under this Code.",
        2021: "means an arbitrator, mediator, or conciliator appointed under this Code.",
        2026: "means an arbitrator, emergency arbitrator, mediator, or conciliator appointed under this Code.",
    }, ALL),
    ("Panel", "means the Professional Panel of the Institute, comprising lawyers, chartered accountants and company secretaries, engineers, and other professionals approved by the Institute.", ALL),
    ("party", "means a party to the dispute, and includes its authorised representative where the context so permits.", ALL),
    ("Schedule of Fees", "means the schedule of fees and costs published by the Institute and in force on the date of commencement of the proceeding.", ALL),
    ("Secretariat", "means the Secretariat of the Institute, which administers proceedings under this Code.", ALL),
    ("virtual hearing", "means a hearing conducted by video conference through the Adjudix E-Portal or another platform approved by the Secretariat.", ODR),
]

# ---------------------------------------------------------------- Parts

PARTS = [
    {
        "title": "Preliminary & General Provisions",
        "chapters": [
            {
                "title": "Preliminary",
                "sections": [
                    {
                        "key": "short_title",
                        "title": "Short Title, Extent, and Commencement",
                        "body": [
                            "This Code may be called the Adjudix Code of ADR Procedure, {year}.",
                            "It applies to every proceeding administered by the Institute, whether the parties are in India or elsewhere, and whether the proceeding is domestic or international.",
                            "It shall come into force on the first day of January, {year}, and shall apply to every proceeding commenced on or after that date.",
                        ],
                    },
                    {
                        "key": "definitions",
                        "title": "Definitions and Interpretation",
                        "body": "DEFINITIONS",
                    },
                    {
                        "title": "Scope of Application and Exclusions",
                        "body": {
                            2018: [
                                "This Code applies where the parties have agreed, before or after a dispute has arisen, to refer the dispute to the Institute, or to resolve it under the rules of the Institute or under this Code.",
                                "It governs arbitration, mediation, conciliation, and corporate dispute resolution administered by the Institute.",
                                "This Code does not apply to disputes which, under the law applicable to them, are not capable of settlement by arbitration or other alternative dispute resolution.",
                            ],
                            2021: [
                                "This Code applies where the parties have agreed, before or after a dispute has arisen, to refer the dispute to the Institute, or to resolve it under the rules of the Institute or under this Code.",
                                "It governs arbitration, mediation, conciliation, and corporate dispute resolution administered by the Institute, whether conducted in person, online, or partly in each.",
                                "This Code does not apply to disputes which, under the law applicable to them, are not capable of settlement by arbitration or other alternative dispute resolution.",
                            ],
                            2026: [
                                "This Code applies where the parties have agreed, before or after a dispute has arisen, to refer the dispute to the Institute, or to resolve it under the rules of the Institute or under this Code.",
                                "It governs arbitration, emergency arbitration, mediation, conciliation, the Adjudix Lok Adalat, Med-Arb, and corporate dispute resolution administered by the Institute, whether conducted in person, online, or partly in each, and the implementation of their outcomes.",
                                "This Code does not apply to disputes which, under the law applicable to them, are not capable of settlement by arbitration or other alternative dispute resolution.",
                            ],
                        },
                    },
                    {
                        "title": "Party Autonomy and Non-Derogable Provisions",
                        "body": [
                            "Subject to this Section, the parties may agree on the procedure to be followed, and the neutral shall give effect to that agreement.",
                            "The parties may not derogate from the Preamble, from the provisions of this Code on the independence and disclosure of neutrals, the equal treatment of parties, confidentiality, and fees, or from any provision of the law from which derogation is not permitted.",
                            "Where this Code and the parties' agreement are silent, the neutral may conduct the proceeding in such manner as the neutral considers appropriate, consistently with the Preamble.",
                        ],
                    },
                    {
                        "title": "Waiver of Right to Object",
                        "body": [
                            "A party which knows that a provision of this Code or of the parties' agreement has not been complied with, and proceeds without stating its objection without undue delay, or within the time limit provided, shall be deemed to have waived its right to object.",
                        ],
                    },
                ],
            },
            {
                "title": "Online Dispute Resolution (ODR) Platform & Digital Service",
                "eds": ODR,
                "sections": [
                    {
                        "title": "The Adjudix E-Portal and Digital Portal Standard",
                        "body": {
                            2021: [
                                "Every proceeding under this Code may be filed, administered, and conducted through the Adjudix E-Portal, which shall maintain the official record of the proceeding.",
                                "The Secretariat shall publish the technical standards of the E-Portal, including supported file formats, size limits, and minimum requirements for virtual hearings, and shall ensure that the E-Portal is accessible to parties without specialist equipment.",
                                "Where a party is unable to use the E-Portal, the Secretariat shall provide reasonable assistance or permit filing by other means.",
                                "Before a proceeding is conducted online, the Secretariat shall explain to the parties, in plain language, how the online proceeding will be conducted, the role of the neutral, and the safeguards for their data, so that their participation is informed.",
                            ],
                            2026: [
                                "Every proceeding under this Code may be filed, administered, and conducted through the Adjudix E-Portal, which shall maintain the official record of the proceeding.",
                                "The Secretariat shall publish the technical standards of the E-Portal, including supported file formats, size limits, and minimum requirements for virtual hearings, and shall ensure that the E-Portal is accessible to parties without specialist equipment.",
                                "Where a party is unable to use the E-Portal, the Secretariat shall provide reasonable assistance or permit filing by other means.",
                                "Before a proceeding is conducted online, the Secretariat shall explain to the parties, in plain language, how the online proceeding will be conducted, the role of the neutral, and the safeguards for their data, so that their participation is informed.",
                                "The Secretariat shall disclose to the parties any automated or artificial-intelligence tool used in administering their proceeding and the purpose for which it is used. No such tool shall decide any question affecting the rights of a party, which shall be decided only by the neutral.",
                                "The E-Portal may offer the parties assisted online negotiation before or alongside a proceeding. A settlement reached through it may be recorded under this Code, and nothing said or offered in the course of it shall be relied on in any later proceeding.",
                            ],
                        },
                    },
                    {
                        "title": "Filing of Electronic Pleadings and Statements",
                        "body": [
                            "Pleadings, statements, applications, and documents may be filed electronically through the E-Portal and shall be deemed filed on the date and at the time recorded by the E-Portal.",
                            "Documents shall be filed in a searchable format where practicable, paginated, and accompanied by an index.",
                            "A document filed electronically shall be treated as an original unless the neutral directs production of the original for inspection.",
                        ],
                    },
                    {
                        "key": "digital_service",
                        "title": "Digital Service of Notices and Process",
                        "body": [
                            "Any notice or communication under this Code may be served by uploading it to the E-Portal, by email, or by any other electronic means through which the addressee has communicated in relation to the dispute or which the addressee has designated.",
                            "Service is deemed effected on the day the notice is transmitted, provided that the record of transmission does not show a failure of delivery.",
                            "Where electronic service cannot be effected, notice may be served by courier or registered post to the last known address of the addressee.",
                        ],
                    },
                    {
                        "title": "Electronic Signatures, Authentication, and Verification",
                        "body": {
                            2021: [
                                "Any document required to be signed under this Code may be signed by an electronic signature recognised under the Information Technology Act, 2000.",
                                "The Secretariat may verify the identity of any participant before granting access to the E-Portal or to a virtual hearing.",
                            ],
                            2026: [
                                "Any document required to be signed under this Code, including an award, may be signed by an electronic signature or electronic authentication technique recognised under the Information Technology Act, 2000.",
                                "The Secretariat may verify the identity of any participant, including by one-time password or digital identity verification, before granting access to the E-Portal or to a virtual hearing.",
                                "An award signed electronically shall be authenticated by the Secretariat and a certified copy furnished to each party.",
                            ],
                        },
                    },
                    {
                        "title": "Confidentiality, Data Security, and Storage of Digital Records",
                        "body": {
                            2021: [
                                "The Secretariat shall maintain the E-Portal with reasonable security practices, and shall restrict access to the record of each proceeding to the parties, their representatives, the neutral, and authorised staff.",
                                "Electronic records shall be retained for such period after the conclusion of the proceeding as the Secretariat may determine, and shall thereafter be securely deleted, save as the law requires.",
                            ],
                            2026: [
                                "The Secretariat shall maintain the E-Portal with reasonable security practices and procedures, and shall restrict access to the record of each proceeding to the parties, their representatives, the neutral, and authorised staff.",
                                "Personal data shall be processed in accordance with the Digital Personal Data Protection Act, 2023, and only for the purposes of the proceeding and its implementation.",
                                "The Secretariat shall publish its policies on access to, retention of, and destruction of records. A party may obtain a copy of the record of its proceeding in an accessible electronic format.",
                                "Electronic records shall be retained for such period after the conclusion of the proceeding as the Secretariat may determine, and shall thereafter be securely deleted, save as the law requires.",
                                "No participant shall record a virtual hearing, or capture or disseminate any part of it, except as directed under {ref:recording}.",
                            ],
                        },
                    },
                ],
            },
        ],
    },
    {
        "title": "Common Procedural Rules",
        "chapters": [
            {
                "title": "Commencement of Proceedings & Pleadings",
                "sections": [
                    {
                        "title": "Request for Dispute Resolution and Notice of Dispute",
                        "body": [
                            "A proceeding commences on the date on which a request for its commencement is received by the Secretariat, together with the filing fee prescribed by the Schedule of Fees.",
                            "The request shall state the names and contact details of the parties, a brief description of the dispute and the relief sought, the agreement under which the dispute is referred, and any proposal on the mechanism, the number of neutrals, and the language of the proceeding.",
                            "The claimant shall serve a copy of the request on every other party.",
                        ],
                    },
                    {
                        "title": "Registration of Case and Issuance of Summons",
                        "body": [
                            "On being satisfied that the request is complete and the filing fee paid, the Secretariat shall register the proceeding, assign it a case number, and issue notice to every other party.",
                            "Registration is administrative and does not determine any question of jurisdiction or of the validity of the agreement, which shall be decided by the neutral.",
                        ],
                    },
                    {
                        "title": "Response, Statement of Defence, and Counterclaims",
                        "body": {
                            2018: [
                                "The respondent shall file a response to the request within fifteen days of receiving notice under the preceding Section.",
                                "The statement of claim and the statement of defence, together with any counter-claim or set-off, shall be filed within such time as the arbitral tribunal may direct.",
                            ],
                            2021: [
                                "The respondent shall file a response to the request within fifteen days of receiving notice under the preceding Section.",
                                "In an arbitration, the statement of claim and the statement of defence, together with any counter-claim or set-off, shall be completed within six months of the date on which the arbitrator or all the arbitrators received written notice of their appointment, in accordance with Section 23(4) of the Act.",
                            ],
                            2026: [
                                "The respondent shall file a response to the request within fifteen days of receiving notice under the preceding Section.",
                                "In an arbitration, the statement of claim and the statement of defence, together with any counter-claim or set-off, shall be completed within six months of the date on which the arbitrator or all the arbitrators received written notice of their appointment, in accordance with Section 23(4) of the Act.",
                            ],
                        },
                    },
                    {
                        "title": "Amendment of Pleadings and Statements",
                        "body": [
                            "A party may amend or supplement its claim or defence unless the neutral considers it inappropriate to allow the amendment, having regard to the delay in making it, the prejudice to the other party, and any other relevant circumstance.",
                            "A claim may not be amended so as to fall outside the scope of the agreement under which the dispute is referred.",
                        ],
                    },
                    {
                        "title": "Joinder of Additional Parties and Consolidation of Claims",
                        "body": {
                            2018: [
                                "An additional party may be joined where all the parties, including the additional party, consent, or where the additional party is bound by the agreement under which the dispute is referred.",
                                "After the tribunal has been constituted, no additional party shall be joined unless the additional party accepts the constitution of the tribunal and agrees to the procedural timetable, subject to such modifications as the tribunal may direct.",
                                "The Secretariat may, on the application of a party and after hearing all parties, consolidate two or more proceedings where the parties so agree, or where the claims arise under the same agreement or under compatible agreements concerning the same transaction.",
                            ],
                            2021: [
                                "An additional party may be joined where all the parties, including the additional party, consent, or where the additional party is bound by the agreement under which the dispute is referred.",
                                "After the tribunal has been constituted, no additional party shall be joined unless the additional party accepts the constitution of the tribunal and agrees to the procedural timetable, subject to such modifications as the tribunal may direct.",
                                "The Secretariat may, on the application of a party and after hearing all parties, consolidate two or more proceedings where the parties so agree, or where the claims arise under the same agreement or under compatible agreements concerning the same transaction.",
                            ],
                            2026: [
                                "An additional party may be joined where all the parties, including the additional party, consent, or where the additional party is bound by the agreement under which the dispute is referred.",
                                "After the tribunal has been constituted, no additional party shall be joined unless the additional party accepts the constitution of the tribunal and agrees to the procedural timetable, subject to such modifications as the tribunal may direct.",
                                "The Secretariat may, on the application of a party and after hearing all parties, consolidate two or more proceedings where the parties so agree, or where the claims arise under the same agreement or under compatible agreements concerning the same transaction.",
                                "Where the same tribunal is constituted in two or more proceedings that raise a common question of law or fact, the tribunal may, on a party's application and after consulting all parties, conduct them concurrently or one after another, hear them together, or suspend any of them pending the determination of another. Each proceeding remains separate, and a separate award shall be made in each, unless the parties agree otherwise.",
                            ],
                        },
                    },
                ],
            },
            {
                "title": "Case Management & Hearings",
                "sections": [
                    {
                        "title": "Preliminary Case Management Conference (CMC)",
                        "body": {
                            2018: [
                                "As soon as practicable after constitution, the neutral shall convene a case management conference with the parties.",
                                "At the conference, the neutral shall, after hearing the parties, settle the procedural timetable, the manner of taking evidence, the place of hearings, and any other procedural matter. The timetable, and any modification of it, shall be communicated to the Secretariat and the parties.",
                            ],
                            2021: [
                                "As soon as practicable after constitution, the neutral shall convene a case management conference with the parties, which may be held by video conference.",
                                "At the conference, the neutral shall, after hearing the parties, settle the procedural timetable, the manner of taking evidence, whether hearings will be in person, virtual, or hybrid, and any other procedural matter. The timetable, and any modification of it, shall be communicated to the Secretariat and the parties.",
                            ],
                            2026: [
                                "As soon as practicable after constitution, the neutral shall convene a case management conference with the parties, which may be held by video conference.",
                                "At the conference, the neutral shall, after hearing the parties, settle the procedural timetable, the manner of taking evidence, whether hearings will be in person, virtual, or hybrid, the suitability of the fast-track procedure, and any other procedural matter. The timetable, and any modification of it, shall be communicated to the Secretariat and the parties.",
                                "The neutral may ask the parties to submit case management proposals before the conference, and may request that each party attend in person or through an internal representative with authority to take procedural decisions.",
                                "The neutral shall also enquire whether the parties wish to explore settlement, including through mediation, an Adjudix Lok Adalat sitting, or, where they have so agreed, the Med-Arb Protocol.",
                                "The neutral shall consult the parties on the measures needed to protect the security of information exchanged in the proceeding and may give directions on them. A party that fails to comply with such directions may be ordered to bear the resulting costs.",
                            ],
                        },
                    },
                    {
                        "title": "Procedural Timelines and Time Extensions",
                        "body": [
                            "The neutral and the parties shall make every effort to conduct the proceeding in an expeditious and cost-effective manner, having regard to the complexity and value of the dispute, and shall observe the timelines fixed under this Code and by the neutral. The parties undertake to comply with every procedural order of the neutral.",
                            "The neutral may extend a time limit fixed by the neutral where the circumstances justify it. A time limit fixed by the Act may be extended only as the Act permits.",
                            "The Secretariat shall monitor timelines in every proceeding and may draw the attention of the neutral and the parties to any delay.",
                        ],
                    },
                    {
                        "title": {2018: "Conduct of Hearings", 2021: "Conduct of Physical, Virtual, and Hybrid Hearings", 2026: "Conduct of Virtual, Physical, and Hybrid Hearings"},
                        "body": {
                            2018: [
                                "Hearings shall be held at the place fixed by the neutral after consulting the parties, which may be the premises of the Institute or any other suitable place.",
                                "The neutral shall give the parties sufficient advance notice of every hearing.",
                                "Unless the parties agree otherwise, hearings shall be held in private, and no person who is not involved in the proceeding shall be admitted without the approval of the neutral and the parties.",
                                "If a party, having been duly notified, fails to appear at a hearing without sufficient cause, the neutral may proceed with the hearing and make an award or decision on the evidence before it.",
                            ],
                            2021: [
                                "Hearings may be conducted in person, as virtual hearings, or as hybrid hearings, as the neutral directs after consulting the parties.",
                                "A virtual or hybrid hearing shall be conducted so that every participant can see and hear every other participant and the documents under consideration, and the neutral shall ensure that no party is prejudiced by the medium.",
                                "If a technical failure prevents a party, a witness, or the neutral from participating fully in a virtual or hybrid hearing, the neutral shall suspend or adjourn the hearing, or take such other steps as are necessary, so that no party is prejudiced.",
                                "The neutral shall give the parties sufficient advance notice of every hearing. Unless the parties agree otherwise, hearings shall be held in private, and no person who is not involved in the proceeding shall be admitted without the approval of the neutral and the parties.",
                                "If a party, having been duly notified, fails to appear at a hearing without sufficient cause, the neutral may proceed with the hearing and make an award or decision on the evidence before it.",
                            ],
                            2026: [
                                "Hearings may be conducted in person, as virtual hearings, or as hybrid hearings, as the neutral directs after consulting the parties, having regard to the nature of the evidence, the location of the participants, and cost.",
                                "A virtual or hybrid hearing shall be conducted so that every participant can see and hear every other participant and the documents under consideration. The neutral may issue a protocol on the presence of persons in each participant's room, the sharing of documents, and the examination of witnesses, and shall ensure that no party is prejudiced by the medium.",
                                "If a technical failure prevents a party, a witness, or the neutral from participating fully in a virtual or hybrid hearing, the neutral shall suspend or adjourn the hearing, or take such other steps as are necessary, so that no party is prejudiced.",
                                "The neutral shall give the parties sufficient advance notice of every hearing. Unless the parties agree otherwise, hearings shall be held in private, and no person who is not involved in the proceeding shall be admitted without the approval of the neutral and the parties.",
                                "If a party, having been duly notified, fails to appear at a hearing without sufficient cause, the neutral may proceed with the hearing and make an award or decision on the evidence before it.",
                                "In an arbitration, an oral hearing shall be held if a party so requests, in accordance with Section 24 of the Act; otherwise the tribunal may, after consulting the parties, decide the dispute on documents and written submissions alone.",
                            ],
                        },
                    },
                    {
                        "key": "recording",
                        "title": "Recording of Proceedings and Transcript Management",
                        "body": [
                            "The neutral may direct that a hearing be recorded or transcribed, and shall do so where the parties so agree.",
                            "A transcript or recording shall form part of the confidential record of the proceeding and shall be made available only to the parties and the neutral.",
                            "Mediation and conciliation sessions shall not be recorded.",
                        ],
                    },
                    {
                        "key": "interim",
                        "title": "Interim Measures by Tribunal or Neutral Authority",
                        "body": [
                            "An arbitral tribunal may, at the request of a party, order any interim measure that the tribunal may order under Section 17 of the Act, including for the preservation, interim custody, or sale of goods, securing the amount in dispute, the detention, preservation, or inspection of property, and interim injunctions.",
                            "The tribunal may require the party requesting an interim measure to provide appropriate security.",
                            "An order under this Section is enforceable in the manner provided by Section 17(2) of the Act.",
                            "An application by a party to a court for interim measures under Section 9 of the Act shall not be deemed incompatible with, or a waiver of, the agreement to refer the dispute under this Code. The party shall inform the Secretariat of any such application and of any order made on it without delay.",
                        ],
                    },
                ],
            },
            {
                "title": "Evidence & Discovery",
                "sections": [
                    {
                        "title": "Disclosure and Production of Documents",
                        "body": [
                            "Each party shall file with its pleading the documents on which it relies.",
                            "The neutral may, on the application of a party, order the production of specific documents or categories of documents that are relevant and material to the outcome, and are in the possession or control of the other party.",
                            "The neutral may draw such inferences as are appropriate from a party's failure, without satisfactory explanation, to produce a document it has been ordered to produce.",
                        ],
                    },
                    {
                        "title": "Admissibility and Assessment of Evidence",
                        "body": {
                            2018: [
                                "The neutral is not bound by the Code of Civil Procedure, 1908 or the Indian Evidence Act, 1872, but shall be guided by the principles of natural justice.",
                                "The neutral shall determine the admissibility, relevance, materiality, and weight of any evidence.",
                            ],
                            2021: [
                                "The neutral is not bound by the Code of Civil Procedure, 1908 or the Indian Evidence Act, 1872, but shall be guided by the principles of natural justice.",
                                "The neutral shall determine the admissibility, relevance, materiality, and weight of any evidence.",
                            ],
                            2026: [
                                "The neutral is not bound by the Code of Civil Procedure, 1908 or the Bharatiya Sakshya Adhiniyam, 2023, but shall be guided by the principles of natural justice.",
                                "The neutral shall determine the admissibility, relevance, materiality, and weight of any evidence.",
                            ],
                        },
                    },
                    {
                        "title": "Examination of Witnesses and Expert Testimony",
                        "body": {
                            2018: [
                                "The evidence of a witness shall ordinarily be given by written statement, and the witness shall attend the hearing for cross-examination if the neutral so directs.",
                                "The neutral may, after consulting the parties, appoint one or more experts to report on specific issues, and the parties may present expert witnesses of their own.",
                            ],
                            2021: [
                                "The evidence of a witness shall ordinarily be given by written statement, and the witness shall attend the hearing, in person or by video conference, for cross-examination if the neutral so directs.",
                                "The neutral may, after consulting the parties, appoint one or more experts to report on specific issues, and the parties may present expert witnesses of their own.",
                            ],
                            2026: [
                                "The evidence of a witness shall ordinarily be given by written statement, and the witness shall attend the hearing, in person or by video conference, for cross-examination if the neutral so directs.",
                                "The neutral may, after consulting the parties, appoint one or more experts to report on specific issues, and the parties may present expert witnesses of their own. Experts may be directed to confer and prepare a joint statement of matters agreed and not agreed.",
                            ],
                        },
                    },
                    {
                        "title": {2018: "Electronic Records as Evidence", 2021: "Electronic Records as Evidence", 2026: "Digital and Electronic Evidence Standards"},
                        "body": {
                            2018: [
                                "Electronic records may be relied upon as evidence. The neutral may require such certification as to the source and integrity of an electronic record as the neutral considers appropriate, guided by Section 65B of the Indian Evidence Act, 1872.",
                            ],
                            2021: [
                                "Electronic records, including emails, messages, and data from electronic systems, may be relied upon as evidence. The neutral may require such certification as to the source and integrity of an electronic record as the neutral considers appropriate, guided by Section 65B of the Indian Evidence Act, 1872.",
                                "A party relying on electronic evidence shall preserve the original electronic record until the conclusion of the proceeding.",
                            ],
                            2026: [
                                "Electronic records, including emails, messages, metadata, and data from electronic systems, may be relied upon as evidence. The neutral may require such certification as to the source and integrity of an electronic record as the neutral considers appropriate, guided by Section 63 of the Bharatiya Sakshya Adhiniyam, 2023.",
                                "A party relying on electronic evidence shall preserve the original electronic record, in its native format, until the conclusion of the proceeding and any challenge to its outcome.",
                            ],
                        },
                    },
                    {
                        "title": "Evidentiary Privileges and Confidentiality",
                        "body": [
                            "The neutral shall give effect to legal professional privilege and to any other privilege recognised by the applicable law.",
                            "Statements made, documents prepared, and proposals exchanged in mediation or conciliation shall not be admissible in any arbitral or judicial proceeding, save as the law otherwise provides.",
                        ],
                    },
                ],
            },
        ],
    },
    {
        "title": "Arbitration Procedure",
        "chapters": [
            {
                "title": "The Arbitral Tribunal",
                "sections": [
                    {
                        "title": "Number, Qualification, and Nomination of Arbitrators",
                        "body": [
                            "The parties may agree on the number of arbitrators, which shall not be an even number. Failing agreement, the tribunal shall consist of a sole arbitrator, unless the Secretariat, having regard to the value and complexity of the dispute, determines that it shall consist of three arbitrators.",
                            "Arbitrators shall ordinarily be appointed from the Panel, having regard to the subject matter of the dispute and the professional discipline it calls for. The parties may agree to nominate a person who is not on the Panel, subject to confirmation by the Secretariat.",
                        ],
                    },
                    {
                        "title": "Appointment Procedure by Adjudix Institute",
                        "body": {
                            2018: [
                                "Where the tribunal is to consist of a sole arbitrator, the parties may jointly nominate the arbitrator within fifteen days of the registration of the proceeding, failing which the Secretariat shall appoint the arbitrator within a further fifteen days.",
                                "Where the tribunal is to consist of three arbitrators, each party shall nominate one arbitrator, and the two arbitrators so nominated shall nominate the presiding arbitrator, each within fifteen days. Where a nomination is not made in time, the Secretariat shall make the appointment.",
                                "No agreement shall confer on one party alone the right to appoint a sole arbitrator.",
                                "Every appointment is subject to the arbitrator's written disclosure and confirmation under the following Section.",
                            ],
                            2021: [
                                "Where the tribunal is to consist of a sole arbitrator, the parties may jointly nominate the arbitrator within fifteen days of the registration of the proceeding, failing which the Secretariat shall appoint the arbitrator within a further fifteen days.",
                                "Where the tribunal is to consist of three arbitrators, each party shall nominate one arbitrator, and the two arbitrators so nominated shall nominate the presiding arbitrator, each within fifteen days. Where a nomination is not made in time, the Secretariat shall make the appointment.",
                                "No agreement shall confer on one party alone the right to appoint a sole arbitrator.",
                                "Every appointment is subject to the arbitrator's written disclosure and confirmation under the following Section.",
                            ],
                            2026: [
                                "Where the tribunal is to consist of a sole arbitrator, the parties may jointly nominate the arbitrator within fifteen days of the registration of the proceeding, failing which the Secretariat shall appoint the arbitrator within a further fifteen days.",
                                "Where the tribunal is to consist of three arbitrators, each party shall nominate one arbitrator, and the two arbitrators so nominated shall nominate the presiding arbitrator, each within fifteen days. Where a nomination is not made in time, the Secretariat shall make the appointment.",
                                "No agreement shall confer on one party alone the right to appoint a sole arbitrator.",
                                "Every appointment is subject to the arbitrator's written disclosure and confirmation under the following Section.",
                                "Where a party is a frequent user of the Institute, the Secretariat shall disclose to the other parties, on request, the number of proceedings involving that party in which the proposed arbitrator has been appointed in the preceding three years, and shall rotate appointments in such proceedings so that no neutral becomes dependent on the repeat appointments of one party.",
                                # Draw-of-lots mechanism (client markup, Oct 2026).
                                "Where the Secretariat is to appoint a sole arbitrator, it shall propose to the parties three eligible neutrals from the Panel suited to the subject matter of the dispute, and each party may rank them in order of first, second, and third preference within seven days. The neutral with the best combined ranking shall be appointed; where the rankings are tied or are not returned in time, the appointment shall be made by draw of lots from the three neutrals proposed.",
                                "Where the Secretariat is to constitute a tribunal of three arbitrators, the tribunal shall include at least one Chartered Accountant, Company Secretary, or engineer where the subject matter of the dispute so requires, and the Secretariat shall make each appointment by draw of lots from the eligible neutrals on the Panel of the relevant profession.",
                                "Every draw of lots shall be random, shall be conducted by the Secretariat in the presence of, or by video link open to, the parties or their representatives, and shall be recorded in writing together with the names of every neutral included in the draw; the record shall be furnished to any party, and to any court, on request.",
                            ],
                        },
                    },
                    {
                        "title": "Challenge to Arbitrator Appointment and Disclosure Obligations",
                        "body": {
                            2018: [
                                "Before accepting an appointment, every arbitrator shall sign a statement of acceptance, availability, impartiality, and independence, make a written disclosure in the form set out in the Sixth Schedule to the Act, and subscribe to the Preamble of this Code. The Secretariat shall communicate the disclosure to the parties and fix a time within which they may comment on it. The duty of disclosure continues throughout the proceeding.",
                                "A person whose relationship with the parties, their counsel, or the subject matter of the dispute falls under any category in the Seventh Schedule to the Act is ineligible to be appointed, unless the parties, after the dispute has arisen, expressly waive this by an agreement in writing.",
                                "A party may challenge an arbitrator within fifteen days of becoming aware of the constitution of the tribunal or of the circumstances giving rise to the challenge, by a written statement of reasons. Unless the arbitrator withdraws or the other party agrees to the challenge, the tribunal shall decide on it in accordance with the Act.",
                            ],
                            2021: [
                                "Before accepting an appointment, every arbitrator shall sign a statement of acceptance, availability, impartiality, and independence, make a written disclosure in the form set out in the Sixth Schedule to the Act, and subscribe to the Preamble of this Code. The Secretariat shall communicate the disclosure to the parties and fix a time within which they may comment on it. The duty of disclosure continues throughout the proceeding.",
                                "A person whose relationship with the parties, their counsel, or the subject matter of the dispute falls under any category in the Seventh Schedule to the Act is ineligible to be appointed, unless the parties, after the dispute has arisen, expressly waive this by an agreement in writing.",
                                "A party may challenge an arbitrator within fifteen days of becoming aware of the constitution of the tribunal or of the circumstances giving rise to the challenge, by a written statement of reasons. Unless the arbitrator withdraws or the other party agrees to the challenge, the tribunal shall decide on it in accordance with the Act.",
                            ],
                            2026: [
                                "Before accepting an appointment, every arbitrator shall sign a statement of acceptance, availability, impartiality, and independence, make a written disclosure in the form set out in the Sixth Schedule to the Act, and subscribe to the Preamble of this Code. The Secretariat shall communicate the disclosure to the parties and fix a time within which they may comment on it. The duty of disclosure continues throughout the proceeding.",
                                "A person whose relationship with the parties, their counsel, or the subject matter of the dispute falls under any category in the Seventh Schedule to the Act is ineligible to be appointed, unless the parties, after the dispute has arisen, expressly waive this by an agreement in writing.",
                                "A party may challenge an arbitrator within fifteen days of becoming aware of the constitution of the tribunal or of the circumstances giving rise to the challenge, by a written statement of reasons. Unless the arbitrator withdraws or the other party agrees to the challenge, the tribunal shall decide on it in accordance with the Act.",
                                "Each party shall promptly disclose to the Secretariat, the tribunal, and the other parties the existence and identity of any person not a party who has agreed to fund its claim or defence and has an economic interest in the outcome, so that arbitrators can fulfil their duty of disclosure. After the tribunal has been constituted, no party shall enter into a funding arrangement that would give rise to a conflict of interest with a member of the tribunal, and the tribunal may take any funding arrangement into account in apportioning costs.",
                                "Each party shall promptly inform the Secretariat, the tribunal, and the other parties of any change in its representation. The tribunal may, after giving the parties an opportunity to comment, take any measure necessary to avoid a conflict of interest of an arbitrator arising from such a change, including excluding a new representative from the proceeding in whole or in part.",
                            ],
                        },
                    },
                    {
                        "title": "Termination and Replacement of Arbitrators",
                        "body": [
                            "The mandate of an arbitrator terminates where the arbitrator withdraws, where the parties so agree, where the arbitrator becomes unable to perform their functions or fails to act without undue delay, or on a successful challenge.",
                            "A substitute arbitrator shall be appointed by the same procedure that applied to the arbitrator being replaced. Unless the parties agree otherwise, hearings previously held may be repeated at the discretion of the tribunal.",
                        ],
                    },
                    {
                        "title": "Competence of Arbitral Tribunal to Rule on its Jurisdiction (Competence-Competence)",
                        "body": [
                            "The tribunal may rule on its own jurisdiction, including on any objection with respect to the existence or validity of the arbitration agreement. For this purpose, an arbitration clause shall be treated as an agreement independent of the other terms of the contract.",
                            "A plea that the tribunal does not have jurisdiction shall be raised not later than the submission of the statement of defence. A plea that the tribunal is exceeding the scope of its authority shall be raised as soon as the matter alleged to be beyond its authority is raised.",
                        ],
                    },
                ],
            },
            {
                "key": "emergency",
                "title": "Emergency Arbitration",
                "eds": NEW,
                "sections": [
                    {
                        "key": "emergency_app",
                        "title": "Application for Emergency Relief",
                        "body": [
                            "A party in need of urgent interim relief that cannot await the constitution of the arbitral tribunal may file an application for emergency relief with the Secretariat, whether before or after filing the request under this Code.",
                            "The application shall set out the names and contact details of the parties and their representatives; the agreement under which the dispute is referred; a description of the dispute and of the claims known at the time; the emergency measures sought; the reasons why they cannot await the constitution of the tribunal; why harm not adequately reparable by an award of damages is likely if they are refused, and how that harm outweighs the harm to the other party; and why the applicant has a reasonable possibility of success on the merits. It shall be accompanied by the emergency arbitrator's fee and the emergency administrative fee in full.",
                            "The applicant shall serve a copy of the application on every other party at the time of filing, unless it applies for, and justifies, relief without prior notice.",
                            "Where the application is made before the request for commencement, the applicant shall file the request within ten days of filing the application, failing which the Secretariat shall terminate the emergency proceeding.",
                            "This Chapter applies to every agreement that refers disputes to this Code, unless the parties have agreed to exclude it; and to an agreement made before this Code came into force only if the parties so agree. Nothing in it prevents a party from seeking interim measures from a court under Section 9 of the Act.",
                        ],
                    },
                    {
                        "title": "Appointment of Emergency Arbitrator",
                        "body": [
                            "The Secretariat shall appoint an emergency arbitrator from the Panel within two days of receiving a complete application.",
                            "Before accepting the appointment, the emergency arbitrator shall sign a statement of acceptance, availability, impartiality, and independence and make the written disclosure required by this Code. A challenge to the emergency arbitrator shall be made within one business day of the party being informed of the appointment, or of the circumstances giving rise to the challenge, and shall be decided by the Secretariat after giving the emergency arbitrator and the other parties an opportunity to comment.",
                            "If the emergency arbitrator is replaced, the substitute shall decide whether to resume the proceeding at the stage reached or to begin it again.",
                            "Unless the parties agree otherwise, the emergency arbitrator shall not act as an arbitrator in any subsequent arbitration relating to the dispute.",
                        ],
                    },
                    {
                        "title": "Emergency Proceedings and Timelines",
                        "body": [
                            "The emergency arbitrator shall, within two days of appointment, fix a schedule for the consideration of the application, which shall ordinarily be heard by video conference.",
                            "The emergency arbitrator shall have the powers of an arbitral tribunal under {ref:interim}, and may make an order subject to conditions, including the provision of appropriate security. The emergency arbitrator shall decide any objection to jurisdiction for the purposes of the application, without prejudice to the tribunal's later decision.",
                            "The order shall be in writing, dated, signed, and reasoned, and shall fix the costs of the emergency proceeding and which party shall bear them, subject to the final decision of the tribunal. It shall be made within fifteen days of appointment, which the Secretariat may extend on a reasoned request in exceptional circumstances.",
                            "Where giving notice would defeat the purpose of the relief, the applicant may seek a protective preliminary order, without notice to the other party, directing that party not to frustrate the relief sought. The emergency arbitrator shall decide the request within twenty-four hours of appointment. The applicant shall serve the application, the order, and all related communications on every other party within twelve hours of receiving the order, failing which the order lapses three days after it is made; and the other party shall be heard at the earliest opportunity, after which the emergency arbitrator may confirm, modify, or revoke it.",
                        ],
                    },
                    {
                        "title": "Enforceability and Modification of Emergency Orders",
                        "body": [
                            "An order of an emergency arbitrator binds the parties from the date it is made. The parties undertake to comply with it without delay.",
                            "In an arbitration seated in India, an order of an emergency arbitrator is an order under Section 17(1) of the Act and is enforceable under Section 17(2) of the Act, as held by the Supreme Court of India.",
                            "A party that obtains emergency relief shall immediately disclose any material change in the circumstances on which it was sought or granted. Before the tribunal is constituted, the emergency arbitrator may, on a reasoned request and after hearing the parties, modify or revoke the order.",
                            "The order does not bind the arbitral tribunal on any question decided in it. The tribunal, once constituted, may confirm, modify, or set aside the order, and shall decide any claim concerning compliance with it and the reallocation of its costs. The order ceases to bind the parties if a challenge to the emergency arbitrator is upheld, on the final award unless the tribunal decides otherwise, if the claim is withdrawn, or if the tribunal is not constituted within ninety days of the order.",
                        ],
                    },
                ],
            },
            {
                "title": "Arbitral Proceedings & Awards",
                "sections": [
                    {
                        "title": "Fast-Track and Expedited Arbitration Procedure",
                        "body": {
                            2018: [
                                "The parties may agree in writing, before or at the time of the constitution of the tribunal, that the arbitration be conducted under the fast-track procedure in Section 29B of the Act.",
                                "Under the fast-track procedure, the tribunal shall consist of a sole arbitrator, the dispute shall be decided on written pleadings, documents, and submissions unless the tribunal considers an oral hearing necessary, and the award shall be made within six months of the tribunal entering upon the reference.",
                                "Fees for fast-track arbitration are payable as provided in the Schedule of Fees.",
                            ],
                            2021: [
                                "The parties may agree in writing, before or at the time of the constitution of the tribunal, that the arbitration be conducted under the fast-track procedure in Section 29B of the Act.",
                                "Under the fast-track procedure, the tribunal shall consist of a sole arbitrator, the dispute shall be decided on written pleadings, documents, and submissions unless the tribunal considers an oral hearing necessary, and the award shall be made within six months of the tribunal entering upon the reference.",
                                "Fees for fast-track arbitration are payable as provided in the Schedule of Fees.",
                            ],
                            2026: [
                                "The parties may agree in writing, before or at the time of the constitution of the tribunal, that the arbitration be conducted under the fast-track procedure in Section 29B of the Act.",
                                "Under the fast-track procedure, the tribunal shall consist of a sole arbitrator, the dispute shall be decided on written pleadings, documents, and submissions unless the tribunal considers an oral hearing necessary, and the award shall be made within six months of the tribunal entering upon the reference.",
                                "Fees for fast-track arbitration are payable as provided in the Schedule of Fees.",
                                "In a fast-track arbitration, the tribunal shall hold the case management conference within fifteen days of its constitution; no party may make a new claim without the tribunal's leave; and the tribunal may, after consulting the parties, decline requests for document production and limit the number, length, and scope of written submissions and witness statements.",
                                "Where the amount in dispute does not exceed the small-claims limit fixed in the Schedule of Fees, the fast-track procedure shall apply unless a party objects in its first submission or the Secretariat, on a party's application, directs otherwise having regard to the complexity of the dispute. In such a case the award shall ordinarily be made within three months of the constitution of the tribunal, and fees shall be charged at the reduced rates fixed for small claims.",
                            ],
                        },
                    },
                    {
                        "title": "Making of Arbitral Award and Decision-Making",
                        "body": {
                            2018: [
                                "In a tribunal of more than one arbitrator, any decision shall be made by a majority. Questions of procedure may be decided by the presiding arbitrator if so authorised by the parties or the other arbitrators.",
                                "As soon as possible after the last hearing or the last authorised submission, the tribunal shall declare the proceedings closed as to the matters to be decided in the award and inform the Secretariat and the parties of the date by which it expects to submit its draft award. No further submission or evidence may be made after closure unless the tribunal requests or authorises it.",
                                "The award shall be made within twelve months from the date on which the tribunal enters upon the reference, which the parties may by consent extend by up to six months, in accordance with Section 29A of the Act.",
                            ],
                            2021: [
                                "In a tribunal of more than one arbitrator, any decision shall be made by a majority. Questions of procedure may be decided by the presiding arbitrator if so authorised by the parties or the other arbitrators.",
                                "As soon as possible after the last hearing or the last authorised submission, the tribunal shall declare the proceedings closed as to the matters to be decided in the award and inform the Secretariat and the parties of the date by which it expects to submit its draft award. No further submission or evidence may be made after closure unless the tribunal requests or authorises it.",
                                "In an arbitration other than an international commercial arbitration, the award shall be made within twelve months from the date of completion of pleadings, which the parties may by consent extend by up to six months, in accordance with Section 29A of the Act. In an international commercial arbitration, the tribunal shall endeavour to make the award within the same period.",
                            ],
                            2026: [
                                "In a tribunal of more than one arbitrator, any decision shall be made by a majority. Questions of procedure may be decided by the presiding arbitrator if so authorised by the parties or the other arbitrators.",
                                "As soon as possible after the last hearing or the last authorised submission, the tribunal shall declare the proceedings closed as to the matters to be decided in the award and inform the Secretariat and the parties of the date by which it expects to submit its draft award. No further submission or evidence may be made after closure unless the tribunal requests or authorises it.",
                                "In an arbitration other than an international commercial arbitration, the award shall be made within twelve months from the date of completion of pleadings, which the parties may by consent extend by up to six months, in accordance with Section 29A of the Act. In an international commercial arbitration, the tribunal shall endeavour to make the award within the same period.",
                                "The tribunal may, on a party's application and after hearing the parties, decide any issue of fact or law as a preliminary question, by a partial award under Section 31(6) of the Act or by an order, where the parties agree, where doing so is likely to save time or costs, or where the circumstances otherwise warrant it. A preliminary question so accepted shall be decided within ninety days of the application.",
                                "If, during the arbitration, the parties settle the dispute, including through mediation, an Adjudix Lok Adalat sitting, or the Med-Arb Protocol, the tribunal shall terminate the proceedings and, if requested by the parties, record the settlement as an arbitral award on agreed terms under Section 30 of the Act.",
                            ],
                        },
                    },
                    {
                        "title": "Form, Contents, and Dating of Award",
                        "body": {
                            2018: [
                                "The award shall be in writing and signed by the members of the tribunal, or by a majority with the reason for any omitted signature stated. It shall state the reasons on which it is based, unless the parties have agreed otherwise or the award is on agreed terms.",
                                "The award shall state its date and the seat of arbitration, and shall determine interest and costs in accordance with Sections 31(7) and 31A of the Act.",
                                "Before signing, the tribunal shall submit the draft award to the Secretariat, which may draw attention to matters of form without affecting the tribunal's liberty of decision. A signed copy shall be delivered to each party.",
                            ],
                            2021: [
                                "The award shall be in writing and signed by the members of the tribunal, or by a majority with the reason for any omitted signature stated. It shall state the reasons on which it is based, unless the parties have agreed otherwise or the award is on agreed terms.",
                                "The award shall state its date and the seat of arbitration, and shall determine interest and costs in accordance with Sections 31(7) and 31A of the Act.",
                                "Before signing, the tribunal shall submit the draft award to the Secretariat, which may draw attention to matters of form without affecting the tribunal's liberty of decision. A signed copy shall be delivered to each party.",
                            ],
                            2026: [
                                "The award shall be in writing and signed by the members of the tribunal, or by a majority with the reason for any omitted signature stated. It shall state the reasons on which it is based, unless the parties have agreed otherwise or the award is on agreed terms.",
                                "The award shall state its date and the seat of arbitration, and shall determine interest and costs in accordance with Sections 31(7) and 31A of the Act.",
                                "Before signing, the tribunal shall submit the draft award to the Secretariat for scrutiny. The Secretariat may require modifications as to the form of the award and, without affecting the tribunal's liberty of decision, may draw its attention to points of substance. The Secretariat shall complete its scrutiny within ten days so that no statutory time limit is put at risk. A signed copy of the award shall be delivered to each party.",
                            ],
                        },
                    },
                    {
                        "title": "Termination of Arbitral Proceedings",
                        "body": [
                            "The proceedings terminate with the final award, or by order of the tribunal where the claimant withdraws its claim (unless the respondent objects and the tribunal recognises a legitimate interest in a final settlement), where the parties agree to terminate them, or where the tribunal finds that their continuation has become unnecessary or impossible.",
                            "Where the parties fail to pay the deposits required under the Schedule of Fees, the tribunal may suspend or terminate the proceedings in respect of the claim or counter-claim concerned.",
                        ],
                    },
                    {
                        "title": "Correction, Interpretation, and Additional Awards",
                        "body": [
                            "Within thirty days of receiving the award, a party may, with notice to the other party, request the tribunal to correct any computational, clerical, or typographical error, or, if the parties so agree, to give an interpretation of a specific point or part of the award.",
                            "A party may, within the same period, request an additional award as to claims presented in the proceedings but omitted from the award.",
                            "The tribunal shall make the correction or give the interpretation within thirty days, and any additional award within sixty days, of receiving the request.",
                        ],
                    },
                ],
            },
        ],
    },
    {
        "title": "Mediation & Conciliation Procedures",
        "chapters": [
            {
                "title": "Mediation Procedure",
                "sections": [
                    {
                        "title": "Commencement of Mediation Proceedings",
                        "body": {
                            2018: [
                                "Mediation commences when a party's request for mediation is accepted by the other party, or on the date fixed by the parties' agreement to mediate.",
                                "Where the other party does not accept the request within fifteen days, the requesting party may treat the request as rejected.",
                            ],
                            2021: [
                                "Mediation commences when a party's request for mediation is accepted by the other party, or on the date fixed by the parties' agreement to mediate.",
                                "Where the other party does not accept the request within fifteen days, the requesting party may treat the request as rejected. Mediation sessions may be held in person or online.",
                            ],
                            2026: [
                                "Where the parties have agreed to mediate under this Code, mediation commences on the date the Secretariat receives a party's request for mediation. In any other case, it commences when the other party accepts the request. Mediation shall be conducted in accordance with this Code and the Mediation Act, 2023, to the extent applicable.",
                                "Where the other party does not accept the request within fifteen days, the requesting party may treat the request as rejected. Mediation sessions may be held in person or online.",
                                "Unless the parties agree to extend it, the mediation shall be completed within one hundred and twenty days of the first appearance before the mediator.",
                            ],
                        },
                    },
                    {
                        "title": "Selection, Appointment, and Independence of Mediator",
                        "body": [
                            "The parties may agree on a mediator from the Panel. Failing agreement within fifteen days, the Secretariat shall appoint a mediator having regard to the subject matter of the dispute.",
                            "Before accepting the appointment, the mediator shall sign a statement of acceptance, availability, impartiality, and independence, and disclose in writing any circumstance that may give rise to doubts as to their independence or impartiality. A party may object to an appointment made by the Secretariat within fifteen days of being notified of it, in which case the Secretariat shall appoint another mediator.",
                        ],
                    },
                    {
                        "title": "Conduct of Mediation Sessions and Private Caucuses",
                        "body": [
                            "The mediator may meet the parties jointly or separately, and may communicate with each party in private session.",
                            "Information given to the mediator in a private session shall not be disclosed to the other party without the consent of the party that gave it.",
                        ],
                    },
                    {
                        "title": "Role of Mediator and Facilitation Protocol",
                        "body": [
                            "The mediator shall assist the parties in an independent and impartial manner to reach an amicable settlement of their dispute, treating them with fairness. The mediator shall not impose a settlement.",
                            "After consulting the parties, the mediator shall promptly issue a written note setting out the manner in which the mediation will be conducted. Each party shall act in good faith throughout the mediation.",
                            "The mediator may, at the request of the parties, make suggestions as to options for settlement.",
                        ],
                    },
                    {
                        "title": "Mediated Settlement Agreement (MSA) and Finality",
                        "body": {
                            2018: [
                                "Where the parties reach a settlement, it shall be reduced to writing and signed by the parties and authenticated by the mediator.",
                                "Where the parties so agree, the settlement may be executed as a settlement agreement under Section 73 of the Act, so as to have the status and effect of an arbitral award on agreed terms under Section 74 of the Act.",
                                "Mediation terminates on the signing of a settlement agreement; on a party's written notice that it withdraws; on the mediator's written notice that, in the mediator's opinion, further efforts are unlikely to resolve the dispute; or on the expiry of the agreed period for the mediation. The Secretariat shall confirm the termination to the parties in writing.",
                            ],
                            2021: [
                                "Where the parties reach a settlement, it shall be reduced to writing and signed by the parties and authenticated by the mediator.",
                                "Where the parties so agree, the settlement may be executed as a settlement agreement under Section 73 of the Act, so as to have the status and effect of an arbitral award on agreed terms under Section 74 of the Act.",
                                "Mediation terminates on the signing of a settlement agreement; on a party's written notice that it withdraws; on the mediator's written notice that, in the mediator's opinion, further efforts are unlikely to resolve the dispute; or on the expiry of the agreed period for the mediation. The Secretariat shall confirm the termination to the parties in writing.",
                            ],
                            2026: [
                                "Where the parties reach a settlement, it shall be reduced to writing as a mediated settlement agreement, signed by the parties and authenticated by the mediator.",
                                "A mediated settlement agreement is final and binding on the parties and enforceable in accordance with the Mediation Act, 2023, to the extent applicable, or, where the parties so agree, may be executed as a settlement agreement under Section 73 of the Act with the status and effect provided by Section 74 of the Act.",
                                "Mediation terminates on the signing of a settlement agreement; on a party's written notice that it withdraws; on the mediator's written notice that, in the mediator's opinion, further efforts are unlikely to resolve the dispute; or on the expiry of the agreed period for the mediation. The Secretariat shall confirm the termination to the parties in writing.",
                            ],
                        },
                    },
                    {
                        "title": "Without-Prejudice Privilege and Confidentiality",
                        "body": [
                            "Every statement, proposal, admission, and document made or exchanged in mediation is made without prejudice and is confidential. The fact that a mediation is taking place is not confidential.",
                            "Unless the law requires otherwise, no party shall rely in any other proceeding on any view or suggestion made by another party regarding settlement, any admission made in the mediation, any proposal made by the mediator, or the fact that a party indicated its willingness to accept a proposal.",
                            "The mediator shall not act as an arbitrator, representative, or counsel of a party in any proceeding relating to the dispute, and shall not be presented as a witness, save as the law otherwise provides.",
                        ],
                    },
                ],
            },
            {
                "title": "Conciliation Procedure",
                "sections": [
                    {
                        "title": "Commencement of Conciliation and Notice",
                        "body": [
                            "A party initiating conciliation shall send the other party a written invitation to conciliate, briefly identifying the subject of the dispute.",
                            "Conciliation commences when the other party accepts the invitation in writing. If the other party rejects the invitation, or does not reply within thirty days, there shall be no conciliation proceeding.",
                        ],
                    },
                    {
                        "title": "Appointment and Role of Conciliators",
                        "body": [
                            "There shall be one conciliator unless the parties agree that there shall be two or three. The parties may agree on the conciliator from the Panel, failing which the Secretariat shall appoint the conciliator.",
                            "The conciliator shall assist the parties in an independent and impartial manner, guided by principles of objectivity, fairness, and justice, giving consideration to the rights and obligations of the parties and the circumstances surrounding the dispute.",
                        ],
                    },
                    {
                        "title": "Conciliator's Proposals for Settlement",
                        "body": [
                            "The conciliator may, at any stage of the proceedings, make proposals for a settlement of the dispute. Such proposals need not be in writing and need not be accompanied by reasons.",
                            "Where it appears to the conciliator that there exist elements of a settlement acceptable to the parties, the conciliator shall formulate the terms of a possible settlement and submit them to the parties for their observations.",
                        ],
                    },
                    {
                        "key": "conc_settlement",
                        "title": "Settlement Agreement and Enforceability",
                        "body": [
                            "Where the parties reach agreement, they shall draw up and sign a written settlement agreement, which the conciliator shall authenticate and furnish to each party.",
                            "The settlement agreement shall be final and binding on the parties and shall have the same status and effect as an arbitral award on agreed terms, in accordance with Sections 73 and 74 of the Act.",
                        ],
                    },
                    {
                        "title": "Termination of Conciliation Proceedings",
                        "body": [
                            "Conciliation terminates on the signing of the settlement agreement; by a written declaration of the conciliator, after consulting the parties, that further efforts are no longer justified; or by a written declaration of a party that the proceedings are terminated.",
                            "The conciliator shall not act as an arbitrator, representative, or counsel of a party in any arbitral or judicial proceeding in respect of the dispute, and views, proposals, and admissions made in conciliation shall not be relied on in any such proceeding.",
                        ],
                    },
                ],
            },
            {
                "key": "lok_adalat",
                # Inserted as Chapter X-A, Sections 50A-50C, so that the
                # client's index numbering (Sections 51-59) is preserved.
                "inserted": True,
                "title": "Adjudix Lok Adalat",
                "eds": NEW,
                "sections": [
                    {
                        "title": "Nature of the Adjudix Lok Adalat",
                        "body": [
                            "The Adjudix Lok Adalat is a confidential settlement sitting of one day, which the parties may convene at any stage of a proceeding under this Code. It is inspired by the spirit of the Lok Adalat, but is not a Lok Adalat organised under the Legal Services Authorities Act, 1987.",
                            "The sitting is conducted as a conciliation, and the provisions of this Code on conciliation apply to it, subject to this Chapter.",
                        ],
                    },
                    {
                        "title": "Appointment of the Lok Adalat Conciliator",
                        "body": [
                            "On a joint request of the parties, the Secretariat shall appoint a conciliator from the Panel who has had no previous involvement in the dispute, and shall fix the date of the sitting.",
                            "The conciliator shall make the disclosure required of a neutral under this Code and give a written undertaking of confidentiality before the sitting.",
                        ],
                    },
                    {
                        "title": "Confidential Proposals and Settlement",
                        "body": [
                            "Each party shall submit its proposal for settlement to the conciliator in a sealed or encrypted submission before the sitting. No proposal shall be disclosed to any other party, or to the neutral in the main proceeding.",
                            "On the day of the sitting, the conciliator may meet the parties separately and jointly, and may formulate terms of settlement on the basis of the proposals received.",
                            "A settlement reached at the sitting shall be recorded as a settlement agreement under {ref:conc_settlement} or, in an arbitration, as an award on agreed terms. If no settlement is reached, the main proceeding shall continue, and nothing said or submitted at the sitting shall be relied upon in it.",
                        ],
                    },
                ],
            },
        ],
    },
    {
        "key": "hybrid",
        "title": "Hybrid Processes (Med-Arb)",
        "eds": NEW,
        "chapters": [
            {
                "title": "Mediation-Arbitration (Med-Arb) Protocol",
                "sections": [
                    {
                        "title": "Initiation of Med-Arb Hybrid Proceedings",
                        "body": [
                            "The Med-Arb Protocol applies where the parties have agreed, before or after a dispute has arisen, to resolve the dispute by mediation followed, if settlement is not reached, by arbitration under this Code.",
                            "Med-Arb under this Code is of two kinds: (a) Same-Neutral Med-Arb, in which the person appointed as mediator continues, if the mediation fails, as the sole arbitrator; and (b) Separate-Neutral Med-Arb, in which the mediator does not serve as arbitrator and the Institute appoints a different person to arbitrate.",
                            "On registration of a Med-Arb proceeding, the Secretariat shall appoint a mediator and fix the period of the mediation phase, which shall not exceed sixty days unless the parties agree otherwise.",
                        ],
                    },
                    {
                        "title": "Transition from Mediation Phase to Arbitration Phase",
                        "body": [
                            "If the dispute, or any part of it, is not settled by the end of the mediation phase, or if a party earlier declares in writing that the mediation has failed, the proceeding shall continue as an arbitration under this Code in respect of the unsettled issues.",
                            "The date of commencement of the mediation phase shall be treated as the date of commencement of the arbitration for the purposes of limitation, to the extent permitted by law.",
                        ],
                    },
                    {
                        "title": "Dual Role of Neutral (Opt-In / Consent Requirements)",
                        "body": [
                            "The parties may choose, in their agreement or at any time before the mediation phase ends, either Same-Neutral Med-Arb or Separate-Neutral Med-Arb.",
                            "Where the agreement of the parties is silent on whether the mediator may act as arbitrator, the parties shall be deemed to have chosen Same-Neutral Med-Arb, and the mediator shall continue as the sole arbitrator in the arbitration phase, so that the arbitrator is acquainted with the negotiations that took place in the mediation phase.",
                            "In Separate-Neutral Med-Arb, the Institute shall appoint as arbitrator a person other than the mediator, in accordance with the appointment provisions of this Code.",
                            "By choosing, or being deemed to have chosen, Same-Neutral Med-Arb, each party agrees that the mediator may act as arbitrator in the same dispute and waives any objection to the arbitrator's appointment on the ground only of the arbitrator's earlier role as mediator.",
                        ],
                    },
                    {
                        "title": "Protection of Information Disclosed in Mediation Phase",
                        "body": [
                            "In Separate-Neutral Med-Arb, no information disclosed in the mediation phase, and in particular no information given in a private session, shall be placed before the arbitrator or relied upon in the arbitration phase, save with the consent of the party that disclosed it.",
                            "In Same-Neutral Med-Arb, the arbitrator may take into account the course of the negotiations in the mediation phase; but, so that each party may answer the case against it, the arbitrator shall, before the arbitration phase begins, disclose to all parties the substance of any confidential information received in private session which the arbitrator considers material to the dispute, and shall not rely on any such information that has not been so disclosed.",
                        ],
                    },
                    {
                        "title": "Consent Awards Resulting from Med-Arb Settlements",
                        "body": [
                            "Where the parties settle in the mediation phase, or in the arbitration phase, the settlement shall, at their request, be recorded by an arbitrator appointed for the purpose as an arbitral award on agreed terms under Section 30 of the Act, having the same status and effect as any other arbitral award.",
                        ],
                    },
                ],
            },
        ],
    },
    {
        "title": "Corporate & Commercial ADR",
        "chapters": [
            {
                "title": "Specialized Corporate ADR",
                "sections": [
                    {
                        "title": "Shareholder, Board, and Intra-Corporate Disputes",
                        "body": [
                            "Disputes between shareholders, between shareholders and the company, between directors, or among promoters, arising under a shareholders' agreement, articles of association, or joint venture agreement, may be referred under this Code to the extent that they are capable of settlement by arbitration or other ADR under the applicable law.",
                            "The Secretariat shall, where practicable, appoint neutrals with experience in corporate governance, and may propose mediation as a first step where the parties' continuing relationship is at stake.",
                        ],
                    },
                    {
                        "title": "Cross-Border and Multi-Jurisdictional Commercial ADR",
                        "body": [
                            "In an international commercial dispute, the parties may agree on the seat, the language, and the law applicable to the substance of the dispute and to the arbitration agreement. Failing agreement on the law applicable to the substance, the tribunal shall apply the rules of law it considers appropriate.",
                            "A sole or presiding arbitrator in an international commercial arbitration shall, where any party so requests, be of a nationality other than that of the parties.",
                        ],
                    },
                    {
                        "title": "High-Value Financial and M&A Dispute Resolution",
                        "body": [
                            "In disputes arising from financial transactions, mergers, acquisitions, and investments, including disputes over price adjustments, earn-outs, and warranty claims, the tribunal may, after consulting the parties, appoint an independent expert to determine specified accounting or valuation questions.",
                            "The tribunal may make such orders as are appropriate for the protection of commercially sensitive information, including confidentiality rings.",
                        ],
                    },
                    {
                        "title": "Intellectual Property and Technology Dispute Protocol",
                        "body": [
                            "In disputes concerning intellectual property, technology, licensing, and information systems, the Secretariat shall, where practicable, appoint neutrals with technical expertise relevant to the dispute.",
                            "The tribunal may order inspection of source code, systems, or products under protocols that protect trade secrets, and its award shall bind only the parties and shall not affect the validity of any intellectual property right as against third parties.",
                        ],
                    },
                ],
            },
        ],
    },
    {
        "title": "Enforcement, Costs, & Miscellaneous",
        "chapters": [
            {
                "title": "Implementation and Enforcement",
                "sections": [
                    {
                        "title": "Implementation and Enforcement of Awards and Settlements",
                        "body": {
                            2018: [
                                "The parties undertake to carry out every award and settlement without delay.",
                                "An award shall be enforced in accordance with Section 36 of the Act, in the same manner as if it were a decree of a court.",
                            ],
                            2021: [
                                "The parties undertake to carry out every award and settlement without delay.",
                                "An award shall be enforced in accordance with Section 36 of the Act, in the same manner as if it were a decree of a court. The filing of an application to set aside the award shall not by itself render it unenforceable, unless the court grants a stay.",
                            ],
                            2026: [
                                "The parties undertake to carry out every award, order, and settlement under this Code without delay.",
                                "An award shall be enforced in accordance with Section 36 of the Act, in the same manner as if it were a decree of a court. The filing of an application to set aside the award shall not by itself render it unenforceable, unless the court grants a stay.",
                                "At the request of a party, the Institute shall provide implementation support, which may include computation of the sum due with interest and costs, a structured demand for compliance, facilitation of negotiated compliance, identification of assets and of the appropriate forum for execution, and coordination of execution proceedings.",
                            ],
                        },
                    },
                    {
                        "title": "Recognition and Enforcement Outside India",
                        "body": {
                            2018: [
                                "On the request of a party, the Secretariat shall furnish certified copies of the award and the arbitration agreement, and such certificates as to the conduct of the proceeding as may be required for recognition and enforcement of the award in another country under the New York Convention.",
                            ],
                            2021: [
                                "On the request of a party, the Secretariat shall furnish certified copies of the award and the arbitration agreement, and such certificates as to the conduct of the proceeding as may be required for recognition and enforcement of the award in another country under the New York Convention.",
                            ],
                            2026: [
                                "The Institute supports the implementation of awards and settlements throughout the world. On the request of a party, the Secretariat shall furnish certified copies of the award and the arbitration agreement, certified translations, and such certificates as to the conduct of the proceeding as may be required for recognition and enforcement of the award in another country under the New York Convention.",
                                "Where a party so requests, the Institute shall coordinate recognition and enforcement abroad through counsel in the country concerned, at the cost of the requesting party.",
                            ],
                        },
                    },
                ],
            },
            {
                "title": "Costs & Fees",
                "sections": [
                    {
                        "title": "Fees of the Institute and of Neutrals",
                        # 2026: a counter-claim is charged as an independent claim (client, Oct 2026).
                        "body": {
                            2018: ["The filing fee, administrative fee, and the fees of arbitrators and other neutrals shall be as set out in the Schedule of Fees in force on the date of commencement of the proceeding.", "The tribunal and administrative fees shall be fixed on the basis of the claim or counter-claim, whichever is higher. For disputes that cannot be quantified, the Secretariat shall fix the fee having regard to the facts of the case.", "No neutral shall accept any fee or payment from a party other than through, or as directed by, the Secretariat."],
                            2021: ["The filing fee, administrative fee, and the fees of arbitrators and other neutrals shall be as set out in the Schedule of Fees in force on the date of commencement of the proceeding.", "The tribunal and administrative fees shall be fixed on the basis of the claim or counter-claim, whichever is higher. For disputes that cannot be quantified, the Secretariat shall fix the fee having regard to the facts of the case.", "No neutral shall accept any fee or payment from a party other than through, or as directed by, the Secretariat."],
                            2026: ["The filing fee, administrative fee, and the fees of arbitrators and other neutrals shall be as set out in the Schedule of Fees in force on the date of commencement of the proceeding.", "The tribunal and administrative fees shall be fixed on the basis of the claim. A counter-claim shall attract fees on the same pattern, as if it were an independent claim. For disputes that cannot be quantified, the Secretariat shall fix the fee having regard to the facts of the case.", "No neutral shall accept any fee or payment from a party other than through, or as directed by, the Secretariat."],
                        },
                    },
                    {
                        "title": "Deposits and Allocation of Costs",
                        # 2026: claimant covers a defaulting respondent's deposit; neutral picks the costs principle (client, Oct 2026).
                        "body": {
                            2018: ["The parties shall deposit the fees in the instalments set out in the Schedule of Fees, in equal shares unless the Schedule provides otherwise. Where a party fails to pay its share, the other party may pay it.", "The costs of the arbitration comprise the fees of the Institute and of the tribunal, the fees and expenses of any expert appointed by the tribunal, and the reasonable legal and other costs incurred by the parties.", "The tribunal shall, in its award, determine the costs of the arbitration and which party shall bear them, in accordance with Section 31A of the Act, having regard to the conduct of the parties, including the extent to which each has conducted the arbitration in an expeditious and cost-effective manner, the outcome, and any offer of settlement.", "Where all claims are withdrawn or the proceeding ends before a final award, the Secretariat shall fix the fees payable to the Institute and the neutral, and any refund due."],
                            2021: ["The parties shall deposit the fees in the instalments set out in the Schedule of Fees, in equal shares unless the Schedule provides otherwise. Where a party fails to pay its share, the other party may pay it.", "The costs of the arbitration comprise the fees of the Institute and of the tribunal, the fees and expenses of any expert appointed by the tribunal, and the reasonable legal and other costs incurred by the parties.", "The tribunal shall, in its award, determine the costs of the arbitration and which party shall bear them, in accordance with Section 31A of the Act, having regard to the conduct of the parties, including the extent to which each has conducted the arbitration in an expeditious and cost-effective manner, the outcome, and any offer of settlement.", "Where all claims are withdrawn or the proceeding ends before a final award, the Secretariat shall fix the fees payable to the Institute and the neutral, and any refund due."],
                            2026: ["The parties shall deposit the fees in the instalments set out in the Schedule of Fees, in equal shares unless the Schedule provides otherwise. Where the respondent fails to deposit its share, the claimant shall deposit it in order to continue the proceedings, subject to the final outcome of the matter.", "The costs of the arbitration comprise the fees of the Institute and of the tribunal, the fees and expenses of any expert appointed by the tribunal, and the reasonable legal and other costs incurred by the parties.", "The neutral shall, in the award, determine the costs and which party shall bear them, in accordance with Section 31A of the Act, and may apply (a) the loser-pays principle, (b) the principle of equal or proportional payment, or (c) the claimant-pays principle, as the neutral deems fit in the nature of the case, having regard to the conduct of the parties, including the extent to which each has conducted the proceeding in an expeditious and cost-effective manner, the outcome, and any offer of settlement.", "Where all claims are withdrawn or the proceeding ends before a final award, the Secretariat shall fix the fees payable to the Institute and the neutral, and any refund due."],
                        },
                    },
                ],
            },
            {
                "title": "Miscellaneous",
                "sections": [
                    {
                        "title": "Confidentiality and Publication",
                        "body": [
                            "The Institute, the neutral, and the parties shall keep confidential all matters relating to the proceeding, except the award where its disclosure is necessary for its implementation, enforcement, or a challenge to it, or as required by law.",
                            "The Institute may publish anonymised extracts of awards for educational purposes, unless a party objects within thirty days of the award.",
                        ],
                    },
                    {
                        "title": "Code of Ethics, Disqualification, and Grievance Redressal",
                        "body": [
                            "Every neutral shall comply with the Preamble of this Code. A neutral who breaches it may be removed from the Panel, in addition to any other consequence under this Code or the law.",
                            "Any party, neutral, or member who believes that this Code has been breached may file a written grievance with the Secretariat, which shall be considered and decided by a committee of the Institute independent of the proceeding concerned. The decision shall be communicated to the complainant in writing.",
                        ],
                    },
                    {
                        "title": "Exclusion of Liability",
                        "body": [
                            "No neutral, and neither the Institute nor any of its officers or staff, shall be liable to any person for any act or omission in connection with a proceeding under this Code, save for conscious and deliberate wrongdoing.",
                        ],
                    },
                    {
                        "title": "Amendments, Repeal, and Savings",
                        "body": {
                            2018: [
                                "The Institute may amend this Code from time to time. An amendment shall apply to proceedings commenced after it comes into force, unless the parties agree otherwise.",
                            ],
                            2021: [
                                "The Adjudix Code of ADR Procedure, {prev} is hereby superseded.",
                                "A proceeding commenced before this Code came into force shall continue under the Code in force at its commencement, unless the parties agree that this Code shall apply.",
                                "Where an agreement refers disputes to the Code of the Institute without specifying an edition, the edition in force on the date of commencement of the proceeding shall apply.",
                            ],
                            2026: [
                                "The Adjudix Code of ADR Procedure, {prev} is hereby superseded.",
                                "A proceeding commenced before this Code came into force shall continue under the Code in force at its commencement, unless the parties agree that this Code shall apply.",
                                "Where an agreement refers disputes to the Code of the Institute, or to the latest version of the Adjudix Code of ADR Procedure, without specifying an edition, the edition in force on the date of commencement of the proceeding shall apply.",
                            ],
                        },
                    },
                    {
                        "title": "Practice Directions",
                        "body": [
                            "The Secretariat may issue practice directions, consistent with this Code, on matters of procedure and administration. Practice directions shall be published before they take effect.",
                            "In all matters not expressly provided for in this Code, the Institute, the neutrals, and the parties shall act in the spirit of this Code and shall make every effort to ensure that every award and settlement is enforceable at law.",
                        ],
                    },
                ],
            },
        ],
    },
]
