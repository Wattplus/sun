import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LeadCard } from "@/components/installer/dashboard/leads/LeadCard";
import { useLeads } from "@/hooks/use-leads";
import { Lead } from "@/types/crm";

interface AllAvailableLeadsProps {
  onClose: () => void;
}

export const AllAvailableLeads: FC<AllAvailableLeadsProps> = ({ onClose }) => {
  const { leads, isLoading, error } = useLeads();

  const availableLeads = leads.filter((lead: Lead) => !lead.assignedto);

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Leads disponibles</h2>
            <Button variant="ghost" onClick={onClose}>
              <span className="sr-only">Fermer</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Button>
          </div>

          {isLoading ? (
            <div>Chargement...</div>
          ) : error ? (
            <div>Une erreur est survenue</div>
          ) : (
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {availableLeads.map((lead: Lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
                {availableLeads.length === 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Aucun lead disponible</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Il n'y a actuellement aucun lead disponible à l'achat.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
};