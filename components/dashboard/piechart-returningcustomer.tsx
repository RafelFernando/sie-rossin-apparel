"use client";

import { FiUsers } from "react-icons/fi";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    defaults,
} from "chart.js";

import { Pie } from "react-chartjs-2";
import { TooltipItem } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

type Props = {
    data: {
        returningCustomer: {
            total: number;
            percentage: number;
        };
        customerBaru: {
            total: number;
            percentage: number;
        };
    };
};

export default function PieChartReturningCustomer({ data }: Props) {
    const chartData = {
        labels: [
            `Returning Customer`,
            `Customer Baru`,
        ],
        datasets: [
            {
                label: "Customer Type",
                data: [
                    data.returningCustomer.total,
                    data.customerBaru.total,
                ],
                backgroundColor: [
                    "#3b82f6",
                    "#22c55e",
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
                            data.returningCustomer.percentage,
                            data.customerBaru.percentage,
                        ];

                        return `${context.label}: ${context.raw} transaksi (${percentages[context.dataIndex]}%)`;
                    },
                },
            },
        },
    };

    return (
        <div className="h-[230px] w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white">
                    <FiUsers size={16} />
                </div>

                <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">
                        Loyalitas Customer
                    </p>
                </div>
            </div>

            <div className="relative w-full h-[150px]">
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
}