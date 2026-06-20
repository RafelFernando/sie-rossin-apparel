import LaporanEksekutif from "@/components/laporan-eksekutif";
import PrintButtonEksekutif from "@/components/print-eksekutif-button";

export default function LaporanEksekutifPage() {
    return (
        <div className="-m-4">
            <PrintButtonEksekutif />
            <LaporanEksekutif />
        </div>
    )
}