import { AdminBreadcrumb } from "../AdminBreadcrumb";
import { LeadCard } from "./LeadCard";
import { mockLeads, Lead } from "@/types/crm";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { SubscriptionTier } from "@/types/subscription";
import { LeadsFilters } from "@/components/installer/dashboard/LeadsFilters";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InstallerLeadStatus } from "@/types/crm";

type FilterStatus = "all" | InstallerLeadStatus;

interface Filters {
  status: FilterStatus;
  projectType: string;
  city: string;
}

export const LeadMarketplace = () => {
  const { toast } = useToast();
  const [purchasedLeads, setPurchasedLeads] = useState<string[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<"default" | "asc" | "desc">("default");

  const availableDepartments = Array.from(
    new Set(mockLeads.map(lead => lead.postalcode.substring(0, 2)))
  ).sort();

  const availableLeads = mockLeads.filter(lead => {
    if (projectTypeFilter !== 'all' && lead.projectType !== projectTypeFilter) return false;
    if (selectedDepartments.length > 0 && !selectedDepartments.includes(lead.postalcode.substring(0, 2))) return false;
    return lead.status === "qualified";
  });

  const handlePurchase = (lead: Lead) => {
    setPurchasedLeads(prev => [...prev, lead.id]);
    toast({
      title: "Lead acheté avec succès",
      description: `Le lead ${lead.firstname} ${lead.lastname} a été ajouté à votre liste.`,
    });
  };

  const handleBulkPurchase = () => {
    selectedLeads.forEach(lead => handlePurchase(lead));
    setSelectedLeads([]);
  };

  const handleDepartmentSelect = (department: string) => {
    if (department && !selectedDepartments.includes(department)) {
      setSelectedDepartments([...selectedDepartments, department]);
    }
  };

  const handleDepartmentRemove = (department: string) => {
    setSelectedDepartments(selectedDepartments.filter(d => d !== department));
  };

  const totalPrice = selectedLeads.reduce((sum, lead) => sum + (lead.price || 0), 0);
  const userSubscriptionTier: SubscriptionTier = 'free';

  return (
    <div className="space-y-6">
      <AdminBreadcrumb />
      
      <div className="bg-gradient-to-r from-background/90 to-background p-8 rounded-xl border border-primary/20">
        {/* En-tête et description */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
            Marketplace des Leads Qualifiés
          </h1>
          <p className="text-xl text-muted-foreground">
            Développez votre activité avec des leads vérifiés et qualifiés
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              <TrendingUp className="w-5 h-5 mr-2" />
              Taux de conversion moyen : 65%
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              {availableLeads.length} leads disponibles
            </Badge>
          </div>
        </div>

        {/* Filtres */}
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
    </div>
  );
};