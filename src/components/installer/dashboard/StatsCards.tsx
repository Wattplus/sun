import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Users, Star, Clock } from "lucide-react";

export const StatsCards = () => {
  const stats = [
    {
      title: "Leads disponibles",
      value: "24",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Leads achetés",
      value: "12",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Taux de conversion",
      value: "68%",
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      title: "Temps moyen",
      value: "2.4j",
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    }
  ];

  return (
    <>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-white/60">{stat.title}</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </>
  );
};