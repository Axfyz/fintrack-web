import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z
    .number({ error: "Nominal harus berupa angka" })
    .positive({ error: "Nominal harus lebih dari 0" }),
  category: z.string().min(1, { error: "Kategori wajib dipilih" }),
  date: z.date({ error: "Tanggal wajib diisi" }),
  description: z.string().optional(),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
