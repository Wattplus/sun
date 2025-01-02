import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, UserPlus } from "lucide-react";
import { differenceInDays } from "date-fns";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface LeadCardHeaderProps {
  firstName: string;
  lastName: string;
  postalCode: string;
  createdAt: string;
  projectType: string;
  budget: number;
  purchasedBy?: Array<{ installerId: string; purchaseType: string; purchaseDate: string; }>;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  status?: "available" | "purchased";
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
  purchasedBy = [],
  isExpanded,
  onToggleExpand,
  status
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

      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium w-1/3">Localisation</TableCell>
            <TableCell className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {postalCode}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Budget</TableCell>
            <TableCell>{budget.toLocaleString()}€</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Type de projet</TableCell>
            <TableCell>{projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Statut</TableCell>
            <TableCell>
              <div className="flex items-center justify-between">
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
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};