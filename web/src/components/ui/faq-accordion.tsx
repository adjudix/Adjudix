import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

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
    <Accordion multiple={allowMultipleOpen}>
      {items.map((item) => (
        <AccordionItem key={item.question}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
