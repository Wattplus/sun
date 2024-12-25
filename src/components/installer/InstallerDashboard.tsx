import { Bell, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCards } from "./dashboard/StatsCards";
import { LeadsList } from "./dashboard/LeadsList";
import { MessagesList } from "./dashboard/MessagesList";
import { NotificationsList } from "./dashboard/NotificationsList";
import { PrepaidBalance } from "./dashboard/PrepaidBalance";
import { mockLeads } from "@/types/crm";

export function InstallerDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-6">
      {/* En-tête simplifié */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold gradient-text">
          Tableau de Bord
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" className="glass-button">
            <Bell className="h-4 w-4" />
            <Badge variant="secondary" className="ml-1">2</Badge>
          </Button>
          <Button variant="outline" className="glass-button">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Portefeuille et Statistiques */}
      <div className="grid gap-4">
        <PrepaidBalance balance={0} />
        <StatsCards />
      </div>

      {/* Leads et Messages côte à côte */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-panel p-4">
          <LeadsList leads={mockLeads} />
        </div>
        <div className="glass-panel p-4">
          <MessagesList />
        </div>
      </div>

      {/* Notifications en bas */}
      <div className="glass-panel p-4">
        <NotificationsList />
      </div>
    </div>
  );
}