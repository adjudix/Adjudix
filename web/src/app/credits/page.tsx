import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Site Credits",
  description:
    "This website was designed, built, and is maintained by Kapivic — a software studio that builds digital systems for institutions, legal practices, and businesses.",
  path: "/credits",
});

const KAPIVIC_URL = "https://www.kapivic.com/";
const KAPIVIC_WHATSAPP_URL =
  "https://wa.me/919893978973?text=Hi!%20I%20found%20you%20through%20the%20Adjudix%20website%20and%20would%20like%20to%20discuss%20a%20project.";

const VALUE_PROPS = [
  { title: "Built for Trust", body: "Clear, credible design for institutions whose reputation is the product" },
  { title: "Confidential by Design", body: "Secure handling of documents, enquiries, and personal data" },
  { title: "Rule-Driven", body: "Procedures, fee schedules, and forms that follow your rules exactly" },
];

// The website itself, presented as a matter on the docket.
const DOCKET = [
  "Online filing & response forms",
  "Fee schedule with live calculator",
  "Code of Procedure — 3 editions",
  "Panel & member directory",
  "Knowledge Centre articles",
];

const BAR_HIGHLIGHTS = ["Precise", "Confidential", "Responsive", "On Schedule"];

const PROCESS = [
  {
    step: "01",
    title: "Brief",
    body: "We study how the institution actually works — its mechanisms, rules, fee structure, and the people who use it — before a single page is designed.",
  },
  {
    step: "02",
    title: "Build",
    body: "Design and development in reviewable stages. Every round of the client's feedback, down to the wording of a single clause, is worked through and signed off.",
  },
  {
    step: "03",
    title: "Support",
    body: "Hosting, updates, and new features after launch. Adjudix's site keeps evolving as the institute grows — that is this stage.",
  },
];

const SERVICES = [
  {
    title: "Institutional & Legal Websites",
    body: "Websites for ADR centres, law firms, chambers, and professional bodies — authoritative, accessible, and easy for the secretariat to keep current.",
  },
  {
    title: "Case & Client Portals",
    body: "Online filing, document exchange, status tracking, and secure messaging, built around the institution's own procedure.",
  },
  {
    title: "Forms, Fees & Automation",
    body: "Enquiry and filing forms routed to the right inbox, fee calculators that follow a published schedule, and automated notices and reminders.",
  },
  {
    title: "Documents & Publications",
    body: "Rules, codes, handbooks, and reports published as polished web pages and downloadable PDFs from a single source.",
  },
  {
    title: "Custom Software",
    body: "Membership platforms, dashboards, and internal tools designed around a specific organisation, not a generic package.",
  },
  {
    title: "Search & Digital Presence",
    body: "SEO, social previews, and content strategy for institutions that need to be found, not just built.",
  },
];

const INDUSTRIES = [
  "ADR & Arbitration Centres",
  "Law Firms & Chambers",
  "Professional Bodies",
  "Associations & Nonprofits",
  "Education & Training",
  "Real Estate",
  "Healthcare",
  "Fintech",
  "Logistics",
  "E-Commerce",
  "SaaS",
  "Retail",
];

const ADJUDIX_FEATURES = [
  "Dispute filing and response forms, with document uploads, delivered straight to the Secretariat",
  "The complete fee schedule with a calculator for sole or three-member tribunals and fast-track matters",
  "The Adjudix Code of ADR Procedure in its 2018, 2021, and 2026 editions, as downloadable PDFs",
  "Panel and membership directories that present arbitrators by merit while protecting their identities",
  "A Knowledge Centre of articles on arbitration, mediation, and hybrid ADR",
  "A mobile-first layout, site-wide SEO, and social previews",
];

const externalButton = (variant: "primary" | "secondaryInverse") =>
  buttonVariants({ variant, size: "lg" });

export default function CreditsPage() {
  return (
    <main className="bg-canvas flex-1">
      <section className="bg-hero px-6 pt-14 text-text-on-hero md:pt-20">
        <Reveal className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/kapivic-logo.png"
                alt="Kapivic"
                width={545}
                height={569}
                className="size-11 rounded-md bg-white p-1"
              />
              <div>
                <p className="font-heading text-lg font-semibold leading-tight">Kapivic</p>
                <p className="font-body text-xs text-text-on-hero-muted">Core Private Limited</p>
              </div>
            </div>
            <span className="mt-8 block font-mono text-xs tracking-widest uppercase text-primary">
              This Website
            </span>
            <h1 className="mt-3 font-heading text-3xl font-semibold text-balance md:text-5xl">
              Built by Kapivic.
            </h1>
            <p className="mt-4 max-w-lg font-body text-lg text-text-on-hero-muted">
              The Adjudix website, from its filing forms to its fee calculator and Code of Procedure,
              was designed, built, and is maintained by Kapivic, a software studio that builds digital
              systems for institutions that run on rules and trust.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={KAPIVIC_URL} target="_blank" rel="noopener noreferrer" className={externalButton("primary")}>
                Visit Kapivic →
              </a>
              <a
                href={KAPIVIC_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={externalButton("secondaryInverse")}
              >
                Chat on WhatsApp
              </a>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {VALUE_PROPS.map((item) => (
                <div key={item.title} className="border-l-2 border-primary pl-3">
                  <p className="font-heading text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-left font-body text-xs text-text-on-hero-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-lg bg-canvas p-6 text-foreground shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="font-mono text-[0.7rem] tracking-widest uppercase text-muted-foreground">
                  Case No. KPV/WEB/2026
                </p>
                <p className="mt-2 font-heading text-lg font-semibold">
                  In the matter of the Adjudix website
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 font-mono text-[0.7rem] font-semibold text-primary">
                Live
              </span>
            </div>
            <ul className="mt-5 flex flex-col gap-3">
              {DOCKET.map((item) => (
                <li key={item} className="flex items-center gap-3 font-body text-sm">
                  <span
                    className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[0.65rem] text-primary-foreground"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
              <div>
                <p className="font-mono text-[0.7rem] tracking-widest uppercase text-muted-foreground">Order</p>
                <p className="mt-1 font-heading text-sm font-semibold">Delivered & maintained</p>
              </div>
              <div
                className="flex size-20 -rotate-12 flex-col items-center justify-center rounded-full border-2 border-double border-primary font-mono text-[0.6rem] font-bold tracking-widest text-primary"
                aria-hidden="true"
              >
                <span>KAPIVIC</span>
                <span>★ BUILT ★</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-3 border-t border-border-on-hero py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {BAR_HIGHLIGHTS.map((item) => (
              <span key={item} className="font-mono text-xs tracking-widest uppercase text-text-on-hero-muted">
                {item}
              </span>
            ))}
          </div>
          <p className="font-body text-xs text-text-on-hero-muted">
            <span className="text-text-on-hero">www.kapivic.com</span> · We code. We create. We automate.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <span className="font-mono text-xs tracking-widest uppercase text-primary">How They Work</span>
          <h2 className="mt-3 font-heading text-2xl font-semibold text-text md:text-3xl">
            From the first brief to ongoing support
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {PROCESS.map((item, index) => (
            <Reveal key={item.step} delay={index * 90} className="rounded-lg border border-border bg-surface p-6">
              <span className="font-mono text-sm font-semibold text-primary">{item.step}</span>
              <h3 className="mt-3 font-heading text-lg font-semibold text-text">{item.title}</h3>
              <p className="mt-2 font-body text-sm text-text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="font-mono text-xs tracking-widest uppercase text-primary">What They Build</span>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-text md:text-3xl">
              Digital systems for institutions and practices
            </h2>
            <p className="mt-3 max-w-2xl font-body text-text-muted">
              This site is one project among several. Kapivic&apos;s work spans:
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <Reveal key={service.title} delay={index * 70} className="rounded-lg border border-border bg-canvas p-6">
                <h3 className="font-heading text-base font-semibold text-text">{service.title}</h3>
                <p className="mt-2 font-body text-sm text-text-muted">{service.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reveal className="mx-auto max-w-6xl px-6 py-16">
        <span className="font-mono text-xs tracking-widest uppercase text-primary">
          Industries They&apos;ve Worked In
        </span>
        <div className="mt-5 flex flex-wrap gap-2">
          {INDUSTRIES.map((industry) => (
            <span
              key={industry}
              className="rounded-full border border-border px-3.5 py-1.5 font-body text-sm text-text-muted"
            >
              {industry}
            </span>
          ))}
        </div>
      </Reveal>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <span className="font-mono text-xs tracking-widest uppercase text-primary">Built for Adjudix</span>
          <h2 className="mt-3 font-heading text-2xl font-semibold text-text md:text-3xl">
            What&apos;s actually running here
          </h2>
        </Reveal>
        <ul className="mt-8 grid gap-x-10 border-t border-border md:grid-cols-2">
          {ADJUDIX_FEATURES.map((feature, index) => (
            <Reveal key={feature} delay={index * 60}>
              <li className="flex gap-3 border-b border-border py-4 font-body text-sm text-text">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {feature}
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-hero px-6 py-16 text-text-on-hero">
        <Reveal className="mx-auto flex max-w-5xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="max-w-lg font-heading text-2xl font-semibold text-balance md:text-3xl">
              Need a website like this for your institution or practice?
            </h2>
            <p className="mt-2 max-w-md font-body text-text-on-hero-muted">
              Kapivic designs, builds, and hosts these systems end to end.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a href={KAPIVIC_URL} target="_blank" rel="noopener noreferrer" className={externalButton("primary")}>
              Talk to Kapivic →
            </a>
            <a
              href={KAPIVIC_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={externalButton("secondaryInverse")}
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
