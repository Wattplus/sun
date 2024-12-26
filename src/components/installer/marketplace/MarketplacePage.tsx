import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, TrendingUp, Users, ArrowRight, Sparkles, Target, BadgePercent, Euro } from "lucide-react";
import { Link } from "react-router-dom";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { LeadCard } from "@/components/admin/marketplace/LeadCard";
import { SubscriptionTier } from "@/types/subscription";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

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
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <InstallerBreadcrumb />
      
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
            Marketplace des Leads Qualifiés
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Développez votre activité avec des leads vérifiés et qualifiés, prêts à concrétiser leurs projets
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              <TrendingUp className="w-5 h-5 mr-2" />
              Taux de conversion moyen : 65%
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              <Target className="w-5 h-5 mr-2" />
              Leads géolocalisés
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              <Euro className="w-5 h-5 mr-2" />
              À partir de 19€
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {mockAvailableLeads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun lead disponible pour le moment.</p>
          </div>
        )}

        <div className="text-center">
          <Link to="nouveaux-leads">
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-lg px-8">
              Voir tous les leads disponibles
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};