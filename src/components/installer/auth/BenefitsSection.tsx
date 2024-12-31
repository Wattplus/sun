import { Shield, Sun, Users, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Accès aux leads qualifiés",
    description: "Recevez des prospects vérifiés et prêts à passer à l'action"
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Profil vérifié",
    description: "Gagnez la confiance des clients avec un badge vérifié"
  },
  {
    icon: <Sun className="h-6 w-6 text-primary" />,
    title: "Visibilité maximale",
    description: "Apparaissez en priorité dans les recherches des clients"
  },
  {
    icon: <Wallet className="h-6 w-6 text-primary" />,
    title: "Tarification flexible",
    description: "Payez uniquement pour les leads qui vous intéressent"
  }
];

export const BenefitsSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <Card 
            key={index} 
            className="p-6 space-y-3 bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-colors duration-300"
          >
            <div className="p-2 w-fit rounded-lg bg-primary/10">
              {benefit.icon}
            </div>
            <h3 className="font-semibold">{benefit.title}</h3>
            <p className="text-sm text-muted-foreground">{benefit.description}</p>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};