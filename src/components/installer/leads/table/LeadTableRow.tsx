import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Phone, Mail, User, CalendarDays, Euro, FileText } from "lucide-react";
import { Lead } from "@/types/crm";
import { LeadTableActions } from "./LeadTableActions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface LeadTableRowProps {
  lead: Lead;
  isSelected: boolean;
  onSelect: (lead: Lead) => void;
}

export const LeadTableRow = ({ lead, isSelected, onSelect }: LeadTableRowProps) => {
  const { toast } = useToast();

  const handleContact = (type: string) => {
    if (type === 'phone') {
      window.location.href = `tel:${lead.phone}`;
    } else if (type === 'email') {
      window.location.href = `mailto:${lead.email}`;
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
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="space-y-2 cursor-pointer">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span className="font-medium">{lead.firstName} {lead.lastName}</span>
              </div>
              <div className="flex flex-col gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleContact('phone')}
                  className="justify-start gap-2"
                >
                  <Phone className="h-4 w-4" />
                  {lead.phone}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleContact('email')}
                  className="justify-start gap-2"
                >
                  <Mail className="h-4 w-4" />
                  {lead.email}
                </Button>
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Détails du projet</h4>
              <div className="text-sm space-y-1">
                <p><span className="text-muted-foreground">Budget:</span> {lead.budget}€</p>
                <p><span className="text-muted-foreground">Notes:</span> {lead.notes}</p>
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span>
                    Créé {formatDistanceToNow(new Date(lead.createdAt), { 
                      addSuffix: true,
                      locale: fr 
                    })}
                  </span>
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            {lead.city}
          </div>
          <div className="text-sm text-muted-foreground">
            {lead.address}
          </div>
          <div className="text-sm text-muted-foreground">
            {lead.postalCode}
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