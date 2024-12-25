import { Lead } from "@/types/crm";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Euro, MapPin, Phone, Mail, User, Building2 } from "lucide-react";

interface LeadCardProps {
  lead: Lead;
  onPurchase: (lead: Lead) => void;
  showFullDetails?: boolean;
}

export const LeadCard = ({ lead, onPurchase, showFullDetails = false }: LeadCardProps) => {
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
          
          {showFullDetails ? (
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
        {!showFullDetails && (
          <Button 
            className="w-full bg-[#1EAEDB] hover:bg-[#0FA0CE]" 
            onClick={() => onPurchase(lead)}
          >
            <Euro className="h-4 w-4 mr-2" />
            Acheter ce lead
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};