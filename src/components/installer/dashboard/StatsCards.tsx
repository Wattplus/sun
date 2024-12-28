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
      bgColor: "bg-primary/5"
    },
    {
      title: "Leads achetés",
      value: "12",
      change: "+8% ce mois",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/5"
    },
    {
      title: "Taux de conversion",
      value: "68%",
      change: "+5% ce trimestre",
      icon: Star,
      color: "text-primary",
      bgColor: "bg-primary/5"
    },
    {
      title: "Temps moyen",
      value: "2.4j",
      change: "-0.5j ce mois",
      icon: Clock,
      color: "text-primary",
      bgColor: "bg-primary/5"
    },
    {
      title: "Chiffre d'affaires",
      value: "45K€",
      change: "+15% ce mois",
      icon: Euro,
      color: "text-primary",
      bgColor: "bg-primary/5"
    },
    {
      title: "Devis envoyés",
      value: "18",
      change: "+4 cette semaine",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/5"
    },
    {
      title: "Projets signés",
      value: "8",
      change: "+2 ce mois",
      icon: CheckCircle,
      color: "text-primary",
      bgColor: "bg-primary/5"
    },
    {
      title: "En attente",
      value: "6",
      change: "-2 cette semaine",
      icon: AlertCircle,
      color: "text-primary",
      bgColor: "bg-primary/5"
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
            className="col-span-2 sm:col-span-2 lg:col-span-1"
          >
            <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
              <div className="flex flex-col gap-2">
                <div className={`p-2 rounded-lg ${stat.bgColor} w-fit`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                  <p className="text-xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className={`text-xs ${stat.change.includes('+') ? 'text-primary' : 'text-destructive'}`}>
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