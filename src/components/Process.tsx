import { ClipboardCheck, Wrench, Zap } from "lucide-react";

const steps = [
  {
    title: "Étude gratuite",
    description: "Analyse complète de vos besoins et de votre toiture",
    icon: ClipboardCheck,
  },
  {
    title: "Installation",
    description: "Pose professionnelle en 1-2 jours",
    icon: Wrench,
  },
  {
    title: "Production",
    description: "Commencez à produire votre propre électricité",
    icon: Zap,
  },
];

export const Process = () => {
  return (
    <div className="py-24 sm:py-32" id="process">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Notre processus d'installation
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center text-center">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <step.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  {step.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{step.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};