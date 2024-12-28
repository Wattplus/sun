import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const DashboardHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
          Tableau de bord
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
          Bienvenue dans votre espace installateur premium - Gérez vos leads et développez votre activité
        </p>
      </div>

      <Card className="p-6 sm:p-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="p-3 sm:p-4 bg-primary/10 rounded-xl">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Passez au niveau supérieur
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Débloquez toutes les fonctionnalités avec notre abonnement Premium
              </p>
            </div>
          </div>
          <Link to="/espace-installateur/marketplace" className="w-full sm:w-auto">
            <Button 
              className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary-light text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105" 
              size="lg"
            >
              Voir les offres
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};