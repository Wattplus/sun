import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqItems } from "./mockData";

export const FAQSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="p-6 glass-card">
        <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          Questions fréquentes
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-primary/10">
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
    </motion.div>
  );
};