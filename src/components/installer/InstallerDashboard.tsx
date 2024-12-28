import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardContent } from "./dashboard/DashboardContent";
import { motion } from "framer-motion";

export function InstallerDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90"
    >
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <DashboardHeader />
        <DashboardContent />
      </div>
    </motion.div>
  );
}