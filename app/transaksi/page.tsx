import TransaksiTable from "@/components/transaksi/transaksi-table";
import { Suspense } from "react";
import LogoutButton from "@/components/signoutbutton";

export default function TransaksiPage() {
    return (
        <main className="-m-6">
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-black py-2 px-1">
                    Data Transaksi E-Commerce ROSIN APPAREL
                </h1>
                <div className="flex items-center gap-2">
                    <LogoutButton />
                </div>
            </div>
            <Suspense fallback={<div>Memuat...</div>}>
                <TransaksiTable />
            </Suspense>
        </main>
    );
}