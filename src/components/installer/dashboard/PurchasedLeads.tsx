import { ScrollArea } from "@/components/ui/scroll-area";
import { Lead } from "@/types/crm";
import { useState } from "react";
import { EmptyLeadState } from "./EmptyLeadState";
import { LeadCard } from "./LeadCard";
import { mockPurchasedLeads } from "./mockPurchasedLeads";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface PurchasedLeadsProps {
  leads?: Lead[];
}

export const PurchasedLeads = ({ leads = mockPurchasedLeads }: PurchasedLeadsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [leadNotes, setLeadNotes] = useState<Record<string, string[]>>({});
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleAddNote = (leadId: string, note: string) => {
    setLeadNotes(prev => ({
      ...prev,
      [leadId]: [...(prev[leadId] || []), note]
    }));
  };

  if (leads.length === 0) {
    return <EmptyLeadState />;
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.postalCode.includes(searchTerm);

    const matchesStatus = statusFilter === "all" || lead.installerStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher un lead..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="nouveau">Nouveau</SelectItem>
            <SelectItem value="contacte">Contacté</SelectItem>
            <SelectItem value="devis_envoye">Devis envoyé</SelectItem>
            <SelectItem value="rdv_planifie">RDV planifié</SelectItem>
            <SelectItem value="negociation">En négociation</SelectItem>
            <SelectItem value="signe">Signé</SelectItem>
            <SelectItem value="perdu">Perdu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="bg-primary/10">
          {filteredLeads.length} leads
        </Badge>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              status="purchased"
              onNoteAdd={(note) => handleAddNote(lead.id, note)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};