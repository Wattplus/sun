import { Cpu, Battery, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const specs = [
  {
    title: "Technologie",
    items: [
      "Panneaux monocristallins",
      "Rendement 20-22%",
      "Garantie 25 ans"
    ],
    icon: Cpu,
    color: "from-blue-600 to-blue-800"
  },
  {
    title: "Puissance",
    items: [
      "3-9 kWc selon surface",
      "Production optimisée",
      "Monitoring inclus"
    ],
    icon: Battery,
    color: "from-green-600 to-green-800"
  },
  {
    title: "Installation",
    items: [
      "Pose en 1-2 jours",
      "Équipe certifiée",
      "Garantie décennale"
    ],
    icon: Clock,
    color: "from-purple-600 to-purple-800"
  }
];

export const TechnicalSpecs = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Guide de l'installation solaire
          </h2>
          <p className="text-xl text-gray-600">
            Une technologie de pointe pour une performance optimale
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {specs.map((spec) => (
            <div key={spec.title} className="group relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-green-600 opacity-25 blur transition duration-200 group-hover:opacity-100" />
              <div className="relative h-full rounded-2xl bg-white p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`rounded-xl bg-gradient-to-br ${spec.color} p-3 text-white shadow-lg`}>
                    <spec.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{spec.title}</h3>
                </div>
                <ul className="space-y-4 mb-6">
                  {spec.items.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="mr-2 text-green-500">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full group hover:bg-green-500 hover:text-white hover:border-green-500"
                  onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button 
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-green-500/20"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Obtenez votre devis gratuit
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};