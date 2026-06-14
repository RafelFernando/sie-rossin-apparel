"use client";
import { useActionState, useEffect } from "react";
import { updateTransaksi } from "@/lib/transaksi/action";
import { useTopLoader } from "nextjs-toploader";
import clsx from "clsx";
import Link from "next/link";
import { Transaksis } from "@/app/generated/prisma/client";
import { useState, useTransition } from "react";

export default function EditTransaksiForm({ transaksis }: { transaksis: Transaksis }) {
    const [message, setMessage] = useState("");
    const [pending, startTransition] = useTransition();

    const [state, formAction, isPending] = useActionState(updateTransaksi.bind(null, transaksis.id), null);


    const loader = useTopLoader();
    useEffect(() => {
        if (isPending) {
            loader.start();
        } else {
            loader.done();
        }
    }, [isPending, loader]);

    return (
        <div className="bg-slate-50 p-3 rounded-sm shadow-sm">

            <form action={formAction}>
                <div className="grid md:grid-cols-2 gap-1">
                    <div>
                        <label className="block mb-2 text-[18px] font-medium text-black">Customer ID</label>
                        <input defaultValue={transaksis.customerId} type="text" name="customerId" className="bg-white p-3 border border-gray-200 rounded-sm w-full font-light " placeholder="Customer ID*" />
                        <div aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-red-500 mt-2">{state?.errors?.customerId}</p>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-[18px] font-medium text-black">Transaction Date</label>
                        <input
                            type="date"
                            name="transactionDate"
                            defaultValue={transaksis.transactionDate.toISOString().split("T")[0]}
                            className="bg-white p-3 border border-gray-200 rounded-sm w-full font-light"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[18px] font-medium text-black">Product Category</label>
                        <select name="productCategory" defaultValue={transaksis.productCategory} className="bg-white p-3 border border-gray-200 rounded-sm w-full font-light ">
                            <option value="" disabled>Pilih Product Category</option>
                            <option value="Aksesori Olahraga">Aksesori Olahraga</option>
                            <option value="Celana Olahraga">Celana Olahraga</option>
                            <option value="Jaket & Hoodie">Jaket & Hoodie</option>
                            <option value="Kaos Kaki">Kaos Kaki</option>
                            <option value="Pakaian Olahraga Pria">Pakaian Olahraga Pria</option>
                            <option value="Pakaian Olahraga Wanita">Pakaian Olahraga Wanita</option>
                            <option value="Sepatu Basket">Sepatu Basket</option>
                            <option value="Sepatu Futsal">Sepatu Futsal</option>
                            <option value="Sepatu Lari">Sepatu Lari</option>
                            <option value="Sepatu Lifestyle">Sepatu Lifestyle</option>
                            <option value="Sepatu Training">Sepatu Training</option>
                            <option value="Tas & Backpack">Tas & Backpack</option>
                            <option value="Topi & Headwear">Topi & Headwear</option>
                        </select>
                        <div aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-red-500 mt-2">{state?.errors?.productCategory}</p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[18px] font-medium text-black">Unit Price</label>
                        <input defaultValue={transaksis.unitPrice} type="text" name="unitPrice" className="bg-white p-3 border border-gray-200 rounded-sm w-full font-light " placeholder="Unit Price*" />
                        <div aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-red-500 mt-2">{state?.errors?.unitPrice}</p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[18px] font-medium text-black">Quantity</label>
                        <input defaultValue={transaksis.quantity} type="text" name="quantity" className="bg-white p-3 border border-gray-200 rounded-sm w-full font-light " placeholder="Quantity*" />
                        <div aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-red-500 mt-2">{state?.errors?.quantity}</p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[18px] font-medium text-black">Total Amount</label>
                        <input defaultValue={transaksis.totalAmount} type="text" name="totalAmount" className="bg-white p-3 border border-gray-200 rounded-sm w-full font-light " placeholder="Total Amount*" />
                        <div aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-red-500 mt-2">{state?.errors?.totalAmount}</p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[18px] font-medium text-black">Discount Amount</label>
                        <input defaultValue={transaksis.discountAmount} type="text" name="discountAmount" className="bg-white p-3 border border-gray-200 rounded-sm w-full font-light " placeholder="Discount Amount*" />
                        <div aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-red-500 mt-2">{state?.errors?.discountAmount}</p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[18px] font-medium text-black">Payment Method</label>
                        <select name="paymentMethod" defaultValue={transaksis.paymentMethod} className="bg-white p-3 border border-gray-200 rounded-sm w-full font-light " >
                            <option value="" disabled>Pilih Payment Method</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="COD">COD</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Digital Wallet">Digital Wallet</option>
                        </select>
                        <div aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-red-500 mt-2">{state?.errors?.paymentMethod}</p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[18px] font-medium text-black">Device Type</label>
                        <select name="deviceType" defaultValue={transaksis.deviceType} className="bg-white p-3 border border-gray-200 rounded-sm w-full font-light " >
                            <option value="" disabled>Pilih Device</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Desktop">Desktop</option>
                            <option value="Tablet">Tablet</option>
                        </select>
                        <div aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-red-500 mt-2">{state?.errors?.deviceType}</p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[18px] font-medium text-black">Session Duration Minutes</label>
                        <input defaultValue={transaksis.sessionDurationMinutes} type="text" name="sessionDurationMinutes" className="bg-white p-3 border border-gray-200 rounded-sm w-full font-light " placeholder="Session Duration Minutes*" />
                        <div aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-red-500 mt-2">{state?.errors?.sessionDurationMinutes}</p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[18px] font-medium text-black">Pages Viewed</label>
                        <input defaultValue={transaksis.pagesViewed} type="text" name="pagesViewed" className="bg-white p-3 border border-gray-200 rounded-sm w-full font-light " placeholder="Pages Viewed*" />
                        <div aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-red-500 mt-2">{state?.errors?.pagesViewed}</p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[18px] font-medium text-black">Is Returning Customer</label>
                        <select
                            name="isReturningCustomer"
                            defaultValue={transaksis.isReturningCustomer}
                            className="bg-white p-3 border border-gray-200 rounded-sm w-full font-light"
                        >
                            <option value="" disabled>
                                Pilih Status
                            </option>

                            <option value="TRUE">
                                TRUE
                            </option>

                            <option value="FALSE">
                                FALSE
                            </option>
                        </select>

                        <div aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-red-500 mt-2">
                                {state?.errors?.isReturningCustomer}
                            </p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[18px] font-medium text-black">Customer Rating</label>
                        <input defaultValue={transaksis.customerRating} type="text" name="customerRating" className="bg-white p-3 border border-gray-200 rounded-sm w-full font-light " placeholder="Customer Rating*" />
                        <div aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-red-500 mt-2">{state?.errors?.customerRating}</p>
                        </div>
                    </div>


                </div>

                <div className="flex gap-2">
                    <Link href={"/transaksi"} className="px-10 text-center py-4 font-semibold text-white w-full bg-gray-600 rounded-sm hover:bg-gray-500 cursor-pointer transition-colors">Cancel</Link>
                    <button type="submit" className={clsx("px-10 text-center py-4 font-semibold text-white w-full bg-blue-600 rounded-sm hover:bg-blue-500 cursor-pointer transition-colors", {
                        "opacity-50 cursor-progress animate-pulse": isPending
                    })} disabled={isPending}>{isPending ? "Saving..." : "Save"}</button>
                </div>
            </form>
        </div>
    )
}