import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { Lead } from "@/types/crm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, RefreshCw, Search, Filter, ArrowRight } from "lucide-react";
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
      <div className="max-w-6xl mx-auto space-y-4">
        <InstallerBreadcrumb />
        
        <AccountSection />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-medium flex items-center gap-2">
              Nouveaux Leads
              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                {filteredLeads.length}
              </Badge>
            </h1>
            <p className="text-sm text-muted-foreground">
              Découvrez les derniers leads qualifiés
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              className="text-xs border-primary/20 hover:bg-primary/5"
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
            {selectedLeads.length > 0 && (
              <Button 
                size="sm"
                onClick={handlePurchaseLeads}
                className="text-xs bg-primary hover:bg-primary/90 gap-2"
              >
                <ShoppingCart className="h-3 w-3" />
                Acheter {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} ({selectedLeads.reduce((sum, lead) => sum + lead.price, 0)}€)
                <ArrowRight className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border-primary/10">
          <div className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher par ville, code postal..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-8 text-sm bg-transparent"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs gap-2 border-primary/20 hover:bg-primary/5"
              >
                <Filter className="h-3 w-3" />
                Filtres
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full justify-start h-8">
                <TabsTrigger value="all" className="text-xs">Tous</TabsTrigger>
                <TabsTrigger value="residential" className="text-xs">Résidentiel</TabsTrigger>
                <TabsTrigger value="professional" className="text-xs">Professionnel</TabsTrigger>
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