import { Cpu, Battery, Clock, ArrowRight, Shield, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const specs = [
  {
    title: "Équipements premium",
    items: [
      "Panneaux SunPower 375Wc",
      "Design noir élégant",
      "Garantie 25 ans"
    ],
    icon: Sun,
    color: "from-blue-600 to-blue-800"
  },
  {
    title: "Installation sécurisée",
    items: [
      "Micro-onduleurs Enphase",
      "Coffret de protection",
      "Surimposition toiture"
    ],
    icon: Shield,
    color: "from-green-600 to-green-800"
  },
  {
    title: "Accompagnement",
    items: [
      "Conseiller dédié",
      "Gestion des aides",
      "Suivi personnalisé"
    ],
    icon: Clock,
    color: "from-indigo-600 to-indigo-800"
  }
];

export const TechnicalSpecs = () => {
  return (
    <div className="bg-gradient-to-b from-[#0B1221] to-[#1a5fb4] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Une installation solaire performante
          </h2>
          <p className="text-xl text-blue-200">
            Des équipements premium pour une performance optimale
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {specs.map((spec) => (
            <div key={spec.title} className="group relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary to-accent opacity-25 blur transition duration-200 group-hover:opacity-100" />
              <div className="relative h-full glass-panel p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`rounded-xl bg-gradient-to-br ${spec.color} p-4 text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <spec.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{spec.title}</h3>
                </div>
                <ul className="space-y-4 mb-8">
                  {spec.items.map((item, index) => (
                    <li key={index} className="flex items-center text-blue-200 text-lg">
                      <span className="mr-3 text-primary text-2xl">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full group hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 bg-secondary/50 border-white/10 text-white"
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
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
            <Button 
              size="lg"
              className="relative bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 bg-[length:200%_100%] animate-gradient group"
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Demandez votre devis gratuit
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};