import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lead, LeadStatus } from "@/types/lead";
import { Euro, MapPin, Shield, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { LeadActions } from "./table/LeadActions";
import { LeadContact } from "./table/LeadContact";
import { LeadClientType } from "./table/LeadClientType";

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
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(leads.map(lead => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (leadId: string, checked: boolean) => {
    if (checked) {
      setSelectedLeads([...selectedLeads, leadId]);
    } else {
      setSelectedLeads(selectedLeads.filter(id => id !== leadId));
    }
  };

  const handleDeleteSelected = () => {
    selectedLeads.forEach(leadId => {
      const lead = leads.find(l => l.id === leadId);
      if (lead) onDeleteClick(lead);
    });
    setSelectedLeads([]);
  };

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
    <div className="space-y-4">
      {selectedLeads.length > 0 && (
        <div className="flex items-center justify-between bg-background/50 p-4 rounded-lg border border-primary/10">
          <span className="text-sm text-muted-foreground">
            {selectedLeads.length} lead(s) sélectionné(s)
          </span>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteSelected}
            className="gap-2"
          >
            <Trash className="h-4 w-4" />
            Supprimer la sélection
          </Button>
        </div>
      )}
      
      <ScrollArea className="h-[calc(100vh-300px)] rounded-md">
        <Table>
          <TableHeader className="bg-background/50 sticky top-0">
            <TableRow className="hover:bg-transparent border-b border-primary/10">
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedLeads.length === leads.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="text-primary font-semibold">Type de client</TableHead>
              <TableHead className="text-primary font-semibold">Contact</TableHead>
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
                  <Checkbox
                    checked={selectedLeads.includes(lead.id)}
                    onCheckedChange={(checked) => handleSelectLead(lead.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <LeadClientType lead={lead} />
                </TableCell>
                <TableCell>
                  <LeadContact lead={lead} />
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
    </div>
  );
};