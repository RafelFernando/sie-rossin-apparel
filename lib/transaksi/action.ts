"use server";
import { TransaksiZod } from "./zod";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const saveTransaksi = async (prevState: unknown, formData: FormData) => {
    const validatedFields = TransaksiZod.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { customerId, transactionDate, productCategory, unitPrice, quantity, totalAmount, paymentMethod, deviceType, sessionDurationMinutes, pagesViewed, isReturningCustomer, customerRating, discountAmount } = validatedFields.data;

    try {
        console.log(Object.fromEntries(formData));
        await prisma.transaksis.create({
            data: {
                customerId,
                transactionDate,
                productCategory,
                unitPrice,
                quantity,
                totalAmount,
                paymentMethod,
                deviceType,
                sessionDurationMinutes,
                pagesViewed,
                isReturningCustomer,
                customerRating,
                discountAmount,
            },
        });
    } catch (error) {
        console.log(error)
        throw error
    }
    redirect("/admin/transaksi");
}

export const updateTransaksi = async (id: string, prevState: unknown, formData: FormData) => {
    const rawData = {
        customerId: formData.get("customerId"),
        transactionDate: formData.get("transactionDate"),
        productCategory: formData.get("productCategory"),
        unitPrice: formData.get("unitPrice"),
        quantity: formData.get("quantity"),
        totalAmount: formData.get("totalAmount"),
        paymentMethod: formData.get("paymentMethod"),
        deviceType: formData.get("deviceType"),
        sessionDurationMinutes: formData.get("sessionDurationMinutes"),
        pagesViewed: formData.get("pagesViewed"),
        isReturningCustomer: formData.get("isReturningCustomer"),
        customerRating: formData.get("customerRating"),
        discountAmount: formData.get("discountAmount"),
    }

    const validatedFields = TransaksiZod.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { customerId, transactionDate, productCategory, unitPrice, quantity, totalAmount, paymentMethod, deviceType, sessionDurationMinutes, pagesViewed, isReturningCustomer, customerRating, discountAmount } = validatedFields.data;

    try {
        await prisma.transaksis.update({
            where: {
                id,
            },
            data: {
                customerId,
                transactionDate,
                productCategory,
                unitPrice,
                quantity,
                totalAmount,
                paymentMethod,
                deviceType,
                sessionDurationMinutes,
                pagesViewed,
                isReturningCustomer,
                customerRating,
                discountAmount,
            },
        });
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/admin/transaksi");
    redirect("/admin/transaksi");
}

export const deleteTransaksi = async (id: string) => {
    try {
        await prisma.transaksis.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/admin/transaksi");
}