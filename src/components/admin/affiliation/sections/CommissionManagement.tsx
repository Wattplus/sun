import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export const CommissionManagement = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Gestion des Commissions</h2>
        <p className="text-muted-foreground">
          Cette section permettra de gérer les commissions, les paiements et l'historique des transactions.
          Fonctionnalité en cours de développement.
        </p>
      </Card>
    </motion.div>
  );
};