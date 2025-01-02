import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Euro, Receipt } from "lucide-react";
import { differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";

interface LeadCardHeaderProps {
  firstName: string;
  lastName: string;
  postalCode: string;
  createdAt: string;
  projectType: string;
  budget: number;
  monthlyBill: string;
  purchasedBy?: Array<{ installerId: string; purchaseType: string; purchaseDate: string; }>;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  status?: "available" | "purchased";
}

export const LeadCardHeader = ({ 
  firstName, 
  lastName, 
  postalCode, 
  createdAt, 
  projectType,
  budget,
  monthlyBill,
  purchasedBy = [],
  isExpanded,
  onToggleExpand,
  status
}: LeadCardHeaderProps) => {
  const purchaseCount = purchasedBy.length;
  const remainingPurchases = 3 - purchaseCount;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-medium text-white mb-2">
            {firstName} {lastName}
          </h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-[#1EAEDB]/10 text-[#1EAEDB] border-[#1EAEDB]/20">
              {projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}
            </Badge>
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              Nouveau
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-4 text-sm">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-white/60">Localisation</span>
          <div className="flex items-center gap-2 text-white">
            <MapPin className="h-4 w-4 text-[#1EAEDB]" />
            {postalCode}
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-white/60">Budget</span>
          <div className="flex items-center gap-2 text-white">
            <Euro className="h-4 w-4 text-[#1EAEDB]" />
            {budget}€
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-white/60">Facture mensuelle</span>
          <div className="flex items-center gap-2 text-white">
            <Receipt className="h-4 w-4 text-[#1EAEDB]" />
            {monthlyBill}€
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-white/60">Type de projet</span>
          <Badge variant="outline" className="bg-[#1EAEDB]/10 text-[#1EAEDB] border-[#1EAEDB]/20">
            {projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}
          </Badge>
        </div>

        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-white/60">Date de création</span>
          <span className="text-white">
            {new Date(createdAt).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white/60">Statut</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white">
              <Users className="h-4 w-4 text-[#1EAEDB]" />
              <span>{purchaseCount} installateur{purchaseCount > 1 ? 's' : ''}</span>
            </div>
            {remainingPurchases > 0 && (
              <span className="text-[#1EAEDB]">
                {remainingPurchases} place{remainingPurchases > 1 ? 's' : ''} restante{remainingPurchases > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};