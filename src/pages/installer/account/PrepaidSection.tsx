import { PrepaidBalance } from "@/components/installer/dashboard/PrepaidBalance";
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
          <p className="text-white/60">Gérez votre solde et accédez aux meilleurs leads</p>
        </div>
      </div>

      <PrepaidBalance balance={150} />
    </motion.div>
  );
};