import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, UserPlus } from "lucide-react";
import { differenceInDays } from "date-fns";

interface LeadCardHeaderProps {
  firstName: string;
  lastName: string;
  postalCode: string;
  createdAt: string;
  projectType: string;
  budget: number;
  purchasedBy?: Array<{ installerId: string; purchaseType: string; purchaseDate: string; }>;
}

const getAgeLabel = (createdAt: string) => {
  const days = differenceInDays(new Date(), new Date(createdAt));
  if (days >= 30) return "Plus d'un mois";
  if (days >= 15) return "Plus de 15 jours";
  return "Nouveau";
};

export const LeadCardHeader = ({ 
  firstName, 
  lastName, 
  postalCode, 
  createdAt, 
  projectType,
  budget,
  purchasedBy = []
}: LeadCardHeaderProps) => {
  const purchaseCount = purchasedBy.length;
  const remainingPurchases = 3 - purchaseCount;
  const hasExclusivePurchase = purchasedBy.some(p => p.purchaseType === 'exclusif');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">
            {firstName} {lastName}
          </h3>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}
          </Badge>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {getAgeLabel(createdAt)}
        </Badge>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span>{postalCode}</span>
      </div>

      <div className="space-y-2">
        <div>
          <span className="text-muted-foreground">Budget:</span>
          <p className="font-medium">{budget.toLocaleString()}€</p>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground border-t pt-4 border-primary/10">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>{purchaseCount} installateur{purchaseCount > 1 ? 's' : ''}</span>
          </div>
          {!hasExclusivePurchase && remainingPurchases > 0 && (
            <div className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-primary" />
              <span>{remainingPurchases} place{remainingPurchases > 1 ? 's' : ''} restante{remainingPurchases > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};