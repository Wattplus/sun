import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Users, Euro, FileText } from "lucide-react";
import { useLeadOperations } from "@/hooks/useLeadOperations";
import { useEffect, useState } from "react";

export const StatsCards = () => {
  const { leads } = useLeadOperations();
  const [stats, setStats] = useState([
    {
      title: "Leads disponibles",
      value: "0",
      change: "+0% cette semaine",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/5"
    },
    {
      title: "Investissement total",
      value: "0€",
      change: "+0% ce mois",
      icon: Euro,
      color: "text-primary",
      bgColor: "bg-primary/5"
    },
    {
      title: "Leads achetés",
      value: "0",
      change: "+0% ce mois",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/5"
    },
    {
      title: "ROI estimé",
      value: "0%",
      change: "+0% ce trimestre",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/5"
    }
  ]);

  useEffect(() => {
    if (leads) {
      const availableLeads = leads.filter(lead => !lead.purchasedby?.length);
      const purchasedLeads = leads.filter(lead => lead.purchasedby?.length);
      
      console.log("[StatsCards] Calculating stats from", leads.length, "leads");
      console.log("[StatsCards] Available leads:", availableLeads.length);
      console.log("[StatsCards] Purchased leads:", purchasedLeads.length);

      // Calculate total investment (price per purchased lead)
      const totalInvestment = purchasedLeads.reduce((total, lead) => total + (lead.price || 25), 0);
      
      // Calculate estimated ROI (example: 300% return on investment)
      const estimatedROI = totalInvestment > 0 ? 300 : 0;

      setStats(prevStats => {
        const newStats = [...prevStats];
        newStats[0] = {
          ...newStats[0],
          value: availableLeads.length.toString(),
          change: "+12% cette semaine"
        };
        newStats[1] = {
          ...newStats[1],
          value: `${totalInvestment}€`,
          change: "+8% ce mois"
        };
        newStats[2] = {
          ...newStats[2],
          value: purchasedLeads.length.toString(),
          change: "+15% ce mois"
        };
        newStats[3] = {
          ...newStats[3],
          value: `${estimatedROI}%`,
          change: "+5% ce trimestre"
        };
        return newStats;
      });
    }
  }, [leads]);

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
            className="col-span-1"
          >
            <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {stat.value}
                    </p>
                    <p className={`text-sm mt-1 ${stat.change.includes('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </>
  );
};