import { Card } from "@/components/ui/card";
import { Users, FileText, Target, TrendingUp, Euro } from "lucide-react";
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const kpiData = [
  {
    title: "Visiteurs",
    value: "2,543",
    change: "+15% ce mois",
    icon: Users,
    data: Array.from({ length: 30 }, (_, i) => ({ value: Math.random() * 100 }))
  },
  {
    title: "Devis Générés",
    value: "384",
    change: "+12% cette semaine",
    icon: FileText,
    data: Array.from({ length: 30 }, (_, i) => ({ value: Math.random() * 100 }))
  },
  {
    title: "Leads Qualifiés",
    value: "156",
    change: "+18% cette semaine",
    icon: Target,
    data: Array.from({ length: 30 }, (_, i) => ({ value: Math.random() * 100 }))
  },
  {
    title: "Taux de Conversion",
    value: "15.1%",
    change: "+3% ce mois",
    icon: TrendingUp,
    data: Array.from({ length: 30 }, (_, i) => ({ value: Math.random() * 100 }))
  },
  {
    title: "Chiffre d'affaires",
    value: "12,450€",
    change: "+20% ce trimestre",
    icon: Euro,
    data: Array.from({ length: 30 }, (_, i) => ({ value: Math.random() * 100 }))
  }
];

export function KPISection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-emerald-600 font-medium">
                  {kpi.change}
                </span>
              </div>
              
              <h3 className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </h3>
              <p className="text-2xl font-bold mt-1">
                {kpi.value}
              </p>
              
              <div className="h-[40px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={kpi.data}>
                    <defs>
                      <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#1EAEDB"
                      fill={`url(#gradient-${index})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}