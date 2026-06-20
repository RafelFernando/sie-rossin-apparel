import { getRevenueAndTransactions, getRatingStats, getReturningCustomer, getTotalTraffic } from "@/lib/dashboard/data-atas";
import { getTotalPenjualanPerKategoriBarChart } from "@/lib/dashboard/data-atas-tengah";

export default async function LaporanEksekutif() {
    const { revenue, totalTransaction } = await getRevenueAndTransactions();
    const { averageRating, totalReviews } = await getRatingStats();
    const { returning, total, percentage } = await getReturningCustomer();
    const totalPenjualanPerKategori = await getTotalPenjualanPerKategoriBarChart();
    const totalTraffic = await getTotalTraffic();

    const kategoriTerlaris = [...totalPenjualanPerKategori]
        .sort((a, b) => b.totalSales - a.totalSales)[0];

    return (
        <div className="">
            <div className="flex justify-center">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl text-black font-bold">Rossin Apparel</h1>
                    <h2 className="text-xl text-black font-medium">Laporan Eksekutif Analisis Penjualan dan Customer </h2>
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-xl">Periode Laporan: 1 Januari 2024 - 31 Desember 2024</h3>
            </div>

            <div className="mt-10">
                <div className="grid grid-cols-[180px_auto_1fr] gap-x-2">
                    <span className="text-xl">Total Penjualan</span>
                    <span className="text-xl">:</span>
                    <span className="text-xl">{revenue.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>

                    <span className="text-xl">Total Transaksi</span>
                    <span className="text-xl">:</span>
                    <span className="text-xl">{totalTransaction}</span>

                    <span className="text-xl">Total Customer</span>
                    <span className="text-xl">:</span>
                    <span className="text-xl">{total}</span>

                    <span className="text-xl">Returning Customer</span>
                    <span className="text-xl">:</span>
                    <span className="text-xl">{percentage}%</span>

                    <span className="text-xl">Rating Rata-rata</span>
                    <span className="text-xl">:</span>
                    <span className="text-xl">{averageRating} / 5</span>
                </div>
            </div>

            <div className="mt-10">
                <h3 className=" text-xl font-bold">
                    Penjualan per Kategori Produk
                </h3>
                <h3 className="mb-4 text-xl">Penjualan Terlaris : {kategoriTerlaris.category} - {kategoriTerlaris.totalSales.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</h3>
                <table className="w-full border-collapse border">
                    <thead>
                        <tr>
                            <th className="border p-2 text-center">
                                Kategori
                            </th>
                            <th className="border p-2 text-center">
                                Total Penjualan
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {totalPenjualanPerKategori.map((item) => (
                            <tr key={item.category}>
                                <td className="border p-2">
                                    {item.category}
                                </td>

                                <td className="border p-2 text-left">
                                    {item.totalSales.toLocaleString(
                                        "id-ID",
                                        {
                                            style: "currency",
                                            currency: "IDR",
                                        }
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}