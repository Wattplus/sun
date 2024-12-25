import { Sun, Battery, PiggyBank, ThumbsUp, Leaf, Home } from "lucide-react";

const benefits = [
  {
    title: "Économies importantes",
    description: "Réduisez vos factures d'électricité et profitez d'un retour sur investissement rapide",
    icon: PiggyBank,
  },
  {
    title: "Écologique",
    description: "Réduisez votre empreinte carbone avec une énergie 100% renouvelable",
    icon: Leaf,
  },
  {
    title: "Valorisation",
    description: "Augmentez la valeur de votre bien immobilier",
    icon: Home,
  },
  {
    title: "Autonomie",
    description: "Gagnez en indépendance énergétique et protégez-vous des hausses de prix",
    icon: Battery,
  },
];

export const Benefits = () => {
  return (
    <div className="py-24 sm:py-32 bg-gradient-to-b from-white to-orange-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Pourquoi choisir l'énergie solaire ?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Une solution d'avenir pour votre maison et pour la planète
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center text-center group hover:transform hover:scale-105 transition-all duration-300">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="rounded-lg bg-orange-100 p-3 group-hover:bg-orange-200 transition-colors">
                    <benefit.icon className="h-6 w-6 text-orange-500" aria-hidden="true" />
                  </div>
                  {benefit.title}
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