import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Installer } from "@/types/crm";
import { Edit, Eye } from "lucide-react";

interface InstallerTableProps {
  installers: Installer[];
  onEditInstaller: (installer: Installer) => void;
}

export const InstallerTable = ({ installers, onEditInstaller }: InstallerTableProps) => {
  return (
    <ScrollArea className="h-[600px] rounded-md border border-[#33C3F0]/20">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#1EAEDB]/5">
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
            <TableRow key={installer.id} className="hover:bg-[#1EAEDB]/5">
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
                      className="border-[#33C3F0]/20 bg-[#1EAEDB]/10"
                    >
                      {zone}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{installer.leadsAssigned}</TableCell>
              <TableCell>{installer.conversionRate}%</TableCell>
              <TableCell>
                <Badge className={
                  installer.status === "active" 
                    ? "bg-[#1EAEDB]" 
                    : installer.status === "inactive" 
                    ? "bg-gray-500" 
                    : "bg-[#33C3F0]"
                }>
                  {installer.status === "active" ? "Actif" : installer.status === "inactive" ? "Inactif" : "En attente"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEditInstaller(installer)}
                    className="border-[#33C3F0]/20 hover:border-[#33C3F0]/40 hover:bg-[#33C3F0]/10"
                  >
                    <Edit className="h-4 w-4 mr-2 text-[#1EAEDB]" />
                    Éditer
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-[#33C3F0]/20 hover:border-[#33C3F0]/40 hover:bg-[#33C3F0]/10"
                  >
                    <Eye className="h-4 w-4 mr-2 text-[#1EAEDB]" />
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