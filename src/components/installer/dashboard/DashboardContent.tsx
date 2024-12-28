import { KPISection } from "./sections/KPISection";
import { RecentActivity } from "./sections/RecentActivity";
import { PerformanceCharts } from "./sections/PerformanceCharts";
import { QuotesOverview } from "./sections/QuotesOverview";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function DashboardContent() {
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl backdrop-blur-sm border border-primary/10 p-6 hover:border-primary/20 transition-all duration-300"
      >
        <KPISection />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Link to="/espace-installateur/leads/nouveaux" className="block">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <Button 
              className="relative w-full bg-background hover:bg-background/90 text-primary border-2 border-primary h-24 text-2xl gap-4 rounded-xl font-semibold group-hover:scale-[1.02] transition-all duration-300"
            >
              <Plus className="w-8 h-8" />
              Découvrir les nouveaux leads disponibles
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </div>
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
          <h2 className="text-xl font-semibold text-white mb-4">
            Activité Récente
          </h2>
          <RecentActivity />
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
          <h2 className="text-xl font-semibold text-white mb-4">
            Suivi des Devis
          </h2>
          <QuotesOverview />
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
          <h2 className="text-xl font-semibold text-white mb-4">
            Performance
          </h2>
          <PerformanceCharts />
        </Card>
      </motion.div>
    </div>
  );
}