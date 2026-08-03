import { CategoryBreakdown } from "@/components/category-breakdown";
import { SummaryCards } from "@/components/summary-cards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransactions } from "@/hooks/use-transactions";
import { AppLayout } from "@/layouts/app-layout";
import { filterByPeriod, getPeriodLabel, type Period } from "@/lib/date-filter";
import { getCategoryBreakdown } from "@/lib/transaction-utils";
import { useState } from "react";

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: "this-month", label: "Bulan Ini" },
  { value: "last-month", label: "Bulan Lalu" },
  { value: "last-3-months", label: "3 Bulan Terakhir" },
  { value: "all", label: "Semua" },
];

export default function ReportPage() {
  const { transactions } = useTransactions();
  const [period, setPeriod] = useState<Period>("this-month");

  const filteredTransactions = filterByPeriod(transactions, period);
  const categoryBreakdown = getCategoryBreakdown(filteredTransactions);

  return (
    <AppLayout title="Laporan">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold">Laporan</h2>
            <p className="text-sm text-muted-foreground">
              {getPeriodLabel(period)}
            </p>
          </div>
          <Select
            value={period}
            onValueChange={(val) => setPeriod(val as Period)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PERIOD_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <SummaryCards transactions={filteredTransactions} />

        <CategoryBreakdown data={categoryBreakdown} />
      </div>
    </AppLayout>
  );
}
