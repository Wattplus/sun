import { Button } from "@/components/ui/button";
import { Euro } from "lucide-react";
import { motion } from "framer-motion";

interface QuickTopUpButtonsProps {
  onTopUp: (amount: number) => void;
  isLoading: boolean;
}

export const QuickTopUpButtons = ({ onTopUp, isLoading }: QuickTopUpButtonsProps) => {
  const amounts = [50, 100, 200];
  
  return (
    <div className="grid grid-cols-3 gap-3">
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
            className="w-full bg-white/5 hover:bg-white/10 border-[#1EAEDB]/20 text-white"
          >
            <Euro className="h-4 w-4 mr-2 text-[#1EAEDB]" />
            {amount}€
          </Button>
        </motion.div>
      ))}
    </div>
  );
};