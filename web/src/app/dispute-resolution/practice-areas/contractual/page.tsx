import { PracticeAreaPage } from "@/components/patterns/practice-area-page";

export default function Page() {
  return (
    <PracticeAreaPage
      title="Contractual Disputes"
      intro="Breach, interpretation, and performance disagreements arising from any commercial contract — the broadest and most common category Adjudix administers."
      qualifies={[
        "Alleged breach of a commercial contract's terms",
        "Disagreements over contract interpretation",
        "Disputes over performance, delay, or quality of delivery",
        "Termination and post-termination disputes",
      ]}
    />
  );
}
