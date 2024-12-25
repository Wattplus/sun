import { ScrollArea } from "@/components/ui/scroll-area";
import { Transaction } from "../types";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center p-3 border rounded-lg"
          >
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-muted-foreground">
                {transaction.date}
              </p>
            </div>
            <p className={`font-semibold ${
              transaction.type === 'credit' 
                ? 'text-green-500' 
                : 'text-red-500'
            }`}>
              {transaction.type === 'credit' ? '+' : '-'}
              {transaction.amount}€
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};