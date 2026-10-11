import { PracticeAreaPage } from "@/components/patterns/practice-area-page";

export default function Page() {
  return (
    <PracticeAreaPage
      title="Intellectual Property Disputes"
      intro="Licensing, infringement, and ownership disputes over patents, trademarks, copyright, and trade secrets, heard by panelists with genuine IP subject-matter experience."
      qualifies={[
        "Licensing and royalty disagreements",
        "Alleged infringement of a patent, trademark, or copyright",
        "Ownership disputes over IP created under a commercial or employment relationship",
        "Confidentiality and trade-secret disputes",
      ]}
    />
  );
}
