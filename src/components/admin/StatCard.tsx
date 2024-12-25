import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  trendIcon: LucideIcon;
  trendColor: "green" | "red" | "yellow";
}

const StatCard = ({ title, value, change, icon: Icon, trendIcon: TrendIcon, trendColor }: StatCardProps) => {
  const colorMap = {
    green: "text-emerald-500",
    red: "text-red-500",
    yellow: "text-yellow-500",
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="glass-panel transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-accent/10 rounded-lg">
          <Icon className="h-6 w-6 text-accent" />
        </div>
        <TrendIcon className={`h-4 w-4 ${colorMap[trendColor]}`} />
      </div>
      <h3 className="text-sm font-medium text-white/70">{title}</h3>
      <p className="text-2xl font-semibold mt-1 text-white">{value}</p>
      <p className={`text-xs ${colorMap[trendColor]} mt-2`}>{change}</p>
    </motion.div>
  );
};

export default StatCard;