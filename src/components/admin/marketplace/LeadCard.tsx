import { useState } from "react";
import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LeadCardHeader } from "./LeadCardHeader";
import { LeadCardActions } from "./LeadCardActions";
import { LeadInfoDisplay } from "@/components/installer/marketplace/LeadInfoDisplay";
import { supabase } from "@/lib/supabase-client";
import { calculateLeadPrice } from "@/utils/leadPricing";

interface LeadCardProps {
  lead: Lead;
  onPurchase?: (lead: Lead) => void;
  status?: "available" | "purchased";
  showActions?: boolean;
  hasPrepaidAccount?: boolean;
}

export const LeadCard = ({ 
  lead, 
  onPurchase, 
  status = "available",
  showActions = true,
  hasPrepaidAccount = false
}: LeadCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Calculate prices based on client type and prepaid status
  const priceWithPrepaid = calculateLeadPrice(lead.clienttype, true);
  const priceWithoutPrepaid = calculateLeadPrice(lead.clienttype, false);

  const getPriceId = (clientType: string, usePrepaid: boolean) => {
    if (clientType === 'professional') {
      return usePrepaid ? 'price_1Qa0nUFOePj4Hv47Ih00CR8k' : 'price_1QaAlfFOePj4Hv475LWE2bGQ';
    }
    return usePrepaid ? 'price_1QaAlfFOePj4Hv475LWE2bGQ' : 'price_1QbzwKFOePj4Hv47XHGG9Vwt';
  };

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
      const finalPrice = type === 'exclusif' ? 
        (hasPrepaidAccount ? priceWithPrepaid * 2 : priceWithoutPrepaid * 2) : 
        (hasPrepaidAccount ? priceWithPrepaid : priceWithoutPrepaid);
      
      console.log('Final price calculated:', { priceWithPrepaid, priceWithoutPrepaid, finalPrice, type });
      
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
                mutualPrice={hasPrepaidAccount ? priceWithPrepaid : priceWithoutPrepaid}
                exclusivePrice={(hasPrepaidAccount ? priceWithPrepaid : priceWithoutPrepaid) * 2}
                canPurchaseMutual={true}
                canPurchaseExclusive={true}
                isProfessionalProject={lead.clienttype === 'professional'}
                isLoading={isLoading}
                hasPrepaidAccount={hasPrepaidAccount}
              />
            )}
          </div>
        )}
      </div>
    </Card>
  );
};