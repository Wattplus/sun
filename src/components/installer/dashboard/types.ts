export interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
}