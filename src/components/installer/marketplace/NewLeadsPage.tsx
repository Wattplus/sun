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
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const statusColors = {
  new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  contacted: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  qualified: "bg-green-500/10 text-green-500 border-green-500/20",
};

const statusLabels = {
  new: "Nouveau",
  contacted: "Contacté",
  qualified: "Qualifié",
};

export const NewLeadsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  console.log("Rendering NewLeadsPage");
  console.log("Current leads:", mockAvailableLeads);

  const filteredLeads = mockAvailableLeads.filter((lead) => {
    const matchesSearch =
      lead.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.city?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  console.log("Filtered leads:", filteredLeads);

  const handlePurchase = (leadId: string) => {
    toast({
      title: "Achat en cours",
      description: "Redirection vers la page de paiement...",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <InstallerBreadcrumb />
      
      <div className="bg-gradient-to-r from-background to-background/80 p-8 rounded-xl border border-primary/20">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Nouveaux Leads Disponibles
        </h1>
        <p className="text-muted-foreground">
          Découvrez les nouveaux leads qualifiés disponibles à l'achat
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
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-muted/50">
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
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => handlePurchase(lead.id)}
                      className="w-full"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Acheter
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};