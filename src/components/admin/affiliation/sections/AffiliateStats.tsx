import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, TrendingUp, CreditCard, BarChart, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

const mockData = [
  { name: 'Jan', leads: 40, revenue: 2400, affiliates: 10 },
  { name: 'Fév', leads: 30, revenue: 1398, affiliates: 12 },
  { name: 'Mar', leads: 60, revenue: 4800, affiliates: 15 },
  { name: 'Avr', leads: 80, revenue: 3908, affiliates: 18 },
  { name: 'Mai', leads: 70, revenue: 4800, affiliates: 20 },
  { name: 'Jun', leads: 90, revenue: 3800, affiliates: 25 },
];

const stats = [
  {
    title: "Total Affiliés",
    value: "156",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Leads Générés",
    value: "2,345",
    change: "+25%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Revenus Totaux",
    value: "45,678€",
    change: "+18%",
    trend: "up",
    icon: CreditCard,
  },
  {
    title: "Taux de Conversion",
    value: "3.2%",
    change: "-5%",
    trend: "down",
    icon: BarChart,
  },
];

export const AffiliateStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
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
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#33C3F0" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#33C3F0" stopOpacity={0}/>
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
                <Area 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#1EAEDB" 
                  fillOpacity={1} 
                  fill="url(#colorLeads)" 
                  name="Leads"
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#33C3F0" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  name="Revenus (€)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Croissance des Affiliés</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
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
                <Line 
                  type="monotone" 
                  dataKey="affiliates" 
                  stroke="#1EAEDB" 
                  strokeWidth={2}
                  dot={{ fill: '#1EAEDB', strokeWidth: 2 }}
                  name="Nombre d'affiliés"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};