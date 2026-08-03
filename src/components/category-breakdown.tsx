import type { CategoryBreakdownItem } from "@/lib/transaction-utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { formatRupiah } from "@/lib/utils";

interface CategoryBreakdownProps {
  data: CategoryBreakdownItem[];
}

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Breakdown per Kategori</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Tidak ada riwayat transaksi
          </p>
        ) : (
          data.map((item) => (
            <div key={item.category} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.category}</span>
                <span className="text-muted-foreground">
                  {formatRupiah(item.amount)} ({item.percentage.toFixed(0)}%)
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-red-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
