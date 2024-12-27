import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockPurchasedLeads } from "../dashboard/mockPurchasedLeads";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const statusColors = {
  new: "bg-blue-500",
  contacted: "bg-yellow-500",
  qualified: "bg-green-500",
};

const statusLabels = {
  new: "Nouveau",
  contacted: "Contacté",
  qualified: "Qualifié",
};

export const PurchasedLeadsPage = () => {
  console.log("Rendering PurchasedLeadsPage");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  console.log("Current leads:", mockPurchasedLeads);

  const filteredLeads = mockPurchasedLeads.filter((lead) => {
    const matchesSearch =
      (lead.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (lead.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (lead.city?.toLowerCase().includes(searchTerm.toLowerCase()) || '');

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  console.log("Filtered leads:", filteredLeads);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
            Mes Leads Achetés
          </h1>
          <p className="text-muted-foreground">
            Gérez et suivez vos leads achetés
          </p>
        </div>

        <Card className="p-6">
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Rechercher par nom ou ville..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="new">Nouveau</SelectItem>
                <SelectItem value="contacted">Contacté</SelectItem>
                <SelectItem value="qualified">Qualifié</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead>Type de projet</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Prix</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow
                    key={lead.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => navigate(`/espace-installateur/leads/${lead.id}`)}
                  >
                    <TableCell className="font-medium">
                      {lead.firstName} {lead.lastName}
                    </TableCell>
                    <TableCell>{lead.city}</TableCell>
                    <TableCell>
                      {lead.projectType === 'residential' ? 'Résidentiel' : 'Professionnel'}
                    </TableCell>
                    <TableCell>{lead.budget}€</TableCell>
                    <TableCell>
                      <Badge className={statusColors[lead.status as keyof typeof statusColors]}>
                        {statusLabels[lead.status as keyof typeof statusLabels]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{lead.price}€</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};