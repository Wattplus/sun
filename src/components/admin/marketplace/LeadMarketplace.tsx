import { useState } from "react";
import { Lead, mockLeads } from "@/types/crm";
import { LeadCard } from "./LeadCard";
import { useToast } from "@/components/ui/use-toast";
import { AdminBreadcrumb } from "../AdminBreadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Euro, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const LeadMarketplace = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("all");
  const { toast } = useToast();

  const handlePurchase = (lead: Lead) => {
    setSelectedLead(lead);
    setPurchaseDialogOpen(true);
  };

  const confirmPurchase = () => {
    if (!selectedLead) return;

    toast({
      title: "Lead acheté avec succès",
      description: "Vous pouvez maintenant voir les coordonnées complètes du contact.",
    });

    setLeads(leads.map(l => 
      l.id === selectedLead.id 
        ? { ...l, status: "assigned" as const } 
        : l
    ));
    setPurchaseDialogOpen(false);
  };

  const filteredLeads = leads
    .filter(lead => lead.status === "new")
    .filter(lead => 
      lead.projectType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(lead => 
      projectTypeFilter === "all" ? true : lead.projectType === projectTypeFilter
    );

  const uniqueProjectTypes = Array.from(
    new Set(leads.map(lead => lead.projectType))
  );

  return (
    <div className="glass-panel p-6">
      <AdminBreadcrumb />
      <div className="mb-6">
        <h2 className="text-2xl font-bold gradient-text mb-2">Marketplace des Leads</h2>
        <p className="text-muted-foreground">
          Découvrez et achetez des leads qualifiés pour développer votre activité
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher par type de projet ou ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={projectTypeFilter}
            onValueChange={setProjectTypeFilter}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Type de projet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les projets</SelectItem>
              {uniqueProjectTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLeads.map(lead => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onPurchase={handlePurchase}
              showFullDetails={lead.status === "assigned"}
            />
          ))}
        </div>
        {filteredLeads.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Aucun lead ne correspond à vos critères de recherche
          </div>
        )}
      </ScrollArea>

      <Dialog open={purchaseDialogOpen} onOpenChange={setPurchaseDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer l'achat</DialogTitle>
            <DialogDescription>
              Voulez-vous acheter ce lead pour {selectedLead?.price}€ ?
              <div className="mt-2 p-4 bg-muted/50 rounded-lg">
                <p className="font-medium">{selectedLead?.projectType}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedLead?.city} ({selectedLead?.postalCode})
                </p>
                <div className="mt-2 flex items-center gap-1 text-primary">
                  <Euro className="h-4 w-4" />
                  <span>Budget estimé: {selectedLead?.budget.toLocaleString()}€</span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 sm:space-x-0">
            <Button variant="outline" onClick={() => setPurchaseDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={confirmPurchase} className="flex items-center gap-2">
              <Euro className="h-4 w-4" />
              Confirmer l'achat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};