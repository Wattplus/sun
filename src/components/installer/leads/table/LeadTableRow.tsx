import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Phone, Mail } from "lucide-react";
import { Lead } from "@/types/crm";
import { LeadTableActions } from "./LeadTableActions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LeadTableRowProps {
  lead: Lead;
  isSelected: boolean;
  onSelect: (lead: Lead) => void;
}

export const LeadTableRow = ({ lead, isSelected, onSelect }: LeadTableRowProps) => {
  const { toast } = useToast();

  const handleContact = (type: string, value: string) => {
    if (type === 'phone') {
      window.location.href = `tel:${value}`;
    } else if (type === 'email') {
      window.location.href = `mailto:${value}`;
    }
    toast({
      title: "Contact",
      description: `Contact initié via ${type}`,
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      new: { 
        label: "Nouveau", 
        className: "bg-blue-500/10 text-blue-500 border-blue-500/20" 
      },
      contacted: { 
        label: "Contacté", 
        className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" 
      },
      qualified: { 
        label: "Qualifié", 
        className: "bg-green-500/10 text-green-500 border-green-500/20" 
      },
      converted: { 
        label: "Converti", 
        className: "bg-primary/10 text-primary border-primary/20" 
      },
      lost: { 
        label: "Perdu", 
        className: "bg-red-500/10 text-red-500 border-red-500/20" 
      }
    };

    const config = statusConfig[status] || statusConfig.new;

    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <TableRow key={lead.id} className="hover:bg-primary/5">
      <TableCell>
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(lead)}
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
      </TableCell>
      <TableCell>
        <div className="space-y-2">
          <div className="font-medium">{`${lead.firstName} ${lead.lastName}`}</div>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleContact('phone', lead.phone)}
              className="justify-start gap-2 w-full"
            >
              <Phone className="h-4 w-4" />
              {lead.phone}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleContact('email', lead.email)}
              className="justify-start gap-2 w-full"
            >
              <Mail className="h-4 w-4" />
              {lead.email}
            </Button>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 mt-1 text-primary" />
          <div>
            <div>{lead.address}</div>
            <div className="text-sm text-muted-foreground">{`${lead.postalCode} ${lead.city}`}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge 
          variant="outline" 
          className="bg-primary/10 text-primary border-primary/20"
        >
          {lead.projectType === 'residential' ? 'Résidentiel' : 'Professionnel'}
        </Badge>
      </TableCell>
      <TableCell>
        {getStatusBadge(lead.status)}
      </TableCell>
      <TableCell>
        <LeadTableActions leadId={lead.id} />
      </TableCell>
    </TableRow>
  );
};