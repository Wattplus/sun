import { InstallerBreadcrumb } from "@/components/installer/navigation/InstallerBreadcrumb";
import { PrepaidBalance } from "@/components/installer/dashboard/PrepaidBalance";
import { PrepaidStats } from "@/components/installer/dashboard/prepaid/PrepaidStats";
import { PrepaidAdvantages } from "@/components/installer/dashboard/prepaid/PrepaidAdvantages";
import { useInstallerBalance } from "@/hooks/installer/useInstallerBalance";
import { motion } from "framer-motion";
import { ChartLine } from "lucide-react";
import PerformanceChart from "@/components/admin/PerformanceChart";

export const PrepaidAccountPage = () => {
  const { balance, isLoading } = useInstallerBalance();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <InstallerBreadcrumb />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[1600px] mx-auto space-y-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Mon compte prépayé</h1>
            <p className="text-white/60">Gérez votre solde et accédez aux meilleurs leads</p>
          </div>
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20"
            >
              <div className="flex items-center gap-2">
                <ChartLine className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-white">Performance du mois</span>
              </div>
              <p className="text-2xl font-bold text-white mt-1">+15%</p>
            </motion.div>
          </div>
        </div>

        <PrepaidBalance balance={balance} />
        <PerformanceChart />
        <PrepaidStats />
        <PrepaidAdvantages />
      </motion.div>
    </div>
  );
};