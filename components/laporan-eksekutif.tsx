import { getRevenueAndTransactions, getRatingStats, getReturningCustomer, getTotalTraffic } from "@/lib/dashboard/data-atas";
import { getTotalPenjualanPerKategoriBarChart } from "@/lib/dashboard/data-atas-tengah";
import { LaporanTotalReturningCustomer, LaporanTotalPaymentMethod, LaporanTotalDeviceType, LaporanInsightRatingPerKategori, LaporanInsightLoyalitasCustomer, LaporanPenjualanPerKategori, LaporanInsightTotalDanTrenPenjualan, LaporanInsightAktivitasCustomerPembelian, LaporanInsightPenggunaanDiskon } from "@/lib/dashboard/laporan";

export default async function LaporanEksekutif() {
    const { revenue, totalTransaction } = await getRevenueAndTransactions();
    const { averageRating, totalReviews } = await getRatingStats();
    const { returning, total, percentage } = await getReturningCustomer();
    const totalPenjualanPerKategori = await getTotalPenjualanPerKategoriBarChart();
    const totalTraffic = await getTotalTraffic();
    const viewsVsSalesInsight = await LaporanPenjualanPerKategori();
    const totalDanTren = await LaporanInsightTotalDanTrenPenjualan();
    const aktivitasCustomer = await LaporanInsightAktivitasCustomerPembelian();
    const penggunaanDiskon = await LaporanInsightPenggunaanDiskon();
    const loyalitasCustomer = await LaporanInsightLoyalitasCustomer();
    const ratingPerKategori = await LaporanInsightRatingPerKategori();
    const totalDeviceType = await LaporanTotalDeviceType();
    const totalPaymentMethod = await LaporanTotalPaymentMethod();
    const totalReturningCustomer = await LaporanTotalReturningCustomer();

    const kategoriTerlaris = [...totalPenjualanPerKategori]
        .sort((a, b) => b.totalSales - a.totalSales)[0];
    const kategoriTerendah = [...totalPenjualanPerKategori]
        .sort((a, b) => a.totalSales - b.totalSales)[0];

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg font-serif">
            {/* Header Laporan */}
            <div className="text-center border-b-2 border-black pb-6 mb-8">
                <h1 className="text-3xl font-bold text-black uppercase tracking-wide">Rossin Apparel</h1>
                <h2 className="text-xl text-black font-medium mt-2">Laporan Eksekutif Analisis Penjualan dan Customer</h2>
                <p className="text-sm text-gray-600 mt-4">Periode Laporan: 1 Januari 2024 - 31 Desember 2024</p>
            </div>

            {/* Ringkasan Eksekutif */}
            <div className="mb-8">
                <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">RINGKASAN EKSEKUTIF</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-600">Total Penjualan</p>
                        <p className="text-lg font-bold">{revenue.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-600">Total Transaksi</p>
                        <p className="text-lg font-bold">{totalTransaction}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-600">Total Customer</p>
                        <p className="text-lg font-bold">{total}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-600">Returning Customer</p>
                        <p className="text-lg font-bold">{percentage}%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded col-span-2">
                        <p className="text-sm text-gray-600">Rating Rata-rata</p>
                        <p className="text-lg font-bold">{averageRating} / 5</p>
                    </div>
                </div>
            </div>

            {/* Penjualan per Kategori Produk */}
            <div className="mb-8">
                <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">PENJUALAN PER KATEGORI PRODUK</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                        <p className="text-sm text-gray-600">Kategori Terlaris</p>
                        <p className="font-bold">{kategoriTerlaris.category}</p>
                        <p className="text-sm">{kategoriTerlaris.totalSales.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
                        <p className="text-sm text-gray-600">Kategori Terendah</p>
                        <p className="font-bold">{kategoriTerendah.category}</p>
                        <p className="text-sm">{kategoriTerendah.totalSales.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                    </div>
                </div>
                <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 p-2 text-left">Kategori</th>
                            <th className="border border-gray-300 p-2 text-right">Total Penjualan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {totalPenjualanPerKategori.map((item) => (
                            <tr key={item.category} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-2">{item.category}</td>
                                <td className="border border-gray-300 p-2 text-right">{item.totalSales.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Total Views vs Total Sales */}
            {viewsVsSalesInsight && (
                <div className="mb-8">
                    <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">TOTAL VIEWS VS TOTAL SALES</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Penjualan Tertinggi</p>
                            <p className="font-bold">{viewsVsSalesInsight?.highestSales?.month}</p>
                            <p className="text-sm">Rp {viewsVsSalesInsight?.highestSales?.totalSalesJuta.toLocaleString("id-ID")} Juta</p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Views Tertinggi</p>
                            <p className="font-bold">{viewsVsSalesInsight?.highestViews?.month}</p>
                            <p className="text-sm">{viewsVsSalesInsight?.highestViews?.totalViews.toLocaleString("id-ID")} views</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="page-break"></div>
            {/* Total dan Tren Penjualan */}
            {totalDanTren && (
                <div className="mb-8">
                    <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">TOTAL DAN TREN PENJUALAN</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Total Penjualan</p>
                            <p className="font-bold">{totalDanTren.totalSales.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Total Transaksi</p>
                            <p className="font-bold">{totalDanTren.totalTransactions.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                            <p className="text-sm text-gray-600">Bulan Penjualan Tertinggi</p>
                            <p className="font-bold">{totalDanTren.highestMonth.month}</p>
                            <p className="text-sm">{totalDanTren.highestMonth.sales.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
                            <p className="text-sm text-gray-600">Bulan Penjualan Terendah</p>
                            <p className="font-bold">{totalDanTren.lowestMonth.month}</p>
                            <p className="text-sm">{totalDanTren.lowestMonth.sales.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Aktivitas Customer Pembelian */}
            {aktivitasCustomer && (
                <div className="mb-8">
                    <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">AKTIVITAS CUSTOMER PEMBELIAN</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Views Tertinggi</p>
                            <p className="font-bold">{aktivitasCustomer.highestViews.month}</p>
                            <p className="text-sm">{aktivitasCustomer.highestViews.totalViews.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Views Terendah</p>
                            <p className="font-bold">{aktivitasCustomer.lowestViews.month}</p>
                            <p className="text-sm">{aktivitasCustomer.lowestViews.totalViews.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Penjualan Tertinggi</p>
                            <p className="font-bold">{aktivitasCustomer.highestSales.month}</p>
                            <p className="text-sm">{aktivitasCustomer.highestSales.totalSales.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Penjualan Terendah</p>
                            <p className="font-bold">{aktivitasCustomer.lowestSales.month}</p>
                            <p className="text-sm">{aktivitasCustomer.lowestSales.totalSales.toLocaleString("id-ID")}</p>
                        </div>

                    </div>
                </div>
            )}

            {/* Penggunaan Diskon */}
            {penggunaanDiskon && (
                <div className="mb-8">
                    <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">PENGGUNAAN DISKON</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Transaksi dengan Diskon Tertinggi</p>
                            <p className="font-bold">{penggunaanDiskon.highestDiscountMonth.month}</p>
                            <p className="text-sm">{penggunaanDiskon.highestDiscountMonth.total.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Transaksi Tanpa Diskon Tertinggi</p>
                            <p className="font-bold">{penggunaanDiskon.highestWithoutDiscountMonth.month}</p>
                            <p className="text-sm">{penggunaanDiskon.highestWithoutDiscountMonth.total.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Total Transaksi dengan Diskon</p>
                            <p className="font-bold">{penggunaanDiskon.totalWithDiscount.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Total Transaksi Tanpa Diskon</p>
                            <p className="font-bold">{penggunaanDiskon.totalWithoutDiscount.toLocaleString("id-ID")}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="page-break"></div>
            {/* Rating Per Kategori */}
            {ratingPerKategori && (
                <div className="mb-8">
                    <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">RATING PER KATEGORI</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                            <p className="text-sm text-gray-600">Rating Tertinggi</p>
                            <p className="font-bold">{ratingPerKategori.highestRating.category}</p>
                            <p className="text-sm">{ratingPerKategori.highestRating.averageRating.toFixed(1)} / 5</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
                            <p className="text-sm text-gray-600">Rating Terendah</p>
                            <p className="font-bold">{ratingPerKategori.lowestRating.category}</p>
                            <p className="text-sm">{ratingPerKategori.lowestRating.averageRating.toFixed(1)} / 5</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Device Type & Payment Method */}
            <div className="mb-8">
                <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">ANALISIS PERANGKAT & PEMBAYARAN</h3>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold mb-2 text-gray-700">Device Type</h4>
                        <div className="space-y-1">
                            <p className="flex justify-between border-b border-gray-200 py-1">
                                <span>Desktop</span>
                                <span className="font-bold">{totalDeviceType.desktop.toLocaleString("id-ID")}</span>
                            </p>
                            <p className="flex justify-between border-b border-gray-200 py-1">
                                <span>Mobile</span>
                                <span className="font-bold">{totalDeviceType.mobile.toLocaleString("id-ID")}</span>
                            </p>
                            <p className="flex justify-between border-b border-gray-200 py-1">
                                <span>Tablet</span>
                                <span className="font-bold">{totalDeviceType.tablet.toLocaleString("id-ID")}</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 text-gray-700">Metode Pembayaran</h4>
                        <div className="space-y-1">
                            <p className="flex justify-between border-b border-gray-200 py-1">
                                <span>Bank Transfer</span>
                                <span className="font-bold">{totalPaymentMethod.bankTransfer}</span>
                            </p>
                            <p className="flex justify-between border-b border-gray-200 py-1">
                                <span>COD</span>
                                <span className="font-bold">{totalPaymentMethod.cod}</span>
                            </p>
                            <p className="flex justify-between border-b border-gray-200 py-1">
                                <span>Digital Wallet</span>
                                <span className="font-bold">{totalPaymentMethod.digitalWallet}</span>
                            </p>
                            <p className="flex justify-between border-b border-gray-200 py-1">
                                <span>Credit Card</span>
                                <span className="font-bold">{totalPaymentMethod.creditCard}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Returning Customer */}
            <div className="mb-8">
                <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">LOYALITAS CUSTOMER</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded">
                        <p className="text-sm text-gray-600">Total Customer Baru</p>
                        <p className="text-lg font-bold">{totalReturningCustomer.customerBaru}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                        <p className="text-sm text-gray-600">Total Returning Customer</p>
                        <p className="text-lg font-bold">{totalReturningCustomer.returningCustomer}</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-black pt-4 text-center text-sm text-gray-500">
                <p>Laporan ini dibuat secara otomatis oleh Sistem Informasi Eksekutif Rossin Apparel</p>
                <p className="mt-1">© 2026 Rossin Apparel - All Rights Reserved</p>
            </div>
        </div>
    )
}