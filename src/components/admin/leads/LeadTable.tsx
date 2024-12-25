import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lead, LeadStatus } from "@/types/crm";
import { Edit, Trash2 } from "lucide-react";

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
            <TableHead>Date</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Projet</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Assigné à</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id} className="hover:bg-[#1EAEDB]/5">
              <TableCell className="font-medium">
                {new Date(lead.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="font-medium">{`${lead.firstName} ${lead.lastName}`}</div>
                <div className="text-sm text-muted-foreground">{lead.email}</div>
                <div className="text-sm text-muted-foreground">{lead.phone}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{lead.city}</div>
                <div className="text-sm text-muted-foreground">{lead.postalCode}</div>
              </TableCell>
              <TableCell>{lead.projectType}</TableCell>
              <TableCell>{lead.budget.toLocaleString()}€</TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(lead.status)} text-white`}>
                  {getStatusText(lead.status)}
                </Badge>
              </TableCell>
              <TableCell>{lead.assignedTo || "-"}</TableCell>
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