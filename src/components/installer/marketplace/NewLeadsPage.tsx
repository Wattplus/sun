import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { Lead } from "@/types/crm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, RefreshCw, Search, Filter, ArrowRight, Wallet, Plus } from "lucide-react";
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
      <div className="space-y-6">
        <InstallerBreadcrumb />
        
        <AccountSection />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleRefresh}
              className="shrink-0 hover:bg-primary/10 group"
            >
              <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
            </Button>
            <Button 
              variant="outline"
              className="shrink-0 hover:bg-green-500/10 group border-green-500/20"
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
              Nouveau lead
            </Button>
            {selectedLeads.length > 0 && (
              <Button 
                onClick={handlePurchaseLeads}
                className="bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 border-0 transition-all duration-300 bg-[length:200%_100%] animate-gradient group gap-2"
              >
                <ShoppingCart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Acheter {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} ({selectedLeads.reduce((sum, lead) => sum + lead.price, 0)}€)
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>
        </div>

        <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-background">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
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
              <Button variant="outline" className="gap-2 group hover:bg-primary/10">
                <Filter className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                Filtres avancés
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="all" className="group">
                  Tous les leads
                  <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-data-[state=active]:opacity-100 group-data-[state=active]:translate-x-1 transition-all" />
                </TabsTrigger>
                <TabsTrigger value="residential" className="group">
                  Résidentiel
                  <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-data-[state=active]:opacity-100 group-data-[state=active]:translate-x-1 transition-all" />
                </TabsTrigger>
                <TabsTrigger value="professional" className="group">
                  Professionnel
                  <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-data-[state=active]:opacity-100 group-data-[state=active]:translate-x-1 transition-all" />
                </TabsTrigger>
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