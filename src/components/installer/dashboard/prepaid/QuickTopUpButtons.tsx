import { Button } from "@/components/ui/button";
import { DollarSign, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface QuickTopUpButtonsProps {
  onTopUp: (amount: number) => void;
  isLoading: boolean;
}

export const QuickTopUpButtons = ({ onTopUp, isLoading }: QuickTopUpButtonsProps) => {
  const amounts = [50, 100, 200, 500, 1000, 1500];
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {amounts.map((amount, index) => (
        <motion.div
          key={amount}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Button
            variant="outline"
            onClick={() => onTopUp(amount)}
            disabled={isLoading}
            className="w-full bg-white/5 hover:bg-white/10 border-primary/20 text-white group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 group-hover:via-primary/20 transition-all duration-500" />
            <div className="relative flex items-center justify-center gap-2">
              <Plus className="h-4 w-4 text-primary" />
              <span>{amount.toLocaleString('fr-FR')}€</span>
            </div>
          </Button>
        </motion.div>
      ))}
    </div>
  );
};