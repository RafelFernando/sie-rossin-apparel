"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    TooltipItem,
    Legend,
    defaults,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { FiMonitor } from "react-icons/fi";

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
        device: string;
        averageSession: number;
    }[];
};

export default function BarChartSessionPerDevice({ data }: Props) {
    const chartData = {
        labels: data.map((item) => item.device),
        datasets: [
            {
                label: "Rata-rata Session",
                data: data.map((item) => item.averageSession),
                backgroundColor: [
                    "#3b82f6",
                    "#22c55e",
                    "#f59e0b",
                ],
                borderRadius: 6,
            },
        ],
    };

    const options = {
        indexAxis: "y" as const,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<"bar">) =>
                        `${context.raw} menit`,
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Menit",
                },
            },
        },
    };

    return (
        <div className="h-[230px] w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white">
                    <FiMonitor size={16} />
                </div>

                <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                        Rata-rata Session Duration per Device
                    </p>
                </div>
            </div>

            <div className="h-[150px]">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}