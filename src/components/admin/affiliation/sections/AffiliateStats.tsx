import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export const AffiliateStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Statistiques d'Affiliation</h2>
        <p className="text-muted-foreground">
          Cette section affichera les statistiques globales du programme d'affiliation.
          Fonctionnalité en cours de développement.
        </p>
      </Card>
    </motion.div>
  );
};