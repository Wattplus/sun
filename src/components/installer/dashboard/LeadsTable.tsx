import { Lead } from "@/types/crm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { EmptyLeadState } from "./EmptyLeadState";
import { Info, MapPin, Lock, Euro, Building, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LeadsTableProps {
  leads: Lead[];
  onLeadSelect?: (lead: Lead) => void;
  selectedLeads?: Lead[];
}

export const LeadsTable = ({ leads, onLeadSelect, selectedLeads = [] }: LeadsTableProps) => {
  const { toast } = useToast();

  const getProjectTypeIcon = (type: string) => {
    return type === "residential" ? <Home className="h-4 w-4" /> : <Building className="h-4 w-4" />;
  };

  const getProjectTypeLabel = (type: string) => {
    switch (type) {
      case "residential":
        return "Résidentiel";
      case "professional":
        return "Professionnel";
      default:
        return type;
    }
  };

  const handleInfoClick = (lead: Lead) => {
    toast({
      title: "Informations masquées",
      description: "Achetez ce lead pour voir les coordonnées complètes du contact.",
    });
  };

  if (leads.length === 0) {
    return <EmptyLeadState />;
  }

  return (
    <TooltipProvider>
      <Table>
        <TableHeader className="bg-background/40">
          <TableRow>
            {onLeadSelect && (
              <TableHead className="w-[50px]">
                <span className="sr-only">Sélection</span>
              </TableHead>
            )}
            <TableHead>Type</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Projet</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Prix</TableHead>
            <TableHead className="w-[50px]">Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id} className="group hover:bg-primary/5">
              {onLeadSelect && (
                <TableCell>
                  <Checkbox
                    checked={selectedLeads.some(l => l.id === lead.id)}
                    onCheckedChange={() => onLeadSelect(lead)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </TableCell>
              )}
              <TableCell>
                <Badge 
                  variant="outline" 
                  className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1"
                >
                  {getProjectTypeIcon(lead.projectType)}
                  {getProjectTypeLabel(lead.projectType)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {lead.city}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Dép. {lead.postalCode.substring(0, 2)}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    {lead.budget.toLocaleString()}€
                  </div>
                  <div className="text-sm text-muted-foreground line-clamp-1">
                    {lead.notes}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Tooltip>
                  <TooltipTrigger>
                    {formatDistanceToNow(new Date(lead.createdAt), { 
                      addSuffix: true,
                      locale: fr 
                    })}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Créé le {new Date(lead.createdAt).toLocaleDateString()}</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell className="text-right font-medium">
                <div className="flex items-center justify-end gap-1">
                  <Euro className="h-4 w-4" />
                  {lead.price}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleInfoClick(lead)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
};