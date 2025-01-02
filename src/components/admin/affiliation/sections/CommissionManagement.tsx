import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Filter, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockTransactions = [
  {
    id: "1",
    affiliate: "Jean Martin",
    amount: 450,
    status: "paid",
    date: "2024-03-15",
    method: "Virement bancaire",
    leads: 15,
  },
  {
    id: "2",
    affiliate: "Marie Dubois",
    amount: 280,
    status: "pending",
    date: "2024-03-14",
    method: "PayPal",
    leads: 8,
  },
  {
    id: "3",
    affiliate: "Pierre Durand",
    amount: 750,
    status: "processing",
    date: "2024-03-13",
    method: "Virement bancaire",
    leads: 25,
  },
  {
    id: "4",
    affiliate: "Sophie Bernard",
    amount: 320,
    status: "paid",
    date: "2024-03-12",
    method: "PayPal",
    leads: 12,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'paid':
      return <Badge className="bg-green-100 text-green-800">Payé</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
    case 'processing':
      return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800">Inconnu</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'paid':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'processing':
      return <AlertCircle className="h-4 w-4 text-blue-500" />;
    default:
      return null;
  }
};

export const CommissionManagement = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">Gestion des Commissions</h3>
          <p className="text-muted-foreground">
            Gérez les paiements et suivez les commissions des affiliés
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5">
          <h4 className="font-semibold mb-2">Total Commissions</h4>
          <p className="text-2xl font-bold">12,450€</p>
          <p className="text-sm text-muted-foreground">Ce mois</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5">
          <h4 className="font-semibold mb-2">En Attente</h4>
          <p className="text-2xl font-bold">3,280€</p>
          <p className="text-sm text-muted-foreground">À payer</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
          <h4 className="font-semibold mb-2">Payées</h4>
          <p className="text-2xl font-bold">9,170€</p>
          <p className="text-sm text-muted-foreground">Ce mois</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Historique des Transactions</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Affilié</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Leads</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Méthode</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.affiliate}</TableCell>
                <TableCell>{transaction.amount}€</TableCell>
                <TableCell>{transaction.leads}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(transaction.status)}
                    {getStatusBadge(transaction.status)}
                  </div>
                </TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{transaction.method}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
};