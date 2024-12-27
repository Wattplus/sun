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
    question: "Quelle est la TVA applicable et les aides financières disponibles pour l'installation de panneaux solaires ?",
    answer: "La TVA est de 10% pour l'installation de panneaux solaires sur les logements de plus de 2 ans. Plusieurs aides sont disponibles : MaPrimeRénov', la prime à l'autoconsommation, et des aides régionales spécifiques. Notre équipe vous accompagne dans toutes les démarches pour maximiser vos aides.",
  },
  {
    question: "Quel est la rentabilité des panneaux solaires ?",
    answer: "La rentabilité dépend de plusieurs facteurs : l'ensoleillement de votre région, votre consommation électrique, et le coût initial de l'installation. En moyenne, le retour sur investissement est de 6 à 8 ans, avec des économies pouvant atteindre 40% sur vos factures d'électricité.",
  },
  {
    question: "Quelle est la durée de garantie et la durée de vie d'un panneau solaire ?",
    answer: "Nos panneaux solaires sont garantis 25 ans avec une performance optimale. Leur durée de vie effective peut s'étendre jusqu'à 30-35 ans avec un bon entretien. Nous assurons un suivi régulier et une maintenance préventive pour maximiser la longévité de votre installation.",
  },
  {
    question: "Comment fonctionne une centrale photovoltaïque ?",
    answer: "Une centrale photovoltaïque convertit la lumière du soleil en électricité grâce aux cellules photovoltaïques des panneaux. Cette électricité est ensuite convertie en courant alternatif par un onduleur pour être utilisée dans votre maison ou revendue au réseau.",
  },
  {
    question: "Les panneaux solaires sont-ils performants lorsqu'il fait gris ?",
    answer: "Oui, les panneaux solaires fonctionnent même par temps nuageux, bien qu'avec un rendement moindre. Ils captent la lumière diffuse et continuent de produire de l'électricité. La production annuelle prend en compte ces variations météorologiques dans les calculs de rentabilité.",
  },
  {
    question: "Qu'est-ce que le Label RGE et quelles sont ses garanties ?",
    answer: "Le label RGE (Reconnu Garant de l'Environnement) est une certification obligatoire pour les installateurs de panneaux solaires. Il garantit le professionnalisme, la qualification et la formation continue des installateurs. C'est aussi une condition pour bénéficier des aides de l'État.",
  },
  {
    question: "Quel est le poids, la taille et l'épaisseur d'un panneau photovoltaïque ?",
    answer: "Un panneau photovoltaïque standard mesure environ 1,7m x 1m, pour une épaisseur de 35-40mm et un poids de 18-20kg. Ces dimensions peuvent varier selon les modèles et les fabricants. Notre équipe évalue la capacité de votre toit à supporter l'installation.",
  },
  {
    question: "Comment entretenir mon installation photovoltaïque ?",
    answer: "L'entretien est minimal : un nettoyage annuel des panneaux suffit généralement. La pluie naturelle aide à maintenir leur propreté. Nous recommandons une inspection annuelle par nos techniciens pour vérifier les connexions et optimiser les performances.",
  },
];

export const FAQ = () => {
  return (
    <div className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0B1221] via-[#1a5fb4] to-[#0B1221]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,118,210,0.1)_0%,rgba(0,0,0,0.4)_100%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
            Des questions sur notre offre de panneaux solaires ?
          </h2>
          <p className="text-xl text-blue-200">
            Tout ce que vous devez savoir sur l'énergie solaire
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 px-6 shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                <AccordionTrigger className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-blue-200 text-base leading-relaxed pb-6">
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
              className="relative bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 bg-[length:200%_100%] animate-gradient group"
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-white">
                Demandez votre étude gratuite
              </span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <p className="mt-4 text-sm text-blue-200">
            Sans engagement • Réponse sous 24h
          </p>
        </div>
      </div>
    </div>
  );
};