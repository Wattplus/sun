import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { differenceInDays } from "date-fns";

interface LeadCardHeaderProps {
  firstName: string;
  lastName: string;
  postalCode: string;
  createdAt: string;
  projectType: string;
  budget: number;
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
  budget
}: LeadCardHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input type="checkbox" className="rounded border-primary/20" />
          <h3 className="text-lg font-medium">
            {firstName} {lastName.split('').map(() => '•').join('')}
          </h3>
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
        
        <div>
          <span className="text-muted-foreground">Type de projet:</span>
          <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary">
            {projectType}
          </Badge>
        </div>
      </div>
    </div>
  );
};