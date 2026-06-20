"use client";

import { FiPrinter } from "react-icons/fi";

export default function PrintButtonEksekutif() {
    return (
        <button
            onClick={() => window.print()}
            className="button-print cursor-pointer text-white px-3 py-1 border border-white rounded-sm flex items-center gap-2 bg-blue-400 hover:bg-blue-600"
        >
            <FiPrinter />
            Cetak
        </button>
    );
}