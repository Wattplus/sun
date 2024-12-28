import { DashboardTabs } from "./DashboardTabs";
import { motion } from "framer-motion";

export const DashboardContent = () => {
  return (
    <div className="space-y-8 px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 gradient-text">
          Tableau de bord
        </h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-7xl mx-auto"
      >
        <DashboardTabs />
      </motion.div>
    </div>
  );
};