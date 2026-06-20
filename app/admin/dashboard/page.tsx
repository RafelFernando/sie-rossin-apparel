import Dashboard from "@/components/dashboard/dashboard";
import RefreshButton from "@/components/refreshbutton";
import LogoutButton from "@/components/signoutbutton";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
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
                    <RefreshButton />
                    <LogoutButton />
                </div>
            </div>

            <Dashboard />
        </main>
    );
}