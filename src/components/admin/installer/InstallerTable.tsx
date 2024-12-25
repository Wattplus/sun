import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Installer, InstallerStatus } from "@/types/crm";
import { Edit, Eye } from "lucide-react";

interface InstallerTableProps {
  installers: Installer[];
  onEditInstaller: (installer: Installer) => void;
}

export const InstallerTable = ({ installers, onEditInstaller }: InstallerTableProps) => {
  const getStatusColor = (status: InstallerStatus) => {
    const colors = {
      active: "bg-green-500",
      inactive: "bg-gray-500",
      pending: "bg-yellow-500"
    };
    return colors[status];
  };

  const getStatusText = (status: InstallerStatus) => {
    const texts = {
      active: "Actif",
      inactive: "Inactif",
      pending: "En attente"
    };
    return texts[status];
  };

  return (
    <ScrollArea className="h-[600px] rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Société</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Zone</TableHead>
            <TableHead>Leads Assignés</TableHead>
            <TableHead>Taux de Conversion</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {installers.map((installer) => (
            <TableRow key={installer.id}>
              <TableCell className="font-medium">{installer.companyName}</TableCell>
              <TableCell>
                <div>{installer.contactName}</div>
                <div className="text-sm text-muted-foreground">{installer.email}</div>
                <div className="text-sm text-muted-foreground">{installer.phone}</div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {installer.zones.map((zone) => (
                    <Badge 
                      key={zone} 
                      variant="outline"
                    >
                      {zone}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{installer.leadsAssigned}</TableCell>
              <TableCell>{installer.conversionRate}%</TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(installer.status)}`}>
                  {getStatusText(installer.status)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEditInstaller(installer)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Éditer
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Détails
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};