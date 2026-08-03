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
