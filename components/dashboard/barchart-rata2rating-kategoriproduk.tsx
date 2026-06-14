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
import { FiStar } from "react-icons/fi";

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
        averageRating: number;
    }[];
};

export default function BarChartRatingKategori({ data }: Props) {
    const chartData = {
        labels: data.map((item) => item.category),
        datasets: [
            {
                label: "Rata-rata Rating",
                data: data.map((item) => item.averageRating),
                backgroundColor: "#f59e0b",
                borderRadius: 4,
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
                    label: (context: TooltipItem<"bar">) =>
                        `Rating: ${context.raw}/5`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 5,
                ticks: {
                    stepSize: 1,
                },
                title: {
                    display: true,
                    text: "Rating",
                },
            },
        },
    };

    return (
        <div className="h-[230px] w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white">
                    <FiStar size={16} />
                </div>

                <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                        Rata-rata Rating Per Kategori Produk
                    </p>
                </div>
            </div>

            <div className="h-[150px]">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}