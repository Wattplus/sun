import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { calculateLeadPrice } from "@/utils/leadPricing";
import { SubscriptionTier } from "@/types/subscription";
import { LeadCardHeader } from "./LeadCardHeader";
import { LeadCardActions } from "./LeadCardActions";
import { LeadInfoDisplay } from "@/components/installer/marketplace/LeadInfoDisplay";
import { supabase } from "@/integrations/supabase/client";

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
  const price = calculateLeadPrice(lead);

  const handlePurchase = async (type: 'mutualise' | 'exclusif', paymentMethod: 'prepaid' | 'direct') => {
    try {
      if (paymentMethod === 'prepaid') {
        // Prix spécial pour compte prépayé
        toast({
          title: "Paiement avec solde prépayé",
          description: "Le lead sera débité de votre solde prépayé.",
        });
        onPurchase(lead);
      } else {
        console.log('Creating checkout session for lead:', lead);
        
        const { data, error } = await supabase.functions.invoke('create-lead-checkout', {
          body: { leads: [lead] }
        });

        if (error) {
          console.error('Error creating checkout session:', error);
          throw error;
        }

        if (!data?.url) {
          console.error('No checkout URL returned:', data);
          throw new Error('No checkout URL returned');
        }

        console.log('Redirecting to checkout URL:', data.url);
        window.location.href = data.url;
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
                  <span className="font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">{price}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Prix standard</span>
                  <span className="font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">{price}€</span>
                </div>
              </div>
            </div>

            <LeadCardActions
              onPurchase={handlePurchase}
              mutualPrice={price}
              exclusivePrice={price}
              canPurchaseMutual={true}
              canPurchaseExclusive={true}
              isProfessionalProject={lead.clienttype === 'professional'}
            />
          </div>
        )}
      </div>
    </Card>
  );
};