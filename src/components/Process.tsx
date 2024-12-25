import { ClipboardCheck, Wrench, Zap } from "lucide-react";

const steps = [
  {
    title: "Étude gratuite",
    description: "Analyse complète de vos besoins et de votre toiture",
    icon: ClipboardCheck,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Installation",
    description: "Pose professionnelle en 1-2 jours",
    icon: Wrench,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Production",
    description: "Commencez à produire votre propre électricité",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600",
  },
];

export const Process = () => {
  return (
    <div className="py-24 sm:py-32 bg-gray-50" id="process">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Notre processus d'installation
          </h2>
        </div>
        <div className="relative">
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-200 -translate-y-1/2 hidden lg:block" />
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center text-center relative">
                <dt className="flex flex-col items-center gap-y-4 mb-4">
                  <div className={`rounded-full ${step.color} p-6 relative z-10`}>
                    <step.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <div className="text-xl font-semibold text-gray-900">{step.title}</div>
                </dt>
                <dd className="flex flex-col bg-white rounded-xl p-6 shadow-md border border-gray-100 w-full">
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};