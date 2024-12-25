import { PiggyBank, Leaf, Home } from "lucide-react";

const benefits = [
  {
    title: "Économies importantes",
    description: "Réduisez vos factures d'électricité et profitez d'un retour sur investissement rapide",
    icon: PiggyBank,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Écologique",
    description: "Réduisez votre empreinte carbone avec une énergie 100% renouvelable",
    icon: Leaf,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Valorisation",
    description: "Augmentez la valeur de votre bien immobilier",
    icon: Home,
    color: "bg-purple-100 text-purple-600",
  },
];

export const Benefits = () => {
  return (
    <div className="py-24 sm:py-32 bg-white" id="why-solar">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Pourquoi choisir l'énergie solaire ?
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div 
              key={benefit.title} 
              className="flex flex-col bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <dt className="flex items-center gap-x-4 text-xl font-semibold text-gray-900 mb-4">
                <div className={`rounded-xl ${benefit.color} p-3`}>
                  <benefit.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                {benefit.title}
              </dt>
              <dd className="text-gray-600 text-lg leading-7">
                {benefit.description}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};