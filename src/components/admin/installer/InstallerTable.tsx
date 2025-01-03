import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Installer } from "@/types/crm";
import { Edit, Eye, Star, Award, BadgeCheck } from "lucide-react";
import { getRatingBadge } from "./InstallerBadges";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface InstallerTableProps {
  installers: Installer[];
  onEditInstaller: (installer: Installer) => void;
  selectedInstallers: string[];
  onSelectInstaller: (installerId: string, checked: boolean) => void;
  onDeleteSelected: () => void;
}

export const InstallerTable = ({ 
  installers, 
  onEditInstaller, 
  selectedInstallers,
  onSelectInstaller,
  onDeleteSelected
}: InstallerTableProps) => {
  const getPerformanceBadge = (conversionRate: number) => {
    if (conversionRate >= 80) return <Award className="h-5 w-5 text-yellow-500" />;
    if (conversionRate >= 60) return <BadgeCheck className="h-5 w-5 text-emerald-500" />;
    return null;
  };

  const renderStars = (conversionRate: number) => {
    const stars = [];
    const fullStars = Math.floor(conversionRate / 20);

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < fullStars ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
        />
      );
    }

    return <div className="flex gap-0.5">{stars}</div>;
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case "active":
        return "Actif";
      case "inactive":
        return "Inactif";
      case "pending":
        return "En attente";
      default:
        return "Actif";
    }
  };

  const handleStatusChange = async (installerId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('installers')
        .update({ status: newStatus })
        .eq('id', installerId);

      if (error) throw error;
      toast.success("Statut mis à jour avec succès");
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };

  return (
    <ScrollArea className="h-[600px] rounded-md border border-[#33C3F0]/20">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#1EAEDB]/5">
            <TableHead className="w-[50px]">
              <Checkbox 
                checked={selectedInstallers.length === installers.length && installers.length > 0}
                onCheckedChange={(checked) => {
                  installers.forEach(installer => 
                    onSelectInstaller(installer.id, checked === true)
                  );
                }}
              />
            </TableHead>
            <TableHead>Société</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Zone</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {installers.map((installer) => (
            <TableRow key={installer.id} className="hover:bg-[#1EAEDB]/5">
              <TableCell>
                <Checkbox 
                  checked={selectedInstallers.includes(installer.id)}
                  onCheckedChange={(checked) => onSelectInstaller(installer.id, checked === true)}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {getPerformanceBadge(installer.conversionRate)}
                  {installer.companyName}
                </div>
              </TableCell>
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
              <TableCell>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{installer.leadsAssigned} leads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{installer.conversionRate}%</span>
                    {renderStars(installer.conversionRate)}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={installer.status || "active"}
                  onValueChange={(value) => handleStatusChange(installer.id, value)}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue>
                      <Badge className="bg-emerald-500">
                        {getStatusLabel(installer.status || "active")}
                      </Badge>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                  </SelectContent>
                </Select>
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