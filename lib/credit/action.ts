
"use server";

import { CreditSubmissionZod } from "./zod";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const saveCreditSubmission = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = CreditSubmissionZod.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    customerName,
    nik,
    dealerName,
    vehicleBrand,
    vehicleModel,
    vehiclePrice,
    downPayment,
    tenorMonths,
    monthlyInstallment,
    notes,
  } = validatedFields.data;

  try {
    await prisma.creditSubmission.create({
      data: {
        submissionNumber: `JKL-${Date.now()}`,
        customerName,
        nik,
        dealerName,
        vehicleBrand,
        vehicleModel,
        vehiclePrice,
        downPayment,
        tenorMonths,
        monthlyInstallment,
        notes: notes || null,
      },
    });
  } catch (error) {
    console.error("Gagal menyimpan pengajuan kredit:", error);
    return {
      errors: {
        _form: ["Gagal menyimpan pengajuan kredit."],
      },
    };
  }

  revalidatePath("/admin/credit-submission");
  redirect("/admin/credit-submission");
};
