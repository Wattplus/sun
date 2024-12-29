import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export const StatCard = ({ title, value, icon: Icon, trend, trendUp }: StatCardProps) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="relative group rounded-xl bg-gradient-to-b from-white/[0.12] to-white/[0.08] p-6 shadow-lg border border-white/10 overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            trendUp ? "text-emerald-400" : "text-red-400"
          )}>
            {trendUp ? (
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m2 20 10-10 10 10" />
                <path d="M12 10v10" />
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m2 4 10 10L22 4" />
                <path d="M12 4v10" />
              </svg>
            )}
            <span>{trend}</span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-white/70">{title}</h3>
      <p className="text-2xl font-semibold mt-1 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
        {value}
      </p>
      
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-shimmer"/>
    </motion.div>
  );
};

export default StatCard;