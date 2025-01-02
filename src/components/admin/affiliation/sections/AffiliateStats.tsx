import { motion } from "framer-motion";
import { Users, TrendingUp, CreditCard, BarChart, UserCheck, Percent } from "lucide-react";
import { useAffiliateStats } from "@/hooks/affiliates/useAffiliateStats";
import { useAffiliateTransactions } from "@/hooks/affiliates/useAffiliateTransactions";
import { StatsCard } from "../components/StatsCard";
import { PerformanceChart } from "../components/PerformanceChart";
import { GrowthChart } from "../components/GrowthChart";
import { LoadingSkeleton } from "../components/LoadingSkeleton";

export const AffiliateStats = () => {
  const { data: stats, isLoading: statsLoading } = useAffiliateStats();
  const { data: transactions, isLoading: transactionsLoading } = useAffiliateTransactions();

  const statsCards = [
    {
      title: "Total Affiliés",
      value: stats?.totalAffiliates?.toString() || "0",
      change: "+12%",
      trend: "up" as const,
      icon: Users,
    },
    {
      title: "Affiliés Actifs",
      value: stats?.activeAffiliates?.toString() || "0",
      change: "+8%",
      trend: "up" as const,
      icon: UserCheck,
    },
    {
      title: "Leads Générés",
      value: stats?.totalLeads?.toString() || "0",
      change: "+25%",
      trend: "up" as const,
      icon: TrendingUp,
    },
    {
      title: "Revenus Totaux",
      value: `${stats?.totalRevenue?.toLocaleString() || 0}€`,
      change: "+18%",
      trend: "up" as const,
      icon: CreditCard,
    },
    {
      title: "Commission Moyenne",
      value: `${stats?.averageCommission?.toLocaleString() || 0}€`,
      change: "+15%",
      trend: "up" as const,
      icon: BarChart,
    },
    {
      title: "Taux de Conversion",
      value: `${stats?.conversionRate || 0}%`,
      change: "+10%",
      trend: "up" as const,
      icon: Percent,
    },
  ];

  if (statsLoading || transactionsLoading) {
    return <LoadingSkeleton />;
  }

  const chartData = transactions?.reduce((acc: any[], transaction) => {
    const date = new Date(transaction.created_at).toLocaleDateString('fr-FR', { month: 'short' });
    const existingData = acc.find(item => item.name === date);
    
    if (existingData) {
      existingData.revenue += transaction.amount;
      existingData.commissions += transaction.commission;
    } else {
      acc.push({
        name: date,
        revenue: transaction.amount,
        commissions: transaction.commission,
      });
    }
    
    return acc;
  }, []) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart data={chartData} />
        <GrowthChart data={chartData} />
      </div>
    </motion.div>
  );
};