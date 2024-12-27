import { Card } from "@/components/ui/card";
import { LeadsList } from "../dashboard/LeadsList";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { Lead } from "@/types/crm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, RefreshCw, Search, Filter, ArrowRight, Wallet, Euro } from "lucide-react";
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
        
        {/* Prix des leads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6 bg-gradient-to-br from-white/5 to-primary/5 border border-primary/10 hover:border-primary/20 transition-all duration-300">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Euro className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Lead Particulier</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">26€</span>
                <span className="text-sm text-muted-foreground">avec compte prépayé</span>
              </div>
              <p className="text-sm text-muted-foreground">35€ sans compte prépayé</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white/5 to-primary/5 border border-primary/10 hover:border-primary/20 transition-all duration-300">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Euro className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Lead Pro</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">49€</span>
                <span className="text-sm text-muted-foreground">avec compte prépayé</span>
              </div>
              <p className="text-sm text-muted-foreground">59€ sans compte prépayé</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white/5 to-primary/5 border border-primary/10 hover:border-primary/20 transition-all duration-300">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Lead Exclusif</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">89€</span>
                <span className="text-sm text-muted-foreground">accès unique</span>
              </div>
              <p className="text-sm text-muted-foreground">Contactez-nous pour plus d'infos</p>
            </div>
          </Card>
        </div>

        {/* Reste du contenu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Reste du contenu ici */}
        </div>

        {/* Reste du contenu */}
        <div className="mb-6">
          <LeadsFilters
            availableDepartments={availableDepartments}
            selectedDepartments={selectedDepartments}
            projectTypeFilter={projectTypeFilter}
            priceFilter={priceFilter}
            onDepartmentSelect={handleDepartmentSelect}
            onDepartmentRemove={handleDepartmentRemove}
            onProjectTypeChange={setProjectTypeFilter}
            onPriceFilterChange={setPriceFilter}
          />
        </div>

        {/* Panier de sélection */}
        {selectedLeads.length > 0 && (
          <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">
                  {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} sélectionné{selectedLeads.length > 1 ? 's' : ''}
                </h3>
                <p className="text-muted-foreground">Total: {totalPrice}€</p>
              </div>
              <Button 
                onClick={handleBulkPurchase}
                className="bg-primary hover:bg-primary-dark text-white px-6"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Acheter la sélection
              </Button>
            </div>
          </Card>
        )}

        {/* Grille de leads */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {availableLeads.map(lead => (
            <LeadCard 
              key={lead.id} 
              lead={lead} 
              onPurchase={handlePurchase}
              isPurchased={purchasedLeads.includes(lead.id)}
              subscriptionTier={userSubscriptionTier}
            />
          ))}
        </div>

        {/* Message si aucun lead */}
        {availableLeads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun lead ne correspond à vos critères de recherche.</p>
          </div>
        )}

        {/* Bouton voir plus */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="gap-2">
            Voir plus de leads
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </InstallerLayout>
  );
};
