import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, ClipboardCheck, CheckCircle, AlertCircle } from "lucide-react";
import { Lead } from "@/types/crm";

interface LeadStatsProps {
  leads: Lead[];
}

export const LeadStats = ({ leads }: LeadStatsProps) => {
  const totalLeads = leads.length;
  
  // Calcul des leads complètement remplis (tous les champs obligatoires)
  const completedLeads = leads.filter(lead => 
    lead.firstName && 
    lead.lastName && 
    lead.email && 
    lead.phone && 
    lead.address && 
    lead.postalCode && 
    lead.city && 
    lead.projectType
  ).length;

  // Pourcentage de complétion
  const completionRate = totalLeads > 0 ? Math.round((completedLeads / totalLeads) * 100) : 0;

  // Leads par statut
  const leadsByStatus = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-background/50 backdrop-blur-md border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          <Users className="h-4 w-4 text-[#1EAEDB]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLeads}</div>
        </CardContent>
      </Card>

      <Card className="bg-background/50 backdrop-blur-md border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leads Complets</CardTitle>
          <ClipboardCheck className="h-4 w-4 text-[#33C3F0]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedLeads}</div>
          <p className="text-xs text-muted-foreground">
            {completionRate}% de complétion
          </p>
        </CardContent>
      </Card>

      <Card className="bg-background/50 backdrop-blur-md border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leads Traités</CardTitle>
          <CheckCircle className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(leadsByStatus.converted || 0) + (leadsByStatus.assigned || 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            Assignés ou convertis
          </p>
        </CardContent>
      </Card>

      <Card className="bg-background/50 backdrop-blur-md border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">À Traiter</CardTitle>
          <AlertCircle className="h-4 w-4 text-[#0FA0CE]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(leadsByStatus.new || 0) + (leadsByStatus.contacted || 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            Nouveaux ou contactés
          </p>
        </CardContent>
      </Card>
    </div>
  );
};