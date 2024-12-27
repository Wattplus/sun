import { PrepaidBalance } from "@/components/installer/dashboard/PrepaidBalance";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export const PrepaidSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Compte prépayé</h2>
          <p className="text-white/60">Gérez votre solde et vos moyens de paiement</p>
        </div>
      </div>

      <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/20">
        <PrepaidBalance balance={150} />
      </Card>
    </motion.div>
  );
};