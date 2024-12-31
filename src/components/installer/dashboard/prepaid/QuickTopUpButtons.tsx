import { Button } from "@/components/ui/button";
import { Euro, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface QuickTopUpButtonsProps {
  onTopUp: (amount: number) => void;
  isLoading: boolean;
}

export const QuickTopUpButtons = ({ onTopUp, isLoading }: QuickTopUpButtonsProps) => {
  const amounts = [50, 100, 200, 500, 1000, 1500];
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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
            className={`w-full h-24 bg-white/5 hover:bg-white/10 border-primary/20 text-white group relative overflow-hidden ${
              amount === 500 ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 group-hover:via-primary/20 transition-all duration-500" />
            <div className="relative flex flex-col items-center justify-center gap-2">
              <div className="flex items-center">
                <span className="text-2xl font-bold">{amount.toLocaleString('fr-FR')}</span>
                <span className="text-xl">€</span>
              </div>
              {amount === 500 && (
                <span className="absolute -top-1 -right-1 bg-primary text-xs px-2 py-0.5 rounded-bl-lg font-medium">
                  Populaire
                </span>
              )}
            </div>
          </Button>
        </motion.div>
      ))}
    </div>
  );
};