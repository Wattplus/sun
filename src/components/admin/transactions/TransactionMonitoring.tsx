import { useQuery } from "@tanstack/react-query";
import { LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";
import { supabase } from "@/integrations/supabase/client";

const TransactionMonitoring = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*, installers(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="space-y-6 p-6">
      <AdminBreadcrumb />
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LineChart className="h-6 w-6 text-primary" />
          Suivi des transactions
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-xl"
      >
        {isLoading ? (
          <p className="text-center text-muted-foreground">Chargement...</p>
        ) : !transactions?.length ? (
          <p className="text-center text-muted-foreground">
            Aucune transaction à afficher
          </p>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="border border-border rounded-lg p-4 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Transaction #{transaction.id.slice(0, 8)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transaction.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    transaction.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status === 'completed' ? 'Complété' : 'En attente'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm">
                    {transaction.type === 'credit' ? 'Crédit' : 'Débit'}: {transaction.amount}€
                  </p>
                  {transaction.description && (
                    <p className="text-sm text-muted-foreground">
                      {transaction.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TransactionMonitoring;