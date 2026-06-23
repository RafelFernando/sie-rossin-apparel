import LaporanEksekutif from "@/components/laporan-eksekutif";
import PrintButtonEksekutif from "@/components/print-eksekutif-button";
import { Suspense } from "react";

export default function LaporanEksekutifPage() {
    return (
        <>
            <PrintButtonEksekutif />

            <main
                id="laporan-eksekutif"
                className="print-content bg-white"
            >
                <Suspense
                    fallback={
                        <div>
                            Memuat laporan...
                        </div>
                    }
                >
                    <LaporanEksekutif />
                </Suspense>
            </main>
        </>
    );
}