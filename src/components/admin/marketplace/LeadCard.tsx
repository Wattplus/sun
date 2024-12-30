import { useState } from "react";
import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LeadCardHeader } from "./LeadCardHeader";
import { LeadCardActions } from "./LeadCardActions";
import { LeadInfoDisplay } from "@/components/installer/marketplace/LeadInfoDisplay";
import { supabase } from "@/lib/supabase-client";

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
  const basePrice = lead.clienttype === 'professional' ? 49 : 26;

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
            price: finalPrice // Price is already a number from basePrice calculation
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