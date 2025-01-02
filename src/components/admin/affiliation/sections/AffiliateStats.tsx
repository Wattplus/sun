import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, CreditCard, BarChart } from "lucide-react";

const mockData = [
  { name: 'Jan', leads: 40, revenue: 2400 },
  { name: 'Fév', leads: 30, revenue: 1398 },
  { name: 'Mar', leads: 60, revenue: 4800 },
  { name: 'Avr', leads: 80, revenue: 3908 },
  { name: 'Mai', leads: 70, revenue: 4800 },
  { name: 'Jun', leads: 90, revenue: 3800 },
];

const stats = [
  {
    title: "Total Affiliés",
    value: "156",
    change: "+12%",
    icon: Users,
  },
  {
    title: "Leads Générés",
    value: "2,345",
    change: "+25%",
    icon: TrendingUp,
  },
  {
    title: "Revenus Totaux",
    value: "45,678€",
    change: "+18%",
    icon: CreditCard,
  },
  {
    title: "Taux de Conversion",
    value: "3.2%",
    change: "+5%",
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
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className="text-sm text-green-600 mt-1">{stat.change} ce mois</p>
              </div>
              <stat.icon className="h-8 w-8 text-primary opacity-75" />
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Performance des Affiliations</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="leads" stroke="#2563eb" name="Leads" />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#16a34a" name="Revenus" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
};