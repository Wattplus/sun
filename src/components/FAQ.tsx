import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Combien coûte une installation photovoltaïque ?",
    answer: "Le coût d'une installation photovoltaïque varie en fonction de plusieurs facteurs : la surface disponible, la puissance souhaitée et le type de panneaux choisis. Contactez-nous pour obtenir un devis personnalisé gratuit.",
  },
  {
    question: "Quelles sont les aides disponibles ?",
    answer: "Vous pouvez bénéficier jusqu'à 8000€ d'aides de l'État, incluant la prime à l'autoconsommation et les différentes subventions régionales. Notre équipe vous accompagne dans toutes les démarches administratives.",
  },
  {
    question: "Combien de temps dure l'installation ?",
    answer: "L'installation complète est réalisée en 48h par nos équipes certifiées. Ce délai peut varier légèrement selon la complexité de votre projet.",
  },
  {
    question: "Quelle est la durée de vie des panneaux solaires ?",
    answer: "Nos panneaux solaires sont garantis 25 ans avec une performance optimale. Leur durée de vie peut s'étendre jusqu'à 30-35 ans avec un bon entretien.",
  },
];

export const FAQ = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Questions fréquentes
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};