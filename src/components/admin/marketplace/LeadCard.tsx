import { useState } from "react";
import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LeadCardHeader } from "./LeadCardHeader";
import { LeadCardActions } from "./LeadCardActions";
import { LeadInfoDisplay } from "@/components/installer/marketplace/LeadInfoDisplay";
import { supabase } from "@/lib/supabase-client";
import { differenceInDays } from "date-fns";

interface LeadCardProps {
  lead: Lead;
  onPurchase?: (lead: Lead) => void;
  status?: "available" | "purchased";
  showActions?: boolean;
}

export const LeadCard = ({ 
  lead, 
  onPurchase, 
  status = "available",
  showActions = true 
}: LeadCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const calculateBasePrice = (createdAt: string, clientType: string) => {
    // Les leads professionnels sont toujours à 49€
    if (clientType === 'professional') return 49;
    
    // Pour les particuliers, le prix varie selon l'ancienneté
    const daysOld = differenceInDays(new Date(), new Date(createdAt));
    if (daysOld >= 45) return 15;
    if (daysOld >= 30) return 19;
    if (daysOld >= 15) return 21;
    return 26;
  };

  const getPriceId = (daysOld: number, clientType: string) => {
    if (clientType === 'professional') return 'price_1Qa0nUFOePj4Hv47Ih00CR8k'; // 49€
    
    if (daysOld >= 45) return 'price_1QbzyKFOePj4Hv47zISfJkUz'; // 15€
    if (daysOld >= 30) return 'price_1QbzxlFOePj4Hv47XHGG9Vwt'; // 19€
    if (daysOld >= 15) return 'price_1QbzwKFOePj4Hv47XHGG9Vwt'; // 21€
    return 'price_1QaAlfFOePj4Hv475LWE2bGQ'; // 26€
  };

  const basePrice = calculateBasePrice(lead.created_at, lead.clienttype);
  const daysOld = differenceInDays(new Date(), new Date(lead.created_at));
  const priceId = getPriceId(daysOld, lead.clienttype);

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
      const finalPrice = type === 'exclusif' ? basePrice * 2 : basePrice;
      console.log('Final price calculated:', { basePrice, finalPrice, type });
      
      const { data, error } = await supabase.functions.invoke('create-lead-checkout', {
        body: { 
          leads: [{
            id: lead.id,
            type: type,
            clientType: lead.clienttype,
            priceId: priceId
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

  return (
    <Card className="overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm">
      <div className="p-6 space-y-6">
        <LeadCardHeader
          firstName={lead.firstname}
          lastName={lead.lastname}
          postalCode={lead.postalcode}
          createdAt={lead.created_at}
          projectType={lead.clienttype}
          budget={lead.price || 0}
          purchasedBy={lead.purchasedby?.map(p => ({
            installerId: p.toString(),
            purchaseType: 'mutualise',
            purchaseDate: new Date().toISOString()
          }))}
          isExpanded={isExpanded}
          onToggleExpand={() => setIsExpanded(!isExpanded)}
          status={status}
        />

        {isExpanded && (
          <div className="space-y-6 pt-4 border-t border-primary/10">
            <LeadInfoDisplay lead={lead} />
            
            {showActions && status === "available" && (
              <LeadCardActions
                onPurchase={handlePurchase}
                mutualPrice={basePrice}
                exclusivePrice={basePrice * 2}
                canPurchaseMutual={true}
                canPurchaseExclusive={true}
                isProfessionalProject={lead.clienttype === 'professional'}
                isLoading={isLoading}
              />
            )}
          </div>
        )}
      </div>
    </Card>
  );
};