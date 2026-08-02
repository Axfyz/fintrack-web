import { AppLayout } from "@/layouts/app-layout";
import { dummyTransactions } from "@/data/dummy-transaction";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import type { TransactionFormValues } from "@/schemas/transaction-schema";
import { TransactionDialog } from "@/components/transaction-dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Transaction } from "@/types/transaction";
import { TransactionCard } from "@/components/transaction-card";
import { ArrowUpDown } from "lucide-react";
import { getTransactionColumns } from "@/components/transaction-column";

export default function Transaction() {
  const isMobile = useIsMobile();
  const [transactions, setTransactions] =
    useState<Transaction[]>(dummyTransactions);

  const [sortAsc, setSortAsc] = useState(false);

  const sortedTransactions = [...transactions].sort((a, b) => {
    const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
    return sortAsc ? diff : -diff;
  });

  function handleAddTransaction(values: TransactionFormValues) {
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      date: values.date.toISOString().split("T")[0],
      type: values.type,
      description: values.description || "-",
      amount: values.amount,
    };
    setTransactions([newTransaction, ...transactions]);
  }

  return (
    <AppLayout title="Transaksi">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Transaksi</h2>
          <TransactionDialog onAdd={handleAddTransaction} />
        </div>

        {isMobile ? (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="flex items-center gap-1 self-start text-sm"
            >
              Tanggal
              <ArrowUpDown className="size-3.5" />
            </button>
            {sortedTransactions.map((trx) => (
              <TransactionCard key={trx.id} transaction={trx} />
            ))}
          </div>
        ) : (
          <DataTable
            columns={getTransactionColumns({
              onEdit: handleEdit,
              onDelete: handleDelete,
            })}
            data={transactions}
          />
        )}
      </div>
    </AppLayout>
  );
}
