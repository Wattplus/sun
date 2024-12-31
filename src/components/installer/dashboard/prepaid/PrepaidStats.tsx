import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Users, Wallet } from "lucide-react";

export const PrepaidStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
    >
      <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-white/60">Leads achetés</p>
            <p className="text-2xl font-bold text-white">24</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-white/60">Taux de conversion</p>
            <p className="text-2xl font-bold text-white">68%</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-white/60">Économies réalisées</p>
            <p className="text-2xl font-bold text-white">520€</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};