import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export const AffiliateSettings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Paramètres d'Affiliation</h2>
        <p className="text-muted-foreground">
          Cette section permettra de configurer les règles d'attribution, les taux de commission et autres paramètres.
          Fonctionnalité en cours de développement.
        </p>
      </Card>
    </motion.div>
  );
};