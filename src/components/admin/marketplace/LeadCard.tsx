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
    <Card className="group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] bg-white border border-gray-200 hover:border-orange-200 shadow-lg hover:shadow-orange-100/20">
      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>

      <div className="relative p-6 space-y-6">
        {/* En-tête avec les informations principales */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
                {lead.projectType === 'professional' ? 'Projet Pro' : 'Projet Résidentiel'}
              </h3>
              <p className="text-sm text-gray-500">
                Ref: {lead.id.substring(0, 8)}
              </p>
            </div>
            <Badge variant="outline" className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-none shadow-sm">
              {format(new Date(lead.createdAt), 'dd MMM yyyy', { locale: fr })}
            </Badge>
          </div>
        </div>

        {/* Informations de localisation */}
        <div className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-100/20 shadow-inner">
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="h-4 w-4 text-orange-500 animate-pulse" />
            <span className="font-medium">{lead.city} ({lead.postalCode})</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Budget</p>
              <p className="font-semibold text-lg flex items-center gap-1 bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
                <Euro className="h-4 w-4 text-orange-500" />
                {lead.budget.toLocaleString()}€
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-semibold text-gray-700">{lead.projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}</p>
            </div>
          </div>
        </div>

        {/* Informations de contact masquées */}
        <div className="space-y-2 p-4 rounded-lg bg-gray-50 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4" />
            <span className="font-mono">••• ••• •••</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="h-4 w-4" />
            <span className="font-mono">••••••@•••••.••</span>
          </div>
        </div>

        {/* Prix et actions */}
        {!isPurchased && (
          <div className="mt-auto space-y-4">
            <div className="p-4 bg-gradient-to-br from-orange-50 to-pink-50 rounded-lg border border-orange-100/20">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Options d'achat :</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Compte prépayé</span>
                  <span className="font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">{prices.mutualPrice}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Prix standard</span>
                  <span className="font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">{prices.exclusivePrice}€</span>
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