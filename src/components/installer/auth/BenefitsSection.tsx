import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Leads qualifiés",
    description: "Accédez à des prospects vérifiés et prêts à investir",
  },
  {
    title: "Visibilité optimale",
    description: "Profitez d'un référencement privilégié",
  },
  {
    title: "Support dédié",
    description: "Bénéficiez d'un accompagnement personnalisé",
  },
];

export const BenefitsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-8"
    >
      {benefits.map((benefit, index) => (
        <motion.div 
          key={benefit.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:shadow-xl transition-all duration-300"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">{benefit.title}</h3>
            <p className="text-blue-200 text-lg">{benefit.description}</p>
          </div>
        </motion.div>
      ))}

      <Button
        variant="outline"
        className="w-full bg-white/5 hover:bg-primary hover:text-white border-white/20 text-white transition-all duration-300 group"
        onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
      >
        En savoir plus
        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
};