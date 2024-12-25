import { motion } from "framer-motion";

interface Activity {
  action: string;
  time: string;
  status: 'success' | 'warning' | 'info';
}

const activities: Activity[] = [
  { action: "Nouveau devis généré", time: "Il y a 2h", status: "success" },
  { action: "Lead qualifié contacté", time: "Il y a 4h", status: "warning" },
  { action: "Installation planifiée", time: "Il y a 6h", status: "info" },
  { action: "Nouveau contact", time: "Il y a 8h", status: "success" },
];

const RecentActivity = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-[#0B1221]/50 backdrop-blur-md border border-primary/20 p-6"
    >
      <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
        Activité Récente
      </h2>
      <div className="space-y-4">
        {activities.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between py-3 border-b border-primary/10 last:border-0 hover:bg-primary/5 rounded-lg transition-colors duration-200 p-2"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                item.status === 'success' ? 'bg-emerald-400' :
                item.status === 'warning' ? 'bg-yellow-400' : 'bg-primary'
              }`}></div>
              <p className="text-sm text-white/70">{item.action}</p>
            </div>
            <span className="text-sm text-white/50">{item.time}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentActivity;