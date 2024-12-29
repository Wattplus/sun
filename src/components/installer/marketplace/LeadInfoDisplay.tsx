import { Lead } from "@/types/crm";
import { Badge } from "@/components/ui/badge";

interface LeadInfoDisplayProps {
  lead: Lead;
}

export const LeadInfoDisplay = ({ lead }: LeadInfoDisplayProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">
          Demandez votre étude gratuite
        </h3>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          {lead.projectType === 'professional' ? 'Projet Pro' : 'Projet Résidentiel'}
        </Badge>
      </div>
      
      <p className="text-sm text-white/60">
        Découvrez votre potentiel d'économies en 2 minutes
      </p>

      <div className="grid gap-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
        <div className="flex flex-col gap-2">
          <span className="font-medium text-white/80">Type de projet photovoltaïque :</span>
          <span className="text-white/80">Sélectionnez votre type de projet</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium text-white/80">Prénom :</span>
          <span className="text-white/80">{lead.firstname}</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium text-white/80">Nom :</span>
          <span className="text-white/80">{lead.lastname}</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium text-white/80">Email :</span>
          <span className="text-white/80">{lead.email}</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium text-white/80">Téléphone :</span>
          <span className="text-white/80">{lead.phone}</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium text-white/80">Code postal :</span>
          <span className="text-white/80">{lead.postalcode}</span>
        </div>
      </div>
    </div>
  );
};
