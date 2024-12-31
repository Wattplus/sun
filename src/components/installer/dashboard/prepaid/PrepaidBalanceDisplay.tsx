import { Euro, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface PrepaidBalanceDisplayProps {
  balance: number;
  monthlyGrowth?: string;
}

export const PrepaidBalanceDisplay = ({ balance, monthlyGrowth = "+15% ce mois" }: PrepaidBalanceDisplayProps) => {
  return (
    <div className="space-y-6 p-8 rounded-2xl bg-gradient-to-br from-background-dark/90 to-background/70 backdrop-blur-lg border border-primary/10">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-white/80">
          <Euro className="h-5 w-5 text-primary/80" />
          <span className="text-lg">Solde disponible</span>
        </div>
        
        <motion.div 
          className="flex items-baseline gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-6xl font-bold text-white">
            {balance}
          </span>
          <span className="text-3xl text-white/80">€</span>
        </motion.div>

        <div className="flex items-center gap-2 text-emerald-400">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium">{monthlyGrowth}</span>
        </div>
      </div>
    </div>
  );
};