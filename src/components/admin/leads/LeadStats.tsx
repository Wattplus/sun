import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lead } from "@/types/crm";
import { EuroIcon, Users, CheckCircle, XCircle } from "lucide-react";

interface LeadStatsProps {
  leads: Lead[];
}

export const LeadStats = ({ leads }: LeadStatsProps) => {
  const totalRevenue = leads.reduce((sum, lead) => {
    const price = typeof lead.price === 'number' ? lead.price : 0;
    return sum + price;
  }, 0);
  
  const convertedLeads = leads.filter(lead => lead.status === "converted").length;
  const lostLeads = leads.filter(lead => lead.status === "lost").length;
  const conversionRate = leads.length > 0 ? (convertedLeads / leads.length * 100).toFixed(1) : "0";

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
          <EuroIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} €</div>
          <p className="text-xs text-muted-foreground">
            Revenu total généré
          </p>
        </CardContent>
      </Card>

      <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leads Totaux</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{leads.length}</div>
          <p className="text-xs text-muted-foreground">
            Nombre total de leads
          </p>
        </CardContent>
      </Card>

      <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leads Convertis</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{convertedLeads}</div>
          <p className="text-xs text-muted-foreground">
            Taux de conversion: {conversionRate}%
          </p>
        </CardContent>
      </Card>

      <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leads Perdus</CardTitle>
          <XCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{lostLeads}</div>
          <p className="text-xs text-muted-foreground">
            Leads non convertis
          </p>
        </CardContent>
      </Card>
    </div>
  );
};