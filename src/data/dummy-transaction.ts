import type { Transaction } from "@/types/transaction";

export const dummyTransactions: Transaction[] = [
  {
    id: 1,
    date: "2026-07-01",
    type: "income",
    description: "Gaji bulanan",
    amount: 8500000,
  },
  {
    id: 2,
    date: "2026-07-30",
    type: "expense",
    description: "Belanja bulanan",
    amount: 450000,
  },
  {
    id: 3,
    date: "2026-07-29",
    type: "expense",
    description: "Makan siang tim",
    amount: 120000,
  },
  {
    id: 4,
    date: "2026-07-28",
    type: "income",
    description: "Bonus proyek",
    amount: 1200000,
  },
  {
    id: 5,
    date: "2026-07-27",
    type: "expense",
    description: "Bayar listrik",
    amount: 350000,
  },
  {
    id: 6,
    date: "2026-07-26",
    type: "expense",
    description: "Bensin motor",
    amount: 50000,
  },
  {
    id: 7,
    date: "2026-07-25",
    type: "income",
    description: "Jual barang bekas",
    amount: 200000,
  },
  {
    id: 8,
    date: "2026-07-24",
    type: "expense",
    description: "Langganan streaming",
    amount: 65000,
  },
];
