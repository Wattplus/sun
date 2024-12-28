import { Card } from "@/components/ui/card";
import { Euro, TrendingUp, Sun, Battery } from "lucide-react";
import { motion } from "framer-motion";

interface SavingsEstimateProps {
  monthlyBill?: string;
}

export const SavingsEstimate = ({ monthlyBill }: SavingsEstimateProps) => {
  const monthlyBillNum = parseFloat(monthlyBill || "0");
  const annualBill = monthlyBillNum * 12;
  const estimatedSavings = annualBill * 0.65; // 65% d'économies estimées
  const co2Reduction = (monthlyBillNum * 12 * 0.1); // 100g CO2 par kWh
  const energyIndependence = Math.min(85, monthlyBillNum > 0 ? 65 + (monthlyBillNum / 10) : 65);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="p-6 bg-background/95 backdrop-blur-sm">
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-primary">
              Estimation des Bénéfices
            </h3>
            <p className="text-sm text-muted-foreground">
              Projection sur une année complète
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid gap-4">
            <div className="flex items-center gap-4 p-4 bg-green-500/10 rounded-lg">
              <Euro className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-sm text-green-400">Économies Estimées / An</p>
                <p className="text-2xl font-semibold">
                  {estimatedSavings.toLocaleString('fr-FR', { 
                    style: 'currency', 
                    currency: 'EUR',
                    maximumFractionDigits: 0
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-lg">
              <TrendingUp className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-sm text-blue-400">Retour sur Investissement</p>
                <p className="text-2xl font-semibold">6-8 ans</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-yellow-500/10 rounded-lg">
              <Sun className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-sm text-yellow-400">Réduction CO2 / An</p>
                <p className="text-2xl font-semibold">{co2Reduction.toFixed(1)} tonnes</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-purple-500/10 rounded-lg">
              <Battery className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-sm text-purple-400">Autonomie Énergétique</p>
                <p className="text-2xl font-semibold">{energyIndependence.toFixed(0)}%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};