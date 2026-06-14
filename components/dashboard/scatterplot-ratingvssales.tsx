"use client";

import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    defaults,
} from "chart.js";

import { Scatter } from "react-chartjs-2";
import { FiTrendingUp } from "react-icons/fi";
import { TooltipItem } from "chart.js";

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

export default function ScatterChartRatingVsSales({
    data,
}: Props) {
    const chartData = {
        datasets: [
            {
                label: "Rating vs Penjualan",
                data,
                backgroundColor: "#3b82f6",
                pointRadius: 6,
                pointHoverRadius: 8,
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
                        const point = data[context.dataIndex];

                        return [
                            `${point.category}`,
                            `Rating: ${point.x}`,
                            `Penjualan: Rp ${point.y.toLocaleString("id-ID")}`,
                        ];
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Rata-rata Rating",
                },
                min: 0,
                max: 5,
            },
            y: {
                title: {
                    display: true,
                    text: "Total Penjualan (Rp)",
                },
                ticks: {
                    callback: function (value: string | number) {
                        return (
                            "Rp " +
                            Number(value).toLocaleString("id-ID")
                        );
                    },
                },
            },
        },
    };

    return (
        <div className="h-[300px] w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white">
                    <FiTrendingUp size={16} />
                </div>

                <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                        Hubungan Rating Kategori Produk
                    </p>
                    <p className="text-xs font-bold uppercase text-gray-500">
                        dan Penjualan
                    </p>
                </div>
            </div>

            <div className="h-[220px]">
                <Scatter data={chartData} options={options} />
            </div>
        </div>
    );
}