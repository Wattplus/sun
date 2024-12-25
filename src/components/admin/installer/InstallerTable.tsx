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
      active: "bg-[#9b87f5]",
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
    <ScrollArea className="h-[600px] rounded-md border border-[#9b87f5]/20">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#1A1F2C]/50">
            <TableHead className="text-[#9b87f5]">Société</TableHead>
            <TableHead className="text-[#9b87f5]">Contact</TableHead>
            <TableHead className="text-[#9b87f5]">Zone</TableHead>
            <TableHead className="text-[#9b87f5]">Commission</TableHead>
            <TableHead className="text-[#9b87f5]">Leads Assignés</TableHead>
            <TableHead className="text-[#9b87f5]">Taux de Conversion</TableHead>
            <TableHead className="text-[#9b87f5]">Statut</TableHead>
            <TableHead className="text-[#9b87f5]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {installers.map((installer) => (
            <TableRow key={installer.id} className="hover:bg-[#9b87f5]/5 border-b border-[#9b87f5]/10">
              <TableCell className="font-medium text-white">{installer.companyName}</TableCell>
              <TableCell>
                <div className="text-white">{installer.contactName}</div>
                <div className="text-sm text-white/70">{installer.email}</div>
                <div className="text-sm text-white/70">{installer.phone}</div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {installer.zones.map((zone) => (
                    <Badge 
                      key={zone} 
                      variant="outline"
                      className="border-[#9b87f5]/20 text-white"
                    >
                      {zone}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-white">{installer.commission}%</TableCell>
              <TableCell className="text-white">{installer.leadsAssigned}</TableCell>
              <TableCell className="text-white">{installer.conversionRate}%</TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(installer.status)} text-white`}>
                  {getStatusText(installer.status)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEditInstaller(installer)}
                    className="border-[#9b87f5]/20 hover:border-[#9b87f5]/40 hover:bg-[#9b87f5]/10"
                  >
                    <Edit className="h-4 w-4 mr-2 text-[#9b87f5]" />
                    Éditer
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-[#9b87f5]/20 hover:border-[#9b87f5]/40 hover:bg-[#9b87f5]/10"
                  >
                    <Eye className="h-4 w-4 mr-2 text-[#9b87f5]" />
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