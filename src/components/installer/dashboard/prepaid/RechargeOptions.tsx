import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface RechargeOptionsProps {
  onRecharge: (amount: number) => void;
  isLoading: boolean;
}

export const RechargeOptions = ({ onRecharge, isLoading }: RechargeOptionsProps) => {
  const options = [
    { amount: 50, label: "50€" },
    { amount: 100, label: "100€" },
    { amount: 200, label: "200€" },
    { amount: 500, label: "500€", popular: true },
    { amount: 1000, label: "1 000€" },
    { amount: 1500, label: "1 500€" }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg text-white/90">Options de rechargement</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {options.map((option, index) => (
          <motion.div
            key={option.amount}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => onRecharge(option.amount)}
              disabled={isLoading}
              className={`w-full h-24 relative bg-background-dark/50 hover:bg-background-dark/70 border-primary/10 hover:border-primary/20 transition-all group ${
                option.popular ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                  {option.label}
                </span>
                {option.popular && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary px-2 py-0.5 rounded-full text-xs font-medium text-white">
                    Populaire
                  </span>
                )}
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};