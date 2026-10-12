import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/layout/cta-band";
import { applyHref } from "@/lib/apply-forms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Faculty",
  description:
    "Adjudix's course faculty is drawn from practicing arbitrators, conciliators, mediators, and subject-matter specialists across our practice areas.",
  path: "/training/faculty",
});

export default function FacultyPage() {
  return (
    <main className="bg-canvas flex-1">
      <PageHeader
        eyebrow="Training Institute"
        title="Faculty"
        breadcrumbs={[{ label: "Training Institute", href: "/training" }, { label: "Faculty" }]}
        intro="Adjudix's course faculty is drawn from practicing arbitrators, conciliators, mediators, and subject-matter specialists across our practice areas."
      />

      <CtaBand
        title="Interested in teaching a module?"
        description="Practicing arbitrators, conciliators, and mediators can apply to join our faculty."
        primary={{ label: "Apply to Teach", href: applyHref("faculty") }}
        secondary={{ label: "Browse Courses", href: "/training/courses" }}
      />
    </main>
  );
}
