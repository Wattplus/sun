import { Card } from "@/components/ui/card";
import { Lead } from "@/types/crm";
import { Users, UserCheck, UserX, Clock } from "lucide-react";

interface LeadStatsProps {
  leads: Lead[];
}

export const LeadStats = ({ leads }: LeadStatsProps) => {
  const totalLeads = leads.length;
  const assignedLeads = leads.filter(lead => lead.status === "assigned").length;
  const convertedLeads = leads.filter(lead => lead.status === "converted").length;
  const pendingLeads = leads.filter(lead => lead.status === "new").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total leads</p>
            <p className="text-2xl font-semibold">{totalLeads}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-emerald-500/10">
            <UserCheck className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Leads assignés</p>
            <p className="text-2xl font-semibold">{assignedLeads}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-amber-500/10">
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">En attente</p>
            <p className="text-2xl font-semibold">{pendingLeads}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-blue-500/10">
            <UserX className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Convertis</p>
            <p className="text-2xl font-semibold">{convertedLeads}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};