import { ArrowRight, Users, Search, HeadphonesIcon, TrendingUp, ShieldCheck, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Leads qualifiés",
    description: "Accédez à des prospects vérifiés et prêts à investir",
    icon: Users,
  },
  {
    title: "Visibilité optimale",
    description: "Profitez d'un référencement privilégié et augmentez votre présence en ligne",
    icon: Search,
  },
  {
    title: "Support dédié",
    description: "Bénéficiez d'un accompagnement personnalisé par nos experts",
    icon: HeadphonesIcon,
  },
  {
    title: "Croissance garantie",
    description: "Développez votre activité avec un flux constant de projets",
    icon: TrendingUp,
  },
  {
    title: "Certification qualité",
    description: "Distinguez-vous avec notre label de confiance",
    icon: ShieldCheck,
  },
  {
    title: "Ciblage précis",
    description: "Recevez uniquement les projets correspondant à vos critères",
    icon: Target,
  }
];

export const BenefitsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      {benefits.map((benefit, index) => (
        <motion.div 
          key={benefit.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/20 transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <benefit.icon className="w-6 h-6 text-primary mt-1" />
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-white">{benefit.title}</h3>
              <p className="text-blue-200/80 text-base leading-relaxed">{benefit.description}</p>
            </div>
          </div>
        </motion.div>
      ))}

      <Button
        variant="outline"
        className="w-full bg-white/5 hover:bg-primary hover:text-white border-white/20 text-white transition-all duration-300 group mt-8"
        onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Commencer maintenant
        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
};