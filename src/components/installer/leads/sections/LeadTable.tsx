import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lead, LeadStatus } from "@/types/crm";
import { Edit, Trash2, UserPlus } from "lucide-react";

interface LeadTableProps {
  leads: Lead[];
  onEditClick: (lead: Lead) => void;
  onAssignClick: (lead: Lead) => void;
  onDeleteClick: (lead: Lead) => void;
  getStatusColor: (status: LeadStatus) => string;
  getStatusText: (status: LeadStatus) => string;
}

export const LeadTable = ({
  leads,
  onEditClick,
  onAssignClick,
  onDeleteClick,
  getStatusColor,
  getStatusText,
}: LeadTableProps) => {
  return (
    <ScrollArea className="h-[600px] rounded-md border border-[#33C3F0]/20">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#1EAEDB]/5">
            <TableHead>Type de client</TableHead>
            <TableHead>Facture mensuelle</TableHead>
            <TableHead>Code postal</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id} className="hover:bg-[#1EAEDB]/5">
              <TableCell>
                {lead.clienttype === 'particulier' ? 'Particulier' : 'Professionnel'}
              </TableCell>
              <TableCell>
                {lead.monthlybill ? `${lead.monthlybill} €` : 'Non renseigné €'}
              </TableCell>
              <TableCell>
                {lead.postalcode ? (
                  <Badge variant="outline" className="bg-primary/10">
                    {lead.postalcode}
                  </Badge>
                ) : (
                  <span className="text-sm text-muted-foreground">Non renseigné</span>
                )}
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">
                    {`${lead.firstname || ''} ${lead.lastname || ''}`}
                  </div>
                  {lead.email && (
                    <div className="text-sm text-muted-foreground">
                      <a href={`mailto:${lead.email}`} className="hover:underline">
                        {lead.email}
                      </a>
                    </div>
                  )}
                  {lead.phone && (
                    <div className="text-sm text-muted-foreground">
                      <a href={`tel:${lead.phone}`} className="hover:underline">
                        {lead.phone}
                      </a>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditClick(lead)}
                    className="border-[#33C3F0]/20 hover:border-[#33C3F0]/40 hover:bg-[#33C3F0]/10"
                  >
                    <Edit className="h-4 w-4 mr-2 text-[#1EAEDB]" />
                    Éditer
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAssignClick(lead)}
                    disabled={lead.status === "assigned" || lead.status === "converted"}
                    className="border-[#33C3F0]/20 hover:border-[#33C3F0]/40 hover:bg-[#33C3F0]/10"
                  >
                    <UserPlus className="h-4 w-4 mr-2 text-[#1EAEDB]" />
                    Assigner
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteClick(lead)}
                    className="border-red-500/20 hover:border-red-500/40 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                    Supprimer
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
