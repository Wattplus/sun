import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Shield, Star, TrendingUp, Users } from "lucide-react";

export const PrepaidAdvantages = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-6"
    >
      <Card className="p-6 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-primary/20">
        <h3 className="text-xl font-semibold text-white mb-6">Avantages du compte prépayé</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="flex items-start gap-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="p-2 rounded-lg bg-primary/20">
              <Star className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Leads prioritaires</h4>
              <p className="text-sm text-white/60">
                Accédez aux leads les plus récents avant les autres installateurs
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-start gap-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="p-2 rounded-lg bg-primary/20">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Tarifs préférentiels</h4>
              <p className="text-sm text-white/60">
                Bénéficiez de -25% sur tous vos achats de leads
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-start gap-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="p-2 rounded-lg bg-primary/20">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Garantie qualité</h4>
              <p className="text-sm text-white/60">
                Leads vérifiés et garantis par notre équipe
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-start gap-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="p-2 rounded-lg bg-primary/20">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Support dédié</h4>
              <p className="text-sm text-white/60">
                Une équipe dédiée pour vous accompagner
              </p>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};