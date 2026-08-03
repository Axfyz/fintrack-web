import { DataTable } from "@/components/data-table";
import { SummaryCards } from "@/components/summary-cards";
import { TransactionCard } from "@/components/transaction-card";
import { getTransactionColumns } from "@/components/transaction-columns";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTransactions } from "@/hooks/use-transactions";
import { AppLayout } from "@/layouts/app-layout";

export default function Dashboard() {
  const isMobile = useIsMobile();
  const { transactions } = useTransactions();

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <AppLayout title="Dashboard">
      <div className="flex flex-col gap-4">
        <SummaryCards transactions={transactions} />

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Transaksi Terakhir</h2>

          {isMobile ? (
            <div className="flex flex-col gap-2">
              {recentTransactions.map((trx) => (
                <TransactionCard
                  key={trx.id}
                  transaction={trx}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          ) : (
            <DataTable
              columns={getTransactionColumns({
                onEdit: () => {},
                onDelete: () => {},
              })}
              data={recentTransactions}
              showPagination={false}
            ></DataTable>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
