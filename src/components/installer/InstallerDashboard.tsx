import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardContent } from "./dashboard/DashboardContent";
import { InstallerBreadcrumb } from "./navigation/InstallerBreadcrumb";
import { motion } from "framer-motion";

export function InstallerDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent"></div>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-4 relative">
        <InstallerBreadcrumb />
        <DashboardHeader />
        <DashboardContent />
      </div>
    </motion.div>
  );
}