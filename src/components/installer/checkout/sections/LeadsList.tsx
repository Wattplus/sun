import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface LeadsListProps {
  leads: Lead[];
  onDeleteLead: (leadId: string) => void;
  total: number;
}

export const LeadsList = ({ leads, onDeleteLead, total }: LeadsListProps) => {
  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/20">
      <div className="space-y-6">
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="flex justify-between items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium">{lead.firstname} {lead.lastname}</p>
                <p className="text-sm text-white/60">{lead.postalcode}</p>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    lead.clienttype === 'professional' 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-secondary/20 text-secondary-foreground'
                  }`}>
                    {lead.clienttype === 'professional' ? 'Professionnel' : 'Particulier'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-medium text-lg">
                  {lead.clienttype === 'professional' ? '49€' : '26€'}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteLead(lead.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Total</p>
              <p className="text-sm text-white/60">TVA incluse</p>
            </div>
            <p className="text-2xl font-bold">{total}€</p>
          </div>
        </div>
      </div>
    </Card>
  );
};