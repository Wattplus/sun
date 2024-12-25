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
  const isProfessionalProject = lead.projectType === 'professional';

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
      // Pour les projets professionnels, on utilise toujours le même prix et type d'achat
      const priceId = isProfessionalProject 
        ? 'price_1Qa0nUFOePj4Hv47Ih00CR8k'
        : type === 'exclusif' 
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
          type: isProfessionalProject ? 'exclusif' : type,
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
    <Card className="p-6 hover:shadow-lg transition-all duration-200 bg-background-dark border border-primary/20 hover:border-primary/40">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-primary/50 text-primary"
            />
            <h3 className="text-lg font-medium text-primary-light">
              {lead.firstName} {lead.lastName.replace(/./g, '•')}
            </h3>
          </div>
          <span className="text-sm text-muted-foreground">
            Plus d'un mois
          </span>
        </div>

        <div className="space-y-3 text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {lead.postalCode}
            </span>
            {lead.city && (
              <span className="text-primary/60">{lead.city}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Budget: {lead.budget.toLocaleString()}€
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Type de projet:</span>
            <span className="inline-flex px-2 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary w-fit">
              {lead.projectType === 'residential' ? 'Résidentiel' : 'Professionnel'}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button 
            className="flex-1 px-4 py-2 text-sm font-medium rounded-lg bg-background hover:bg-primary/10 text-primary border border-primary/20 hover:border-primary/40 transition-colors duration-200 flex items-center justify-center gap-2"
            onClick={() => handlePurchase('mutualise')}
            disabled={!canPurchaseMutual}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Lead mutualisé - {isProfessionalProject ? '59€' : `${prices.mutualPrice}€`}
          </button>
          
          <button 
            className="flex-1 px-4 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-primary-light text-white transition-colors duration-200 flex items-center justify-center gap-2"
            onClick={() => handlePurchase('exclusif')}
            disabled={!canPurchaseExclusive}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Lead exclusif - {isProfessionalProject ? '59€' : `${prices.exclusivePrice}€`}
          </button>
        </div>
      </div>
    </Card>
  );
};