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
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      {/* Header avec notifications */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            Mon Espace Pro
          </h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos leads et suivez votre activité en temps réel
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="glass-button">
            <Bell className="h-4 w-4 mr-2" />
            <Badge variant="secondary" className="ml-1">2</Badge>
          </Button>
          <Button variant="outline" className="glass-button">
            <Calendar className="h-4 w-4 mr-2" />
            Planning
          </Button>
        </div>
      </div>

      {/* Solde et Stats */}
      <div className="grid gap-8">
        <PrepaidBalance balance={0} />
        <StatsCards />
      </div>

      {/* Leads et Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-6">
          <LeadsList leads={mockLeads} />
        </div>
        <div className="glass-panel p-6">
          <MessagesList />
        </div>
      </div>

      {/* Section Notifications */}
      <div className="glass-panel p-6">
        <NotificationsList />
      </div>
    </div>
  );
}