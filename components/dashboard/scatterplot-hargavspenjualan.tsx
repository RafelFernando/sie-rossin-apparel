"use client";

import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    defaults,
    TooltipItem,
} from "chart.js";

import { Scatter } from "react-chartjs-2";
import { FiTrendingUp } from "react-icons/fi";

ChartJS.register(
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

defaults.responsive = true;
defaults.maintainAspectRatio = false;

type Props = {
    data: {
        x: number;
        y: number;
        category: string;
    }[];
};

export default function ScatterHargaVsPenjualan({
    data,
}: Props) {
    const chartData = {
        datasets: [
            {
                label: "Produk Premium",
                data,
                backgroundColor: "#3b82f6",
                pointRadius: 7,
                pointHoverRadius: 9,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },

            tooltip: {
                callbacks: {
                    label: (
                        context: TooltipItem<"scatter">
                    ) => {
                        const point =
                            data[context.dataIndex];

                        return [
                            point.category,
                            `Harga: ${point.x} Jt`,
                            `Transaksi: ${point.y}`,
                        ];
                    },
                },
            },
        },

        scales: {
            x: {
                title: {
                    display: true,
                    text: "Harga Produk (Juta Rupiah)",
                },

                ticks: {
                    callback: function (value: string | number) {
                        return `${value} Jt`;
                    },
                },
            },

            y: {
                beginAtZero: true,

                title: {
                    display: true,
                    text: "Total Transaksi",
                },

                ticks: {
                    callback: function (value: string | number) {
                        return `${value}`;
                    },
                },
            },
        },
    };

    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white">
                    <FiTrendingUp size={16} />
                </div>

                <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                        Pengaruh Harga Terhadap Transaksi Customer
                    </p>
                </div>
            </div>

            <div className="h-[250px]">
                <Scatter
                    data={chartData}
                    options={options}
                />
            </div>
        </div>
    );
}