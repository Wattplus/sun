import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
}

export const FAQSection = ({ items }: FAQSectionProps) => {
  return (
    <Card className="p-6 glass-card">
      <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-primary" />
        Questions fréquentes
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-white hover:text-primary">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-white/80">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};