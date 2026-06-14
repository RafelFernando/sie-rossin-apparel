"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    defaults,
    TooltipItem,
} from "chart.js";

import { Chart } from "react-chartjs-2";
import { FiActivity } from "react-icons/fi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend
);

defaults.responsive = true;
defaults.maintainAspectRatio = false;

type Props = {
    data: {
        category: string;
        avgSessionDuration: number;
        avgPagesViewed: number;
    }[];
};

export default function ChartEngagementKategori({
    data,
}: Props) {
    const chartData = {
        labels: data.map((item) => item.category),

        datasets: [
            {
                type: "bar" as const,
                label: "Avg. Session Duration (menit)",
                data: data.map(
                    (item) => item.avgSessionDuration
                ),
                backgroundColor: "#2563eb",
                borderRadius: 4,
                yAxisID: "y",
                order: 2,
            },

            {
                type: "line" as const,
                label: "Avg. Pages Viewed",
                data: data.map(
                    (item) => item.avgPagesViewed
                ),
                borderColor: "#22c55e",
                backgroundColor: "#22c55e",
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBorderWidth: 2,
                pointBackgroundColor: "#22c55e",
                tension: 0.4,
                yAxisID: "y1",
                order: 1,
            },
        ],
    };

    const options = {
        responsive: true,

        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    boxWidth: 12,
                    font: {
                        size: 10,
                    },
                },
            },

            tooltip: {
                callbacks: {
                    label: (
                        context: TooltipItem<
                            "bar" | "line"
                        >
                    ) => {
                        if (
                            context.dataset.label?.includes(
                                "Duration"
                            )
                        ) {
                            return `${context.raw} menit`;
                        }

                        return `${context.raw} halaman`;
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
                    text: "Durasi (menit)",
                },

                beginAtZero: true,
            },

            y1: {
                type: "linear" as const,
                position: "right" as const,

                title: {
                    display: true,
                    text: "Pages Viewed",
                },

                beginAtZero: true,

                grid: {
                    drawOnChartArea: false,
                },
            },

            x: {
                ticks: {
                    font: {
                        size: 10,
                    },
                },
            },
        },
    };

    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white">
                    <FiActivity size={16} />
                </div>

                <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                        Engagement Customer Per Kategori Produk
                    </p>
                </div>
            </div>

            <div className="h-[250px]">
                <Chart
                    type="bar"
                    data={chartData}
                    options={options}
                />
            </div>
        </div>
    );
}