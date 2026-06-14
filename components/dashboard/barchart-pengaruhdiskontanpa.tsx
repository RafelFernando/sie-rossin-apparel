"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    defaults,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { FiPercent } from "react-icons/fi";

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
        month: number;
        tanpaDiskon: number;
        denganDiskon: number;
    }[];
};

export default function BarChartPengaruhDiskon({ data }: Props) {
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
                label: "Tanpa Diskon",
                data: data.map((item) => item.tanpaDiskon),
                backgroundColor: "#d1d5db",
                borderRadius: 4,
            },
            {
                label: "Dengan Diskon",
                data: data.map((item) => item.denganDiskon),
                backgroundColor: "#3b82f6",
                borderRadius: 4,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Jumlah Transaksi",
                },
            },
        },
    };

    return (
        <div className="h-[230px] w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white">
                    <FiPercent size={16} />
                </div>

                <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                        Pengaruh Diskon Terhadap Transaksi
                    </p>
                </div>
            </div>

            <div className="h-[150px]">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}