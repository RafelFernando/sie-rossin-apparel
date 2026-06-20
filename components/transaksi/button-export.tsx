"use client";

import { FiDownload } from "react-icons/fi";

export default function ExportButton() {
    const handleExport = () => {
        window.open(
            "/api/export/transaksi",
            "_blank"
        );
    };

    return (
        <button
            onClick={handleExport}
            className="cursor-pointer text-white px-3 py-1 border border-white rounded-sm flex items-center gap-2 bg-emerald-500 hover:bg-emerald-700"
        >
            <FiDownload size={20} />
            Export Excel
        </button>
    );
}