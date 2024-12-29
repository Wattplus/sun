import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { Euro, Users, CheckCircle, AlertOctagon } from "lucide-react";

interface LeadStatsProps {
  leads: Lead[];
}

export const LeadStats = ({ leads }: LeadStatsProps) => {
  const totalLeads = leads.length;
  const newLeads = leads.filter(lead => lead.status === "new").length;
  const assignedLeads = leads.filter(lead => lead.status === "assigned").length;
  const convertedLeads = leads.filter(lead => lead.status === "converted").length;

  const stats = [
    {
      title: "Total des leads",
      value: totalLeads,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Nouveaux leads",
      value: newLeads,
      icon: AlertOctagon,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Leads assignés",
      value: assignedLeads,
      icon: CheckCircle,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Leads convertis",
      value: convertedLeads,
      icon: Euro,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card 
          key={index}
          className="relative overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors"
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold tracking-tight">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};