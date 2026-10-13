import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { JsonLd } from "@/components/seo/json-ld";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  items: FaqItem[];
  allowMultipleOpen?: boolean;
}

export function FaqAccordion({ items, allowMultipleOpen = false }: FaqAccordionProps) {
  return (
    <>
      <Accordion multiple={allowMultipleOpen}>
        {items.map((item) => (
          <AccordionItem key={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {/* The same questions and answers, as FAQPage structured data. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
    </>
  );
}
