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
    green: "text-emerald-400",
    red: "text-red-400",
    yellow: "text-yellow-400",
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-xl bg-[#2A2F3C]/50 backdrop-blur-md border border-white/10 p-6 transition-all duration-300 hover:shadow-lg hover:border-white/20"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-[#9b87f5]/10 rounded-lg">
          <Icon className="h-6 w-6 text-[#9b87f5]" />
        </div>
        <TrendIcon className={`h-4 w-4 ${colorMap[trendColor]}`} />
      </div>
      <h3 className="text-sm font-medium text-white/70">{title}</h3>
      <p className="text-2xl font-semibold mt-1 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
        {value}
      </p>
      <p className={`text-xs ${colorMap[trendColor]} mt-2`}>{change}</p>
      
      {/* Effet de brillance */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9b87f5]/0 via-[#9b87f5]/10 to-[#9b87f5]/0 opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-shimmer"/>
    </motion.div>
  );
};

export default StatCard;