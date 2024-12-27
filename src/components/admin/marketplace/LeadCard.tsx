import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { calculateLeadPrice } from "@/utils/leadPricing";
import { SubscriptionTier } from "@/types/subscription";
import { LeadCardHeader } from "./LeadCardHeader";
import { LeadCardActions } from "./LeadCardActions";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Euro, Calendar } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

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
    <Card className="flex flex-col h-full bg-gradient-to-br from-background/95 to-background border-primary/20 hover:border-primary/40 transition-all duration-300">
      <div className="p-6 space-y-6">
        {/* En-tête avec les informations principales */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-primary">
                {lead.projectType === 'professional' ? 'Projet Pro' : 'Projet Résidentiel'}
              </h3>
              <p className="text-sm text-muted-foreground">
                Ref: {lead.id.substring(0, 8)}
              </p>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {format(new Date(lead.createdAt), 'dd MMM yyyy', { locale: fr })}
            </Badge>
          </div>
        </div>

        {/* Informations de localisation */}
        <div className="space-y-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{lead.city} ({lead.postalCode})</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Budget</p>
              <p className="font-semibold text-lg flex items-center gap-1">
                <Euro className="h-4 w-4 text-primary" />
                {lead.budget.toLocaleString()}€
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-semibold">{lead.projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}</p>
            </div>
          </div>
        </div>

        {/* Informations de contact masquées */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>••• ••• •••</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>••••••@•••••.••</span>
          </div>
        </div>

        {/* Prix et actions */}
        {!isPurchased && (
          <div className="mt-auto space-y-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
              <h4 className="text-sm font-medium text-primary mb-3">Options d'achat :</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Compte prépayé</span>
                  <span className="font-bold">{prices.mutualPrice}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Prix standard</span>
                  <span className="font-bold">{prices.exclusivePrice}€</span>
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