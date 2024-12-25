import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { calculateLeadPrice } from "@/utils/leadPricing";
import { SubscriptionTier } from "@/types/subscription";
import { MapPin } from "lucide-react";
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
      const priceId = type === 'exclusif' 
        ? 'price_1QZyKUFOePj4Hv47qEFQ1KzF' 
        : 'price_1QZyJpFOePj4Hv47sd76eDOz';

      if (paymentMethod === 'prepaid') {
        toast({
          title: "Paiement avec solde prépayé",
          description: "Le lead sera débité de votre solde prépayé.",
        });
      } else {
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
      <div className="p-6 space-y-4 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-medium text-[#1EAEDB]">
              {lead.firstName} {lead.lastName}
            </h3>
            <div className="flex items-center gap-1 text-[#1EAEDB]/60 mt-1">
              {"★".repeat(5)}
            </div>
          </div>
          <span className="text-sm text-[#1EAEDB]/60">
            Plus d'un mois
          </span>
        </div>

        <div className="flex items-center gap-2 text-[#1EAEDB]/80">
          <MapPin className="w-4 h-4" />
          <span>{lead.postalCode} {lead.city}</span>
        </div>

        <div className="space-y-2 flex-grow">
          <div className="flex items-center gap-2 text-[#1EAEDB]/80">
            <span>Budget:</span>
            <span className="font-medium">{lead.budget.toLocaleString()}€</span>
          </div>

          <div>
            <span className="text-[#1EAEDB]/80">Type de projet:</span>
            <div className="mt-1">
              <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-[#1EAEDB]/10 text-[#1EAEDB]">
                {lead.projectType === 'residential' ? 'Résidentiel' : 'Professionnel'}
              </span>
            </div>
          </div>
        </div>

        {!isPurchased && (
          <LeadCardActions
            onPurchase={handlePurchase}
            mutualPrice={prices.mutualPrice}
            exclusivePrice={prices.exclusivePrice}
            canPurchaseMutual={true}
            canPurchaseExclusive={true}
            isProfessionalProject={lead.projectType === 'professional'}
          />
        )}
      </div>
    </Card>
  );
};