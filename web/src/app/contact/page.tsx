import { PageHeader } from "@/components/layout/page-header";
import { QueryForm } from "@/components/patterns/query-form";
import { COURSE_OPTIONS } from "@/lib/training-tracks";

// Mail IDs by purpose, as confirmed by the client (domain adjudixADR.com).
const MAILBOXES = [
  { team: "Secretariat", purpose: "For all formal communications", email: "secretariat@adjudixadr.com" },
  { team: "HR", purpose: "For relationship building", email: "hr@adjudixadr.com" },
  { team: "Customer Support", purpose: "For any help or support", email: "support@adjudixadr.com" },
  { team: "Director", purpose: "Only in an emergency", email: "director@adjudixadr.com" },
];

// Every service the Institute offers, grouped, so each query reaches the
// right team. Course and student queries open follow-up fields.
const QUERY_GROUPS = [
  {
    label: "Disputes",
    options: [
      "File a Dispute",
      "Respond to a Dispute",
      "Emergency Arbitration",
      "Corporate / Commercial Dispute",
      "Implementation of an Order or Award",
      "Free Consultation",
    ],
  },
  { label: "Drafting", options: ["Contract / Clause Drafting", "Model Clauses"] },
  {
    label: "Training & Careers",
    options: [
      "Course Enrollment",
      "Scholarship Application",
      "Certification",
      "Internship",
      "Apprenticeship",
      "Moots & Competitions",
    ],
  },
  {
    label: "Join Adjudix",
    options: [
      "Join as Panelist / Arbitrator / Mediator",
      "Membership Application",
      "Faculty / Guest Lecture",
      "Careers at Adjudix",
    ],
  },
  {
    label: "Other",
    options: [
      "Partnership Inquiry",
      "Events & Webinars",
      "Research & Publications",
      "Media / Press",
      "Feedback or Grievance",
      "General Contact Query",
    ],
  },
];

const COURSE_QUERIES = ["Course Enrollment", "Scholarship Application", "Certification"];
const STUDENT_QUERIES = ["Internship", "Apprenticeship", "Moots & Competitions"];
const PROFESSION_QUERIES = ["Join as Panelist / Arbitrator / Mediator", "Faculty / Guest Lecture"];
const DISPUTE_QUERIES = ["File a Dispute", "Respond to a Dispute", "Emergency Arbitration", "Free Consultation"];

const PROFESSIONS = [
  "Advocate",
  "Chartered Accountant",
  "Company Secretary",
  "Civil Engineer",
  "IT Engineer",
  "Retired Judge / Officer",
  "Other Professional",
];

const PRACTICE_AREAS = [
  "Debt Recovery & Financial Claims",
  "Property",
  "Contractual",
  "Construction",
  "Intellectual Property",
  "Employer–Employee",
  "Tenancy",
  "Insurance",
  "Partnership",
  "Other / Not sure",
];

const ALL_QUERIES = QUERY_GROUPS.flatMap((group) => group.options);

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  // Links such as "Apply for Scholarship" pre-select the query and course.
  const params = await searchParams;
  const one = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
  const type = ALL_QUERIES.includes(one(params.type) ?? "") ? one(params.type) : undefined;
  const level = one(params.level) && COURSE_OPTIONS[one(params.level)!] ? one(params.level) : undefined;
  const course = level && COURSE_OPTIONS[level].includes(one(params.course) ?? "") ? one(params.course) : undefined;

  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Contact"
        title="Contact Us"
        intro="One form, routed to the right team — whether you're filing a dispute, joining our panel, enrolling in training, or just have a question."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-heading text-xl font-semibold text-text">Get in touch</h2>
            <dl className="mt-6 flex flex-col gap-5 font-body text-sm text-text-muted">
              {MAILBOXES.map((box) => (
                <div key={box.email}>
                  <dt className="font-medium text-text">{box.team}</dt>
                  <dd className="mt-0.5">{box.purpose}</dd>
                  <dd>
                    <a href={`mailto:${box.email}`} className="text-primary hover:underline">
                      {box.email}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div id="enquiry" className="scroll-mt-24 md:scroll-mt-64">
            <QueryForm
              key={`${type}|${level}|${course}`}
              formName="Contact enquiry"
              fields={[
                {
                  name: "queryType",
                  label: "Type of query",
                  type: "select",
                  required: true,
                  optionGroups: QUERY_GROUPS,
                  defaultValue: type,
                },
                {
                  name: "courseLevel",
                  label: "Course type",
                  type: "select",
                  required: true,
                  options: Object.keys(COURSE_OPTIONS),
                  showWhen: { field: "queryType", values: COURSE_QUERIES },
                  defaultValue: level,
                },
                {
                  name: "course",
                  label: "Course",
                  type: "select",
                  required: true,
                  optionsFrom: { field: "courseLevel", map: COURSE_OPTIONS },
                  showWhen: { field: "queryType", values: COURSE_QUERIES },
                  defaultValue: course,
                },
                {
                  name: "institution",
                  label: "College / University",
                  required: true,
                  showWhen: { field: "queryType", values: STUDENT_QUERIES },
                },
                {
                  name: "studyYear",
                  label: "Course and year of study (e.g. B.A. LL.B., 3rd year)",
                  showWhen: { field: "queryType", values: STUDENT_QUERIES },
                },
                {
                  name: "profession",
                  label: "Your profession",
                  type: "select",
                  required: true,
                  options: PROFESSIONS,
                  showWhen: { field: "queryType", values: PROFESSION_QUERIES },
                },
                {
                  name: "practiceArea",
                  label: "Nature of the dispute",
                  type: "select",
                  options: PRACTICE_AREAS,
                  showWhen: { field: "queryType", values: DISPUTE_QUERIES },
                },
                { name: "location", label: "City / Location (optional)" },
              ]}
              submitLabel="Submit Query"
              successTitle="Query received"
              successBody="Thank you — your query has been routed to the right team and we'll be in touch shortly."
            />
          </div>
        </div>
      </section>
    </main>
  );
}
