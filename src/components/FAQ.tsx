import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "Combien coûte une installation photovoltaïque ?",
    answer: "Le coût d'une installation photovoltaïque varie en fonction de plusieurs facteurs : la surface disponible, la puissance souhaitée et le type de panneaux choisis. En moyenne, une installation résidentielle coûte entre 8 000€ et 15 000€, avec un retour sur investissement en 6-8 ans grâce aux économies d'énergie et aux aides de l'État.",
  },
  {
    question: "Quelles sont les aides disponibles ?",
    answer: "Plusieurs aides financières sont disponibles pour votre projet solaire : la prime à l'autoconsommation (jusqu'à 380€/kWc), MaPrimeRénov' (jusqu'à 2 000€), la TVA à 10% sur l'installation, et les aides régionales spécifiques. Notre équipe vous accompagne dans toutes les démarches administratives pour maximiser vos aides.",
  },
  {
    question: "Combien de temps dure l'installation ?",
    answer: "L'installation complète est réalisée en 48h par nos équipes certifiées. Ce délai comprend la pose des panneaux, le raccordement électrique et la mise en service. Nous nous engageons à minimiser les perturbations pour votre quotidien tout en garantissant une installation de qualité.",
  },
  {
    question: "Quelle est la durée de vie des panneaux solaires ?",
    answer: "Nos panneaux solaires premium sont garantis 25 ans avec une performance optimale. Leur durée de vie effective peut s'étendre jusqu'à 30-35 ans avec un bon entretien. Nous assurons un suivi régulier et une maintenance préventive pour maximiser la longévité de votre installation.",
  },
];

export const FAQ = () => {
  return (
    <div className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            Questions fréquentes
          </h2>
          <p className="text-xl text-gray-600">
            Tout ce que vous devez savoir sur l'énergie solaire
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="group bg-white rounded-xl border border-gray-200 px-6 shadow-lg shadow-gray-100/50 transition-all duration-200 hover:shadow-xl"
              >
                <AccordionTrigger className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center p-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full">
            <Button
              size="lg"
              className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-6 text-lg rounded-full relative group transition-all duration-300 hover:scale-[0.98]"
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                Demandez votre étude gratuite
              </span>
              <ArrowRight className="ml-2 h-5 w-5 text-green-600 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Sans engagement • Réponse sous 24h
          </p>
        </div>
      </div>
    </div>
  );
};