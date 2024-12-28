import { motion } from "framer-motion";

interface Activity {
  action: string;
  time: string;
  status: 'success' | 'warning' | 'info';
  detail?: string;
}

const activities: Activity[] = [
  { 
    action: "Nouveau lead disponible", 
    detail: "Installation photovoltaïque - Paris",
    time: "Il y a 30min", 
    status: "success" 
  },
  { 
    action: "Lead acheté avec succès", 
    detail: "Projet résidentiel - Lyon",
    time: "Il y a 2h", 
    status: "success" 
  },
  { 
    action: "Opportunité exclusive", 
    detail: "Budget > 15,000€ - Marseille",
    time: "Il y a 3h", 
    status: "warning" 
  },
  { 
    action: "Lead qualifié disponible", 
    detail: "Installation pro - Bordeaux",
    time: "Il y a 4h", 
    status: "info" 
  },
  { 
    action: "Nouveau secteur actif", 
    detail: "5 leads disponibles - Toulouse",
    time: "Il y a 5h", 
    status: "info" 
  }
];

const RecentActivity = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-[#0B1221]/50 backdrop-blur-md border border-primary/20 p-6"
    >
      <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent flex items-center justify-between">
        Activité Récente
        <span className="text-sm font-normal text-primary/70">5 nouvelles opportunités</span>
      </h2>
      <div className="space-y-4">
        {activities.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col gap-2 py-3 border-b border-primary/10 last:border-0 hover:bg-primary/5 rounded-lg transition-colors duration-200 p-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  item.status === 'success' ? 'bg-emerald-400' :
                  item.status === 'warning' ? 'bg-yellow-400' : 'bg-primary'
                }`}></div>
                <p className="text-sm font-medium text-white/90">{item.action}</p>
              </div>
              <span className="text-xs text-white/50">{item.time}</span>
            </div>
            {item.detail && (
              <p className="text-xs text-white/70 pl-5">
                {item.detail}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentActivity;