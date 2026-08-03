import type { Transaction } from "@/types/transaction";

export function getTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter((trx) => trx.type == "income")
    .reduce((sum, trx) => sum + trx.amount, 0);
}

export function getTotalExpense(transactions: Transaction[]): number {
  return transactions
    .filter((trx) => trx.type == "expense")
    .reduce((sum, trx) => sum + trx.amount, 0);
}

export function getBalance(transactions: Transaction[]): number {
  return getTotalIncome(transactions) - getTotalExpense(transactions);
}

export interface CategoryBreakdownItem {
  category: string;
  amount: number;
  percentage: number;
}

export function getCategoryBreakdown(
  transactions: Transaction[],
): CategoryBreakdownItem[] {
  const expenseTransactions = transactions.filter(
    (trx) => trx.type === "expense",
  );
  const total = expenseTransactions.reduce((sum, trx) => sum + trx.amount, 0);

  const grouped: Record<string, number> = {};
  expenseTransactions.forEach((trx) => {
    grouped[trx.category] = (grouped[trx.category] || 0) + trx.amount;
  });

  return Object.entries(grouped)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}
