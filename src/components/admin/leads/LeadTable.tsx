import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lead, LeadStatus } from "@/types/crm";
import { Edit, Trash2, UserPlus, Euro, Mail, Phone } from "lucide-react";
import { LeadPurchaseInfo } from "./LeadPurchaseInfo";

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
    <ScrollArea className="h-[calc(100vh-300px)] rounded-md border border-[#33C3F0]/20">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#1EAEDB]/5">
            <TableHead>Type de client</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Coordonnées</TableHead>
            <TableHead>Code postal</TableHead>
            <TableHead>Facture mensuelle</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id} className="hover:bg-[#1EAEDB]/5">
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={lead.clienttype === 'particulier' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}
                >
                  {lead.clienttype === 'particulier' ? 'Particulier' : 'Professionnel'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">
                    {`${lead.firstname} ${lead.lastname}`}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
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
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-primary/10">
                  {lead.postalcode}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Euro className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{lead.monthlybill}€</span>
                </div>
                <div className="mt-1">
                  <LeadPurchaseInfo lead={lead} />
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(lead.status)}>
                  {getStatusText(lead.status)}
                </Badge>
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
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteClick(lead)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
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