import { BenefitsSection } from "@/components/installer/auth/BenefitsSection";
import { SignupForm } from "@/components/installer/auth/SignupForm";
import { motion } from "framer-motion";

export function InstallerSignup() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent"
          >
            Développez votre activité solaire
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Rejoignez notre réseau d'installateurs certifiés et accédez à des opportunités commerciales qualifiées
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <BenefitsSection />
          <SignupForm />
        </div>
      </div>
    </div>
  );
}