import Dashboard from "@/components/dashboard/dashboard";
import RefreshButton from "@/components/refreshbutton";
import LogoutButton from "@/components/signoutbutton";

export default async function DashboardPage() {

    return (
        <main className="-m-4">
            <div className="flex justify-between mb-2">
                <h1 className="text-2xl font-semibold text-black px-1">
                    Dashboard Analisis Penjualan dan Customer E-Commerce ROSIN APPAREL
                </h1>

                <div className="flex items-center gap-2">
                    <RefreshButton />
                    <LogoutButton />
                </div>
            </div>

            <Dashboard />
        </main>
    );
}