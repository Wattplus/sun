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
      className="glass-panel"
    >
      <h2 className="text-xl font-semibold mb-6 gradient-text">Activité Récente</h2>
      <div className="space-y-4">
        {activities.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                item.status === 'success' ? 'bg-emerald-500' :
                item.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
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