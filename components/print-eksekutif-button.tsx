"use client";

import { FiPrinter } from "react-icons/fi";

export default function PrintButtonEksekutif() {
    return (
        <div className="print-button-container fixed top-4 right-4 z-50 print:hidden">
            <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg"
            >
                <FiPrinter />
                <span>Cetak PDF</span>
            </button>
        </div>
    );
}