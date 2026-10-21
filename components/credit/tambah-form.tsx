"use client";

import { useActionState, useEffect } from "react";
import { saveCreditSubmission } from "@/lib/credit/action";
import { useTopLoader } from "nextjs-toploader";
import clsx from "clsx";
import Link from "next/link";

export default function TambahCreditForm() {
    const [state, formAction, isPending] = useActionState(
        saveCreditSubmission,
        null
    );

    const loader = useTopLoader();

    useEffect(() => {
        if (isPending) {
            loader.start();
        } else {
            loader.done();
        }
    }, [isPending, loader]);

    return (
        <div className="bg-slate-50 p-4 rounded-sm shadow-sm">
            <form action={formAction}>
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Nama Konsumen */}
                    <div>
                        <label className="block mb-2 text-[18px] font-medium text-black">
                            Nama Konsumen
                        </label>
                        <input
                            type="text"
                            name="customerName"
                            required
                            className="bg-white p-3 border border-gray-200 rounded-sm w-full"
                            placeholder="Nama konsumen"
                        />
                        <p className="text-sm text-red-500 mt-2">
                        </p>
                    </div>

                    {/* NIK */}
                    <div>
                        <label className="block mb-2 text-[18px] font-medium text-black">
                            NIK
                        </label>
                        <input
                            type="text"
                            name="nik"
                            required
                            maxLength={16}
                            inputMode="numeric"
                            className="bg-white p-3 border border-gray-200 rounded-sm w-full"
                            placeholder="16 digit NIK"
                        />
                        <p className="text-sm text-red-500 mt-2">
                        </p>
                    </div>

                    {/* Nama Dealer */}
                    <div>
                        <label className="block mb-2 text-[18px] font-medium text-black">
                            Nama Dealer
                        </label>
                        <input
                            type="text"
                            name="dealerName"
                            required
                            className="bg-white p-3 border border-gray-200 rounded-sm w-full"
                            placeholder="Nama dealer"
                        />
                        <p className="text-sm text-red-500 mt-2">
                        </p>
                    </div>

                    {/* Merek Kendaraan */}
                    <div>
                        <label className="block mb-2 text-[18px] font-medium text-black">
                            Merek Kendaraan
                        </label>
                        <select
                            name="vehicleBrand"
                            defaultValue=""
                            required
                            className="bg-white p-3 border border-gray-200 rounded-sm w-full"
                        >
                            <option value="" disabled>
                                Pilih merek kendaraan
                            </option>
                            <option value="Honda">Honda</option>
                            <option value="Yamaha">Yamaha</option>
                            <option value="Suzuki">Suzuki</option>
                            <option value="Kawasaki">Kawasaki</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Daihatsu">Daihatsu</option>
                            <option value="Mitsubishi">Mitsubishi</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                        <p className="text-sm text-red-500 mt-2">
                        </p>
                    </div>

                    {/* Model Kendaraan */}
                    <div>
                        <label className="block mb-2 text-[18px] font-medium text-black">
                            Model Kendaraan
                        </label>
                        <input
                            type="text"
                            name="vehicleModel"
                            required
                            className="bg-white p-3 border border-gray-200 rounded-sm w-full"
                            placeholder="Contoh: Honda Vario 160"
                        />
                        <p className="text-sm text-red-500 mt-2">
                        </p>
                    </div>

                    {/* Harga Kendaraan */}
                    <div>
                        <label className="block mb-2 text-[18px] font-medium text-black">
                            Harga Kendaraan (Rp)
                        </label>
                        <input
                            type="number"
                            name="vehiclePrice"
                            required
                            className="bg-white p-3 border border-gray-200 rounded-sm w-full"
                            placeholder="Contoh: 25000000"
                        />
                        <p className="text-sm text-red-500 mt-2">
                        </p>
                    </div>

                    {/* Uang Muka */}
                    <div>
                        <label className="block mb-2 text-[18px] font-medium text-black">
                            Uang Muka / DP (Rp)
                        </label>
                        <input
                            type="number"
                            name="downPayment"
                            required
                            className="bg-white p-3 border border-gray-200 rounded-sm w-full"
                            placeholder="Contoh: 5000000"
                        />
                        <p className="text-sm text-red-500 mt-2">
                        </p>
                    </div>

                    {/* Tenor */}
                    <div>
                        <label className="block mb-2 text-[18px] font-medium text-black">
                            Tenor (Bulan)
                        </label>
                        <select
                            name="tenorMonths"
                            defaultValue=""
                            required
                            className="bg-white p-3 border border-gray-200 rounded-sm w-full"
                        >
                            <option value="" disabled>
                                Pilih tenor
                            </option>
                            <option value="12">12 Bulan</option>
                            <option value="24">24 Bulan</option>
                            <option value="36">36 Bulan</option>
                            <option value="48">48 Bulan</option>
                            <option value="60">60 Bulan</option>
                            <option value="72">72 Bulan</option>
                            <option value="84">84 Bulan</option>
                            <option value="96">96 Bulan</option>
                        </select>
                        <p className="text-sm text-red-500 mt-2">
                        </p>
                    </div>

                    {/* Angsuran Bulanan */}
                    <div>
                        <label className="block mb-2 text-[18px] font-medium text-black">
                            Angsuran Bulanan (Rp)
                        </label>
                        <input
                            type="number"
                            name="monthlyInstallment"
                            required
                            className="bg-white p-3 border border-gray-200 rounded-sm w-full"
                            placeholder="Angsuran per bulan"
                        />
                        <p className="text-sm text-red-500 mt-2">
                        </p>
                    </div>

                    {/* Catatan */}
                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[18px] font-medium text-black">
                            Catatan
                        </label>
                        <textarea
                            name="notes"
                            rows={3}
                            className="bg-white p-3 border border-gray-200 rounded-sm w-full"
                            placeholder="Catatan tambahan (opsional)"
                        />
                        <p className="text-sm text-red-500 mt-2">
                        </p>
                    </div>

                    
                </div>

                <div className="flex gap-2 mt-6">
                    <Link
                        href="/admin/credit-submission"
                        className="px-6 text-center py-3 font-semibold text-white w-full bg-gray-600 rounded-sm hover:bg-gray-500 transition-colors"
                    >
                        Batal
                    </Link>

                    <button
                        type="submit"
                        disabled={isPending}
                        className={clsx(
                            "px-6 text-center py-3 font-semibold text-white w-full bg-blue-600 rounded-sm hover:bg-blue-500 transition-colors",
                            {
                                "opacity-50 cursor-progress animate-pulse": isPending,
                            }
                        )}
                    >
                        {isPending ? "Menyimpan..." : "Simpan Pengajuan"}
                    </button>
                </div>
            </form>
        </div>
    );
}