import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-primary/10 hover:border-primary/20 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                transaction.type === 'credit' 
                  ? 'bg-emerald-500/20 text-emerald-500' 
                  : 'bg-red-500/20 text-red-500'
              }`}>
                {transaction.type === 'credit' 
                  ? <ArrowUpRight className="h-4 w-4" />
                  : <ArrowDownRight className="h-4 w-4" />
                }
              </div>
              <div>
                <p className="font-medium text-white">{transaction.description}</p>
                <p className="text-sm text-white/60">
                  {new Date(transaction.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <p className={`font-semibold ${
              transaction.type === 'credit' 
                ? 'text-emerald-500' 
                : 'text-red-500'
            }`}>
              {transaction.type === 'credit' ? '+' : '-'}
              {transaction.amount.toLocaleString('fr-FR')}€
            </p>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
};