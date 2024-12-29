import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lead } from "@/types/crm";

interface LeadContactInfoProps {
  lead: Lead;
  isEditing: boolean;
  editedLead: Lead;
  setEditedLead: (lead: Lead) => void;
}

export const LeadContactInfo = ({ lead, isEditing, editedLead, setEditedLead }: LeadContactInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations de contact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Email</label>
              <Input 
                value={editedLead?.email} 
                onChange={(e) => setEditedLead({...editedLead!, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Téléphone</label>
              <Input 
                value={editedLead?.phone}
                onChange={(e) => setEditedLead({...editedLead!, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Code postal</label>
              <Input 
                value={editedLead?.postalcode}
                onChange={(e) => setEditedLead({...editedLead!, postalcode: e.target.value})}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{lead.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Téléphone</p>
              <p className="font-medium">{lead.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Code postal</p>
              <p className="font-medium">{lead.postalcode}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
