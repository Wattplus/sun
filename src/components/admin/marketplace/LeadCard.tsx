import { Lead } from "@/types/crm";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Euro, MapPin, Phone, Mail, User, Building2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LeadCardProps {
  lead: Lead;
  onPurchase: (lead: Lead) => void;
  isPurchased?: boolean;
  showFullDetails?: boolean;
}

export const LeadCard = ({ lead, onPurchase, isPurchased = false, showFullDetails = false }: LeadCardProps) => {
  const { toast } = useToast();

  const handlePurchase = async (type: 'mutualise' | 'exclusif') => {
    try {
      const response = await fetch("/api/create-lead-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId: lead.id,
          type
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
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'achat du lead.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg hover:border-[#33C3F0]/20 bg-background/50 backdrop-blur-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="secondary" className="mb-2 bg-[#1EAEDB]/10 text-[#1EAEDB]">
              {lead.projectType}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{lead.city} ({lead.postalCode})</span>
            </div>
          </div>
          <Badge variant="outline" className="flex items-center gap-1 border-[#33C3F0]/20">
            <Euro className="h-4 w-4" />
            {lead.price}€
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[#1EAEDB]" />
            <div>
              <span className="text-sm text-muted-foreground">Budget estimé:</span>
              <p className="font-medium">{lead.budget.toLocaleString()}€</p>
            </div>
          </div>
          
          {(showFullDetails || isPurchased) ? (
            <div className="space-y-3 border-t border-[#33C3F0]/20 pt-3 mt-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#1EAEDB]" />
                <div>
                  <span className="text-sm text-muted-foreground">Contact:</span>
                  <p>{lead.firstName} {lead.lastName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#1EAEDB]" />
                <div>
                  <span className="text-sm text-muted-foreground">Téléphone:</span>
                  <p>{lead.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#1EAEDB]" />
                <div>
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <p>{lead.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#1EAEDB]" />
                <div>
                  <span className="text-sm text-muted-foreground">Adresse:</span>
                  <p>{lead.address}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mt-3">
              Les coordonnées seront visibles après l'achat
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {!isPurchased ? (
          <div className="w-full space-y-2">
            <Button 
              className="w-full bg-[#1EAEDB] hover:bg-[#0FA0CE]" 
              onClick={() => handlePurchase('mutualise')}
            >
              <Euro className="h-4 w-4 mr-2" />
              Lead mutualisé - 19€
            </Button>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => handlePurchase('exclusif')}
            >
              <Euro className="h-4 w-4 mr-2" />
              Lead exclusif - 35€
            </Button>
          </div>
        ) : (
          <Badge className="w-full justify-center py-2 bg-emerald-500">
            Lead acheté
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};