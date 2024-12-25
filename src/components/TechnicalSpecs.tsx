import { Cpu, Battery, Clock } from "lucide-react";

const specs = [
  {
    title: "Technologie",
    items: [
      "Panneaux monocristallins",
      "Rendement 20-22%",
      "Garantie 25 ans"
    ],
    icon: Cpu,
    color: "bg-blue-600"
  },
  {
    title: "Puissance",
    items: [
      "3-9 kWc selon surface",
      "Production optimisée",
      "Monitoring inclus"
    ],
    icon: Battery,
    color: "bg-green-600"
  },
  {
    title: "Installation",
    items: [
      "Pose en 1-2 jours",
      "Équipe certifiée",
      "Garantie décennale"
    ],
    icon: Clock,
    color: "bg-purple-600"
  }
];

export const TechnicalSpecs = () => {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Guide de l'installation solaire
          </h2>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {specs.map((spec) => (
            <div key={spec.title} className="relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-green-600 opacity-25 blur transition duration-200 group-hover:opacity-100" />
              <div className="relative h-full rounded-2xl bg-white p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`rounded-xl ${spec.color} p-3 text-white`}>
                    <spec.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{spec.title}</h3>
                </div>
                <ul className="space-y-4">
                  {spec.items.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="mr-2 text-green-500">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};