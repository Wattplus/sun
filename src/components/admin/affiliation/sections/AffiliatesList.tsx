import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus, Search, Filter, Download } from "lucide-react";

const mockAffiliates = [
  {
    id: "1",
    name: "Jean Martin",
    email: "jean.martin@example.com",
    status: "active",
    leads: 45,
    revenue: 2500,
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Marie Dubois",
    email: "marie.dubois@example.com",
    status: "pending",
    leads: 12,
    revenue: 750,
    joinDate: "2024-02-20",
  },
];

export const AffiliatesList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un affilié..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
        <Button className="ml-4">
          <UserPlus className="mr-2 h-4 w-4" />
          Nouvel Affilié
        </Button>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Leads Générés</TableHead>
              <TableHead>Revenus Générés</TableHead>
              <TableHead>Date d'inscription</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAffiliates.map((affiliate) => (
              <TableRow key={affiliate.id}>
                <TableCell className="font-medium">{affiliate.name}</TableCell>
                <TableCell>{affiliate.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    affiliate.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {affiliate.status === 'active' ? 'Actif' : 'En attente'}
                  </span>
                </TableCell>
                <TableCell>{affiliate.leads}</TableCell>
                <TableCell>{affiliate.revenue}€</TableCell>
                <TableCell>{new Date(affiliate.joinDate).toLocaleDateString('fr-FR')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
};