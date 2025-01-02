import { useToast } from "@/components/ui/use-toast";
import { Lead } from "@/types/crm";
import { supabase } from "@/lib/supabase-client";
import { calculateLeadPrice, getPriceId } from "@/utils/leadPricing";

export const useLeadPurchase = (
  lead: Lead,
  setIsLoading: (loading: boolean) => void,
  onPurchase?: (lead: Lead) => void
) => {
  const { toast } = useToast();

  const handlePurchase = async (type: 'mutualise' | 'exclusif', paymentMethod: 'prepaid' | 'direct') => {
    try {
      setIsLoading(true);
      console.log('Handling purchase:', { lead, type, paymentMethod });
      
      if (paymentMethod === 'prepaid') {
        toast({
          title: "Paiement avec solde prépayé",
          description: "Le lead sera débité de votre solde prépayé.",
        });
        onPurchase?.(lead);
        return;
      }

      console.log('Creating checkout session...');
      const hasPrepaidAccount = false; // À ajuster selon votre logique
      const finalPrice = type === 'exclusif' ? 
        (hasPrepaidAccount ? lead.price! * 2 : lead.price! * 2) : 
        (hasPrepaidAccount ? lead.price! : lead.price!);
      
      console.log('Final price calculated:', { 
        finalPrice, 
        type,
        priceId: getPriceId(lead.clienttype, hasPrepaidAccount)
      });
      
      const { data, error } = await supabase.functions.invoke('create-lead-checkout', {
        body: { 
          leads: [{
            id: lead.id,
            type: type,
            clientType: lead.clienttype,
            priceId: getPriceId(lead.clienttype, hasPrepaidAccount)
          }]
        }
      });

      if (error) {
        console.error('Error creating checkout session:', error);
        toast({
          title: "Erreur",
          description: "Impossible de créer la session de paiement. Veuillez réessayer.",
          variant: "destructive",
        });
        return;
      }

      if (!data?.url) {
        console.error('No checkout URL returned:', data);
        toast({
          title: "Erreur",
          description: "URL de paiement invalide. Veuillez réessayer.",
          variant: "destructive",
        });
        return;
      }

      console.log('Redirecting to checkout URL:', data.url);
      window.location.href = data.url;
      
    } catch (error) {
      console.error("Erreur d'achat:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'achat du lead. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handlePurchase };
};