import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatRupiah } from "@/lib/utils";
import type { Transaction } from "@/types/transaction";

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal Transaksi</TableHead>
          <TableHead>Tipe Transaksi</TableHead>
          <TableHead>Deskripsi Transaksi</TableHead>
          <TableHead>Nominal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((trx) => (
          <TableRow key={trx.id}>
            <TableCell>{formatDate(trx.date)}</TableCell>
            <TableCell>
              <Badge
                className={
                  trx.type === "income"
                    ? "bg-green-100 text-green-600 hover:bg-green-100"
                    : "bg-red-100 text-red-600 hover:bg-red-100"
                }
              >
                {trx.type === "income" ? "Pemasukan" : "Pengeluaran"}
              </Badge>
            </TableCell>
            <TableCell>{trx.description}</TableCell>
            <TableCell
              className={`font-medium ${
                trx.type === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatRupiah(trx.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
