import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, UserPlus, Phone, Mail, MapPin } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LeadPurchaseInfo } from "./LeadPurchaseInfo";

interface LeadMobileTableProps {
  leads: Lead[];
  onEditClick: (lead: Lead) => void;
  onAssignClick: (lead: Lead) => void;
  onDeleteClick: (lead: Lead) => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
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
          <Card key={lead.id} className="p-4 bg-background/50 backdrop-blur-md border-primary/10">
            <div className="space-y-4">
              {/* Header with name and status */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium text-base">
                    {lead.firstname} {lead.lastname}
                  </h3>
                  <div className="flex flex-wrap gap-2">
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
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-full">
                    <span className="text-sm font-medium text-primary">{lead.monthlybill}€/mois</span>
                  </div>
                  <LeadPurchaseInfo lead={lead} />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <a 
                  href={`mailto:${lead.email}`} 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{lead.email}</span>
                </a>
                <a 
                  href={`tel:${lead.phone}`} 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{lead.phone}</span>
                </a>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <Badge variant="outline" className="bg-primary/10">
                    {lead.postalcode}
                  </Badge>
                  {lead.city && (
                    <span className="text-sm">{lead.city}</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-primary/10">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditClick(lead)}
                  className="flex-1 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                >
                  <Edit className="h-4 w-4 mr-2 text-primary" />
                  Éditer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAssignClick(lead)}
                  disabled={lead.status === "assigned" || lead.status === "converted"}
                  className="flex-1 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                >
                  <UserPlus className="h-4 w-4 mr-2 text-primary" />
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