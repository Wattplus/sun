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
    <div className="container mx-auto p-6 space-y-6">
      {/* Header avec notifications */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] bg-clip-text text-transparent">
            Tableau de Bord Installateur
          </h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue ! Gérez vos leads et suivez votre activité
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="border-[#9b87f5]/20 hover:border-[#9b87f5]/40">
            <Bell className="h-4 w-4 mr-2 text-[#9b87f5]" />
            <Badge variant="secondary" className="ml-1">2</Badge>
          </Button>
          <Button variant="outline" className="border-[#9b87f5]/20 hover:border-[#9b87f5]/40">
            <Calendar className="h-4 w-4 mr-2 text-[#9b87f5]" />
            Planning
          </Button>
        </div>
      </div>

      {/* Solde Prépayé avec historique */}
      <PrepaidBalance balance={0} />

      {/* Statistiques */}
      <StatsCards />

      {/* Leads et Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadsList leads={mockLeads} />
        <MessagesList />
      </div>

      {/* Section Notifications */}
      <NotificationsList />
    </div>
  );
}