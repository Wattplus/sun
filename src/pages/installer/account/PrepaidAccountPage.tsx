import { InstallerBreadcrumb } from "@/components/installer/navigation/InstallerBreadcrumb";
import { PrepaidBalance } from "@/components/installer/dashboard/PrepaidBalance";
import { PrepaidStats } from "@/components/installer/dashboard/prepaid/PrepaidStats";
import { PrepaidAdvantages } from "@/components/installer/dashboard/prepaid/PrepaidAdvantages";
import { useInstallerBalance } from "@/hooks/installer/useInstallerBalance";
import { motion } from "framer-motion";
import { ChartLine, Euro, ArrowRight } from "lucide-react";
import PerformanceChart from "@/components/admin/PerformanceChart";
import { FAQ } from "@/components/FAQ";
import { Button } from "@/components/ui/button";

export const PrepaidAccountPage = () => {
  const { balance, isLoading } = useInstallerBalance();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background">
      <div className="max-w-[1600px] mx-auto p-6 space-y-8">
        <InstallerBreadcrumb />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white">Mon compte prépayé</h1>
              <p className="text-white/60 text-lg">Gérez votre solde et accédez aux meilleurs leads</p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20"
            >
              <div className="p-3 rounded-lg bg-primary/20">
                <Euro className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/60">Performance du mois</p>
                <p className="text-2xl font-bold text-white">+15%</p>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="grid gap-8">
            {/* Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PrepaidBalance balance={balance} />
            </motion.div>

            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-panel p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Performance</h2>
              <PerformanceChart />
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <PrepaidStats />
            </motion.div>

            {/* Advantages Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <PrepaidAdvantages />
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <FAQ />
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center py-12"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Prêt à accéder aux meilleurs leads ?
              </h2>
              <p className="text-white/60 mb-8 text-lg">
                Rechargez votre compte et commencez à développer votre activité dès aujourd'hui
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 group"
                onClick={() => document.getElementById('recharge-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Recharger mon compte
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};