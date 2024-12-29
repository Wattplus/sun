import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lead } from "@/types/crm";

interface LeadCardProps {
  lead: Lead;
}

export const LeadCard: FC<LeadCardProps> = ({ lead }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {lead.firstname} {lead.lastname}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-sm">{lead.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
              <p className="text-sm">{lead.phone}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Code postal</p>
            <p className="text-sm">{lead.postalcode}</p>
          </div>
          <div className="pt-2">
            <Button className="w-full">Voir les détails</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};