import { ClipboardCheck, Wrench, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Étude gratuite",
    description: "Analyse complète de vos besoins et de votre toiture",
    icon: ClipboardCheck,
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Installation",
    description: "Pose professionnelle en 1-2 jours",
    icon: Wrench,
    color: "from-green-400 to-green-600",
  },
  {
    title: "Production",
    description: "Commencez à produire votre propre électricité",
    icon: Zap,
    color: "from-yellow-400 to-yellow-600",
  },
];

export const Process = () => {
  return (
    <div className="py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white" id="process">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Notre processus d'installation
          </h2>
          <p className="text-xl text-gray-600">
            Simple, rapide et professionnel
          </p>
        </div>
        <div className="relative">
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200 -translate-y-1/2 hidden lg:block" />
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center text-center relative">
                <dt className="flex flex-col items-center gap-y-4 mb-4">
                  <div className={`rounded-full bg-gradient-to-br ${step.color} p-6 relative z-10 shadow-lg`}>
                    <step.icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <div className="text-xl font-semibold text-gray-900">{step.title}</div>
                </dt>
                <dd className="flex flex-col bg-white rounded-xl p-6 shadow-xl border border-gray-100 w-full hover:shadow-2xl transition-all duration-300">
                  <p className="text-gray-600 text-lg mb-6">{step.description}</p>
                  <Button
                    variant="outline"
                    className="mt-auto group hover:bg-green-500 hover:text-white hover:border-green-500"
                    onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </dd>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button 
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-green-500/20"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Commencez votre projet
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};