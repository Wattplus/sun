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

export const LeadCard = ({ 
  lead, 
  onPurchase, 
  isPurchased = false,
  subscriptionTier = 'free'
}: LeadCardProps) => {
  const { toast } = useToast();
  const prices = calculateLeadPrice(lead, subscriptionTier);

  const handlePurchase = async (type: 'mutualise' | 'exclusif', paymentMethod: 'prepaid' | 'direct') => {
    try {
      if (paymentMethod === 'prepaid') {
        // Prix spécial pour compte prépayé
        const priceId = 'price_1QaAlfFOePj4Hv475LWE2bGQ';
        toast({
          title: "Paiement avec solde prépayé",
          description: "Le lead sera débité de votre solde prépayé.",
        });
        onPurchase(lead);
      } else {
        // Prix standard pour paiement direct
        let priceId;
        if (lead.projectType === 'professional') {
          priceId = 'price_1Qa0nUFOePj4Hv47Ih00CR8k'; // 59€ pour les leads pro
        } else {
          priceId = 'price_1QZyKUFOePj4Hv47qEFQ1KzF'; // Prix standard
        }

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
    <Card className="h-full bg-[#0B1221] text-white border border-[#1EAEDB]/20 hover:border-[#1EAEDB]/40 transition-all duration-300">
      <div className="p-6 space-y-4">
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
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-[#1EAEDB]/10 rounded-lg">
              <h4 className="text-sm font-medium text-[#1EAEDB] mb-2">Options de paiement :</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span>Prix avec compte prépayé :</span>
                  <span className="font-bold">35€</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Prix standard {lead.projectType === 'professional' ? '(Pro)' : ''} :</span>
                  <span className="font-bold">{lead.projectType === 'professional' ? '59€' : '35€'}</span>
                </li>
              </ul>
            </div>

            <LeadCardActions
              onPurchase={handlePurchase}
              mutualPrice={prices.mutualPrice}
              exclusivePrice={prices.exclusivePrice}
              canPurchaseMutual={true}
              canPurchaseExclusive={true}
              isProfessionalProject={lead.projectType === 'professional'}
            />
          </div>
        )}
      </div>
    </Card>
  );
};