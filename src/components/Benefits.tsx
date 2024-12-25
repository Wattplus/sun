import { PiggyBank, Leaf, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    title: "Économies importantes",
    description: "Réduisez vos factures d'électricité et profitez d'un retour sur investissement rapide",
    icon: PiggyBank,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Écologique",
    description: "Réduisez votre empreinte carbone avec une énergie 100% renouvelable",
    icon: Leaf,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Valorisation",
    description: "Augmentez la valeur de votre bien immobilier",
    icon: Home,
    color: "from-indigo-500 to-indigo-600",
  },
];

export const Benefits = () => {
  return (
    <div className="py-24 sm:py-32 bg-gradient-to-b from-white to-gray-50" id="why-solar">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Pourquoi choisir l'énergie solaire ?
          </h2>
          <p className="text-xl text-gray-600">
            Investissez dans votre avenir énergétique
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div 
              key={benefit.title} 
              className="group relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <dt className="flex flex-col gap-y-4">
                  <div className={`rounded-2xl bg-gradient-to-br ${benefit.color} p-4 w-16 h-16 flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 mb-4">{benefit.title}</div>
                </dt>
                <dd className="text-gray-600 text-lg leading-7 mb-8">
                  {benefit.description}
                </dd>
                <Button
                  variant="outline"
                  className="group/btn hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-300 w-full"
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
            Découvrez vos économies
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};