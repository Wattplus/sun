import { Lead } from "@/types/crm";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Euro } from "lucide-react";

interface LeadCardProps {
  lead: Lead;
  onPurchase: (lead: Lead) => void;
  showFullDetails?: boolean;
}

export const LeadCard = ({ lead, onPurchase, showFullDetails = false }: LeadCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{lead.projectType}</span>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Euro className="h-4 w-4" />
            {lead.price}€
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <span className="font-medium">Localisation:</span>
            <p>{lead.city} ({lead.postalCode})</p>
          </div>
          <div>
            <span className="font-medium">Budget:</span>
            <p>{lead.budget.toLocaleString()}€</p>
          </div>
          {showFullDetails ? (
            <>
              <div>
                <span className="font-medium">Contact:</span>
                <p>{lead.firstName} {lead.lastName}</p>
                <p>{lead.email}</p>
                <p>{lead.phone}</p>
              </div>
              <div>
                <span className="font-medium">Adresse:</span>
                <p>{lead.address}</p>
              </div>
            </>
          ) : (
            <div className="text-sm text-muted-foreground">
              Les coordonnées seront visibles après l'achat
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {!showFullDetails && (
          <Button 
            className="w-full" 
            onClick={() => onPurchase(lead)}
          >
            Acheter ce lead
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};