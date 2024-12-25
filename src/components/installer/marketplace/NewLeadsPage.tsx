import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { PrepaidBalance } from "../dashboard/PrepaidBalance";

export const NewLeadsPage = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* En-tête avec le solde */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
              Nouveaux Leads Disponibles
            </h1>
            <p className="text-muted-foreground">
              Découvrez tous les leads qualifiés disponibles pour votre région
            </p>
          </div>
          <div className="md:max-w-sm md:ml-auto w-full">
            <PrepaidBalance balance={150} />
          </div>
        </div>

        {/* Filtres et tableau des leads */}
        <Card className="p-6">
          <LeadsList leads={mockAvailableLeads} />
        </Card>
      </div>
    </div>
  );
};