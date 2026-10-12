// The header search index: every page on the site, plus each section of the
// current rule book. Built on the server (in the root layout) so only the
// titles travel to the browser, not the full text of the Code.
import { CODE_EDITIONS } from "@/lib/code-editions";
import { getCodeText, sectionId } from "@/lib/code";
import { STUDENT_COURSES, enquiryHref } from "@/lib/training-tracks";

export interface SearchItem {
  title: string;
  href: string;
  group: string;
  /** Extra words people might search for. */
  keywords?: string;
}

const PAGES: SearchItem[] = [
  // Dispute resolution
  { group: "Dispute Resolution", title: "File a Dispute", href: "/odr/file", keywords: "start case claim complaint online" },
  { group: "Dispute Resolution", title: "Respond to a Dispute", href: "/odr/respond", keywords: "notice reply defence respondent" },
  { group: "Dispute Resolution", title: "Emergency Arbitration", href: "/dispute-resolution/emergency", keywords: "urgent interim relief injunction" },
  { group: "Dispute Resolution", title: "ADR Mechanisms", href: "/dispute-resolution", keywords: "services overview" },
  { group: "Dispute Resolution", title: "Arbitration", href: "/dispute-resolution/arbitration", keywords: "arbitrator award tribunal" },
  { group: "Dispute Resolution", title: "Mediation", href: "/dispute-resolution/mediation", keywords: "mediator settlement" },
  { group: "Dispute Resolution", title: "Conciliation", href: "/dispute-resolution/conciliation", keywords: "conciliator settlement" },
  { group: "Dispute Resolution", title: "Lok Adalat", href: "/dispute-resolution/lok-adalat", keywords: "settlement sitting" },
  { group: "Dispute Resolution", title: "Hybrid ADR (Med-Arb)", href: "/dispute-resolution/hybrid", keywords: "med-arb mediation arbitration" },
  { group: "Dispute Resolution", title: "Corporate Dispute Resolution", href: "/dispute-resolution/corporate", keywords: "company business commercial shareholder board" },
  { group: "Dispute Resolution", title: "Domestic Dispute Resolution", href: "/dispute-resolution/domestic", keywords: "india" },
  { group: "Dispute Resolution", title: "International Dispute Resolution", href: "/dispute-resolution/international", keywords: "cross-border foreign global" },
  { group: "Dispute Resolution", title: "Online Dispute Resolution (ODR)", href: "/odr", keywords: "online virtual e-portal" },
  { group: "Dispute Resolution", title: "Offline Dispute Resolution", href: "/dispute-resolution/offline", keywords: "in person physical" },
  { group: "Dispute Resolution", title: "Ad Hoc Platform", href: "/odr/ad-hoc", keywords: "ad-hoc" },
  { group: "Dispute Resolution", title: "Implementation of Orders & Awards", href: "/implementation", keywords: "enforcement execution recovery" },
  { group: "Dispute Resolution", title: "Rules & Fees Calculator", href: "/dispute-resolution/fees", keywords: "cost price charges fee schedule" },
  { group: "Dispute Resolution", title: "Free Consultation", href: "/contact?type=Free+Consultation#enquiry", keywords: "advice talk" },
  { group: "Dispute Resolution", title: "Portal Login", href: "/odr/portal", keywords: "sign in account" },
  { group: "Dispute Resolution", title: "ODR Help & FAQs", href: "/odr/help", keywords: "questions faq" },
  { group: "Dispute Resolution", title: "Security & Enforceability", href: "/odr/security", keywords: "data privacy valid" },

  // Practice areas
  { group: "Practice Areas", title: "Practice Areas", href: "/dispute-resolution/practice-areas", keywords: "specialised specialized panels categories streams" },
  { group: "Practice Areas", title: "Debt Recovery & Financial Claims", href: "/dispute-resolution/practice-areas/debt-recovery", keywords: "loan money invoice" },
  { group: "Practice Areas", title: "Property Disputes", href: "/dispute-resolution/practice-areas/property", keywords: "land title real estate" },
  { group: "Practice Areas", title: "Contractual Disputes", href: "/dispute-resolution/practice-areas/contractual", keywords: "contract breach" },
  { group: "Practice Areas", title: "Construction Disputes", href: "/dispute-resolution/practice-areas/construction", keywords: "builder project" },
  { group: "Practice Areas", title: "Intellectual Property Disputes", href: "/dispute-resolution/practice-areas/intellectual-property", keywords: "ip trademark copyright patent" },
  { group: "Practice Areas", title: "Employer–Employee Disputes", href: "/dispute-resolution/practice-areas/employment", keywords: "employment workplace job" },
  { group: "Practice Areas", title: "Tenancy Disputes", href: "/dispute-resolution/practice-areas/tenancy", keywords: "rent landlord tenant" },
  { group: "Practice Areas", title: "Insurance Claims", href: "/dispute-resolution/practice-areas/insurance", keywords: "claim policy" },
  { group: "Practice Areas", title: "Partnership Disputes", href: "/dispute-resolution/practice-areas/partnership", keywords: "partners firm" },

  // Rules
  { group: "Rules", title: "The Rule Book — Code of ADR Procedure", href: "/dispute-resolution/rules/code-of-procedure", keywords: "rules rulebook code procedure 2018 2021 2026" },
  { group: "Rules", title: "Rules & Governance", href: "/dispute-resolution/rules", keywords: "rules governance" },
  { group: "Rules", title: "Moral Code (Code of Conduct)", href: "/about/moral-code", keywords: "ethics conduct principles preamble" },
  { group: "Rules", title: "Online Procedure Handbook", href: "/dispute-resolution/rules/online-handbook" },
  { group: "Rules", title: "Offline Procedure Handbook", href: "/dispute-resolution/rules/offline-handbook" },
  { group: "Rules", title: "Model Clauses", href: "/dispute-resolution/model-clauses", keywords: "arbitration clause template" },
  { group: "Rules", title: "Contract & Clause Drafting", href: "/dispute-resolution/clause-drafting", keywords: "agreement draft" },

  // Training
  { group: "Training", title: "Training Institute", href: "/training", keywords: "learn education" },
  { group: "Training", title: "Professional Courses", href: "/training/courses", keywords: "course programme" },
  { group: "Training", title: "Student Courses", href: "/training/courses#student-courses", keywords: "students law college" },
  { group: "Training", title: "Scholarships", href: "/contact?type=Scholarship+Application#enquiry", keywords: "scholarship financial aid discount" },
  { group: "Training", title: "Apprenticeships & Internships", href: "/training/apprenticeships", keywords: "internship apprentice students" },
  { group: "Training", title: "Certification & Competence Framework", href: "/training/certification", keywords: "certificate credential" },
  { group: "Training", title: "Upcoming Courses", href: "/training/calendar", keywords: "calendar schedule dates" },
  { group: "Training", title: "Faculty", href: "/training/faculty", keywords: "teachers trainers" },
  { group: "Training", title: "ADR Overview Track", href: "/training/courses/adr-overview" },
  { group: "Training", title: "Arbitrator Track", href: "/training/courses/arbitrator" },
  { group: "Training", title: "Conciliator Track", href: "/training/courses/conciliator" },
  { group: "Training", title: "Mediator Track", href: "/training/courses/mediator" },
  { group: "Training", title: "Contract Drafting Track", href: "/training/courses/contract-drafting" },
  { group: "Training", title: "Hybrid ADR Track", href: "/training/courses/hybrid" },
  ...STUDENT_COURSES.map((course) => ({
    group: "Training",
    title: `${course.title} (Student Course)`,
    href: enquiryHref("Course Enrollment", "Student Course", course.title),
    keywords: "students",
  })),

  // People & membership
  { group: "People", title: "Our Professional Panel", href: "/panel", keywords: "arbitrators mediators advocates lawyers engineers chartered accountants" },
  { group: "People", title: "Our Esteemed Members", href: "/membership/directory", keywords: "members directory" },
  { group: "People", title: "Membership", href: "/membership", keywords: "join tiers" },
  { group: "People", title: "Fellow Membership", href: "/membership/fellow" },
  { group: "People", title: "Associate Membership", href: "/membership/associated" },
  { group: "People", title: "Affiliate Membership", href: "/membership/affiliated" },
  { group: "People", title: "Student Membership", href: "/membership/student" },
  { group: "People", title: "Special Honorary Membership", href: "/membership/honorary" },
  { group: "People", title: "Leadership & Governance", href: "/about/leadership", keywords: "director board" },

  // Knowledge
  { group: "Knowledge", title: "Knowledge Centre", href: "/knowledge" },
  { group: "Knowledge", title: "Blogs & Articles", href: "/knowledge/blog", keywords: "news posts" },
  { group: "Knowledge", title: "Research & Publications", href: "/knowledge/research" },
  { group: "Knowledge", title: "Events", href: "/events", keywords: "webinar seminar conference" },
  { group: "Knowledge", title: "Competitions", href: "/knowledge/competitions", keywords: "moot contest" },
  { group: "Knowledge", title: "Mock Arbitration", href: "/knowledge/competitions/mock-arbitration", keywords: "moot" },
  { group: "Knowledge", title: "Mock Conciliation", href: "/knowledge/competitions/mock-conciliation" },
  { group: "Knowledge", title: "Arbitral Award Writing", href: "/knowledge/competitions/award-writing" },
  { group: "Knowledge", title: "Blog / Article Writing Competition", href: "/knowledge/competitions/blog-writing" },

  // About
  { group: "About", title: "About Adjudix", href: "/about", keywords: "why us" },
  { group: "About", title: "Our Story", href: "/about/our-story", keywords: "history who we are" },
  { group: "About", title: "Annual Reports", href: "/about/annual-reports" },
  { group: "About", title: "Our Partners", href: "/partners", keywords: "partnership" },
  { group: "About", title: "Corporate Partners", href: "/partners/corporate" },
  { group: "About", title: "Education Partners", href: "/partners/education", keywords: "universities colleges" },
  { group: "About", title: "Training Partners", href: "/partners/training" },
  { group: "About", title: "Contact Us", href: "/contact", keywords: "email phone address query" },
  { group: "About", title: "Careers at Adjudix", href: "/contact?type=Careers+at+Adjudix#enquiry", keywords: "jobs hiring" },
  { group: "About", title: "Privacy Policy", href: "/privacy" },
  { group: "About", title: "Terms & Conditions", href: "/terms" },
];

export function buildSearchIndex(): SearchItem[] {
  const current = CODE_EDITIONS.find((edition) => edition.current)!;
  const code = getCodeText(current.year)!;
  const sections: SearchItem[] = code.parts.flatMap((part) =>
    part.chapters.flatMap((chapter) =>
      chapter.sections.map((section) => ({
        group: `Rule Book ${current.year}`,
        title: `§ ${section.no} ${section.title}`,
        href: `/dispute-resolution/rules/code-of-procedure/${current.year}#${sectionId(section.no)}`,
        keywords: chapter.title,
      })),
    ),
  );
  return [...PAGES, ...sections];
}
