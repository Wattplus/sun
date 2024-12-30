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
  const { toast } = useToast();
  const price = lead.clienttype === 'professional' ? 49 : 26;

  const handlePurchase = async (type: 'mutualise' | 'exclusif', paymentMethod: 'prepaid' | 'direct') => {
    console.log('Handling purchase:', { lead, type, paymentMethod });
    
    try {
      if (paymentMethod === 'prepaid') {
        toast({
          title: "Paiement avec solde prépayé",
          description: "Le lead sera débité de votre solde prépayé.",
        });
        onPurchase?.(lead);
      } else {
        console.log('Creating checkout session for lead:', lead);
        
        const { data, error } = await supabase.functions.invoke('create-lead-checkout', {
          body: { 
            leads: [{
              id: lead.id,
              type: type,
              price: price,
              clientType: lead.clienttype
            }]
          }
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
        // Utiliser window.location.href pour la redirection
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Erreur d'achat:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'achat du lead",
        variant: "destructive",
      });
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
                mutualPrice={price}
                exclusivePrice={price * 2}
                canPurchaseMutual={true}
                canPurchaseExclusive={true}
                isProfessionalProject={lead.clienttype === 'professional'}
              />
            )}
          </div>
        )}
      </div>
    </Card>
  );
};