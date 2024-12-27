import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { calculateLeadPrice } from "@/utils/leadPricing";
import { SubscriptionTier } from "@/types/subscription";
import { LeadCardHeader } from "./LeadCardHeader";
import { LeadCardActions } from "./LeadCardActions";
import { LeadInfoDisplay } from "@/components/installer/marketplace/LeadInfoDisplay";

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
    <Card className="group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] bg-white/80 backdrop-blur-sm border border-primary/10 hover:border-primary/20 shadow-lg hover:shadow-primary/10">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>

      <div className="relative p-6 space-y-6">
        <LeadInfoDisplay lead={lead} />

        {!isPurchased && (
          <div className="mt-auto space-y-4">
            <div className="p-4 bg-gradient-to-br from-white to-primary/5 rounded-lg border border-primary/10">
              <h4 className="text-sm font-medium text-secondary mb-3">Options d'achat :</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Compte prépayé</span>
                  <span className="font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">{prices.mutualPrice}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Prix standard</span>
                  <span className="font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">{prices.exclusivePrice}€</span>
                </div>
              </div>
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
