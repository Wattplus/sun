import { Lead, LeadStatus } from "@/types/crm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, UserPlus, Phone, Mail, Euro } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LeadMobileTableProps {
  leads: Lead[];
  onEditClick: (lead: Lead) => void;
  onAssignClick: (lead: Lead) => void;
  onDeleteClick: (lead: Lead) => void;
  getStatusColor: (status: LeadStatus) => string;
  getStatusText: (status: LeadStatus) => string;
}

export const LeadMobileTable = ({
  leads,
  onEditClick,
  onAssignClick,
  onDeleteClick,
  getStatusColor,
  getStatusText,
}: LeadMobileTableProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="space-y-4 pb-4">
        {leads.map((lead) => (
          <Card key={lead.id} className="p-4 bg-background/50 backdrop-blur-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-lg">
                    {lead.firstname} {lead.lastname}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getStatusColor(lead.status)}>
                      {getStatusText(lead.status)}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={lead.clienttype === 'particulier' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}
                    >
                      {lead.clienttype === 'particulier' ? 'Particulier' : 'Professionnel'}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Euro className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{lead.monthlybill}€</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <a 
                  href={`mailto:${lead.email}`} 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>{lead.email}</span>
                </a>
                <a 
                  href={`tel:${lead.phone}`} 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>{lead.phone}</span>
                </a>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline" className="bg-primary/10">
                    {lead.postalcode}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditClick(lead)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Éditer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAssignClick(lead)}
                  className="flex-1"
                  disabled={lead.status === "assigned" || lead.status === "converted"}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Assigner
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeleteClick(lead)}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};