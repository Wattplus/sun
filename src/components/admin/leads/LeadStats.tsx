import { Lead } from "@/types/crm";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Euro, UserCheck, UserX } from "lucide-react";

interface LeadStatsProps {
  leads: Lead[];
}

export const LeadStats = ({ leads }: LeadStatsProps) => {
  const totalLeads = leads.length;
  const assignedLeads = leads.filter(lead => lead.assignedto).length;
  const convertedLeads = leads.filter(lead => lead.status === "converted").length;
  const lostLeads = leads.filter(lead => lead.status === "lost").length;

  const totalRevenue = leads.reduce((total, lead) => {
    const purchaseCount = lead.purchasedby?.length || 0;
    return total + (purchaseCount * 25); // 25€ par achat
  }, 0);

  const stats = [
    {
      title: "Total des leads",
      value: totalLeads,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Chiffre d'affaires",
      value: `${totalRevenue}€`,
      icon: Euro,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Leads convertis",
      value: convertedLeads,
      icon: UserCheck,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Leads perdus",
      value: lostLeads,
      icon: UserX,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-[#33C3F0]/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </span>
                <span className="text-2xl font-bold">
                  {stat.value}
                </span>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};