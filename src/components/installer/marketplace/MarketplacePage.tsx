import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, MapPin, Euro, Building, Home } from "lucide-react";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { LeadCard } from "@/components/admin/marketplace/LeadCard";
import { SubscriptionTier } from "@/types/subscription";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MarketplacePage = () => {
  const [purchasedLeads, setPurchasedLeads] = useState<string[]>([]);
  const { toast } = useToast();
  const userSubscriptionTier: SubscriptionTier = 'free';

  const handlePurchase = (leadId: string) => {
    setPurchasedLeads(prev => [...prev, leadId]);
    toast({
      title: "Lead acheté avec succès",
      description: "Le lead a été ajouté à votre liste.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6">
      <InstallerBreadcrumb />
      
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Leads Disponibles</h1>
            <p className="text-muted-foreground mt-1">
              Découvrez et achetez les derniers leads qualifiés
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              <Euro className="w-4 h-4 mr-2" />
              Solde: 150€
            </Badge>
            <Button variant="outline" className="gap-2">
              <ShoppingBag className="w-4 h-4" />
              Mes achats
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Filtres
              </h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Home className="w-4 h-4" />
                  Résidentiel
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Building className="w-4 h-4" />
                  Professionnel
                </Button>
              </div>
            </div>
          </Card>

          <div className="lg:col-span-2">
            <ScrollArea className="h-[600px] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockAvailableLeads.map(lead => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onPurchase={() => handlePurchase(lead.id)}
                    isPurchased={purchasedLeads.includes(lead.id)}
                    subscriptionTier={userSubscriptionTier}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {mockAvailableLeads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun lead disponible pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};