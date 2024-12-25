import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface Installer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  zone: string;
  leadsAssigned: number;
  conversionRate: number;
}

const mockInstallers: Installer[] = [
  {
    id: "1",
    name: "Électricité Plus",
    email: "contact@electriciteplus.fr",
    phone: "01 23 45 67 89",
    status: "active",
    zone: "75, 92, 93, 94",
    leadsAssigned: 45,
    conversionRate: 68
  },
  {
    id: "2",
    name: "Solar Pro",
    email: "info@solarpro.fr",
    phone: "04 56 78 90 12",
    status: "active",
    zone: "69, 38, 01",
    leadsAssigned: 32,
    conversionRate: 72
  }
];

const InstallerManagement = () => {
  const [installers] = useState<Installer[]>(mockInstallers);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gestion des Installateurs</h2>
        <Button>Ajouter un installateur</Button>
      </div>

      <ScrollArea className="h-[400px]">
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
                <TableCell>{installer.name}</TableCell>
                <TableCell>
                  <div>{installer.email}</div>
                  <div className="text-sm text-gray-500">{installer.phone}</div>
                </TableCell>
                <TableCell>{installer.zone}</TableCell>
                <TableCell>{installer.leadsAssigned}</TableCell>
                <TableCell>{installer.conversionRate}%</TableCell>
                <TableCell>
                  <Badge className={installer.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                    {installer.status === "active" ? "Actif" : "Inactif"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Éditer
                    </Button>
                    <Button variant="outline" size="sm">
                      Voir détails
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default InstallerManagement;