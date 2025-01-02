import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";

const AffiliationManagement = () => {
  return (
    <div className="space-y-6 p-6">
      <AdminBreadcrumb />
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Gestion des affiliations
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-xl"
      >
        <p className="text-center text-muted-foreground">
          Fonctionnalité en cours de développement
        </p>
      </motion.div>
    </div>
  );
};

export default AffiliationManagement;