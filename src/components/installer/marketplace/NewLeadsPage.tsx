import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { PrepaidBalance } from "../dashboard/PrepaidBalance";
import { Lead } from "@/types/crm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingCart, 
  ArrowRight, 
  Info, 
  Building2, 
  Filter,
  Search,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstallerLayout } from "../navigation/InstallerLayout";

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
      <div className="space-y-6">
        <InstallerBreadcrumb />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              Nouveaux Leads Disponibles
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {filteredLeads.length} leads
              </Badge>
            </h1>
            <p className="text-muted-foreground mt-1">
              Découvrez les derniers leads qualifiés correspondant à votre zone
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleRefresh}
              className="shrink-0"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            {selectedLeads.length > 0 && (
              <Button 
                onClick={handlePurchaseLeads}
                className="bg-primary hover:bg-primary/90 gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Acheter {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} ({selectedLeads.reduce((sum, lead) => sum + lead.price, 0)}€)
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
            <div className="relative space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Rechercher par ville, code postal ou type de projet..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtres
                </Button>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="all">Tous les leads</TabsTrigger>
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

          <div className="space-y-6">
            <PrepaidBalance balance={150} />
            
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Info className="h-5 w-5" />
                  <h3 className="font-medium">Pourquoi acheter ces leads ?</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="h-6 w-6 rounded-full p-1">1</Badge>
                    Leads qualifiés et vérifiés
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="h-6 w-6 rounded-full p-1">2</Badge>
                    Projets à fort potentiel
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="h-6 w-6 rounded-full p-1">3</Badge>
                    Contact rapide recommandé
                  </li>
                </ul>
                <Button className="w-full gap-2" size="lg">
                  Recharger mon compte
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            {selectedLeads.length > 0 && (
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Récapitulatif de la sélection
                  </h3>
                  <div className="space-y-2">
                    {selectedLeads.map(lead => (
                      <div key={lead.id} className="flex justify-between text-sm">
                        <span>{lead.firstName} {lead.lastName}</span>
                        <span className="font-medium">{lead.price}€</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                      <span>Total</span>
                      <span>{selectedLeads.reduce((sum, lead) => sum + lead.price, 0)}€</span>
                    </div>
                  </div>
                  <Button 
                    onClick={handlePurchaseLeads}
                    className="w-full"
                    size="lg"
                  >
                    Procéder au paiement
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </InstallerLayout>
  );
};