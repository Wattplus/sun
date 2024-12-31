import { Card } from "@/components/ui/card";
import { User, Building2, Clock } from "lucide-react";
import { Lead } from "@/types/crm";

interface MarketplaceStatsProps {
  availableLeads: Lead[];
}

export const MarketplaceStats = ({ availableLeads }: MarketplaceStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Leads particuliers</p>
            <p className="text-2xl font-bold">
              {availableLeads.filter(l => l.clienttype === 'residential').length}
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Leads professionnels</p>
            <p className="text-2xl font-bold">
              {availableLeads.filter(l => l.clienttype === 'professional').length}
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Nouveaux leads</p>
            <p className="text-2xl font-bold">
              {availableLeads.filter(l => {
                const age = new Date().getTime() - new Date(l.created_at).getTime();
                return age < 1000 * 60 * 60 * 24 * 7; // 7 jours
              }).length}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};