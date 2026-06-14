"use client";

import { FaTshirt } from "react-icons/fa";

type Props = {
    data: {
        category: string;
        loyal: number;
        baru: number;
        total: number;
    }[];
};

export default function HeatmapKategoriCustomer({ data }: Props) {
    const getColor = (value: number) => {
        if (value >= 75) return "bg-blue-700 text-white";
        if (value >= 50) return "bg-blue-500 text-white";
        if (value >= 25) return "bg-blue-300";
        return "bg-blue-100";
    };

    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white">
                    <FaTshirt size={16} />
                </div>

                <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                        Kategori Produk yang Sering Dibeli
                    </p>
                    <p
                        className="text-xs font-bold uppercase text-gray-500">Oleh customer loyal</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-center text-xs">
                    <thead>
                        <tr>
                            <th className="border p-2">
                                Customer
                            </th>

                            {data.map((item) => (
                                <th
                                    key={item.category}
                                    className="border p-2"
                                >
                                    {item.category}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="border p-2 font-semibold">
                                Loyal
                            </td>

                            {data.map((item) => (
                                <td
                                    key={item.category}
                                    className={`border p-2 font-semibold ${getColor(
                                        item.loyal
                                    )}`}
                                >
                                    {item.loyal}%
                                </td>
                            ))}
                        </tr>

                        <tr>
                            <td className="border p-2 font-semibold">
                                Baru
                            </td>

                            {data.map((item) => (
                                <td
                                    key={item.category}
                                    className={`border p-2 font-semibold ${getColor(
                                        item.baru
                                    )}`}
                                >
                                    {item.baru}%
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-4">
                <div className="h-3 w-full rounded bg-linear-to-r from-blue-100 to-blue-700" />

                <div className="mt-1 flex justify-between text-[10px] text-gray-500">
                    <span>Rendah</span>
                    <span>Tinggi</span>
                </div>
            </div>
        </div>
    );
}