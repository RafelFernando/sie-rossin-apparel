import { number, object, string, coerce, optional } from "zod";

export const TransaksiZod = object({
    customerId: string(),
    transactionDate: coerce.date(),
    productCategory: string(),
    unitPrice: coerce.number(),
    quantity: coerce.number(),
    totalAmount: coerce.number(),
    discountAmount: optional(coerce.number()).default(0),
    paymentMethod: string(),
    deviceType: string(),
    sessionDurationMinutes: coerce.number(),
    pagesViewed: coerce.number(),
    isReturningCustomer: string(),
    customerRating: coerce.number(),
})
