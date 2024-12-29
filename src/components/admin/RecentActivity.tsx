import { motion } from "framer-motion";

interface RecentActivityProps {
  leads: any[];
  installers: any[];
}

const RecentActivity = ({ leads, installers }: RecentActivityProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-[#0B1221]/50 backdrop-blur-md border border-primary/20 p-6"
    >
      <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent flex items-center justify-between">
        Activité Récente
        <span className="text-sm font-normal text-primary/70">Aucune activité</span>
      </h2>
      <div className="text-center text-white/70 py-8">
        Aucune activité récente à afficher
      </div>
    </motion.div>
  );
};

export default RecentActivity;