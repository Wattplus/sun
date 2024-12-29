import { Lead, LeadStatus } from "@/types/crm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, UserPlus } from "lucide-react";

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
    <div className="space-y-4">
      {leads.map((lead) => (
        <Card key={lead.id} className="p-4 bg-background/50 backdrop-blur-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">
                  {lead.firstname} {lead.lastname}
                </h3>
                <p className="text-sm text-muted-foreground">{lead.email}</p>
              </div>
              <Badge className={getStatusColor(lead.status)}>
                {getStatusText(lead.status)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Type:</span>
                <p>{lead.clienttype === 'particulier' ? 'Particulier' : 'Professionnel'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Facture:</span>
                <p>{lead.monthlybill}€</p>
              </div>
              <div>
                <span className="text-muted-foreground">Téléphone:</span>
                <p>{lead.phone}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Code postal:</span>
                <p>{lead.postalcode}</p>
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
  );
};