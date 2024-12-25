import { useState } from "react";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Lead } from "@/types/crm";
import { ShoppingCart, Package, MapPin, Filter, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function NewLeadsPage() {
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { toast } = useToast();

  const handleLeadSelect = (lead: Lead) => {
    if (selectedLeads.find(l => l.id === lead.id)) {
      setSelectedLeads(selectedLeads.filter(l => l.id !== lead.id));
    } else {
      setSelectedLeads([...selectedLeads, lead]);
    }
  };

  const calculateTotalPrice = () => {
    return selectedLeads.reduce((total, lead) => total + lead.price, 0);
  };

  const handleBulkPurchase = async () => {
    if (selectedLeads.length === 0) {
      toast({
        title: "Aucun lead sélectionné",
        description: "Veuillez sélectionner au moins un lead à acheter.",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Achat en cours",
        description: `Traitement de l'achat de ${selectedLeads.length} leads...`,
      });

      // Simulate API call success
      setTimeout(() => {
        toast({
          title: "Achat réussi !",
          description: `${selectedLeads.length} leads ont été ajoutés à votre portefeuille.`,
        });
        setSelectedLeads([]);
      }, 1500);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'achat des leads.",
        variant: "destructive",
      });
    }
  };

  const filteredLeads = mockAvailableLeads
    .filter(lead => {
      const matchesSearch = 
        lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = projectTypeFilter === "all" || lead.projectType === projectTypeFilter;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <InstallerBreadcrumb />
      <div className="max-w-[1600px] mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Nouveaux Leads Disponibles
            </h1>
            <p className="text-primary/60 mt-2">
              Sélectionnez les leads qui vous intéressent pour un achat groupé
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-primary/60">Total sélectionné</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10">
                  <Package className="w-4 h-4 mr-1" />
                  {selectedLeads.length} leads
                </Badge>
                <Badge variant="outline" className="bg-primary/10">
                  {calculateTotalPrice()}€
                </Badge>
              </div>
            </div>
            
            <Button
              onClick={handleBulkPurchase}
              className="flex items-center gap-2"
              disabled={selectedLeads.length === 0}
            >
              <ShoppingCart className="w-4 h-4" />
              Acheter la sélection
            </Button>
          </div>
        </div>
        
        <div className="glass-panel p-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Input
                  placeholder="Rechercher par nom ou ville..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Filter className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              </div>
            </div>
            <Select value={projectTypeFilter} onValueChange={setProjectTypeFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Type de projet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="residential">Résidentiel</SelectItem>
                <SelectItem value="professional">Professionnel</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="shrink-0"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Type de projet</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Prix</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="cursor-pointer hover:bg-primary/5">
                  <TableCell>
                    <Checkbox
                      checked={selectedLeads.some(l => l.id === lead.id)}
                      onCheckedChange={() => handleLeadSelect(lead)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {lead.firstName} {lead.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {lead.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{lead.postalCode} {lead.city}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-primary/10">
                      {lead.projectType === 'residential' ? 'Résidentiel' : 'Professionnel'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(lead.createdAt), { 
                      addSuffix: true,
                      locale: fr 
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="bg-primary/10">
                      {lead.price}€
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}