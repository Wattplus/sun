import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "new" | "contacted" | "qualified" | "sold" | "lost";
  date: string;
  projectType: string;
  budget: string;
  postalCode: string;
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean@example.com",
    phone: "06 12 34 56 78",
    status: "new",
    date: "2024-03-10",
    projectType: "Installation neuve",
    budget: "15000",
    postalCode: "75001"
  },
  {
    id: "2",
    name: "Marie Martin",
    email: "marie@example.com",
    phone: "06 98 76 54 32",
    status: "qualified",
    date: "2024-03-09",
    projectType: "Rénovation",
    budget: "12000",
    postalCode: "69001"
  }
];

const LeadManagement = () => {
  const [leads] = useState<Lead[]>(mockLeads);

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "new": return "bg-blue-500";
      case "contacted": return "bg-yellow-500";
      case "qualified": return "bg-green-500";
      case "sold": return "bg-purple-500";
      case "lost": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: Lead["status"]) => {
    switch (status) {
      case "new": return "Nouveau";
      case "contacted": return "Contacté";
      case "qualified": return "Qualifié";
      case "sold": return "Vendu";
      case "lost": return "Perdu";
      default: return status;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gestion des Leads</h2>
        <Button>Exporter CSV</Button>
      </div>

      <ScrollArea className="h-[600px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Projet</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Code Postal</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.date}</TableCell>
                <TableCell>{lead.name}</TableCell>
                <TableCell>
                  <div>{lead.email}</div>
                  <div className="text-sm text-gray-500">{lead.phone}</div>
                </TableCell>
                <TableCell>{lead.projectType}</TableCell>
                <TableCell>{lead.budget}€</TableCell>
                <TableCell>{lead.postalCode}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(lead.status)} text-white`}>
                    {getStatusText(lead.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Éditer
                    </Button>
                    <Button variant="outline" size="sm">
                      Assigner
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

export default LeadManagement;