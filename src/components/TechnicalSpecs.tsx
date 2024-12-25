import { Cpu, Battery, Clock } from "lucide-react";

const specs = [
  {
    title: "Technologie",
    items: [
      "Panneaux monocristallins",
      "Rendement 20-22%",
      "Garantie 25 ans"
    ],
    icon: Cpu
  },
  {
    title: "Puissance",
    items: [
      "3-9 kWc selon surface",
      "Production optimisée",
      "Monitoring inclus"
    ],
    icon: Battery
  },
  {
    title: "Installation",
    items: [
      "Pose en 1-2 jours",
      "Équipe certifiée",
      "Garantie décennale"
    ],
    icon: Clock
  }
];

export const TechnicalSpecs = () => {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Guide de l'installation solaire
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {specs.map((spec) => (
            <div key={spec.title} className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
              <div className="flex justify-center mb-6">
                <spec.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{spec.title}</h3>
              <ul className="space-y-3">
                {spec.items.map((item, index) => (
                  <li key={index} className="text-gray-600">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};