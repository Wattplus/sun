import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export const AffiliatesList = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Liste des Affiliés</h2>
        <p className="text-muted-foreground">
          Cette section permettra de gérer les affiliés, leurs inscriptions et leurs performances.
          Fonctionnalité en cours de développement.
        </p>
      </Card>
    </motion.div>
  );
};