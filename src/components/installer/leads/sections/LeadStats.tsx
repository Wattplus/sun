import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  PhoneCall, 
  Calendar, 
  TrendingUp,
  Clock,
  CheckCircle2
} from "lucide-react";

interface LeadStatsProps {
  leads: Lead[];
}

export const LeadStats = ({ leads }: LeadStatsProps) => {
  const totalLeads = leads.length;
  const newLeads = leads.filter(lead => lead.status === 'new').length;
  const contactedLeads = leads.filter(lead => lead.status === 'contacted').length;
  const qualifiedLeads = leads.filter(lead => lead.status === 'qualified').length;
  const convertedLeads = leads.filter(lead => lead.status === 'converted').length;
  
  const conversionRate = totalLeads > 0 
    ? ((convertedLeads / totalLeads) * 100).toFixed(1) 
    : '0';

  const stats = [
    {
      title: "Total des leads",
      value: totalLeads,
      icon: Users,
      description: "Nombre total de leads achetés",
    },
    {
      title: "Nouveaux",
      value: newLeads,
      icon: Clock,
      description: "Leads pas encore contactés",
    },
    {
      title: "Contactés",
      value: contactedLeads,
      icon: PhoneCall,
      description: "Leads en cours de traitement",
    },
    {
      title: "Qualifiés",
      value: qualifiedLeads,
      icon: Calendar,
      description: "Rendez-vous programmés",
    },
    {
      title: "Convertis",
      value: convertedLeads,
      icon: CheckCircle2,
      description: "Projets signés",
    },
    {
      title: "Taux de conversion",
      value: `${conversionRate}%`,
      icon: TrendingUp,
      description: "Pourcentage de leads convertis",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 border-primary/10 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold tracking-tight">
                {stat.value}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};