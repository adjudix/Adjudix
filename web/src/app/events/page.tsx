import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";

export default function EventsPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Events"
        title="Upcoming & Past Events"
        intro="CPD-style events, courses, and Adjudix's flagship annual conference, browsable by date once scheduled."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-8">
            <h2 className="font-heading text-lg font-semibold text-text">Upcoming Events</h2>
            <p className="mt-2 font-body text-sm text-text-muted">
              No events are currently scheduled. Register your interest and we&apos;ll notify you
              as soon as dates are confirmed.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-8">
            <h2 className="font-heading text-lg font-semibold text-text">Past Events</h2>
            <p className="mt-2 font-body text-sm text-text-muted">
              As a newly founded institute, Adjudix has no past events archive yet — check back
              after our first events are held.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-xl font-semibold text-text">
            Our flagship conference
          </h2>
          <p className="mt-3 font-body text-text-muted">
            Adjudix is planning an annual flagship conference, in the tradition of the sector&apos;s
            established institutes. Details will be announced here once confirmed.
          </p>
        </div>
      </section>

      <CtaBand
        title="Want to be notified?"
        primary={{ label: "Register Interest", href: "/contact" }}
        secondary={{ label: "Browse Training Courses", href: "/training/courses" }}
      />
    </main>
  );
}
