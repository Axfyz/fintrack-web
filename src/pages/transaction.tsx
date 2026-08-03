import { AppLayout } from "@/layouts/app-layout";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import type { TransactionFormValues } from "@/schemas/transaction-schema";
import { TransactionDialog } from "@/components/transaction-dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Transaction } from "@/types/transaction";
import { ArrowUpDown } from "lucide-react";
import { getTransactionColumns } from "@/components/transaction-columns";
import { ConfirmAlert } from "@/components/confirm-alert";
import { TransactionCard } from "@/components/transaction-card";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/use-transactions";

const PAGE_SIZE = 5;

export default function Transaction() {
  const isMobile = useIsMobile();
  const { transactions, addTransaction, updateTransaction, deleteTransaction } =
    useTransactions();

  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const [deletingTransaction, setDeletingTransaction] =
    useState<Transaction | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  function handleAdd(values: TransactionFormValues) {
    addTransaction({
      type: values.type,
      category: values.category,
      amount: values.amount,
      description: values.description || "-",
      date: values.date.toISOString().split("T")[0],
    });
  }

  function handleEditClick(transaction: Transaction) {
    setEditingTransaction(transaction);
    setEditOpen(true);
  }

  function handleEditSubmit(values: TransactionFormValues) {
    if (!editingTransaction) return;
    updateTransaction(editingTransaction.id, {
      type: values.type,
      category: values.category,
      amount: values.amount,
      description: values.description || "-",
      date: values.date.toISOString().split("T")[0],
    });
    setEditingTransaction(null);
  }

  function handleDeleteClick(transaction: Transaction) {
    setDeletingTransaction(transaction);
    setDeleteOpen(true);
  }

  function handleConfirmDelete() {
    if (!deletingTransaction) return;
    deleteTransaction(deletingTransaction.id);
    setDeletingTransaction(null);
    setDeleteOpen(false);
  }

  const sortedTransactions = [...transactions].sort((a, b) => {
    const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
    return sortAsc ? diff : -diff;
  });

  const totalPages = Math.ceil(sortedTransactions.length / PAGE_SIZE);
  const paginatedTransactions = sortedTransactions.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );

  return (
    <AppLayout title="Transaksi">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold">Transaksi</h2>
          <TransactionDialog mode="add" onSubmit={handleAdd} />
        </div>

        {isMobile ? (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setSortAsc(!sortAsc);
                setPage(0);
              }}
              className="flex items-center gap-1 self-start text-sm"
            >
              Tanggal
              <ArrowUpDown className="size-3.5" />
            </button>
            {paginatedTransactions.map((trx) => (
              <TransactionCard
                key={trx.id}
                transaction={trx}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages - 1}
              >
                Next
              </Button>
            </div>
          </div>
        ) : (
          <DataTable
            columns={getTransactionColumns({
              onEdit: handleEditClick,
              onDelete: handleDeleteClick,
            })}
            data={transactions}
            pageSize={PAGE_SIZE}
          />
        )}
      </div>

      <TransactionDialog
        mode="edit"
        transaction={editingTransaction ?? undefined}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={handleEditSubmit}
      />

      <ConfirmAlert
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Hapus Transaksi ini ?"
        description={
          deletingTransaction
            ? `Transaksi "${deletingTransaction.description}" akan dihapus permanen`
            : "Transaksi ini akan dihapus permanen"
        }
        confirmLabel="Hapus"
        variant="destructive"
        onConfirm={handleConfirmDelete}
      />
    </AppLayout>
  );
}
