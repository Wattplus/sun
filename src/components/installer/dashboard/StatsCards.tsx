import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Users, Euro, FileText } from "lucide-react";
import { useLeadOperations } from "@/hooks/useLeadOperations";
import { useEffect, useState } from "react";
import { Lead } from "@/types/crm";

export const StatsCards = () => {
  const { leads } = useLeadOperations();
  const [stats, setStats] = useState({
    availableLeads: 0,
    totalInvestment: 0,
    purchasedLeads: 0,
    estimatedROI: 0,
    weeklyLeadChange: 0,
    monthlyInvestmentChange: 0,
    monthlyPurchaseChange: 0,
    quarterlyROIChange: 0
  });

  useEffect(() => {
    if (leads) {
      // Calculate current stats
      const availableLeads = leads.filter(lead => !lead.purchasedby?.length).length;
      const purchasedLeads = leads.filter(lead => lead.purchasedby?.length).length;
      
      // Calculate total investment (price of purchased leads)
      const totalInvestment = leads
        .filter(lead => lead.purchasedby?.length)
        .reduce((total, lead) => total + (lead.price || 25), 0);
      
      // Calculate ROI (example: assuming 300% return on successful conversions)
      const estimatedROI = purchasedLeads > 0 ? 
        (leads.filter(lead => lead.status === 'converted').length / purchasedLeads) * 300 : 0;

      // Calculate changes (simulated for now - in real app would compare with historical data)
      const weeklyLeadChange = availableLeads > 0 ? 12 : 0; // 12% increase
      const monthlyInvestmentChange = totalInvestment > 0 ? 8 : 0; // 8% increase
      const monthlyPurchaseChange = purchasedLeads > 0 ? 15 : 0; // 15% increase
      const quarterlyROIChange = estimatedROI > 0 ? 5 : 0; // 5% increase

      setStats({
        availableLeads,
        totalInvestment,
        purchasedLeads,
        estimatedROI,
        weeklyLeadChange,
        monthlyInvestmentChange,
        monthlyPurchaseChange,
        quarterlyROIChange
      });

      console.log("[StatsCards] Updated stats:", {
        availableLeads,
        totalInvestment,
        purchasedLeads,
        estimatedROI
      });
    }
  }, [leads]);

  const statCards = [
    {
      title: "Leads disponibles",
      value: stats.availableLeads,
      change: `${stats.weeklyLeadChange > 0 ? '+' : ''}${stats.weeklyLeadChange}% cette semaine`,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/5"
    },
    {
      title: "Investissement total",
      value: `${stats.totalInvestment}€`,
      change: `${stats.monthlyInvestmentChange > 0 ? '+' : ''}${stats.monthlyInvestmentChange}% ce mois`,
      icon: Euro,
      color: "text-primary",
      bgColor: "bg-primary/5"
    },
    {
      title: "Leads achetés",
      value: stats.purchasedLeads,
      change: `${stats.monthlyPurchaseChange > 0 ? '+' : ''}${stats.monthlyPurchaseChange}% ce mois`,
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/5"
    },
    {
      title: "ROI estimé",
      value: `${stats.estimatedROI}%`,
      change: `${stats.quarterlyROIChange > 0 ? '+' : ''}${stats.quarterlyROIChange}% ce trimestre`,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/5"
    }
  ];

  return (
    <>
      {statCards.map((stat, index) => {
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
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className={`text-sm ${Number(stat.change.split('%')[0]) > 0 ? 'text-emerald-500' : 'text-red-500'} font-medium`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold mt-1 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {stat.value}
              </p>
            </Card>
          </motion.div>
        );
      })}
    </>
  );
};