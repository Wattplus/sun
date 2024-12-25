import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Lead, LeadStatus } from "@/types/crm";
import { Search, Download, Plus } from "lucide-react";

const mockLeads: Lead[] = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean@example.com",
    phone: "06 12 34 56 78",
    address: "123 Rue de Paris",
    postalCode: "75001",
    city: "Paris",
    projectType: "Installation neuve",
    budget: 15000,
    status: "new",
    notes: "Intéressé par une installation complète",
    createdAt: "2024-03-10",
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Martin",
    email: "marie@example.com",
    phone: "06 98 76 54 32",
    address: "456 Avenue de Lyon",
    postalCode: "69001",
    city: "Lyon",
    projectType: "Rénovation",
    budget: 12000,
    status: "qualified",
    notes: "A déjà un devis concurrent",
    createdAt: "2024-03-09",
    assignedTo: "Solar Pro"
  }
];

const LeadManagement = () => {
  const [leads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: LeadStatus) => {
    const colors = {
      new: "bg-blue-500",
      contacted: "bg-yellow-500",
      qualified: "bg-green-500",
      assigned: "bg-purple-500",
      converted: "bg-emerald-500",
      lost: "bg-red-500"
    };
    return colors[status];
  };

  const getStatusText = (status: LeadStatus) => {
    const texts = {
      new: "Nouveau",
      contacted: "Contacté",
      qualified: "Qualifié",
      assigned: "Assigné",
      converted: "Converti",
      lost: "Perdu"
    };
    return texts[status];
  };

  const exportToCSV = () => {
    // TODO: Implémenter l'export CSV
    console.log("Exporting to CSV...");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gestion des Leads</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Exporter CSV
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Lead
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[600px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Projet</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Assigné à</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="font-medium">{`${lead.firstName} ${lead.lastName}`}</div>
                  <div className="text-sm text-gray-500">{lead.email}</div>
                  <div className="text-sm text-gray-500">{lead.phone}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{lead.city}</div>
                  <div className="text-sm text-gray-500">{lead.postalCode}</div>
                </TableCell>
                <TableCell>{lead.projectType}</TableCell>
                <TableCell>{lead.budget.toLocaleString()}€</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(lead.status)} text-white`}>
                    {getStatusText(lead.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {lead.assignedTo || "-"}
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