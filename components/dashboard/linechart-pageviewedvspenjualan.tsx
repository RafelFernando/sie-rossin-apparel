"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    defaults,
    TooltipItem
} from "chart.js";

import { Line } from "react-chartjs-2";
import { FiEye } from "react-icons/fi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
);

defaults.responsive = true;
defaults.maintainAspectRatio = false;

type Props = {
    data: {
        month: number;
        totalViews: number;
        totalSalesJuta: number;
    }[];
};

export default function LineChartViewsVsSales({
    data,
}: Props) {
    const labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
    ];

    const chartData = {
        labels,
        datasets: [
            {
                label: "Total Penjualan (Jt)",
                data: data.map(
                    (item) => item.totalSalesJuta
                ),
                borderColor: "#2563eb",
                backgroundColor: "#2563eb",
                tension: 0.4,
                yAxisID: "y",
            },
            {
                label: "Total Views",
                data: data.map(
                    (item) => item.totalViews
                ),
                borderColor: "#22c55e",
                backgroundColor: "#22c55e",
                tension: 0.4,
                yAxisID: "y1",
            },
        ],
    };

    const options = {
        responsive: true,
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
        plugins: {
            legend: {
                position: "top" as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'line'>) => {
                        if (context.datasetIndex === 0) {
                            return `${context.dataset.label}: ${context.raw} Jt`;
                        }

                        return `${context.dataset.label}: ${context.raw}`;
                    },
                },
            },
        },
        scales: {
            y: {
                type: "linear" as const,
                position: "left" as const,
                title: {
                    display: true,
                    text: "Penjualan (Jt)",
                },
            },

            y1: {
                type: "linear" as const,
                position: "right" as const,

                grid: {
                    drawOnChartArea: false,
                },

                title: {
                    display: true,
                    text: "Views",
                },
            },
        },
    };

    return (
        <div className="h-[300px] w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white">
                    <FiEye size={16} />
                </div>

                <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                        Hubungan Traffic Website dan Penjualan
                    </p>
                </div>
            </div>

            <div className="h-[200px]">
                <Line
                    data={chartData}
                    options={options}
                />
            </div>
        </div>
    );
}