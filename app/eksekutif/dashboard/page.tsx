import Dashboard from "@/components/dashboard/dashboard";
import RefreshButton from "@/components/refreshbutton";
import LogoutButton from "@/components/signoutbutton";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { FaFile } from "react-icons/fa";

export default async function DashboardEksekutifPage() {
    const session = await auth();

    return (
        <main className="-m-4">
            <div className="flex justify-between mb-2">
                <div className="flex">
                    <h1 className="text-2xl font-semibold text-black px-1">
                        Selamat Datang <span className="text-blue-600">{session?.user.name}</span> di
                    </h1>
                    <h1 className="text-2xl font-semibold text-black px-1">
                        Dashboard Analisis Penjualan dan Customer E-Commerce ROSIN APPAREL
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <Link href="/eksekutif/dashboard/laporan" className="cursor-pointer text-white px-3 py-1 border border-white rounded-sm flex items-center gap-2 bg-green-400 hover:bg-green-600">
                        <FaFile />
                        Laporan
                    </Link>
                    <RefreshButton />
                    <LogoutButton />
                </div>
            </div>

            <Dashboard />
        </main>
    );
}