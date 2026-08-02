import { formatRupiah, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Transaction } from "@/types/transaction";

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const isIncome = transaction.type === "income";

  return (
    <div className="flex flex-col gap-1.5 rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {formatDate(transaction.date)}
        </span>
        <Badge
          className={
            isIncome
              ? "bg-green-100 text-green-700 hover:bg-green-100"
              : "bg-red-100 text-red-700 hover:bg-red-100"
          }
        >
          {isIncome ? "Pemasukan" : "Pengeluaran"}
        </Badge>
      </div>
      <span className="break-all">{transaction.description}</span>
      <span
        className={`font-medium ${
          isIncome ? "text-green-600" : "text-red-600"
        }`}
      >
        {isIncome ? "+" : "-"} {formatRupiah(transaction.amount)}
      </span>
    </div>
  );
}
