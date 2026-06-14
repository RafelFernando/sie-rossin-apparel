"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    defaults,
    TooltipItem,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { FiShoppingBag } from "react-icons/fi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

defaults.responsive = true;
defaults.maintainAspectRatio = false;

type Props = {
    data: {
        category: string;
        totalSales: number;
        totalSalesJuta: number;
    }[];
};

export default function BarChartPenjualanKategori({
    data,
}: Props) {
    const chartData = {
        labels: data.map((item) => item.category),
        datasets: [
            {
                label: "Total Penjualan",
                data: data.map(
                    (item) => item.totalSalesJuta
                ),
                backgroundColor: "#3b82f6",
                borderRadius: 6,
            },
        ],
    };

    const options = {
        indexAxis: "y" as const, // horizontal

        plugins: {
            legend: {
                display: false,
            },

            tooltip: {
                callbacks: {
                    label: (
                        context: TooltipItem<"bar">
                    ) =>
                        `${context.raw} Jt`,
                },
            },
        },

        scales: {
            x: {
                beginAtZero: true,

                title: {
                    display: true,
                    text: "Penjualan (Juta Rupiah)",
                },
            },

            y: {
                ticks: {
                    font: {
                        size: 10,
                    },
                },
            },
        },
    };

    return (
        <div className="h-[300px] w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white">
                    <FiShoppingBag size={16} />
                </div>

                <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                        Total Penjualan Per Kategori Produk
                    </p>
                </div>
            </div>

            <div className="h-[200px]">
                <Bar
                    data={chartData}
                    options={options}
                />
            </div>
        </div>
    );
}