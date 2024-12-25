import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface InstallerRequest {
  id: number;
  companyName: string;
  date: string;
  status: string;
}

interface InstallerRequestsProps {
  requests: InstallerRequest[];
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}

export const InstallerRequests = ({ requests, onAccept, onReject }: InstallerRequestsProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Demandes d'installateurs</h3>
      {requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-medium">{request.companyName}</p>
                  <p className="text-sm text-gray-500">{request.date}</p>
                </div>
                <Badge variant={request.status === 'pending' ? 'outline' : 'secondary'}>
                  {request.status === 'pending' ? 'En attente' : 'Accepté'}
                </Badge>
              </div>
              {request.status === 'pending' && (
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => onAccept(request.id)}
                  >
                    Accepter
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onReject(request.id)}
                  >
                    Refuser
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Aucune demande d'installateur en attente</p>
      )}
    </Card>
  );
};