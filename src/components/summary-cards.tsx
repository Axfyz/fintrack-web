import {
  getBalance,
  getTotalExpense,
  getTotalIncome,
} from "@/lib/transaction-utils";
import type { Transaction } from "@/types/transaction";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

interface SummaryCardsProps {
  transactions: Transaction[];
}

export function SummaryCards({ transactions }: SummaryCardsProps) {
  const balance = getBalance(transactions);
  const income = getTotalIncome(transactions);
  const expense = getTotalExpense(transactions);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <Card className="col-span-2 sm:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-1">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Sisa Saldo
          </CardTitle>
          <Wallet className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p
            className={`text-2xl font-semibold ${
              balance < 0 ? "text-red-600" : ""
            }`}
          >
            {formatRupiah(balance)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-1">
          <CardTitle className="text-xs font-medium text-muted-foreground sm:text-sm">
            Pemasukan
          </CardTitle>
          <TrendingUp className="size-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold text-green-600 sm:text-2xl">
            {formatRupiah(income)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-1">
          <CardTitle className="text-xs font-medium text-muted-foreground sm:text-sm">
            Pengeluaran
          </CardTitle>
          <TrendingDown className="size-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold text-red-600 sm:text-2xl">
            {formatRupiah(expense)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
