import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';
import { Users, TrendingUp, CreditCard, BarChart, ArrowUpRight, ArrowDownRight, UserCheck, Percent } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAffiliateStats } from "@/hooks/affiliates/useAffiliateStats";
import { useAffiliateTransactions } from "@/hooks/affiliates/useAffiliateTransactions";
import { Skeleton } from "@/components/ui/skeleton";

export const AffiliateStats = () => {
  const { data: stats, isLoading: statsLoading } = useAffiliateStats();
  const { data: transactions, isLoading: transactionsLoading } = useAffiliateTransactions();

  const statsCards = [
    {
      title: "Total Affiliés",
      value: stats?.totalAffiliates?.toString() || "0",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Affiliés Actifs",
      value: stats?.activeAffiliates?.toString() || "0",
      change: "+8%",
      trend: "up",
      icon: UserCheck,
    },
    {
      title: "Leads Générés",
      value: stats?.totalLeads?.toString() || "0",
      change: "+25%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Revenus Totaux",
      value: `${stats?.totalRevenue?.toLocaleString() || 0}€`,
      change: "+18%",
      trend: "up",
      icon: CreditCard,
    },
    {
      title: "Commission Moyenne",
      value: `${stats?.averageCommission?.toLocaleString() || 0}€`,
      change: "+15%",
      trend: "up",
      icon: BarChart,
    },
    {
      title: "Taux de Conversion",
      value: `${stats?.conversionRate || 0}%`,
      change: "+10%",
      trend: "up",
      icon: Percent,
    },
  ];

  if (statsLoading || transactionsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-4 w-12" />
          </Card>
        ))}
      </div>
    );
  }

  // Transformer les transactions pour le graphique
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
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <div className="flex items-center gap-1">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <p className={cn(
                    "text-sm font-medium",
                    stat.trend === 'up' ? "text-green-500" : "text-red-500"
                  )}>
                    {stat.change}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performance des Affiliations</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCommissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" />
                <YAxis stroke="#ffffff50" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0B1221', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#1EAEDB" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  name="Revenus (€)"
                />
                <Area 
                  type="monotone" 
                  dataKey="commissions" 
                  stroke="#4CAF50" 
                  fillOpacity={1} 
                  fill="url(#colorCommissions)" 
                  name="Commissions (€)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Croissance des Affiliés</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" />
                <YAxis stroke="#ffffff50" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0B1221', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#1EAEDB" 
                  strokeWidth={2}
                  dot={{ fill: '#1EAEDB', strokeWidth: 2 }}
                  name="Revenus"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};