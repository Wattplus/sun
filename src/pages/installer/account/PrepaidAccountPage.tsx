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
    <div className="min-h-screen bg-gradient-to-b from-background via-background-light to-background">
      <div className="max-w-[1600px] mx-auto p-6 space-y-12">
        <InstallerBreadcrumb />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Header Section with improved styling */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-glass-gradient p-8 rounded-2xl backdrop-blur-lg border border-primary/20">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-white via-primary-light to-white bg-clip-text text-transparent">
                Mon compte prépayé
              </h1>
              <p className="text-white/80 text-lg">
                Gérez votre solde et accédez aux meilleurs leads
              </p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-primary/20 backdrop-blur-sm"
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

          {/* Main Content with improved layout and animations */}
          <div className="grid gap-12">
            {/* Balance Card with enhanced visual appeal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-glass-gradient rounded-2xl backdrop-blur-lg border border-primary/20 p-8"
            >
              <PrepaidBalance balance={balance} />
            </motion.div>

            {/* Performance Chart with glass effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-glass-gradient rounded-2xl backdrop-blur-lg border border-primary/20 p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-white via-primary-light to-white bg-clip-text text-transparent">
                Performance
              </h2>
              <div className="h-[400px]">
                <PerformanceChart />
              </div>
            </motion.div>

            {/* Stats Grid with improved spacing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <PrepaidStats />
            </motion.div>

            {/* Advantages Section with enhanced visuals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-glass-gradient rounded-2xl backdrop-blur-lg border border-primary/20 p-8"
            >
              <PrepaidAdvantages />
            </motion.div>

            {/* FAQ Section with improved styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <FAQ />
            </motion.div>

            {/* CTA Section with enhanced design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center py-16 bg-glass-gradient rounded-2xl backdrop-blur-lg border border-primary/20"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-primary-light to-white bg-clip-text text-transparent mb-6">
                Prêt à accéder aux meilleurs leads ?
              </h2>
              <p className="text-white/80 mb-8 text-lg max-w-2xl mx-auto">
                Rechargez votre compte et commencez à développer votre activité dès aujourd'hui
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="glass-button group"
                  onClick={() => document.getElementById('recharge-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="text-white text-lg">Recharger mon compte</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <p className="mt-4 text-white/60 text-sm">
                Sans engagement • Paiement sécurisé • Support 24/7
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};