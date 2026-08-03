import type { Transaction } from "@/types/transaction";

export type Period = "this-month" | "last-month" | "last-3-months" | "all";

const PERIOD_OFFSET: Record<Exclude<Period, "all">, number> = {
  "this-month": 0,
  "last-month": 1,
  "last-3-months": 3,
};

export function filterByPeriod(
  transactions: Transaction[],
  period: Period,
): Transaction[] {
  if (period === "all") return transactions;

  const now = new Date();

  if (period === "this-month" || period === "last-month") {
    const offset = PERIOD_OFFSET[period];
    const target = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    return transactions.filter((trx) => {
      const trxDate = new Date(trx.date);
      return (
        trxDate.getFullYear() === target.getFullYear() &&
        trxDate.getMonth() === target.getMonth()
      );
    });
  }
  const startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
  return transactions.filter((trx) => new Date(trx.date) >= startDate);
}

export function getPeriodLabel(period: Period): string {
  const now = new Date();
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  if (period === "all") return "Semua data";

  if (period === "this-month") {
    return `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  }

  if (period === "last-month") {
    const target = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return `${monthNames[target.getMonth()]} ${target.getFullYear()}`;
  }

  const start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
  return `${monthNames[start.getMonth()]} - ${monthNames[now.getMonth()]} ${now.getFullYear()}`;
}
