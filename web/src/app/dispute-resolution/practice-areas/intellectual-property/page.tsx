import { PracticeAreaPage } from "@/components/patterns/practice-area-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Intellectual Property Disputes",
  description:
    "Licensing, infringement, and ownership disputes over patents, trademarks, copyright, and trade secrets, heard by panelists with genuine IP subject-matter…",
  path: "/dispute-resolution/practice-areas/intellectual-property",
});

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
