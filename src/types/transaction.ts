export interface Transaction {
  id: number;
  date: string;
  type: "income" | "expense";
  description: string;
  amount: number;
}
