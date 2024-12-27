import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Euro } from "lucide-react";
import { motion } from "framer-motion";

interface CustomAmountInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const CustomAmountInput = ({ 
  value, 
  onChange, 
  onSubmit, 
  isLoading 
}: CustomAmountInputProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="flex gap-2"
    >
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Montant personnalisé"
        className="flex-1 bg-white/5 border-[#1EAEDB]/20 text-white placeholder:text-white/50"
      />
      <Button
        variant="outline"
        onClick={onSubmit}
        disabled={isLoading}
        className="whitespace-nowrap bg-white/5 hover:bg-white/10 border-[#1EAEDB]/20 text-white"
      >
        <Euro className="h-4 w-4 mr-2 text-[#1EAEDB]" />
        Recharger
      </Button>
    </motion.div>
  );
};