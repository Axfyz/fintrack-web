import { createContext, useState, type ReactNode } from "react";
import type { Transaction } from "@/types/transaction";
import { dummyTransactions } from "@/data/dummy-transactions";

export interface TransactionsContextValue {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (id: number, transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: number) => void;
}

export const TransactionsContext = createContext<
  TransactionsContextValue | undefined
>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] =
    useState<Transaction[]>(dummyTransactions);

  function addTransaction(transaction: Omit<Transaction, "id">) {
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      ...transaction,
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  }

  function updateTransaction(id: number, transaction: Omit<Transaction, "id">) {
    setTransactions((prev) =>
      prev.map((trx) => (trx.id === id ? { id, ...transaction } : trx)),
    );
  }

  function deleteTransaction(id: number) {
    setTransactions((prev) => prev.filter((trx) => trx.id !== id));
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
