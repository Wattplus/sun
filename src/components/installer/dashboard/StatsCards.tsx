import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Users, Star, Clock, Euro, FileText, CheckCircle, AlertCircle } from "lucide-react";

export const StatsCards = () => {
  const stats = [
    {
      title: "Leads disponibles",
      value: "24",
      change: "+12% cette semaine",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Leads achetés",
      value: "12",
      change: "+8% ce mois",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Taux de conversion",
      value: "68%",
      change: "+5% ce trimestre",
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      title: "Temps moyen",
      value: "2.4j",
      change: "-0.5j ce mois",
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Chiffre d'affaires",
      value: "45K€",
      change: "+15% ce mois",
      icon: Euro,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      title: "Devis envoyés",
      value: "18",
      change: "+4 cette semaine",
      icon: FileText,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Projets signés",
      value: "8",
      change: "+2 ce mois",
      icon: CheckCircle,
      color: "text-teal-500",
      bgColor: "bg-teal-500/10"
    },
    {
      title: "En attente",
      value: "6",
      change: "-2 cette semaine",
      icon: AlertCircle,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
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
                <div className="space-y-1">
                  <p className="text-sm text-white/60">{stat.title}</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className={`text-xs ${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
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