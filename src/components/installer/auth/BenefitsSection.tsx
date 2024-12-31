import { PiggyBank, Leaf, Home, ArrowRight, Shield, Clock, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    title: "Augmentez votre chiffre d'affaires",
    description: "Accédez à des leads qualifiés et exclusifs. Nos prospects sont vérifiés et prêts à investir dans le photovoltaïque.",
    icon: PiggyBank,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Gagnez en visibilité",
    description: "Profitez d'une présence en ligne optimisée et d'un référencement privilégié pour attirer plus de clients.",
    icon: Home,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Développez durablement",
    description: "Participez à la transition énergétique tout en construisant une activité pérenne et rentable.",
    icon: Leaf,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    title: "Renforcez votre crédibilité",
    description: "Distinguez-vous avec un badge vérifié et des avis clients authentiques qui inspirent confiance.",
    icon: Shield,
    color: "from-amber-500 to-amber-600",
  },
  {
    title: "Optimisez votre temps",
    description: "Concentrez-vous sur votre cœur de métier grâce à nos outils de gestion et notre support dédié.",
    icon: Clock,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Investissez dans l'avenir",
    description: "Le marché du solaire est en pleine expansion. Positionnez-vous dès maintenant comme un acteur majeur.",
    icon: Sun,
    color: "from-orange-500 to-orange-600",
  },
];

export const BenefitsSection = () => {
  return (
    <div className="space-y-6">
      {benefits.map((benefit) => (
        <div 
          key={benefit.title} 
          className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10 hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <dt className="flex flex-col gap-y-4">
              <div className={`rounded-2xl bg-gradient-to-br ${benefit.color} p-4 w-16 h-16 flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <div className="text-2xl font-semibold text-white mb-4">{benefit.title}</div>
            </dt>
            <dd className="text-blue-200 text-lg leading-7 mb-8">
              {benefit.description}
            </dd>
            <Button
              variant="outline"
              className="group/btn bg-white/10 hover:bg-green-500 hover:text-white border-white/20 text-white hover:border-green-500 transition-all duration-300 w-full"
              onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Rejoindre le réseau
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};