import { BenefitsSection } from "@/components/installer/auth/BenefitsSection";
import { SignupForm } from "@/components/installer/auth/SignupForm";
import { InstallerBreadcrumb } from "@/components/installer/auth/InstallerBreadcrumb";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, ArrowRight } from "lucide-react";

export function InstallerSignup() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <InstallerBreadcrumb />
          <Link to="/login">
            <Button 
              variant="outline" 
              className="bg-primary/10 hover:bg-primary/20 border-primary/20 text-primary hover:text-primary-light transition-all duration-300 flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Se connecter à mon espace
            </Button>
          </Link>
        </div>

        <div className="text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent"
          >
            Développez votre activité solaire
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Rejoignez le réseau leader des installateurs photovoltaïques en France et accédez à des opportunités commerciales qualifiées
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 group flex items-center gap-2 w-full sm:w-auto"
              onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Commencer gratuitement
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-muted-foreground">
              Inscription gratuite • Pas d'engagement • Leads qualifiés
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <BenefitsSection />
          <div id="signup-form">
            <SignupForm />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center max-w-3xl mx-auto pt-8"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Pourquoi rejoindre notre réseau ?
          </h2>
          <p className="text-muted-foreground mb-6">
            En tant que partenaire, vous bénéficiez d'un accès privilégié à des prospects qualifiés, d'une visibilité accrue et d'outils performants pour développer votre activité photovoltaïque.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              ✓ Leads exclusifs
            </span>
            <span className="flex items-center gap-2">
              ✓ Support dédié
            </span>
            <span className="flex items-center gap-2">
              ✓ Outils de gestion
            </span>
            <span className="flex items-center gap-2">
              ✓ Formation continue
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}