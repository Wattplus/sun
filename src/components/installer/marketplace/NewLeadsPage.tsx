import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { Lead } from "@/types/crm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, RefreshCw, Search, Filter, ArrowRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstallerLayout } from "../navigation/InstallerLayout";
import { AccountSection } from "./sections/AccountSection";

export const NewLeadsPage = () => {
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleLeadSelect = (lead: Lead) => {
    if (selectedLeads.some(l => l.id === lead.id)) {
      setSelectedLeads(selectedLeads.filter(l => l.id !== lead.id));
    } else {
      setSelectedLeads([...selectedLeads, lead]);
    }
  };

  const handlePurchaseLeads = () => {
    const total = selectedLeads.reduce((sum, lead) => sum + lead.price, 0);
    toast({
      title: "Achat de leads",
      description: `Redirection vers le paiement pour ${total}€...`,
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Mise à jour des leads",
      description: "La liste des leads a été actualisée.",
    });
  };

  const filteredLeads = mockAvailableLeads.filter(lead => 
    lead.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.postalCode.includes(searchQuery) ||
    lead.projectType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <InstallerLayout>
      <div className="max-w-6xl mx-auto space-y-4 p-4">
        <InstallerBreadcrumb />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-white/5 backdrop-blur-sm border-primary/10 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium">Solde disponible</h2>
                <p className="text-3xl font-bold text-primary">150€</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90" size="sm">
                <Wallet className="mr-2 h-4 w-4" />
                Recharger
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-white/5 backdrop-blur-sm border-primary/10">
            <div className="text-center">
              <h2 className="text-lg font-medium mb-2">Paiement direct</h2>
              <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5">
                Voir les tarifs
              </Button>
            </div>
          </Card>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border-primary/10">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-medium flex items-center gap-2">
                  Nouveaux Leads
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {filteredLeads.length}
                  </Badge>
                </h1>
                <p className="text-sm text-muted-foreground">
                  Leads qualifiés disponibles
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleRefresh}
                  className="border-primary/20 hover:bg-primary/5"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                {selectedLeads.length > 0 && (
                  <Button 
                    size="sm"
                    onClick={handlePurchaseLeads}
                    className="bg-primary hover:bg-primary/90 gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Acheter {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} ({selectedLeads.reduce((sum, lead) => sum + lead.price, 0)}€)
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher par ville, code postal..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 bg-transparent"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 border-primary/20 hover:bg-primary/5"
              >
                <Filter className="h-4 w-4" />
                Filtres
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="residential">Résidentiel</TabsTrigger>
                <TabsTrigger value="professional">Professionnel</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <LeadsList 
                  leads={filteredLeads} 
                  onLeadSelect={handleLeadSelect}
                  selectedLeads={selectedLeads}
                />
              </TabsContent>
              <TabsContent value="residential">
                <LeadsList 
                  leads={filteredLeads.filter(lead => lead.projectType === 'residential')} 
                  onLeadSelect={handleLeadSelect}
                  selectedLeads={selectedLeads}
                />
              </TabsContent>
              <TabsContent value="professional">
                <LeadsList 
                  leads={filteredLeads.filter(lead => lead.projectType === 'professional')} 
                  onLeadSelect={handleLeadSelect}
                  selectedLeads={selectedLeads}
                />
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </InstallerLayout>
  );
};