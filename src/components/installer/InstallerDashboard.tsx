import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardTabs } from "./dashboard/DashboardTabs";
import { motion } from "framer-motion";

export function InstallerDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-6 lg:p-8 space-y-8"
    >
      <div className="max-w-[1600px] mx-auto space-y-8">
        <DashboardHeader />
        <DashboardTabs />
      </div>
    </motion.div>
  );
}