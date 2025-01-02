import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

const mockTransactions = [
  {
    id: "1",
    affiliate: "Jean Martin",
    amount: 450,
    status: "paid",
    date: "2024-03-15",
    method: "Virement bancaire",
  },
  {
    id: "2",
    affiliate: "Marie Dubois",
    amount: 280,
    status: "pending",
    date: "2024-03-14",
    method: "PayPal",
  },
];

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
        <Card className="p-6">
          <h4 className="font-semibold mb-2">Total Commissions</h4>
          <p className="text-2xl font-bold">12,450€</p>
          <p className="text-sm text-muted-foreground">Ce mois</p>
        </Card>
        <Card className="p-6">
          <h4 className="font-semibold mb-2">En Attente</h4>
          <p className="text-2xl font-bold">3,280€</p>
          <p className="text-sm text-muted-foreground">À payer</p>
        </Card>
        <Card className="p-6">
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
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Méthode</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.affiliate}</TableCell>
                <TableCell>{transaction.amount}€</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    transaction.status === 'paid' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status === 'paid' ? 'Payé' : 'En attente'}
                  </span>
                </TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{transaction.method}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
};