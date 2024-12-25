import { Sun, Battery, PiggyBank, ThumbsUp } from "lucide-react";

const benefits = [
  {
    title: "Énergie Propre",
    description: "Produisez votre propre électricité verte et réduisez votre empreinte carbone",
    icon: Sun,
  },
  {
    title: "Autonomie",
    description: "Gagnez en indépendance énergétique et protégez-vous des hausses de prix",
    icon: Battery,
  },
  {
    title: "Économies",
    description: "Réduisez significativement vos factures d'électricité",
    icon: PiggyBank,
  },
  {
    title: "Installation Simple",
    description: "Un accompagnement personnalisé tout au long de votre projet",
    icon: ThumbsUp,
  },
];

export const Benefits = () => {
  return (
    <div className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Pourquoi choisir le photovoltaïque ?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Une solution d'avenir pour votre maison et pour la planète
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center text-center">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <benefit.icon className="h-8 w-8 text-primary" aria-hidden="true" />
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