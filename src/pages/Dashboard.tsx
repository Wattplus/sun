import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import { ConsumptionChart } from "@/components/client/dashboard/ConsumptionChart";
import { NextSteps } from "@/components/client/dashboard/NextSteps";
import { SavingsEstimate } from "@/components/client/dashboard/SavingsEstimate";
import { PurchasedContactsList } from "@/components/client/dashboard/PurchasedContactsList";
import { ClientNavbar } from "@/components/client/ClientNavbar";
import { motion } from "framer-motion";

export const Dashboard = () => {
  useAuthRedirect();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <ClientNavbar />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Tableau de Bord
          </h1>
          <p className="text-muted-foreground mt-2">
            Bienvenue sur votre espace personnel
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ConsumptionChart />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SavingsEstimate monthlyBill="150" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <NextSteps />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <PurchasedContactsList />
        </motion.div>
      </main>
    </div>
  );
};