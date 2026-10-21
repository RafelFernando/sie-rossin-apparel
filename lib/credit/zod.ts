
import { z } from "zod";

export const CreditSubmissionZod = z.object({
  submissionNumber: z.string().min(1, "Nomor pengajuan wajib diisi"),

  // Data konsumen
  customerName: z.string().min(1, "Nama konsumen wajib diisi"),
  nik: z
    .string()
    .regex(/^\d{16}$/, "NIK harus terdiri dari 16 digit"),

  // Data kendaraan
  dealerName: z.string().min(1, "Nama dealer wajib diisi"),
  vehicleBrand: z.string().min(1, "Merek kendaraan wajib diisi"),
  vehicleModel: z.string().min(1, "Model kendaraan wajib diisi"),
  vehiclePrice: z.coerce
    .number()
    .positive("Harga kendaraan harus lebih dari 0"),
  downPayment: z.coerce
    .number()
    .min(0, "DP tidak boleh negatif"),

  // Data pinjaman
  tenorMonths: z.coerce
    .number()
    .int("Tenor harus berupa bilangan bulat")
    .min(1, "Tenor minimal 1 bulan")
    .max(96, "Tenor maksimal 96 bulan"),
  monthlyInstallment: z.coerce
    .number()
    .positive("Angsuran harus lebih dari 0"),

  // Informasi tambahan
  notes: z.string().optional().default(""),
}).refine(
  (data) => data.downPayment <= data.vehiclePrice,
  {
    message: "DP tidak boleh melebihi harga kendaraan",
    path: ["downPayment"],
  }
);

export type CreditSubmissionInput = z.infer<
  typeof CreditSubmissionZod
>;
