import { PiggyBank, Leaf, Home, Battery } from "lucide-react";

const benefits = [
  {
    title: "Économies importantes",
    description: "Réduisez vos factures d'électricité et profitez d'un retour sur investissement rapide",
    icon: PiggyBank,
    color: "text-blue-500",
  },
  {
    title: "Écologique",
    description: "Réduisez votre empreinte carbone avec une énergie 100% renouvelable",
    icon: Leaf,
    color: "text-green-500",
  },
  {
    title: "Valorisation",
    description: "Augmentez la valeur de votre bien immobilier",
    icon: Home,
    color: "text-purple-500",
  },
];

export const Benefits = () => {
  return (
    <div className="py-24 sm:py-32 bg-white" id="why-solar">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Pourquoi choisir l'énergie solaire ?
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center text-center group hover:transform hover:scale-105 transition-all duration-300">
                <dt className="flex flex-col items-center gap-y-4">
                  <div className={`rounded-xl ${benefit.color} bg-gray-50 p-3 ring-8 ring-gray-50/10`}>
                    <benefit.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <div className="text-xl font-semibold text-gray-900">{benefit.title}</div>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{benefit.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};