import { motion } from "framer-motion";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, FileText, Target, ChartBar } from "lucide-react";

const monthlyData = [
  { month: 'Jan', leads: 65, conversions: 12, revenue: 4500 },
  { month: 'Fév', leads: 78, conversions: 15, revenue: 5200 },
  { month: 'Mar', leads: 82, conversions: 18, revenue: 6100 },
  { month: 'Avr', leads: 95, conversions: 22, revenue: 7300 },
  { month: 'Mai', leads: 110, conversions: 25, revenue: 8200 },
  { month: 'Jun', leads: 125, conversions: 30, revenue: 9500 },
];

const StatisticsPage = () => {
  return (
    <div className="space-y-6 p-6">
      <AdminBreadcrumb />
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ChartBar className="h-6 w-6 text-primary" />
          Statistiques
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-background/50 backdrop-blur-md border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">555</div>
            <p className="text-xs text-muted-foreground">+12% ce mois</p>
          </CardContent>
        </Card>

        <Card className="bg-background/50 backdrop-blur-md border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24%</div>
            <p className="text-xs text-muted-foreground">+2.5% vs dernier mois</p>
          </CardContent>
        </Card>

        <Card className="bg-background/50 backdrop-blur-md border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devis Générés</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">133</div>
            <p className="text-xs text-muted-foreground">+8% ce mois</p>
          </CardContent>
        </Card>

        <Card className="bg-background/50 backdrop-blur-md border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Croissance</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15%</div>
            <p className="text-xs text-muted-foreground">vs mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-background/50 backdrop-blur-md border-primary/20">
          <CardHeader>
            <CardTitle>Évolution des Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="month" stroke="#ffffff50" />
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
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background/50 backdrop-blur-md border-primary/20">
          <CardHeader>
            <CardTitle>Taux de Conversion Mensuel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="month" stroke="#ffffff50" />
                  <YAxis stroke="#ffffff50" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0B1221', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px' 
                    }} 
                  />
                  <Bar dataKey="conversions" fill="#1EAEDB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsPage;