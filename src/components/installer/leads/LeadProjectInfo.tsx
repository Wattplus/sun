import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lead } from "@/types/crm";

interface LeadProjectInfoProps {
  lead: Lead;
  isEditing: boolean;
  editedLead: Lead;
  setEditedLead: (lead: Lead) => void;
}

export const LeadProjectInfo = ({ lead, isEditing, editedLead, setEditedLead }: LeadProjectInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Détails du projet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Type de projet</label>
              <Input 
                value={editedLead?.projectType}
                onChange={(e) => setEditedLead({...editedLead!, projectType: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Budget</label>
              <Input 
                type="number"
                value={editedLead?.budget}
                onChange={(e) => setEditedLead({...editedLead!, budget: Number(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Type de toit</label>
              <Input 
                value={editedLead?.roofType || ""}
                onChange={(e) => setEditedLead({...editedLead!, roofType: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Facture mensuelle</label>
              <Input 
                value={editedLead?.monthlyBill || ""}
                onChange={(e) => setEditedLead({...editedLead!, monthlyBill: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Type électrique</label>
              <Input 
                value={editedLead?.electricalType || ""}
                onChange={(e) => setEditedLead({...editedLead!, electricalType: e.target.value})}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-sm text-muted-foreground">Type de projet</p>
              <p className="font-medium">{lead.projectType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Budget</p>
              <p className="font-medium">{lead.budget}€</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Type de toit</p>
              <p className="font-medium">{lead.roofType || "Non spécifié"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Facture mensuelle</p>
              <p className="font-medium">{lead.monthlyBill || "Non spécifié"}€</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Type électrique</p>
              <p className="font-medium">{lead.electricalType || "Non spécifié"}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};