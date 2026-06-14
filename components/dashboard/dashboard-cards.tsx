import {
    FiDollarSign,
    FiShoppingCart,
    FiUsers,
    FiStar,
    FiMonitor,
} from "react-icons/fi";
import { getRevenueAndTransactions, getRatingStats, getReturningCustomer, getTotalTraffic } from "@/lib/dashboard/data-atas";

export default async function DashboardCards() {
    const { revenue, totalTransaction } = await getRevenueAndTransactions();
    const { averageRating, totalReviews } = await getRatingStats();
    const { returning, total, percentage } = await getReturningCustomer();
    const totalTraffic = await getTotalTraffic();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {/* Total Penjualan */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <FiDollarSign size={28} />
                    </div>

                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase">
                            Total Penjualan
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900">
                            {revenue.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            })}
                        </h3>

                        <p className="text-gray-500 text-sm">
                            dari {totalTransaction} transaksi customer
                        </p>
                    </div>
                </div>
            </div>

            {/* Jumlah Transaksi */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-purple-500 flex items-center justify-center text-white">
                        <FiShoppingCart size={28} />
                    </div>

                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase">
                            Jumlah Transaksi
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900">
                            {totalTransaction}
                        </h3>

                        <p className="text-gray-500 text-sm">
                            dari {totalTransaction} customer
                        </p>
                    </div>
                </div>
            </div>

            {/* Returning Customer */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white">
                        <FiUsers size={28} />
                    </div>

                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase">
                            Returning Customer
                        </p>

                        <h3 className="text-3xl font-bold text-gray-900">
                            {returning} / {total}
                        </h3>

                        <p className="text-green-600 text-sm font-semibold">
                            {percentage}% <span className="text-gray-500 text-sm">
                                dari total customer
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Customer Rating */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                        <FiStar size={28} />
                    </div>

                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase">
                            Customer Rating
                        </p>

                        <h3 className="text-3xl font-bold text-gray-900">
                            {averageRating} / 5
                        </h3>

                        <p className="text-gray-500 text-sm">
                            dari {totalReviews} ulasan customer
                        </p>
                    </div>
                </div>
            </div>

            {/* Traffic */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-blue-700 flex items-center justify-center text-white">
                        <FiMonitor size={28} />
                    </div>

                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase">
                            Total Traffic Website
                        </p>

                        <h3 className="text-3xl font-bold text-gray-900">
                            {totalTraffic}
                        </h3>

                        <p className="text-gray-500 text-sm">
                            halaman sudah dikunjungi
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}