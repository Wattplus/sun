import { ClipboardCheck, Wrench, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Validation du projet",
    description: "Un conseiller vous contacte par téléphone et s'assure avec vous de la pertinence de votre projet.",
    icon: ClipboardCheck,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Entretien technique",
    description: "Nous vérifions ensemble la faisabilité de vos travaux et établissons un plan d'action personnalisé.",
    icon: Wrench,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Signature du devis",
    description: "Vous signez votre devis en ligne en toute simplicité, nous nous occupons des démarches administratives.",
    icon: Zap,
    color: "from-amber-500 to-amber-600",
  },
];

export const Process = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-24 sm:py-32 bg-gradient-to-b from-[#0B1221] to-[#1a5fb4]" id="process">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
            Notre processus d'installation
          </h2>
          <p className="text-xl text-blue-200">
            Simple, rapide et professionnel
          </p>
        </div>
        <div className="relative">
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-gradient-to-r from-blue-200 via-green-200 to-amber-200 -translate-y-1/2 hidden lg:block rounded-full opacity-20" />
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center text-center relative">
                <dt className="flex flex-col items-center gap-y-4 mb-4">
                  <div className={`rounded-full bg-gradient-to-br ${step.color} p-6 relative z-10 shadow-lg transform hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <div className="text-2xl font-semibold text-white">{step.title}</div>
                </dt>
                <dd className="flex flex-col bg-white/5 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/10 w-full hover:shadow-2xl transition-all duration-300">
                  <p className="text-blue-200 text-lg mb-8">{step.description}</p>
                  <Button
                    variant="outline"
                    className="mt-auto group hover:bg-green-500 hover:text-white hover:border-green-500 bg-white/10 border-white/20 text-white w-full"
                    onClick={scrollToForm}
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
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-green-500/20 transform hover:scale-105 transition-transform duration-300"
            onClick={scrollToForm}
          >
            Commencez votre projet
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};