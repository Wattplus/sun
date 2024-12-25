import { PiggyBank, Leaf, Home, ArrowRight, Shield, Clock, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    title: "Jusqu'à 40% d'économies",
    description: "L'électricité coûte cher et son prix ne cesse d'augmenter. Prémunissez-vous contre les hausses à venir en produisant votre propre électricité.",
    icon: PiggyBank,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Valorisation immobilière",
    description: "Équipée de panneaux photovoltaïques, votre maison gagne en valeur et en intérêt auprès de futurs acquéreurs.",
    icon: Home,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Un geste pour la planète",
    description: "En produisant de l'électricité verte, vous participez activement à la transition écologique du pays !",
    icon: Leaf,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    title: "Artisans certifiés RGE",
    description: "Des professionnels soigneusement sélectionnés : solidité financière, avis positifs et qualification RGE contrôlés.",
    icon: Shield,
    color: "from-amber-500 to-amber-600",
  },
  {
    title: "Installation rapide",
    description: "Installation complète en 1-2 jours par nos équipes certifiées, avec un suivi personnalisé.",
    icon: Clock,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Énergie gratuite et inépuisable",
    description: "Le soleil est une source d'énergie gratuite et inépuisable. Profitez d'une production d'électricité stable pendant plus de 25 ans.",
    icon: Sun,
    color: "from-orange-500 to-orange-600",
  },
];

export const Benefits = () => {
  return (
    <div className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0B1221] to-[#1a5fb4]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,118,210,0.1)_0%,rgba(0,0,0,0.4)_100%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
            Pourquoi passer au solaire photovoltaïque ?
          </h2>
          <p className="text-xl text-blue-200">
            Une solution d'avenir pour votre maison
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div 
              key={benefit.title} 
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <dt className="flex flex-col gap-y-4">
                  <div className={`rounded-2xl bg-gradient-to-br ${benefit.color} p-4 w-16 h-16 flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <div className="text-2xl font-semibold text-white mb-4">{benefit.title}</div>
                </dt>
                <dd className="text-blue-200 text-lg leading-7 mb-8">
                  {benefit.description}
                </dd>
                <Button
                  variant="outline"
                  className="group/btn bg-white/10 hover:bg-green-500 hover:text-white border-white/20 text-white hover:border-green-500 transition-all duration-300 w-full"
                  onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-green-500/20 transform hover:scale-105 transition-transform duration-300"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Simulation gratuite en 2 minutes
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};