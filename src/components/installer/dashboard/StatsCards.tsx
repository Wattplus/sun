import { Card } from "@/components/ui/card";
import { Euro, Users, CheckCircle, Clock, ShoppingCart, Percent } from "lucide-react";
import { motion } from "framer-motion";

export const StatsCards = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
        <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-md border-primary/20 hover:border-primary/40 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Leads Achetés</h3>
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">42</p>
          <p className="text-sm text-emerald-400 mt-2">
            +8 cette semaine
          </p>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/40 to-primary-light/40" />
        </Card>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
        <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-md border-primary/20 hover:border-primary/40 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Euro className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Investissement Leads</h3>
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">2 100€</p>
          <p className="text-sm text-muted-foreground mt-2">
            Moyenne de 50€/lead
          </p>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/40 to-primary-light/40" />
        </Card>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
        <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-md border-primary/20 hover:border-primary/40 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Percent className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Taux de Conversion</h3>
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">28%</p>
          <p className="text-sm text-emerald-400 mt-2">
            12 devis signés
          </p>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/40 to-primary-light/40" />
        </Card>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
        <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-md border-primary/20 hover:border-primary/40 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Temps de Contact</h3>
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">1.8h</p>
          <p className="text-sm text-muted-foreground mt-2">
            Premier contact après achat
          </p>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/40 to-primary-light/40" />
        </Card>
      </motion.div>
    </div>
  );
};