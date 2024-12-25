import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { calculateLeadPrice } from "@/utils/leadPricing";
import { SubscriptionTier } from "@/types/subscription";
import { LeadCardHeader } from "./LeadCardHeader";
import { LeadCardActions } from "./LeadCardActions";

interface LeadCardProps {
  lead: Lead;
  onPurchase: (lead: Lead) => void;
  isPurchased?: boolean;
  showFullDetails?: boolean;
  subscriptionTier?: SubscriptionTier;
}

const MAX_MUTUAL_PURCHASES = 3;

export const LeadCard = ({ 
  lead, 
  onPurchase, 
  isPurchased = false,
  subscriptionTier = 'free'
}: LeadCardProps) => {
  const { toast } = useToast();
  const prices = calculateLeadPrice(lead, subscriptionTier);

  const purchaseCount = lead.purchasedBy?.length || 0;
  const hasExclusivePurchase = lead.purchasedBy?.some(p => p.purchaseType === 'exclusif');
  const canPurchaseMutual = purchaseCount < MAX_MUTUAL_PURCHASES && !hasExclusivePurchase;
  const canPurchaseExclusive = !hasExclusivePurchase && purchaseCount === 0;

  const handlePurchase = async (type: 'mutualise' | 'exclusif') => {
    if (type === 'mutualise' && !canPurchaseMutual) {
      toast({
        title: "Achat impossible",
        description: "Ce lead a atteint la limite d'achats mutualisés ou est déjà acheté en exclusivité.",
        variant: "destructive",
      });
      return;
    }

    if (type === 'exclusif' && !canPurchaseExclusive) {
      toast({
        title: "Achat impossible",
        description: "Ce lead est déjà acheté.",
        variant: "destructive",
      });
      return;
    }

    try {
      const priceId = type === 'exclusif' 
        ? 'price_1QZyKUFOePj4Hv47qEFQ1KzF' 
        : 'price_1QZyJpFOePj4Hv47sd76eDOz';

      const response = await fetch("https://dqzsycxxgltztufrhams.supabase.co/functions/v1/create-lead-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          leadId: lead.id,
          type,
          priceId,
          subscriptionTier
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la session de paiement");
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Erreur d'achat:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'achat du lead.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 bg-background/50 backdrop-blur-md">
      <LeadCardHeader 
        firstName={lead.firstName}
        lastName={lead.lastName}
        postalCode={lead.postalCode}
        createdAt={lead.createdAt}
        projectType={lead.projectType}
        budget={lead.budget}
        purchasedBy={lead.purchasedBy}
      />
      
      {!isPurchased && (
        <LeadCardActions 
          onPurchase={handlePurchase}
          mutualPrice={prices.mutualPrice}
          exclusivePrice={prices.exclusivePrice}
          canPurchaseMutual={canPurchaseMutual}
          canPurchaseExclusive={canPurchaseExclusive}
        />
      )}
    </Card>
  );
};