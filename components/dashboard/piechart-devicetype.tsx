"use client";

import { FiMonitor } from "react-icons/fi";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    defaults,
    TooltipItem,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

type Props = {
    data: {
        mobile: {
            total: number;
            percentage: number;
        };
        desktop: {
            total: number;
            percentage: number;
        };
        tablet: {
            total: number;
            percentage: number;
        };
    };
};

export default function PieChartDeviceType({ data }: Props) {
    const chartData = {
        labels: [
            "Mobile",
            "Desktop",
            "Tablet",
        ],
        datasets: [
            {
                label: "Device Type",
                data: [
                    data.mobile.total,
                    data.desktop.total,
                    data.tablet.total,
                ],
                backgroundColor: [
                    "#3b82f6",
                    "#22c55e",
                    "#f59e0b",
                ],
                borderColor: "#ffffff",
                borderWidth: 2,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: "right" as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<"pie">) => {
                        const percentages = [
                            data.mobile.percentage,
                            data.desktop.percentage,
                            data.tablet.percentage,
                        ];

                        return `${context.label}: ${context.raw} transaksi (${percentages[context.dataIndex]}%)`;
                    },
                },
            },
        },
    };

    return (
        <div className="h-[230px] w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white">
                    <FiMonitor size={16} />
                </div>

                <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                        Penggunaan Device
                    </p>
                </div>
            </div>

            <div className="relative h-[150px] w-full">
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
}