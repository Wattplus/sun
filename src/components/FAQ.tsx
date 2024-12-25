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
    <div className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Questions fréquentes
          </h2>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-xl border border-gray-200 px-6"
              >
                <AccordionTrigger className="text-lg font-semibold hover:text-green-600 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};