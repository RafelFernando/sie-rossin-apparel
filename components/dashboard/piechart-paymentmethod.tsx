"use client";

import { FiCreditCard } from "react-icons/fi";

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
        bankTransfer: {
            total: number;
            percentage: number;
        };
        cod: {
            total: number;
            percentage: number;
        };
        creditCard: {
            total: number;
            percentage: number;
        };
        digitalWallet: {
            total: number;
            percentage: number;
        };
    };
};

export default function PieChartPaymentMethod({ data }: Props) {
    const chartData = {
        labels: [
            "Bank Transfer",
            "COD",
            "Credit Card",
            "Digital Wallet",
        ],
        datasets: [
            {
                label: "Payment Method",
                data: [
                    data.bankTransfer.total,
                    data.cod.total,
                    data.creditCard.total,
                    data.digitalWallet.total,
                ],
                backgroundColor: [
                    "#3b82f6",
                    "#22c55e",
                    "#ef4444",
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
                            data.bankTransfer.percentage,
                            data.cod.percentage,
                            data.creditCard.percentage,
                            data.digitalWallet.percentage,
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
                    <FiCreditCard size={16} />
                </div>

                <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                        Metode Pembayaran
                    </p>
                </div>
            </div>

            <div className="relative h-[150px] w-full">
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
}