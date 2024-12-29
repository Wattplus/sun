import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lead, LeadStatus } from "@/types/lead";
import { Edit, Trash2, UserPlus, Euro, Mail, Phone, MapPin, Shield, Building2, User2 } from "lucide-react";
import { LeadPurchaseInfo } from "./LeadPurchaseInfo";
import { Tooltip } from "@/components/ui/tooltip";

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
  const getVerificationBadge = (status?: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500/10 text-green-600">Vérifié</Badge>;
      case 'invalid':
        return <Badge className="bg-red-500/10 text-red-600">Invalide</Badge>;
      case 'duplicate':
        return <Badge className="bg-yellow-500/10 text-yellow-600">Doublon</Badge>;
      default:
        return <Badge className="bg-blue-500/10 text-blue-600">En attente</Badge>;
    }
  };

  const getQualityScoreBadge = (score?: number) => {
    if (score === undefined || score === null) return null;
    const getScoreColor = (score: number) => {
      if (score >= 80) return "bg-green-500/10 text-green-600";
      if (score >= 50) return "bg-yellow-500/10 text-yellow-600";
      return "bg-red-500/10 text-red-600";
    };
    return (
      <Badge className={getScoreColor(score)}>
        {score}/100
      </Badge>
    );
  };

  return (
    <ScrollArea className="h-[calc(100vh-300px)] rounded-md">
      <Table>
        <TableHeader className="bg-background/50 sticky top-0">
          <TableRow className="hover:bg-transparent border-b border-primary/10">
            <TableHead className="text-primary font-semibold">Type de client</TableHead>
            <TableHead className="text-primary font-semibold">Contact</TableHead>
            <TableHead className="text-primary font-semibold">Coordonnées</TableHead>
            <TableHead className="text-primary font-semibold">Localisation</TableHead>
            <TableHead className="text-primary font-semibold">Facture mensuelle</TableHead>
            <TableHead className="text-primary font-semibold">Score</TableHead>
            <TableHead className="text-primary font-semibold">Vérification</TableHead>
            <TableHead className="text-primary font-semibold">Statut</TableHead>
            <TableHead className="text-primary font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id} className="group hover:bg-primary/5 border-b border-primary/10">
              <TableCell>
                <div className="flex items-center gap-2">
                  {lead.clienttype === 'particulier' ? (
                    <User2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Building2 className="h-4 w-4 text-amber-500" />
                  )}
                  <Badge 
                    variant="outline" 
                    className={lead.clienttype === 'particulier' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}
                  >
                    {lead.clienttype === 'particulier' ? 'Particulier' : 'Professionnel'}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">
                  {lead.firstname} {lead.lastname}
                </div>
                <LeadPurchaseInfo lead={lead} />
              </TableCell>
              <TableCell>
                <div className="space-y-1.5">
                  <Tooltip content="Envoyer un email">
                    <a 
                      href={`mailto:${lead.email}`} 
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="truncate max-w-[200px]">{lead.email}</span>
                    </a>
                  </Tooltip>
                  <Tooltip content="Appeler">
                    <a 
                      href={`tel:${lead.phone}`} 
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      <span>{lead.phone}</span>
                    </a>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <Badge variant="outline" className="bg-primary/10">
                    {lead.postalcode}
                  </Badge>
                  {lead.city && (
                    <span className="text-sm text-muted-foreground">
                      {lead.city}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Euro className="h-4 w-4 text-primary" />
                  <span className="font-medium">{lead.monthlybill}€/mois</span>
                </div>
              </TableCell>
              <TableCell>
                {getQualityScoreBadge(lead.quality_score)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  {getVerificationBadge(lead.verification_status)}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(lead.status)}>
                  {getStatusText(lead.status)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Tooltip content="Éditer">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditClick(lead)}
                      className="border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                    >
                      <Edit className="h-4 w-4 text-primary" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Assigner">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAssignClick(lead)}
                      disabled={lead.status === "assigned" || lead.status === "converted"}
                      className="border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                    >
                      <UserPlus className="h-4 w-4 text-primary" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Supprimer">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteClick(lead)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};