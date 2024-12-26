import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Phone, Mail, User, Calendar } from "lucide-react";
import { Lead, InstallerLeadStatus } from "@/types/crm";
import { LeadTableActions } from "./LeadTableActions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { LeadDetailsDialog } from "../dialogs/LeadDetailsDialog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface LeadTableRowProps {
  lead: Lead;
  isSelected: boolean;
  onSelect: (lead: Lead) => void;
  onStatusChange: (leadId: string, status: InstallerLeadStatus) => void;
}

export const LeadTableRow = ({ lead, isSelected, onSelect, onStatusChange }: LeadTableRowProps) => {
  const { toast } = useToast();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleContact = (type: string) => {
    if (type === 'phone' && lead.phone) {
      window.location.href = `tel:${lead.phone}`;
    } else if (type === 'email' && lead.email) {
      window.location.href = `mailto:${lead.email}`;
    }
    toast({
      title: "Contact",
      description: `Contact initié via ${type}`,
    });
  };

  const getStatusBadge = (status: InstallerLeadStatus) => {
    const statusConfig: Record<InstallerLeadStatus, { label: string; className: string }> = {
      nouveau: { 
        label: "Nouveau lead", 
        className: "bg-blue-500/10 text-blue-500 border-blue-500/20" 
      },
      contacte: { 
        label: "Contacté", 
        className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" 
      },
      devis_envoye: { 
        label: "Devis envoyé", 
        className: "bg-orange-500/10 text-orange-500 border-orange-500/20" 
      },
      rdv_planifie: { 
        label: "RDV planifié", 
        className: "bg-purple-500/10 text-purple-500 border-purple-500/20" 
      },
      negociation: { 
        label: "En négociation", 
        className: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" 
      },
      signe: { 
        label: "Signé", 
        className: "bg-green-500/10 text-green-500 border-green-500/20" 
      },
      perdu: { 
        label: "Perdu", 
        className: "bg-red-500/10 text-red-500 border-red-500/20" 
      }
    };

    const config = statusConfig[status || 'nouveau'];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <>
      <TableRow 
        className="group hover:bg-primary/5 cursor-pointer transition-all duration-200 border-b"
        onClick={() => setIsDetailsOpen(true)}
      >
        <TableCell className="w-[50px]" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onSelect(lead)}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
        </TableCell>
        <TableCell className="w-[120px]">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm">
              {format(new Date(lead.createdAt), 'dd/MM/yyyy', { locale: fr })}
            </span>
          </div>
        </TableCell>
        <TableCell>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">
                {lead.firstName || lead.lastName ? 
                  `${lead.firstName || ''} ${lead.lastName || ''}`.trim() : 
                  "Client à contacter"}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {lead.phone && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleContact('phone');
                  }}
                  className="h-8 px-2 justify-start gap-2 text-sm hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <Phone className="h-3 w-3" />
                  {lead.phone}
                </Button>
              )}
              {lead.email && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleContact('email');
                  }}
                  className="h-8 px-2 justify-start gap-2 text-sm hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <Mail className="h-3 w-3" />
                  {lead.email}
                </Button>
              )}
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{lead.city || "Ville non renseignée"}</span>
            </div>
            {lead.postalCode && (
              <span className="text-sm text-muted-foreground block ml-6">
                {lead.postalCode}
              </span>
            )}
          </div>
        </TableCell>
        <TableCell className="w-[120px]">
          <Badge 
            variant="outline" 
            className="bg-primary/10 text-primary border-primary/20 font-medium"
          >
            {lead.projectType === 'residential' ? 'Résidentiel' : 'Professionnel'}
          </Badge>
        </TableCell>
        <TableCell className="w-[120px]">
          {getStatusBadge(lead.installerStatus || 'nouveau')}
        </TableCell>
        <TableCell className="w-[100px]" onClick={(e) => e.stopPropagation()}>
          <LeadTableActions 
            leadId={lead.id} 
            currentStatus={lead.installerStatus || 'nouveau'} 
            onStatusChange={onStatusChange}
          />
        </TableCell>
      </TableRow>

      <LeadDetailsDialog
        lead={lead}
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onOpenChange={setIsDetailsOpen}
      />
    </>
  );
};