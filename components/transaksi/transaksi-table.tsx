import { getTransaksi } from "@/lib/transaksi/data";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import RefreshButton from "@/components/refreshbutton";
import { EditButton, DeleteButton } from "@/components/transaksi/button";

export default async function TransaksiTable() {
    const transaksi = await getTransaksi();

    return (
        <div className="border border-gray-200 bg-white shadow-sm">
            <div className="max-h-[700px] overflow-auto">
                <table className="w-full min-w-[1800px] border-collapse">
                    <thead className="sticky top-0 z-10 bg-slate-200">
                        <tr>
                            <th
                                colSpan={15}
                                className="px-2 py-1 text-left bg-blue-400"
                            >
                                <div className="flex items-center gap-2">
                                    <RefreshButton />
                                    <Link
                                        href="/transaksi/tambah"
                                        className="text-white px-3 py-1 border border-white rounded-sm flex items-center gap-2 bg-green-400 hover:bg-green-600 transition-colors duration-200"
                                    >
                                        <FiPlus size={20} />
                                        Add
                                    </Link>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <TableHead>No</TableHead>
                            <TableHead>Customer ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Product Category</TableHead>
                            <TableHead>Unit Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Discount Amount</TableHead>
                            <TableHead>Payment Method</TableHead>
                            <TableHead>Device Type</TableHead>
                            <TableHead>Session Duration</TableHead>
                            <TableHead>Pages Viewed</TableHead>
                            <TableHead>Returning Customer</TableHead>
                            <TableHead>Customer Rating</TableHead>
                            <TableHead className="text-center">
                                Action
                            </TableHead>
                        </tr>
                    </thead>

                    <tbody>
                        {transaksi?.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={14}
                                    className="text-center text-[19px] text-black py-2"
                                >
                                    Tidak ada data transaksi
                                </td>
                            </tr>
                        ) : (
                            transaksi?.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="
                                        even:bg-gray-50
                                        hover:bg-blue-50
                                        transition-colors
                                        cursor-pointer
                                    "
                                >
                                    <TableCell>{index + 1}</TableCell>

                                    <TableCell>
                                        {item.customerId}
                                    </TableCell>

                                    <TableCell>
                                        {new Intl.DateTimeFormat("id-ID", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })
                                            .format(new Date(item.transactionDate))
                                            .replaceAll("/", "-")}
                                    </TableCell>

                                    <TableCell>
                                        {item.productCategory}
                                    </TableCell>

                                    <TableCell>
                                        Rp{" "}
                                        {item.unitPrice.toLocaleString(
                                            "id-ID"
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {item.quantity}
                                    </TableCell>

                                    <TableCell>
                                        Rp{" "}
                                        {item.totalAmount.toLocaleString(
                                            "id-ID"
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        Rp{" "}
                                        {item.discountAmount.toLocaleString(
                                            "id-ID"
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {item.paymentMethod}
                                    </TableCell>

                                    <TableCell>
                                        {item.deviceType}
                                    </TableCell>

                                    <TableCell>
                                        {item.sessionDurationMinutes}
                                    </TableCell>

                                    <TableCell>
                                        {item.pagesViewed}
                                    </TableCell>

                                    <TableCell>
                                        {item.isReturningCustomer}
                                    </TableCell>

                                    <TableCell>
                                        {item.customerRating}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center justify-center gap-1">
                                            <EditButton id={item.id} />
                                            <DeleteButton id={item.id} />
                                        </div>
                                    </TableCell>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function TableHead({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <th
            className={`
                border-b-2 border-blue-300
                px-4 py-3
                text-left
                text-[18px]
                font-semibold
                uppercase
                tracking-wide
                text-black
                whitespace-nowrap
                ${className}
            `}
        >
            {children}
        </th>
    );
}

function TableCell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <td
            className="
                border-b-2 border-gray-100
                px-4
                text-[19px]
                text-black
                whitespace-nowrap
            "
        >
            {children}
        </td>
    );
}