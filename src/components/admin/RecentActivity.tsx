import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lead } from "@/types/crm";

interface RecentActivityProps {
  leads: Lead[];
  installers: any[]; // Type this properly based on your installer type
}

const RecentActivity = ({ leads, installers }: RecentActivityProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Activité Récente</h3>
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {leads.map((lead, index) => (
            <div
              key={lead.id || index}
              className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors"
            >
              <div>
                <p className="font-medium">
                  {lead.firstname} {lead.lastname}
                </p>
                <p className="text-sm text-muted-foreground">
                  {lead.email} - {lead.postalcode}
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(lead.created_at).toLocaleDateString('fr-FR')}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecentActivity;