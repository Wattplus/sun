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
              <label className="text-sm text-muted-foreground">Adresse</label>
              <Input 
                value={editedLead?.address}
                onChange={(e) => setEditedLead({...editedLead!, address: e.target.value})}
              />
              <Input 
                value={editedLead?.postalCode}
                onChange={(e) => setEditedLead({...editedLead!, postalCode: e.target.value})}
                className="mt-2"
              />
              <Input 
                value={editedLead?.city}
                onChange={(e) => setEditedLead({...editedLead!, city: e.target.value})}
                className="mt-2"
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
              <p className="text-sm text-muted-foreground">Adresse</p>
              <p className="font-medium">
                {lead.address}
                <br />
                {lead.postalCode} {lead.city}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};