import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lead, LeadStatus } from "@/types/crm";
import { EuroIcon } from "lucide-react";
import { LeadPurchaseInfo } from "./LeadPurchaseInfo";
import { LeadActions } from "./LeadActions";

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
            <TableHead>Statut</TableHead>
            <TableHead>Revenu</TableHead>
            <TableHead>Achats</TableHead>
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
                {lead.monthlybill ? `${lead.monthlybill} €` : 'Non renseigné'}
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
                <Badge className={`${getStatusColor(lead.status)}`}>
                  {getStatusText(lead.status)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <EuroIcon className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{lead.price || 0} €</span>
                </div>
              </TableCell>
              <TableCell>
                <LeadPurchaseInfo lead={lead} />
              </TableCell>
              <TableCell>
                <LeadActions
                  lead={lead}
                  onEditClick={onEditClick}
                  onAssignClick={onAssignClick}
                  onDeleteClick={onDeleteClick}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};