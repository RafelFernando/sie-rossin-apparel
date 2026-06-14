"use client";

import { FiFilter } from "react-icons/fi";

type Props = {
    data: {
        stage: string;
        value: number;
    }[];
};

export default function FunnelCustomerActivity({
    data,
}: Props) {
    const maxValue = data[0]?.value ?? 1;
    const colors = [
        "#2563eb",
        "#3b82f6",
        "#60a5fa",
        "#93c5fd",
        "#bfdbfe",
    ];

    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-6 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white">
                    <FiFilter size={16} />
                </div>

                <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                        Aktivitas Customer Terhadap Pembelian
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                {data.map((item, index) => {
                    const width =
                        (item.value / maxValue) * 100;

                    const percentage =
                        ((item.value / maxValue) * 100).toFixed(
                            1
                        );

                    return (
                        <div
                            key={index}
                            className="flex items-center gap-3"
                        >
                            <div className="w-44 text-xs font-medium text-gray-700">
                                {index + 1}. {item.stage}
                            </div>

                            <div className="flex-1 flex justify-center">
                                <div
                                    className="flex h-10 items-center justify-center rounded-sm text-xs font-semibold text-white transition-all"
                                    style={{
                                        width: `${Math.max(width, 10)}%`,
                                        backgroundColor: colors[index],
                                    }}
                                >
                                    {item.value.toLocaleString()} (
                                    {percentage}%)
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}