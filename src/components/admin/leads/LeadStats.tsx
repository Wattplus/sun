import { Card } from "@/components/ui/card";
import { Lead } from "@/types/crm";
import { Users, Target, TrendingUp, DollarSign, Clock, CheckCircle } from "lucide-react";

interface LeadStatsProps {
  leads: Lead[];
}

export const LeadStats = ({ leads }: LeadStatsProps) => {
  // Calculate total revenue from leads
  const totalRevenue = leads.reduce((acc, lead) => acc + (lead.price || 0), 0);
  
  // Calculate conversion rate
  const convertedLeads = leads.filter(lead => lead.status === 'converted').length;
  const conversionRate = leads.length > 0 ? ((convertedLeads / leads.length) * 100).toFixed(1) : '0';

  // Calculate average time to conversion (in days)
  const averageTimeToConversion = leads
    .filter(lead => lead.status === 'converted' && lead.created_at)
    .reduce((acc, lead) => {
      const createdDate = new Date(lead.created_at);
      const now = new Date();
      const diffDays = Math.ceil((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
      return acc + diffDays;
    }, 0) / (convertedLeads || 1);

  const stats = [
    {
      title: "Total Leads",
      value: leads.length,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Taux de Conversion",
      value: `${conversionRate}%`,
      icon: Target,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Revenu Total",
      value: `${totalRevenue}€`,
      icon: DollarSign,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      title: "Temps Moyen de Conversion",
      value: `${Math.round(averageTimeToConversion)} jours`,
      icon: Clock,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Leads Convertis",
      value: convertedLeads,
      icon: CheckCircle,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      title: "Croissance Mensuelle",
      value: "+12%",
      icon: TrendingUp,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};